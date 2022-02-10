"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonStack = void 0;
require("source-map-support/register");
const core = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const route53 = require("@aws-cdk/aws-route53");
const secretsmanager = require("@aws-cdk/aws-secretsmanager");
/**
 * Common Stack for deploying AWS Services into.
 */
class CommonStack extends core.Stack {
    /**
       * Creates a new VPC Stack.
       *
       * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
       * @param id The construct ID of this stack.
       * @param props Stack properties including specific VPC properties.
       */
    constructor(scope, id, props) {
        super(scope, id, props);
        this.vpc = new ec2.Vpc(this, 'vpc', { maxAzs: 2 });
        this.domainName = `${props.stage === 'prod' ? '' : props.stage + '.'}neatleaf.com`;
        this.zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: this.domainName });
        new secretsmanager.Secret(this, 'timeScaleDbUrl', {
            secretName: 'DBConnectionString',
            removalPolicy: core.RemovalPolicy.RETAIN,
        });
    }
}
exports.CommonStack = CommonStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9jb21tb24tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXFDO0FBQ3JDLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsZ0RBQWdEO0FBQ2hELDhEQUE4RDtBQU05RDs7R0FFRztBQUNILE1BQWEsV0FBWSxTQUFRLElBQUksQ0FBQyxLQUFLO0lBTXpDOzs7Ozs7U0FNSztJQUNMLFlBQVksS0FBcUIsRUFBRSxFQUFVLEVBQUUsS0FBdUI7UUFDcEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsY0FBYyxDQUFDO1FBQ25GLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV6RixJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ2hELFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtTQUN6QyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUExQkQsa0NBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdAYXdzLWNkay9hd3MtZWMyJztcbmltcG9ydCAqIGFzIHJvdXRlNTMgZnJvbSAnQGF3cy1jZGsvYXdzLXJvdXRlNTMnO1xuaW1wb3J0ICogYXMgc2VjcmV0c21hbmFnZXIgZnJvbSAnQGF3cy1jZGsvYXdzLXNlY3JldHNtYW5hZ2VyJztcblxuZXhwb3J0IGludGVyZmFjZSBDb21tb25TdGFja1Byb3BzIGV4dGVuZHMgY29yZS5TdGFja1Byb3BzIHtcbiAgc3RhZ2U6IHN0cmluZztcbn1cblxuLyoqXG4gKiBDb21tb24gU3RhY2sgZm9yIGRlcGxveWluZyBBV1MgU2VydmljZXMgaW50by5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbW1vblN0YWNrIGV4dGVuZHMgY29yZS5TdGFjayB7XG5cbiAgdnBjOiBlYzIuVnBjO1xuICBkb21haW5OYW1lOiBzdHJpbmc7XG4gIHpvbmU6IHJvdXRlNTMuSUhvc3RlZFpvbmU7XG5cbiAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBWUEMgU3RhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NvcGUgUGFyZW50IG9mIHRoaXMgc3RhY2ssIHVzdWFsbHkgYW4gYEFwcGAgb3IgYSBgU3RhZ2VgLCBidXQgY291bGQgYmUgYW55IGNvbnN0cnVjdC5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGNvbnN0cnVjdCBJRCBvZiB0aGlzIHN0YWNrLlxuICAgICAqIEBwYXJhbSBwcm9wcyBTdGFjayBwcm9wZXJ0aWVzIGluY2x1ZGluZyBzcGVjaWZpYyBWUEMgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNvcmUuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQ29tbW9uU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgdGhpcy52cGMgPSBuZXcgZWMyLlZwYyh0aGlzLCAndnBjJywgeyBtYXhBenM6IDIgfSk7XG5cbiAgICB0aGlzLmRvbWFpbk5hbWUgPSBgJHtwcm9wcy5zdGFnZSA9PT0gJ3Byb2QnID8gJycgOiBwcm9wcy5zdGFnZSArICcuJ31uZWF0bGVhZi5jb21gO1xuICAgIHRoaXMuem9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tTG9va3VwKHRoaXMsICdab25lJywgeyBkb21haW5OYW1lOiB0aGlzLmRvbWFpbk5hbWUgfSk7XG5cbiAgICBuZXcgc2VjcmV0c21hbmFnZXIuU2VjcmV0KHRoaXMsICd0aW1lU2NhbGVEYlVybCcsIHtcbiAgICAgIHNlY3JldE5hbWU6ICdEQkNvbm5lY3Rpb25TdHJpbmcnLFxuICAgICAgcmVtb3ZhbFBvbGljeTogY29yZS5SZW1vdmFsUG9saWN5LlJFVEFJTixcbiAgICB9KVxuICB9XG59Il19