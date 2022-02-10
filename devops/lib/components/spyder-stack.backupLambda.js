"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const s3 = new AWS.S3;
const cognito = new AWS.CognitoIdentityServiceProvider;
const bucketName = process.env.BUCKET_NAME || '';
const spyderUserPoolId = process.env.SPYDER_USERPOOL_ID || '';
async function handler(event) {
    var _a, _b, _c;
    console.debug(`event: ${JSON.stringify(event)}`);
    // ignoring the CFN Create event as the export would be anyway empty. CFN Update and Delete will not be ignored!
    if (event.RequestType === 'Create') {
        return;
    }
    const dateNow = Date.now();
    // get spyder user data
    const spyderParam = {
        UserPoolId: spyderUserPoolId,
    };
    const spyderUsers = await cognito.listUsers(spyderParam).promise();
    console.debug(`spyderUsers: ${JSON.stringify(spyderUsers)}`);
    const spyderExportCsvFields = ['name', 'given_name', 'family_name', 'middle_name', 'nickname',
        'preferred_username', 'profile', 'picture', 'website', 'email', 'email_verified', 'gender',
        'birthdate', 'zoneinfo', 'locale', 'phone_number', 'phone_number_verified', 'address',
        'updated_at', 'cognito:mfa_enabled', 'cognito:username', 'custom:organization_id'];
    let spyderExportCsv = spyderExportCsvFields.join(',');
    (_a = spyderUsers.Users) === null || _a === void 0 ? void 0 : _a.map((user) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console.debug(`spyderUser: ${JSON.stringify(user)}`);
        const newCognitoCsv = {
            name: user.Username || '',
            given_name: '',
            family_name: '',
            middle_name: '',
            nickname: '',
            preferred_username: '',
            profile: '',
            picture: '',
            website: '',
            email: ((_b = (_a = user.Attributes) === null || _a === void 0 ? void 0 : _a.filter(attr => attr.Name === 'email')[0]) === null || _b === void 0 ? void 0 : _b.Value) || '',
            email_verified: ((_d = (_c = user.Attributes) === null || _c === void 0 ? void 0 : _c.filter(attr => attr.Name === 'email_verified')[0]) === null || _d === void 0 ? void 0 : _d.Value) || 'FALSE',
            gender: '',
            birthdate: '',
            zoneinfo: '',
            locale: '',
            phone_number: ((_f = (_e = user.Attributes) === null || _e === void 0 ? void 0 : _e.filter(attr => attr.Name === 'phone_number')[0]) === null || _f === void 0 ? void 0 : _f.Value) || '',
            phone_number_verified: ((_h = (_g = user.Attributes) === null || _g === void 0 ? void 0 : _g.filter(attr => attr.Name === 'phone_number_verified')[0]) === null || _h === void 0 ? void 0 : _h.Value) || 'FALSE',
            address: '',
            updated_at: '',
            'cognito:mfa_enabled': 'FALSE',
            'cognito:username': user.Username || '',
            'custom:organization_id': ((_k = (_j = user.Attributes) === null || _j === void 0 ? void 0 : _j.filter(attr => attr.Name === 'custom:organization_id')[0]) === null || _k === void 0 ? void 0 : _k.Value) || '0',
        };
        console.debug(`newCognitoCsv: ${JSON.stringify(newCognitoCsv)}`);
        const userCsvArray = [
            newCognitoCsv.name, newCognitoCsv.given_name, newCognitoCsv.family_name, newCognitoCsv.middle_name, newCognitoCsv.nickname, newCognitoCsv.preferred_username,
            newCognitoCsv.profile, newCognitoCsv.picture, newCognitoCsv.website, newCognitoCsv.email, newCognitoCsv.email_verified,
            newCognitoCsv.gender, newCognitoCsv.birthdate, newCognitoCsv.zoneinfo, newCognitoCsv.locale, newCognitoCsv.phone_number, newCognitoCsv.phone_number_verified,
            newCognitoCsv.address, newCognitoCsv.updated_at, newCognitoCsv['cognito:mfa_enabled'], newCognitoCsv['cognito:username'], newCognitoCsv['custom:organization_id'],
        ];
        if (spyderExportCsvFields.length !== userCsvArray.length) {
            console.log(`spyderExportCsvFields.length: ${spyderExportCsvFields.length}`);
            console.log(`userCsvArray.length: ${userCsvArray.length}`);
            throw Error('spyderExportCsvFields.length !== userCsvArray.length');
        }
        spyderExportCsv = spyderExportCsv.concat('\n', userCsvArray.join(','));
    });
    const spyderPutObjectParams = {
        Bucket: bucketName,
        Key: `backup-spyder-${dateNow}.csv`,
        Body: spyderExportCsv,
    };
    // only backup if we have user to backup
    if ((_c = (_b = spyderUsers.Users) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0 > 0) {
        await s3.putObject(spyderPutObjectParams).promise();
    }
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5ZGVyLXN0YWNrLmJhY2t1cExhbWJkYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvc3B5ZGVyLXN0YWNrLmJhY2t1cExhbWJkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBK0I7QUFFL0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLDhCQUE4QixDQUFDO0FBRXZELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztBQUNqRCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDO0FBRXZELEtBQUssVUFBVSxPQUFPLENBQUMsS0FBcUQ7O0lBQ2pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqRCxnSEFBZ0g7SUFDaEgsSUFBSyxLQUFrRCxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7UUFDaEYsT0FBTztLQUNSO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTNCLHVCQUF1QjtJQUN2QixNQUFNLFdBQVcsR0FBOEQ7UUFDN0UsVUFBVSxFQUFFLGdCQUFnQjtLQUM3QixDQUFDO0lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25FLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTdELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUs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QUFFLENBQUM7S0FDckQ7QUFDSCxDQUFDO0FBekVELDBCQXlFQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcblxuY29uc3QgczMgPSBuZXcgQVdTLlMzO1xuY29uc3QgY29nbml0byA9IG5ldyBBV1MuQ29nbml0b0lkZW50aXR5U2VydmljZVByb3ZpZGVyO1xuXG5jb25zdCBidWNrZXROYW1lID0gcHJvY2Vzcy5lbnYuQlVDS0VUX05BTUUgfHwgJyc7XG5jb25zdCBzcHlkZXJVc2VyUG9vbElkID0gcHJvY2Vzcy5lbnYuU1BZREVSX1VTRVJQT09MX0lEIHx8ICcnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogbGFtYmRhLkNsb3VkRm9ybWF0aW9uQ3VzdG9tUmVzb3VyY2VFdmVudCB8IGFueSkge1xuICBjb25zb2xlLmRlYnVnKGBldmVudDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cbiAgLy8gaWdub3JpbmcgdGhlIENGTiBDcmVhdGUgZXZlbnQgYXMgdGhlIGV4cG9ydCB3b3VsZCBiZSBhbnl3YXkgZW1wdHkuIENGTiBVcGRhdGUgYW5kIERlbGV0ZSB3aWxsIG5vdCBiZSBpZ25vcmVkIVxuICBpZiAoKGV2ZW50IGFzIGxhbWJkYS5DbG91ZEZvcm1hdGlvbkN1c3RvbVJlc291cmNlRXZlbnQpLlJlcXVlc3RUeXBlID09PSAnQ3JlYXRlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGRhdGVOb3cgPSBEYXRlLm5vdygpO1xuXG4gIC8vIGdldCBzcHlkZXIgdXNlciBkYXRhXG4gIGNvbnN0IHNweWRlclBhcmFtOiBBV1MuQ29nbml0b0lkZW50aXR5U2VydmljZVByb3ZpZGVyLlR5cGVzLkxpc3RVc2Vyc1JlcXVlc3QgPSB7XG4gICAgVXNlclBvb2xJZDogc3B5ZGVyVXNlclBvb2xJZCxcbiAgfTtcbiAgY29uc3Qgc3B5ZGVyVXNlcnMgPSBhd2FpdCBjb2duaXRvLmxpc3RVc2VycyhzcHlkZXJQYXJhbSkucHJvbWlzZSgpO1xuICBjb25zb2xlLmRlYnVnKGBzcHlkZXJVc2VyczogJHtKU09OLnN0cmluZ2lmeShzcHlkZXJVc2Vycyl9YCk7XG5cbiAgY29uc3Qgc3B5ZGVyRXhwb3J0Q3N2RmllbGRzID0gWyduYW1lJywgJ2dpdmVuX25hbWUnLCAnZmFtaWx5X25hbWUnLCAnbWlkZGxlX25hbWUnLCAnbmlja25hbWUnLFxuICAgICdwcmVmZXJyZWRfdXNlcm5hbWUnLCAncHJvZmlsZScsICdwaWN0dXJlJywgJ3dlYnNpdGUnLCAnZW1haWwnLCAnZW1haWxfdmVyaWZpZWQnLCAnZ2VuZGVyJyxcbiAgICAnYmlydGhkYXRlJywgJ3pvbmVpbmZvJywgJ2xvY2FsZScsICdwaG9uZV9udW1iZXInLCAncGhvbmVfbnVtYmVyX3ZlcmlmaWVkJywgJ2FkZHJlc3MnLFxuICAgICd1cGRhdGVkX2F0JywgJ2NvZ25pdG86bWZhX2VuYWJsZWQnLCAnY29nbml0bzp1c2VybmFtZScsICdjdXN0b206b3JnYW5pemF0aW9uX2lkJ11cbiAgbGV0IHNweWRlckV4cG9ydENzdiA9IHNweWRlckV4cG9ydENzdkZpZWxkcy5qb2luKCcsJyk7XG4gIHNweWRlclVzZXJzLlVzZXJzPy5tYXAoKHVzZXIpID0+IHtcbiAgICBjb25zb2xlLmRlYnVnKGBzcHlkZXJVc2VyOiAke0pTT04uc3RyaW5naWZ5KHVzZXIpfWApO1xuICAgIGNvbnN0IG5ld0NvZ25pdG9Dc3Y6IENvZ25pdG9Dc3YgPSB7XG4gICAgICBuYW1lOiB1c2VyLlVzZXJuYW1lIHx8ICcnLFxuICAgICAgZ2l2ZW5fbmFtZTogJycsXG4gICAgICBmYW1pbHlfbmFtZTogJycsXG4gICAgICBtaWRkbGVfbmFtZTogJycsXG4gICAgICBuaWNrbmFtZTogJycsXG4gICAgICBwcmVmZXJyZWRfdXNlcm5hbWU6ICcnLFxuICAgICAgcHJvZmlsZTogJycsXG4gICAgICBwaWN0dXJlOiAnJyxcbiAgICAgIHdlYnNpdGU6ICcnLFxuICAgICAgZW1haWw6IHVzZXIuQXR0cmlidXRlcz8uZmlsdGVyKGF0dHIgPT4gYXR0ci5OYW1lID09PSAnZW1haWwnKVswXT8uVmFsdWUgfHwgJycsXG4gICAgICBlbWFpbF92ZXJpZmllZDogdXNlci5BdHRyaWJ1dGVzPy5maWx0ZXIoYXR0ciA9PiBhdHRyLk5hbWUgPT09ICdlbWFpbF92ZXJpZmllZCcpWzBdPy5WYWx1ZSB8fCAnRkFMU0UnLFxuICAgICAgZ2VuZGVyOiAnJyxcbiAgICAgIGJpcnRoZGF0ZTogJycsXG4gICAgICB6b25laW5mbzogJycsXG4gICAgICBsb2NhbGU6ICcnLFxuICAgICAgcGhvbmVfbnVtYmVyOiB1c2VyLkF0dHJpYnV0ZXM/LmZpbHRlcihhdHRyID0+IGF0dHIuTmFtZSA9PT0gJ3Bob25lX251bWJlcicpWzBdPy5WYWx1ZSB8fCAnJyxcbiAgICAgIHBob25lX251bWJlcl92ZXJpZmllZDogdXNlci5BdHRyaWJ1dGVzPy5maWx0ZXIoYXR0ciA9PiBhdHRyLk5hbWUgPT09ICdwaG9uZV9udW1iZXJfdmVyaWZpZWQnKVswXT8uVmFsdWUgfHwgJ0ZBTFNFJyxcbiAgICAgIGFkZHJlc3M6ICcnLFxuICAgICAgdXBkYXRlZF9hdDogJycsXG4gICAgICAnY29nbml0bzptZmFfZW5hYmxlZCc6ICdGQUxTRScsXG4gICAgICAnY29nbml0bzp1c2VybmFtZSc6IHVzZXIuVXNlcm5hbWUgfHwgJycsXG4gICAgICAnY3VzdG9tOm9yZ2FuaXphdGlvbl9pZCc6IHVzZXIuQXR0cmlidXRlcz8uZmlsdGVyKGF0dHIgPT4gYXR0ci5OYW1lID09PSAnY3VzdG9tOm9yZ2FuaXphdGlvbl9pZCcpWzBdPy5WYWx1ZSB8fCAnMCcsXG4gICAgfVxuICAgIGNvbnNvbGUuZGVidWcoYG5ld0NvZ25pdG9Dc3Y6ICR7SlNPTi5zdHJpbmdpZnkobmV3Q29nbml0b0Nzdil9YCk7XG4gICAgY29uc3QgdXNlckNzdkFycmF5ID0gW1xuICAgICAgbmV3Q29nbml0b0Nzdi5uYW1lLCBuZXdDb2duaXRvQ3N2LmdpdmVuX25hbWUsIG5ld0NvZ25pdG9Dc3YuZmFtaWx5X25hbWUsIG5ld0NvZ25pdG9Dc3YubWlkZGxlX25hbWUsIG5ld0NvZ25pdG9Dc3Yubmlja25hbWUsIG5ld0NvZ25pdG9Dc3YucHJlZmVycmVkX3VzZXJuYW1lLFxuICAgICAgbmV3Q29nbml0b0Nzdi5wcm9maWxlLCBuZXdDb2duaXRvQ3N2LnBpY3R1cmUsIG5ld0NvZ25pdG9Dc3Yud2Vic2l0ZSwgbmV3Q29nbml0b0Nzdi5lbWFpbCwgbmV3Q29nbml0b0Nzdi5lbWFpbF92ZXJpZmllZCxcbiAgICAgIG5ld0NvZ25pdG9Dc3YuZ2VuZGVyLCBuZXdDb2duaXRvQ3N2LmJpcnRoZGF0ZSwgbmV3Q29nbml0b0Nzdi56b25laW5mbywgbmV3Q29nbml0b0Nzdi5sb2NhbGUsIG5ld0NvZ25pdG9Dc3YucGhvbmVfbnVtYmVyLCBuZXdDb2duaXRvQ3N2LnBob25lX251bWJlcl92ZXJpZmllZCxcbiAgICAgIG5ld0NvZ25pdG9Dc3YuYWRkcmVzcywgbmV3Q29nbml0b0Nzdi51cGRhdGVkX2F0LCBuZXdDb2duaXRvQ3N2Wydjb2duaXRvOm1mYV9lbmFibGVkJ10sIG5ld0NvZ25pdG9Dc3ZbJ2NvZ25pdG86dXNlcm5hbWUnXSwgbmV3Q29nbml0b0NzdlsnY3VzdG9tOm9yZ2FuaXphdGlvbl9pZCddLFxuICAgIF07XG4gICAgaWYgKHNweWRlckV4cG9ydENzdkZpZWxkcy5sZW5ndGggIT09IHVzZXJDc3ZBcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBzcHlkZXJFeHBvcnRDc3ZGaWVsZHMubGVuZ3RoOiAke3NweWRlckV4cG9ydENzdkZpZWxkcy5sZW5ndGh9YClcbiAgICAgIGNvbnNvbGUubG9nKGB1c2VyQ3N2QXJyYXkubGVuZ3RoOiAke3VzZXJDc3ZBcnJheS5sZW5ndGh9YClcbiAgICAgIHRocm93IEVycm9yKCdzcHlkZXJFeHBvcnRDc3ZGaWVsZHMubGVuZ3RoICE9PSB1c2VyQ3N2QXJyYXkubGVuZ3RoJyk7XG4gICAgfVxuICAgIHNweWRlckV4cG9ydENzdiA9IHNweWRlckV4cG9ydENzdi5jb25jYXQoJ1xcbicsIHVzZXJDc3ZBcnJheS5qb2luKCcsJykpO1xuICB9KTtcblxuICBjb25zdCBzcHlkZXJQdXRPYmplY3RQYXJhbXM6IEFXUy5TMy5UeXBlcy5QdXRPYmplY3RSZXF1ZXN0ID0ge1xuICAgIEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICBLZXk6IGBiYWNrdXAtc3B5ZGVyLSR7ZGF0ZU5vd30uY3N2YCxcbiAgICBCb2R5OiBzcHlkZXJFeHBvcnRDc3YsXG4gIH1cblxuICAvLyBvbmx5IGJhY2t1cCBpZiB3ZSBoYXZlIHVzZXIgdG8gYmFja3VwXG4gIGlmIChzcHlkZXJVc2Vycy5Vc2Vycz8ubGVuZ3RoID8/IDAgPiAwKSB7XG4gICAgYXdhaXQgczMucHV0T2JqZWN0KHNweWRlclB1dE9iamVjdFBhcmFtcykucHJvbWlzZSgpO1xuICB9XG59XG5cbmludGVyZmFjZSBDb2duaXRvQ3N2IHtcbiAgJ25hbWUnOiBzdHJpbmc7ICdnaXZlbl9uYW1lJzogc3RyaW5nOyAnZmFtaWx5X25hbWUnOiBzdHJpbmc7ICdtaWRkbGVfbmFtZSc6IHN0cmluZzsgJ25pY2tuYW1lJzogc3RyaW5nO1xuICAncHJlZmVycmVkX3VzZXJuYW1lJzogc3RyaW5nOyAncHJvZmlsZSc6IHN0cmluZzsgJ3BpY3R1cmUnOiBzdHJpbmc7ICd3ZWJzaXRlJzogc3RyaW5nOyAnZW1haWwnOiBzdHJpbmc7ICdlbWFpbF92ZXJpZmllZCc6IHN0cmluZzsgJ2dlbmRlcic6IHN0cmluZztcbiAgJ2JpcnRoZGF0ZSc6IHN0cmluZzsgJ3pvbmVpbmZvJzogc3RyaW5nOyAnbG9jYWxlJzogc3RyaW5nOyAncGhvbmVfbnVtYmVyJzogc3RyaW5nOyAncGhvbmVfbnVtYmVyX3ZlcmlmaWVkJzogc3RyaW5nOyAnYWRkcmVzcyc6IHN0cmluZztcbiAgJ3VwZGF0ZWRfYXQnOiBzdHJpbmc7ICdjb2duaXRvOm1mYV9lbmFibGVkJzogc3RyaW5nOyAnY29nbml0bzp1c2VybmFtZSc6IHN0cmluZzsgJ2N1c3RvbTpvcmdhbml6YXRpb25faWQnOiBzdHJpbmc7XG59Il19