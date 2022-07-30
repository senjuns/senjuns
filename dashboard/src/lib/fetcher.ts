import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import { API as AmplifyAPI, graphqlOperation } from 'aws-amplify';

let instance: API | undefined = undefined;

export function amplifyFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    console.log('VARIABLES:', variables);

    const api = API.getInstance();
    const response = await api.query(query, variables);
    return response.data;
  };
}

export class API {
  protected isSignedIn: boolean = false;
  protected apiKey: string;

  constructor() {
    this.isSignedIn = false;
    this.apiKey = 'no Key';
  }

  static getInstance(): API {
    if (!instance) instance = new API();
    return instance;
  }

  static updateApiKey(apiKey: string): void {
    if (!instance) instance = new API();
    instance.apiKey = apiKey;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  static updateIsSignedIn(signedIn: boolean): void {
    if (!instance) instance = new API();
    instance.isSignedIn = signedIn;
  }

  public async query(query: string, variables?: any) {
    const operation = {
      authMode: this.isSignedIn
        ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        : GRAPHQL_AUTH_MODE.AWS_IAM,
      ...graphqlOperation(query, variables),
    };

    // console.log(`operation=${JSON.stringify(operation)}`);

    return (await AmplifyAPI.graphql(operation)) as GraphQLResult<any>;
  }

  public async queryWithApiKey(query: string, variables?: any) {
    const operation = {
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
      ...graphqlOperation(query, variables),
    };
    return (await AmplifyAPI.graphql(operation)) as GraphQLResult<any>;
  }
}
