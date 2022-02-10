"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const dashboard_app_stack_1 = require("../components/dashboard-app-stack");
const app = new cdk.App();
for (const stage of ['dev', 'devstable', 'sqa', 'staging', 'prod']) {
    const env = require(`./../${stage}/package.json`).env;
    new dashboard_app_stack_1.DashboardAppStack(app, `${stage}-DashboardAppStack`, {
        stage,
        env,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXNpdGUtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Rhc2hib2FyZC1zaXRlLWFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQywyRUFBc0U7QUFFdEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRTtJQUNsRSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN0RCxJQUFJLHVDQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssb0JBQW9CLEVBQUU7UUFDdkQsS0FBSztRQUNMLEdBQUc7S0FDSixDQUFDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IERhc2hib2FyZEFwcFN0YWNrIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kYXNoYm9hcmQtYXBwLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcblxuZm9yIChjb25zdCBzdGFnZSBvZiBbJ2RldicsICdkZXZzdGFibGUnLCAnc3FhJywgJ3N0YWdpbmcnLCAncHJvZCddKSB7XG4gIGNvbnN0IGVudiA9IHJlcXVpcmUoYC4vLi4vJHtzdGFnZX0vcGFja2FnZS5qc29uYCkuZW52O1xuICBuZXcgRGFzaGJvYXJkQXBwU3RhY2soYXBwLCBgJHtzdGFnZX0tRGFzaGJvYXJkQXBwU3RhY2tgLCB7XG4gICAgc3RhZ2UsXG4gICAgZW52LFxuICB9KTtcbn0iXX0=