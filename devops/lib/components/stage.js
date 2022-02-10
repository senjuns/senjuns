"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
require("source-map-support/register");
const common_stack_1 = require("./common-stack");
const dashboard_backend_stack_1 = require("./dashboard-backend-stack");
const spyder_stack_1 = require("./spyder-stack");
class Stage {
    /**
       * A stage which is a collection of stacks.
       *
       */
    constructor(scope, props) {
        const commonStack = new common_stack_1.CommonStack(scope, props.stage + '-CommonStack', { stage: props.stage, env: props.env });
        new dashboard_backend_stack_1.DashboardBackendStack(scope, props.stage + '-DashboardBackendStack', {
            stage: props.stage,
            domainName: commonStack.domainName,
            zone: commonStack.zone,
            vpc: commonStack.vpc,
            env: props.env,
            userPoolId: props.userPoolId,
        });
        new spyder_stack_1.SpyderStack(scope, props.stage + '-SpyderStack', {
            stage: props.stage,
            domainName: commonStack.domainName,
            zone: commonStack.zone,
            vpc: commonStack.vpc,
            env: props.env,
            enableAlarms: props.enableLambdaAlarms,
        });
    }
}
exports.Stage = Stage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL3N0YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFxQztBQUVyQyxpREFBNkM7QUFDN0MsdUVBQWtFO0FBQ2xFLGlEQUE2QztBQVE3QyxNQUFhLEtBQUs7SUFFaEI7OztTQUdLO0lBQ0wsWUFBWSxLQUFxQixFQUFFLEtBQXNCO1FBRXZELE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFakgsSUFBSSwrQ0FBcUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyx3QkFBd0IsRUFBRTtZQUN2RSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsVUFBVSxFQUFFLFdBQVcsQ0FBQyxVQUFVO1lBQ2xDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtZQUN0QixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7WUFDcEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO1NBQzdCLENBQUMsQ0FBQztRQUVILElBQUksMEJBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxjQUFjLEVBQUU7WUFDbkQsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVTtZQUNsQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7WUFDdEIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxHQUFHO1lBQ3BCLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztZQUNkLFlBQVksRUFBRSxLQUFLLENBQUMsa0JBQWtCO1NBQ3ZDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTVCRCxzQkE0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uU3RhY2sgfSBmcm9tICcuL2NvbW1vbi1zdGFjayc7XG5pbXBvcnQgeyBEYXNoYm9hcmRCYWNrZW5kU3RhY2sgfSBmcm9tICcuL2Rhc2hib2FyZC1iYWNrZW5kLXN0YWNrJztcbmltcG9ydCB7IFNweWRlclN0YWNrIH0gZnJvbSAnLi9zcHlkZXItc3RhY2snO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWdlU3RhY2tQcm9wcyBleHRlbmRzIGNvcmUuU3RhY2tQcm9wcyB7XG4gIHN0YWdlOiBzdHJpbmc7XG4gIGVuYWJsZUxhbWJkYUFsYXJtcz86IGJvb2xlYW47XG4gIHVzZXJQb29sSWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTdGFnZSB7XG5cbiAgLyoqXG4gICAgICogQSBzdGFnZSB3aGljaCBpcyBhIGNvbGxlY3Rpb24gb2Ygc3RhY2tzLlxuICAgICAqXG4gICAgICovXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjb3JlLkNvbnN0cnVjdCwgcHJvcHM6IFN0YWdlU3RhY2tQcm9wcykge1xuXG4gICAgY29uc3QgY29tbW9uU3RhY2sgPSBuZXcgQ29tbW9uU3RhY2soc2NvcGUsIHByb3BzLnN0YWdlICsgJy1Db21tb25TdGFjaycsIHsgc3RhZ2U6IHByb3BzLnN0YWdlLCBlbnY6IHByb3BzLmVudiB9KTtcblxuICAgIG5ldyBEYXNoYm9hcmRCYWNrZW5kU3RhY2soc2NvcGUsIHByb3BzLnN0YWdlICsgJy1EYXNoYm9hcmRCYWNrZW5kU3RhY2snLCB7XG4gICAgICBzdGFnZTogcHJvcHMuc3RhZ2UsXG4gICAgICBkb21haW5OYW1lOiBjb21tb25TdGFjay5kb21haW5OYW1lLFxuICAgICAgem9uZTogY29tbW9uU3RhY2suem9uZSxcbiAgICAgIHZwYzogY29tbW9uU3RhY2sudnBjLFxuICAgICAgZW52OiBwcm9wcy5lbnYsXG4gICAgICB1c2VyUG9vbElkOiBwcm9wcy51c2VyUG9vbElkLFxuICAgIH0pO1xuXG4gICAgbmV3IFNweWRlclN0YWNrKHNjb3BlLCBwcm9wcy5zdGFnZSArICctU3B5ZGVyU3RhY2snLCB7XG4gICAgICBzdGFnZTogcHJvcHMuc3RhZ2UsXG4gICAgICBkb21haW5OYW1lOiBjb21tb25TdGFjay5kb21haW5OYW1lLFxuICAgICAgem9uZTogY29tbW9uU3RhY2suem9uZSxcbiAgICAgIHZwYzogY29tbW9uU3RhY2sudnBjLFxuICAgICAgZW52OiBwcm9wcy5lbnYsXG4gICAgICBlbmFibGVBbGFybXM6IHByb3BzLmVuYWJsZUxhbWJkYUFsYXJtcyxcbiAgICB9KTtcbiAgfVxufSJdfQ==