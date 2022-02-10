"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const s3 = new AWS.S3;
const cognito = new AWS.CognitoIdentityServiceProvider;
const bucketName = process.env.BUCKET_NAME || '';
const dashboardUserPoolId = process.env.DASHBOARD_USERPOOL_ID || '';
async function handler(event) {
    var _a, _b, _c, _d;
    // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
    console.debug(`event: ${JSON.stringify(event)}`);
    // ignoring the CFN Create event as the export would be anyway empty. CFN Update and Delete will not be ignored!
    if (event.RequestType === 'Create') {
        return;
    }
    const dateNow = Date.now();
    // get dashboard user data
    const param = {
        UserPoolId: dashboardUserPoolId,
    };
    const users = await cognito.listUsers(param).promise();
    console.debug(`users: ${JSON.stringify(users)}`);
    const exportCsvFields = ['name', 'given_name', 'family_name', 'middle_name', 'nickname',
        'preferred_username', 'profile', 'picture', 'website', 'email', 'email_verified', 'gender',
        'birthdate', 'zoneinfo', 'locale', 'phone_number', 'phone_number_verified', 'address',
        'updated_at', 'cognito:mfa_enabled', 'cognito:username', 'custom:organization_id'];
    let exportCsv = exportCsvFields.join(',');
    (_a = users.Users) === null || _a === void 0 ? void 0 : _a.map((user) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        console.debug(`user: ${JSON.stringify(user)}`);
        const newCognitoCsv = {
            name: user.Username || '',
            given_name: ((_b = (_a = user.Attributes) === null || _a === void 0 ? void 0 : _a.filter(attr => attr.Name === 'given_name')[0]) === null || _b === void 0 ? void 0 : _b.Value) || 'given_name',
            family_name: ((_d = (_c = user.Attributes) === null || _c === void 0 ? void 0 : _c.filter(attr => attr.Name === 'family_name')[0]) === null || _d === void 0 ? void 0 : _d.Value) || 'family_name',
            middle_name: '',
            nickname: '',
            preferred_username: '',
            profile: '',
            picture: '',
            website: '',
            email: ((_f = (_e = user.Attributes) === null || _e === void 0 ? void 0 : _e.filter(attr => attr.Name === 'email')[0]) === null || _f === void 0 ? void 0 : _f.Value) || '',
            email_verified: ((_h = (_g = user.Attributes) === null || _g === void 0 ? void 0 : _g.filter(attr => attr.Name === 'email_verified')[0]) === null || _h === void 0 ? void 0 : _h.Value) || 'FALSE',
            gender: '',
            birthdate: '',
            zoneinfo: '',
            locale: '',
            phone_number: ((_k = (_j = user.Attributes) === null || _j === void 0 ? void 0 : _j.filter(attr => attr.Name === 'phone_number')[0]) === null || _k === void 0 ? void 0 : _k.Value) || '123',
            phone_number_verified: ((_m = (_l = user.Attributes) === null || _l === void 0 ? void 0 : _l.filter(attr => attr.Name === 'phone_number_verified')[0]) === null || _m === void 0 ? void 0 : _m.Value) || 'FALSE',
            address: '',
            updated_at: '',
            'cognito:mfa_enabled': 'FALSE',
            'cognito:username': user.Username || '',
            'custom:organization_id': ((_p = (_o = user.Attributes) === null || _o === void 0 ? void 0 : _o.filter(attr => attr.Name === 'custom:organization_id')[0]) === null || _p === void 0 ? void 0 : _p.Value) || '0',
        };
        console.debug(`newCognitoCsv: ${JSON.stringify(newCognitoCsv)}`);
        const userCsvArray = [
            newCognitoCsv.name, newCognitoCsv.given_name, newCognitoCsv.family_name, newCognitoCsv.middle_name, newCognitoCsv.nickname, newCognitoCsv.preferred_username,
            newCognitoCsv.profile, newCognitoCsv.picture, newCognitoCsv.website, newCognitoCsv.email, newCognitoCsv.email_verified,
            newCognitoCsv.gender, newCognitoCsv.birthdate, newCognitoCsv.zoneinfo, newCognitoCsv.locale, newCognitoCsv.phone_number, newCognitoCsv.phone_number_verified,
            newCognitoCsv.address, newCognitoCsv.updated_at, newCognitoCsv['cognito:mfa_enabled'], newCognitoCsv['cognito:username'], newCognitoCsv['custom:organization_id'],
        ];
        if (exportCsvFields.length !== userCsvArray.length) {
            console.log(`exportCsvFields.length: ${exportCsvFields.length}`);
            console.log(`userCsvArray.length: ${userCsvArray.length}`);
            throw Error('exportCsvFields.length !== userCsvArray.length');
        }
        exportCsv = exportCsv.concat('\n', userCsvArray.join(','));
    });
    const putObjectParams = {
        Bucket: bucketName,
        Key: `backup-${dateNow}.csv`,
        Body: exportCsv,
    };
    // only backup if we have user to backup
    if ((_c = (_b = users.Users) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0 > 0) {
        await s3.putObject(putObjectParams).promise();
    }
    // store users in groups
    const groups = await cognito.listGroups(param).promise();
    console.debug(`groups: ${JSON.stringify(groups)}`);
    let userGroups = [];
    for (const group of groups.Groups || []) {
        const param = {
            UserPoolId: dashboardUserPoolId,
            GroupName: group.GroupName || '',
        };
        const users = await cognito.listUsersInGroup(param).promise();
        userGroups.push({ groupName: group.GroupName || '', users: ((_d = users.Users) === null || _d === void 0 ? void 0 : _d.map(user => { var _a; return (_a = user.Username) !== null && _a !== void 0 ? _a : ''; })) || [] });
    }
    const putObjectGroupsParam = {
        Bucket: bucketName,
        Key: `backup-${dateNow}-groups.json`,
        Body: JSON.stringify(userGroups),
    };
    // only backup user groups if exist any
    if (userGroups.length > 0) {
        await s3.putObject(putObjectGroupsParam).promise();
    }
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLWJhY2tlbmQtc3RhY2suYmFja3VwTGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9kYXNoYm9hcmQtYmFja2VuZC1zdGFjay5iYWNrdXBMYW1iZGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsK0JBQStCO0FBRS9CLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQztBQUV2RCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7QUFDakQsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQztBQUU3RCxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQXFEOztJQUNqRix1RUFBdUU7SUFDdkUsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpELGdIQUFnSDtJQUNoSCxJQUFLLEtBQWtELENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtRQUNoRixPQUFPO0tBQ1I7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFM0IsMEJBQTBCO0lBQzFCLE1BQU0sS0FBSyxHQUE4RDtRQUN2RSxVQUFVLEVBQUUsbUJBQW1CO0tBQ2hDLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWpELE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBTSxFQUFF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QUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDbEg7SUFDRCxNQUFNLG9CQUFvQixHQUFrQztRQUMxRCxNQUFNLEVBQUUsVUFBVTtRQUNsQixHQUFHLEVBQUUsVUFBVSxPQUFPLGNBQWM7UUFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0tBQ2pDLENBQUE7SUFDRCx1Q0FBdUM7SUFDdkMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN6QixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNwRDtBQUNILENBQUM7QUFoR0QsMEJBZ0dDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBzMyA9IG5ldyBBV1MuUzM7XG5jb25zdCBjb2duaXRvID0gbmV3IEFXUy5Db2duaXRvSWRlbnRpdHlTZXJ2aWNlUHJvdmlkZXI7XG5cbmNvbnN0IGJ1Y2tldE5hbWUgPSBwcm9jZXNzLmVudi5CVUNLRVRfTkFNRSB8fCAnJztcbmNvbnN0IGRhc2hib2FyZFVzZXJQb29sSWQgPSBwcm9jZXNzLmVudi5EQVNIQk9BUkRfVVNFUlBPT0xfSUQgfHwgJyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBsYW1iZGEuQ2xvdWRGb3JtYXRpb25DdXN0b21SZXNvdXJjZUV2ZW50IHwgYW55KSB7XG4gIC8vIGV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudC8qOiBsYW1iZGEuRHluYW1vREJTdHJlYW1FdmVudCovKSA9PiB7XG4gIGNvbnNvbGUuZGVidWcoYGV2ZW50OiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblxuICAvLyBpZ25vcmluZyB0aGUgQ0ZOIENyZWF0ZSBldmVudCBhcyB0aGUgZXhwb3J0IHdvdWxkIGJlIGFueXdheSBlbXB0eS4gQ0ZOIFVwZGF0ZSBhbmQgRGVsZXRlIHdpbGwgbm90IGJlIGlnbm9yZWQhXG4gIGlmICgoZXZlbnQgYXMgbGFtYmRhLkNsb3VkRm9ybWF0aW9uQ3VzdG9tUmVzb3VyY2VFdmVudCkuUmVxdWVzdFR5cGUgPT09ICdDcmVhdGUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZGF0ZU5vdyA9IERhdGUubm93KCk7XG5cbiAgLy8gZ2V0IGRhc2hib2FyZCB1c2VyIGRhdGFcbiAgY29uc3QgcGFyYW06IEFXUy5Db2duaXRvSWRlbnRpdHlTZXJ2aWNlUHJvdmlkZXIuVHlwZXMuTGlzdFVzZXJzUmVxdWVzdCA9IHtcbiAgICBVc2VyUG9vbElkOiBkYXNoYm9hcmRVc2VyUG9vbElkLFxuICB9O1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGNvZ25pdG8ubGlzdFVzZXJzKHBhcmFtKS5wcm9taXNlKCk7XG4gIGNvbnNvbGUuZGVidWcoYHVzZXJzOiAke0pTT04uc3RyaW5naWZ5KHVzZXJzKX1gKTtcblxuICBjb25zdCBleHBvcnRDc3ZGaWVsZHMgPSBbJ25hbWUnLCAnZ2l2ZW5fbmFtZScsICdmYW1pbHlfbmFtZScsICdtaWRkbGVfbmFtZScsICduaWNrbmFtZScsXG4gICAgJ3ByZWZlcnJlZF91c2VybmFtZScsICdwcm9maWxlJywgJ3BpY3R1cmUnLCAnd2Vic2l0ZScsICdlbWFpbCcsICdlbWFpbF92ZXJpZmllZCcsICdnZW5kZXInLFxuICAgICdiaXJ0aGRhdGUnLCAnem9uZWluZm8nLCAnbG9jYWxlJywgJ3Bob25lX251bWJlcicsICdwaG9uZV9udW1iZXJfdmVyaWZpZWQnLCAnYWRkcmVzcycsXG4gICAgJ3VwZGF0ZWRfYXQnLCAnY29nbml0bzptZmFfZW5hYmxlZCcsICdjb2duaXRvOnVzZXJuYW1lJywgJ2N1c3RvbTpvcmdhbml6YXRpb25faWQnXVxuICBsZXQgZXhwb3J0Q3N2ID0gZXhwb3J0Q3N2RmllbGRzLmpvaW4oJywnKTtcbiAgdXNlcnMuVXNlcnM/Lm1hcCgodXNlcikgPT4ge1xuICAgIGNvbnNvbGUuZGVidWcoYHVzZXI6ICR7SlNPTi5zdHJpbmdpZnkodXNlcil9YCk7XG4gICAgY29uc3QgbmV3Q29nbml0b0NzdjogQ29nbml0b0NzdiA9IHtcbiAgICAgIG5hbWU6IHVzZXIuVXNlcm5hbWUgfHwgJycsXG4gICAgICBnaXZlbl9uYW1lOiB1c2VyLkF0dHJpYnV0ZXM/LmZpbHRlcihhdHRyID0+IGF0dHIuTmFtZSA9PT0gJ2dpdmVuX25hbWUnKVswXT8uVmFsdWUgfHwgJ2dpdmVuX25hbWUnLFxuICAgICAgZmFtaWx5X25hbWU6IHVzZXIuQXR0cmlidXRlcz8uZmlsdGVyKGF0dHIgPT4gYXR0ci5OYW1lID09PSAnZmFtaWx5X25hbWUnKVswXT8uVmFsdWUgfHwgJ2ZhbWlseV9uYW1lJyxcbiAgICAgIG1pZGRsZV9uYW1lOiAnJyxcbiAgICAgIG5pY2tuYW1lOiAnJyxcbiAgICAgIHByZWZlcnJlZF91c2VybmFtZTogJycsXG4gICAgICBwcm9maWxlOiAnJyxcbiAgICAgIHBpY3R1cmU6ICcnLFxuICAgICAgd2Vic2l0ZTogJycsXG4gICAgICBlbWFpbDogdXNlci5BdHRyaWJ1dGVzPy5maWx0ZXIoYXR0ciA9PiBhdHRyLk5hbWUgPT09ICdlbWFpbCcpWzBdPy5WYWx1ZSB8fCAnJyxcbiAgICAgIGVtYWlsX3ZlcmlmaWVkOiB1c2VyLkF0dHJpYnV0ZXM/LmZpbHRlcihhdHRyID0+IGF0dHIuTmFtZSA9PT0gJ2VtYWlsX3ZlcmlmaWVkJylbMF0/LlZhbHVlIHx8ICdGQUxTRScsXG4gICAgICBnZW5kZXI6ICcnLFxuICAgICAgYmlydGhkYXRlOiAnJyxcbiAgICAgIHpvbmVpbmZvOiAnJyxcbiAgICAgIGxvY2FsZTogJycsXG4gICAgICBwaG9uZV9udW1iZXI6IHVzZXIuQXR0cmlidXRlcz8uZmlsdGVyKGF0dHIgPT4gYXR0ci5OYW1lID09PSAncGhvbmVfbnVtYmVyJylbMF0/LlZhbHVlIHx8ICcxMjMnLFxuICAgICAgcGhvbmVfbnVtYmVyX3ZlcmlmaWVkOiB1c2VyLkF0dHJpYnV0ZXM/LmZpbHRlcihhdHRyID0+IGF0dHIuTmFtZSA9PT0gJ3Bob25lX251bWJlcl92ZXJpZmllZCcpWzBdPy5WYWx1ZSB8fCAnRkFMU0UnLFxuICAgICAgYWRkcmVzczogJycsXG4gICAgICB1cGRhdGVkX2F0OiAnJyxcbiAgICAgICdjb2duaXRvOm1mYV9lbmFibGVkJzogJ0ZBTFNFJyxcbiAgICAgICdjb2duaXRvOnVzZXJuYW1lJzogdXNlci5Vc2VybmFtZSB8fCAnJyxcbiAgICAgICdjdXN0b206b3JnYW5pemF0aW9uX2lkJzogdXNlci5BdHRyaWJ1dGVzPy5maWx0ZXIoYXR0ciA9PiBhdHRyLk5hbWUgPT09ICdjdXN0b206b3JnYW5pemF0aW9uX2lkJylbMF0/LlZhbHVlIHx8ICcwJyxcbiAgICB9XG4gICAgY29uc29sZS5kZWJ1ZyhgbmV3Q29nbml0b0NzdjogJHtKU09OLnN0cmluZ2lmeShuZXdDb2duaXRvQ3N2KX1gKTtcbiAgICBjb25zdCB1c2VyQ3N2QXJyYXkgPSBbXG4gICAgICBuZXdDb2duaXRvQ3N2Lm5hbWUsIG5ld0NvZ25pdG9Dc3YuZ2l2ZW5fbmFtZSwgbmV3Q29nbml0b0Nzdi5mYW1pbHlfbmFtZSwgbmV3Q29nbml0b0Nzdi5taWRkbGVfbmFtZSwgbmV3Q29nbml0b0Nzdi5uaWNrbmFtZSwgbmV3Q29nbml0b0Nzdi5wcmVmZXJyZWRfdXNlcm5hbWUsXG4gICAgICBuZXdDb2duaXRvQ3N2LnByb2ZpbGUsIG5ld0NvZ25pdG9Dc3YucGljdHVyZSwgbmV3Q29nbml0b0Nzdi53ZWJzaXRlLCBuZXdDb2duaXRvQ3N2LmVtYWlsLCBuZXdDb2duaXRvQ3N2LmVtYWlsX3ZlcmlmaWVkLFxuICAgICAgbmV3Q29nbml0b0Nzdi5nZW5kZXIsIG5ld0NvZ25pdG9Dc3YuYmlydGhkYXRlLCBuZXdDb2duaXRvQ3N2LnpvbmVpbmZvLCBuZXdDb2duaXRvQ3N2LmxvY2FsZSwgbmV3Q29nbml0b0Nzdi5waG9uZV9udW1iZXIsIG5ld0NvZ25pdG9Dc3YucGhvbmVfbnVtYmVyX3ZlcmlmaWVkLFxuICAgICAgbmV3Q29nbml0b0Nzdi5hZGRyZXNzLCBuZXdDb2duaXRvQ3N2LnVwZGF0ZWRfYXQsIG5ld0NvZ25pdG9Dc3ZbJ2NvZ25pdG86bWZhX2VuYWJsZWQnXSwgbmV3Q29nbml0b0NzdlsnY29nbml0bzp1c2VybmFtZSddLCBuZXdDb2duaXRvQ3N2WydjdXN0b206b3JnYW5pemF0aW9uX2lkJ10sXG4gICAgXTtcbiAgICBpZiAoZXhwb3J0Q3N2RmllbGRzLmxlbmd0aCAhPT0gdXNlckNzdkFycmF5Lmxlbmd0aCkge1xuICAgICAgY29uc29sZS5sb2coYGV4cG9ydENzdkZpZWxkcy5sZW5ndGg6ICR7ZXhwb3J0Q3N2RmllbGRzLmxlbmd0aH1gKVxuICAgICAgY29uc29sZS5sb2coYHVzZXJDc3ZBcnJheS5sZW5ndGg6ICR7dXNlckNzdkFycmF5Lmxlbmd0aH1gKVxuICAgICAgdGhyb3cgRXJyb3IoJ2V4cG9ydENzdkZpZWxkcy5sZW5ndGggIT09IHVzZXJDc3ZBcnJheS5sZW5ndGgnKTtcbiAgICB9XG4gICAgZXhwb3J0Q3N2ID0gZXhwb3J0Q3N2LmNvbmNhdCgnXFxuJywgdXNlckNzdkFycmF5LmpvaW4oJywnKSk7XG4gIH0pO1xuXG4gIGNvbnN0IHB1dE9iamVjdFBhcmFtczogQVdTLlMzLlR5cGVzLlB1dE9iamVjdFJlcXVlc3QgPSB7XG4gICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgIEtleTogYGJhY2t1cC0ke2RhdGVOb3d9LmNzdmAsXG4gICAgQm9keTogZXhwb3J0Q3N2LFxuICB9XG4gIC8vIG9ubHkgYmFja3VwIGlmIHdlIGhhdmUgdXNlciB0byBiYWNrdXBcbiAgaWYgKHVzZXJzLlVzZXJzPy5sZW5ndGggPz8gMCA+IDApIHtcbiAgICBhd2FpdCBzMy5wdXRPYmplY3QocHV0T2JqZWN0UGFyYW1zKS5wcm9taXNlKCk7XG4gIH1cblxuICAvLyBzdG9yZSB1c2VycyBpbiBncm91cHNcbiAgY29uc3QgZ3JvdXBzID0gYXdhaXQgY29nbml0by5saXN0R3JvdXBzKHBhcmFtKS5wcm9taXNlKCk7XG4gIGNvbnNvbGUuZGVidWcoYGdyb3VwczogJHtKU09OLnN0cmluZ2lmeShncm91cHMpfWApO1xuXG4gIGxldCB1c2VyR3JvdXBzOiB7IGdyb3VwTmFtZTogc3RyaW5nOyB1c2Vyczogc3RyaW5nW10gfVtdID0gW107XG4gIGZvciAoY29uc3QgZ3JvdXAgb2YgZ3JvdXBzLkdyb3VwcyB8fCBbXSkge1xuICAgIGNvbnN0IHBhcmFtOiBBV1MuQ29nbml0b0lkZW50aXR5U2VydmljZVByb3ZpZGVyLlR5cGVzLkxpc3RVc2Vyc0luR3JvdXBSZXF1ZXN0ID0ge1xuICAgICAgVXNlclBvb2xJZDogZGFzaGJvYXJkVXNlclBvb2xJZCxcbiAgICAgIEdyb3VwTmFtZTogZ3JvdXAuR3JvdXBOYW1lIHx8ICcnLFxuICAgIH07XG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBjb2duaXRvLmxpc3RVc2Vyc0luR3JvdXAocGFyYW0pLnByb21pc2UoKTtcbiAgICB1c2VyR3JvdXBzLnB1c2goeyBncm91cE5hbWU6IGdyb3VwLkdyb3VwTmFtZSB8fCAnJywgdXNlcnM6IHVzZXJzLlVzZXJzPy5tYXAodXNlciA9PiB1c2VyLlVzZXJuYW1lID8/ICcnKSB8fCBbXSB9KVxuICB9XG4gIGNvbnN0IHB1dE9iamVjdEdyb3Vwc1BhcmFtOiBBV1MuUzMuVHlwZXMuUHV0T2JqZWN0UmVxdWVzdCA9IHtcbiAgICBCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgS2V5OiBgYmFja3VwLSR7ZGF0ZU5vd30tZ3JvdXBzLmpzb25gLFxuICAgIEJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJHcm91cHMpLFxuICB9XG4gIC8vIG9ubHkgYmFja3VwIHVzZXIgZ3JvdXBzIGlmIGV4aXN0IGFueVxuICBpZiAodXNlckdyb3Vwcy5sZW5ndGggPiAwKSB7XG4gICAgYXdhaXQgczMucHV0T2JqZWN0KHB1dE9iamVjdEdyb3Vwc1BhcmFtKS5wcm9taXNlKCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIENvZ25pdG9Dc3Yge1xuICAnbmFtZSc6IHN0cmluZzsgJ2dpdmVuX25hbWUnOiBzdHJpbmc7ICdmYW1pbHlfbmFtZSc6IHN0cmluZzsgJ21pZGRsZV9uYW1lJzogc3RyaW5nOyAnbmlja25hbWUnOiBzdHJpbmc7XG4gICdwcmVmZXJyZWRfdXNlcm5hbWUnOiBzdHJpbmc7ICdwcm9maWxlJzogc3RyaW5nOyAncGljdHVyZSc6IHN0cmluZzsgJ3dlYnNpdGUnOiBzdHJpbmc7ICdlbWFpbCc6IHN0cmluZzsgJ2VtYWlsX3ZlcmlmaWVkJzogc3RyaW5nOyAnZ2VuZGVyJzogc3RyaW5nO1xuICAnYmlydGhkYXRlJzogc3RyaW5nOyAnem9uZWluZm8nOiBzdHJpbmc7ICdsb2NhbGUnOiBzdHJpbmc7ICdwaG9uZV9udW1iZXInOiBzdHJpbmc7ICdwaG9uZV9udW1iZXJfdmVyaWZpZWQnOiBzdHJpbmc7ICdhZGRyZXNzJzogc3RyaW5nO1xuICAndXBkYXRlZF9hdCc6IHN0cmluZzsgJ2NvZ25pdG86bWZhX2VuYWJsZWQnOiBzdHJpbmc7ICdjb2duaXRvOnVzZXJuYW1lJzogc3RyaW5nOyAnY3VzdG9tOm9yZ2FuaXphdGlvbl9pZCc6IHN0cmluZztcbn0iXX0=