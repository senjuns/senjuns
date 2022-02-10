"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const account_id = process.env.account_id || '';
const login_client_id = process.env.login_client_id || '';
const cognito_user_pool = process.env.cognito_user_pool || '';
const cognito_pool_address = process.env.cognito_pool_address || '';
const identity_pool_id = process.env.identity_pool_id || '';
const proto_bucket = process.env.proto_bucket || '';
const software_bucket = process.env.software_bucket || '';
const logging_table = process.env.logging_table || '';
async function handler(event) {
    console.debug(`event: ${JSON.stringify(event)}`);
    return {
        body: JSON.stringify({
            account_id,
            login_client_id,
            cognito_user_pool,
            cognito_pool_address,
            identity_pool_id,
            proto_bucket,
            software_bucket,
            logging_table,
        }),
        statusCode: 200,
    };
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5ZGVyLXN0YWNrLmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL3NweWRlci1zdGFjay5pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUNoRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7QUFDMUQsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztBQUM5RCxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO0FBQ3BFLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7QUFDNUQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO0FBQ3BELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztBQUMxRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7QUFFL0MsS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUFVO0lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqRCxPQUFPO1FBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbkIsVUFBVTtZQUNWLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osZUFBZTtZQUNmLGFBQWE7U0FDZCxDQUFDO1FBQ0YsVUFBVSxFQUFFLEdBQUc7S0FDaEIsQ0FBQztBQUNKLENBQUM7QUFoQkQsMEJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYWNjb3VudF9pZCA9IHByb2Nlc3MuZW52LmFjY291bnRfaWQgfHwgJyc7XG5jb25zdCBsb2dpbl9jbGllbnRfaWQgPSBwcm9jZXNzLmVudi5sb2dpbl9jbGllbnRfaWQgfHwgJyc7XG5jb25zdCBjb2duaXRvX3VzZXJfcG9vbCA9IHByb2Nlc3MuZW52LmNvZ25pdG9fdXNlcl9wb29sIHx8ICcnO1xuY29uc3QgY29nbml0b19wb29sX2FkZHJlc3MgPSBwcm9jZXNzLmVudi5jb2duaXRvX3Bvb2xfYWRkcmVzcyB8fCAnJztcbmNvbnN0IGlkZW50aXR5X3Bvb2xfaWQgPSBwcm9jZXNzLmVudi5pZGVudGl0eV9wb29sX2lkIHx8ICcnO1xuY29uc3QgcHJvdG9fYnVja2V0ID0gcHJvY2Vzcy5lbnYucHJvdG9fYnVja2V0IHx8ICcnO1xuY29uc3Qgc29mdHdhcmVfYnVja2V0ID0gcHJvY2Vzcy5lbnYuc29mdHdhcmVfYnVja2V0IHx8ICcnO1xuY29uc3QgbG9nZ2luZ190YWJsZSA9IHByb2Nlc3MuZW52LmxvZ2dpbmdfdGFibGUgfHwgJyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBhbnkpIHtcbiAgY29uc29sZS5kZWJ1ZyhgZXZlbnQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXG4gIHJldHVybiB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgYWNjb3VudF9pZCxcbiAgICAgIGxvZ2luX2NsaWVudF9pZCxcbiAgICAgIGNvZ25pdG9fdXNlcl9wb29sLFxuICAgICAgY29nbml0b19wb29sX2FkZHJlc3MsXG4gICAgICBpZGVudGl0eV9wb29sX2lkLFxuICAgICAgcHJvdG9fYnVja2V0LFxuICAgICAgc29mdHdhcmVfYnVja2V0LFxuICAgICAgbG9nZ2luZ190YWJsZSxcbiAgICB9KSxcbiAgICBzdGF0dXNDb2RlOiAyMDAsXG4gIH07XG59Il19