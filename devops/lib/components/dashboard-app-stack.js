"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardAppStack = void 0;
const core = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const route53 = require("@aws-cdk/aws-route53");
const targets = require("@aws-cdk/aws-route53-targets");
const certificatemanager = require("@aws-cdk/aws-certificatemanager");
const s3deploy = require("@aws-cdk/aws-s3-deployment");
const cloudfront = require("@aws-cdk/aws-cloudfront");
/**
 * Dashboard CDK Stack for for hosting the ReactTS App in AWS S3
 */
class DashboardAppStack extends core.Stack {
    /**
     * Creates a new Dashboard Stack.
     *
     * @param scope Parent of this stack, usually an `App` or a `Stage`, but could be any construct.
     * @param id The construct ID of this stack.
     * @param props Stack properties including specific Dashboard properties.
     */
    constructor(scope, id, props) {
        super(scope, id, props);
        const siteBucket = new s3.Bucket(this, 'SiteBucket', {
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: true,
            cors: [
                {
                    allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*'],
                    exposedHeaders: ['ETag', 'x-amz-meta-custom-header', 'Authorization', 'Content-Type', 'Accept'],
                },
            ],
            removalPolicy: core.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        new core.CfnOutput(this, 'DashboardBucketWebsiteUrl', {
            value: siteBucket.bucketWebsiteUrl,
        });
        const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
        siteBucket.grantRead(cloudFrontOAI.grantPrincipal);
        const domainName = `${props.stage === 'prod' ? '' : props.stage + '.'}neatleaf.com`;
        const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName });
        const certificate = new certificatemanager.DnsValidatedCertificate(this, 'certificate', {
            domainName: `dashboard.${domainName}`,
            hostedZone: zone,
            region: 'us-east-1',
        });
        const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
            enableIpV6: false,
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket,
                        originAccessIdentity: cloudFrontOAI,
                    },
                    behaviors: [{ isDefaultBehavior: true }]
                }
            ],
            errorConfigurations: [
                {
                    errorCode: 404,
                    responseCode: 404,
                    responsePagePath: '/index.html'
                }
            ],
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                aliases: ['dashboard.' + domainName],
            }),
        });
        const dashboardRecord = new route53.ARecord(this, 'dashboardRecord', {
            recordName: 'dashboard',
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
            zone,
        });
        new core.CfnOutput(this, 'WebsiteUrl', {
            value: dashboardRecord.domainName,
        });
        new core.CfnOutput(this, 'DashboardCloudfrontDomainName', {
            value: distribution.distributionDomainName,
        });
        // Deploy site contents to S3 bucket
        new s3deploy.BucketDeployment(this, 'BucketDeployment', {
            sources: [s3deploy.Source.asset('../dashboard/build')],
            distribution,
            destinationBucket: siteBucket,
            memoryLimit: 10240,
        });
    }
}
exports.DashboardAppStack = DashboardAppStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLWFwcC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvZGFzaGJvYXJkLWFwcC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBc0M7QUFDdEMsc0NBQXNDO0FBQ3RDLGdEQUFnRDtBQUNoRCx3REFBd0Q7QUFDeEQsc0VBQXNFO0FBQ3RFLHVEQUF1RDtBQUN2RCxzREFBc0Q7QUFNdEQ7O0dBRUc7QUFDSCxNQUFhLGlCQUFrQixTQUFRLElBQUksQ0FBQyxLQUFLO0lBQy9DOzs7Ozs7T0FNRztJQUNILFlBQVksS0FBcUIsRUFBRSxFQUFVLEVBQUUsS0FBNkI7UUFDMUUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDbkQsb0JBQW9CLEVBQUUsWUFBWTtZQUNsQyxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsSUFBSSxFQUFFO2dCQUNKO29CQUNFLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUN6RCxjQUFjLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBQ3JCLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDckIsY0FBYyxFQUFFLENBQUMsTUFBTSxFQUFFLDBCQUEwQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDO2lCQUNoRzthQUNGO1lBQ0QsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN6QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLEVBQUU7WUFDcEQsS0FBSyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0I7U0FDbkMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sVUFBVSxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLGNBQWMsQ0FBQztRQUNwRixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV6RSxNQUFNLFdBQVcsR0FBRyxJQUFJLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDdEYsVUFBVSxFQUFFLGFBQWEsVUFBVSxFQUFFO1lBQ3JDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDbEYsVUFBVSxFQUFFLEtBQUs7WUFDakIsYUFBYSxFQUFFO2dCQUNiO29CQUNFLGNBQWMsRUFBRTt3QkFDZCxjQUFjLEVBQUUsVUFBVTt3QkFDMUIsb0JBQW9CLEVBQUUsYUFBYTtxQkFDcEM7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekM7YUFDRjtZQUNELG1CQUFtQixFQUFFO2dCQUNuQjtvQkFDRSxTQUFTLEVBQUUsR0FBRztvQkFDZCxZQUFZLEVBQUUsR0FBRztvQkFDakIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDaEM7YUFDRjtZQUNELGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7Z0JBQzlFLE9BQU8sRUFBRSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7YUFDckMsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDbkUsVUFBVSxFQUFFLFdBQVc7WUFDdkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xGLElBQUk7U0FDTCxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNyQyxLQUFLLEVBQUUsZUFBZSxDQUFDLFVBQVU7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRTtZQUN4RCxLQUFLLEVBQUUsWUFBWSxDQUFDLHNCQUFzQjtTQUMzQyxDQUFDLENBQUM7UUFFSCxvQ0FBb0M7UUFDcEMsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ3RELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDdEQsWUFBWTtZQUNaLGlCQUFpQixFQUFFLFVBQVU7WUFDN0IsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBeEZELDhDQXdGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0ICogYXMgcm91dGU1MyBmcm9tICdAYXdzLWNkay9hd3Mtcm91dGU1Myc7XG5pbXBvcnQgKiBhcyB0YXJnZXRzIGZyb20gJ0Bhd3MtY2RrL2F3cy1yb3V0ZTUzLXRhcmdldHMnO1xuaW1wb3J0ICogYXMgY2VydGlmaWNhdGVtYW5hZ2VyIGZyb20gJ0Bhd3MtY2RrL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInO1xuaW1wb3J0ICogYXMgczNkZXBsb3kgZnJvbSAnQGF3cy1jZGsvYXdzLXMzLWRlcGxveW1lbnQnO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tICdAYXdzLWNkay9hd3MtY2xvdWRmcm9udCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkQXBwU3RhY2tQcm9wcyBleHRlbmRzIGNvcmUuU3RhY2tQcm9wcyB7XG4gIHN0YWdlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGFzaGJvYXJkIENESyBTdGFjayBmb3IgZm9yIGhvc3RpbmcgdGhlIFJlYWN0VFMgQXBwIGluIEFXUyBTM1xuICovXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQXBwU3RhY2sgZXh0ZW5kcyBjb3JlLlN0YWNrIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgRGFzaGJvYXJkIFN0YWNrLlxuICAgKlxuICAgKiBAcGFyYW0gc2NvcGUgUGFyZW50IG9mIHRoaXMgc3RhY2ssIHVzdWFsbHkgYW4gYEFwcGAgb3IgYSBgU3RhZ2VgLCBidXQgY291bGQgYmUgYW55IGNvbnN0cnVjdC5cbiAgICogQHBhcmFtIGlkIFRoZSBjb25zdHJ1Y3QgSUQgb2YgdGhpcyBzdGFjay5cbiAgICogQHBhcmFtIHByb3BzIFN0YWNrIHByb3BlcnRpZXMgaW5jbHVkaW5nIHNwZWNpZmljIERhc2hib2FyZCBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNvcmUuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGFzaGJvYXJkQXBwU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3Qgc2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1NpdGVCdWNrZXQnLCB7XG4gICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogJ2luZGV4Lmh0bWwnLFxuICAgICAgd2Vic2l0ZUVycm9yRG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICBjb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhbGxvd2VkTWV0aG9kczogW3MzLkh0dHBNZXRob2RzLkdFVCwgczMuSHR0cE1ldGhvZHMuSEVBRF0sXG4gICAgICAgICAgYWxsb3dlZE9yaWdpbnM6IFsnKiddLFxuICAgICAgICAgIGFsbG93ZWRIZWFkZXJzOiBbJyonXSxcbiAgICAgICAgICBleHBvc2VkSGVhZGVyczogWydFVGFnJywgJ3gtYW16LW1ldGEtY3VzdG9tLWhlYWRlcicsICdBdXRob3JpemF0aW9uJywgJ0NvbnRlbnQtVHlwZScsICdBY2NlcHQnXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICByZW1vdmFsUG9saWN5OiBjb3JlLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgbmV3IGNvcmUuQ2ZuT3V0cHV0KHRoaXMsICdEYXNoYm9hcmRCdWNrZXRXZWJzaXRlVXJsJywge1xuICAgICAgdmFsdWU6IHNpdGVCdWNrZXQuYnVja2V0V2Vic2l0ZVVybCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsb3VkRnJvbnRPQUkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eSh0aGlzLCAnT0FJJyk7XG4gICAgc2l0ZUJ1Y2tldC5ncmFudFJlYWQoY2xvdWRGcm9udE9BSS5ncmFudFByaW5jaXBhbCk7XG5cbiAgICBjb25zdCBkb21haW5OYW1lID0gYCR7cHJvcHMuc3RhZ2UgPT09ICdwcm9kJyA/ICcnIDogcHJvcHMuc3RhZ2UgKyAnLid9bmVhdGxlYWYuY29tYDtcbiAgICBjb25zdCB6b25lID0gcm91dGU1My5Ib3N0ZWRab25lLmZyb21Mb29rdXAodGhpcywgJ1pvbmUnLCB7IGRvbWFpbk5hbWUgfSk7XG5cbiAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IG5ldyBjZXJ0aWZpY2F0ZW1hbmFnZXIuRG5zVmFsaWRhdGVkQ2VydGlmaWNhdGUodGhpcywgJ2NlcnRpZmljYXRlJywge1xuICAgICAgZG9tYWluTmFtZTogYGRhc2hib2FyZC4ke2RvbWFpbk5hbWV9YCxcbiAgICAgIGhvc3RlZFpvbmU6IHpvbmUsXG4gICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbih0aGlzLCAnRGlzdHJpYnV0aW9uJywge1xuICAgICAgZW5hYmxlSXBWNjogZmFsc2UsXG4gICAgICBvcmlnaW5Db25maWdzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzM09yaWdpblNvdXJjZToge1xuICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHNpdGVCdWNrZXQsXG4gICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRGcm9udE9BSSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJlaGF2aW9yczogW3sgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWUgfV1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGVycm9yQ29uZmlndXJhdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGVycm9yQ29kZTogNDA0LFxuICAgICAgICAgIHJlc3BvbnNlQ29kZTogNDA0LFxuICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvaW5kZXguaHRtbCdcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHZpZXdlckNlcnRpZmljYXRlOiBjbG91ZGZyb250LlZpZXdlckNlcnRpZmljYXRlLmZyb21BY21DZXJ0aWZpY2F0ZShjZXJ0aWZpY2F0ZSwge1xuICAgICAgICBhbGlhc2VzOiBbJ2Rhc2hib2FyZC4nICsgZG9tYWluTmFtZV0sXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhc2hib2FyZFJlY29yZCA9IG5ldyByb3V0ZTUzLkFSZWNvcmQodGhpcywgJ2Rhc2hib2FyZFJlY29yZCcsIHtcbiAgICAgIHJlY29yZE5hbWU6ICdkYXNoYm9hcmQnLFxuICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMobmV3IHRhcmdldHMuQ2xvdWRGcm9udFRhcmdldChkaXN0cmlidXRpb24pKSxcbiAgICAgIHpvbmUsXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ1dlYnNpdGVVcmwnLCB7XG4gICAgICB2YWx1ZTogZGFzaGJvYXJkUmVjb3JkLmRvbWFpbk5hbWUsXG4gICAgfSk7XG5cbiAgICBuZXcgY29yZS5DZm5PdXRwdXQodGhpcywgJ0Rhc2hib2FyZENsb3VkZnJvbnREb21haW5OYW1lJywge1xuICAgICAgdmFsdWU6IGRpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25Eb21haW5OYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gRGVwbG95IHNpdGUgY29udGVudHMgdG8gUzMgYnVja2V0XG4gICAgbmV3IHMzZGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgJ0J1Y2tldERlcGxveW1lbnQnLCB7XG4gICAgICBzb3VyY2VzOiBbczNkZXBsb3kuU291cmNlLmFzc2V0KCcuLi9kYXNoYm9hcmQvYnVpbGQnKV0sXG4gICAgICBkaXN0cmlidXRpb24sXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogc2l0ZUJ1Y2tldCxcbiAgICAgIG1lbW9yeUxpbWl0OiAxMDI0MCxcbiAgICB9KTtcbiAgfVxufVxuIl19