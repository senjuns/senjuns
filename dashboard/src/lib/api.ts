import {
  useMutation,
  //@ts-ignore
  UseMutationOptions,
  useQuery,
  //@ts-ignore
  UseQueryOptions,
} from 'react-query';
import { amplifyFetcher } from '../lib/fetcher';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: any;
  AWSDateTime: any;
  AWSEmail: any;
  AWSIPAddress: any;
  AWSJSON: any;
  AWSPhone: any;
  AWSTime: any;
  AWSTimestamp: any;
  AWSURL: any;
  BigInt: any;
  Double: any;
};

export type CreateTeamCardInput = {
  id?: InputMaybe<Scalars['ID']>;
  members?: InputMaybe<Array<InputMaybe<MemberInput>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamDescription: Scalars['String'];
  teamName: Scalars['String'];
};

export type DeleteTeamCardInput = {
  id: Scalars['ID'];
};

export type Member = {
  __typename?: 'Member';
  firstName: Scalars['String'];
  image: Scalars['String'];
  role: Scalars['String'];
};

export type MemberInput = {
  firstName: Scalars['String'];
  image: Scalars['String'];
  role: Scalars['String'];
};

export type ModelBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
};

export type ModelFloatFilterInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
};

export type ModelIdFilterInput = {
  beginsWith?: InputMaybe<Scalars['ID']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  ge?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  le?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  notContains?: InputMaybe<Scalars['ID']>;
};

export type ModelIntFilterInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
};

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ModelStringFilterInput = {
  beginsWith?: InputMaybe<Scalars['String']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  notContains?: InputMaybe<Scalars['String']>;
};

export type ModelTeamCardConnection = {
  __typename?: 'ModelTeamCardConnection';
  items?: Maybe<Array<Maybe<TeamCard>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type ModelTeamCardFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelTeamCardFilterInput>>>;
  id?: InputMaybe<ModelIdFilterInput>;
  not?: InputMaybe<ModelTeamCardFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelTeamCardFilterInput>>>;
  tags?: InputMaybe<ModelStringFilterInput>;
  teamDescription?: InputMaybe<ModelStringFilterInput>;
  teamName?: InputMaybe<ModelStringFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTeamCard?: Maybe<TeamCard>;
  deleteTeamCard?: Maybe<TeamCard>;
  updateTeamCard?: Maybe<TeamCard>;
};

export type MutationCreateTeamCardArgs = {
  input: CreateTeamCardInput;
};

export type MutationDeleteTeamCardArgs = {
  input: DeleteTeamCardInput;
};

export type MutationUpdateTeamCardArgs = {
  input: UpdateTeamCardInput;
};

export type Query = {
  __typename?: 'Query';
  getTeamCard?: Maybe<TeamCard>;
  listTeamCards?: Maybe<ModelTeamCardConnection>;
};

export type QueryGetTeamCardArgs = {
  id: Scalars['ID'];
};

export type QueryListTeamCardsArgs = {
  filter?: InputMaybe<ModelTeamCardFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateTeamCard?: Maybe<TeamCard>;
  onDeleteTeamCard?: Maybe<TeamCard>;
  onUpdateTeamCard?: Maybe<TeamCard>;
};

export type TeamCard = {
  __typename?: 'TeamCard';
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['ID'];
  members?: Maybe<Array<Maybe<Member>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  teamDescription: Scalars['String'];
  teamName: Scalars['String'];
  updatedAt: Scalars['AWSDateTime'];
};

export type UpdateTeamCardInput = {
  id: Scalars['ID'];
  members?: InputMaybe<Array<InputMaybe<MemberInput>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamDescription?: InputMaybe<Scalars['String']>;
  teamName?: InputMaybe<Scalars['String']>;
};

export type CreateTeamCardMutationVariables = Exact<{
  input: CreateTeamCardInput;
}>;

export type CreateTeamCardMutation = {
  __typename?: 'Mutation';
  createTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UpdateTeamCardMutationVariables = Exact<{
  input: UpdateTeamCardInput;
}>;

export type UpdateTeamCardMutation = {
  __typename?: 'Mutation';
  updateTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type DeleteTeamCardMutationVariables = Exact<{
  input: DeleteTeamCardInput;
}>;

export type DeleteTeamCardMutation = {
  __typename?: 'Mutation';
  deleteTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetTeamCardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetTeamCardQuery = {
  __typename?: 'Query';
  getTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ListTeamCardsQueryVariables = Exact<{
  filter?: InputMaybe<ModelTeamCardFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
}>;

export type ListTeamCardsQuery = {
  __typename?: 'Query';
  listTeamCards?:
    | {
        __typename?: 'ModelTeamCardConnection';
        nextToken?: string | null | undefined;
        items?:
          | Array<
              | {
                  __typename?: 'TeamCard';
                  id: string;
                  teamName: string;
                  teamDescription: string;
                  tags?: Array<string | null | undefined> | null | undefined;
                  createdAt: any;
                  updatedAt: any;
                  members?:
                    | Array<
                        | {
                            __typename?: 'Member';
                            image: string;
                            firstName: string;
                            role: string;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type OnCreateTeamCardSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnCreateTeamCardSubscription = {
  __typename?: 'Subscription';
  onCreateTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type OnUpdateTeamCardSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnUpdateTeamCardSubscription = {
  __typename?: 'Subscription';
  onUpdateTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type OnDeleteTeamCardSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnDeleteTeamCardSubscription = {
  __typename?: 'Subscription';
  onDeleteTeamCard?:
    | {
        __typename?: 'TeamCard';
        id: string;
        teamName: string;
        teamDescription: string;
        tags?: Array<string | null | undefined> | null | undefined;
        createdAt: any;
        updatedAt: any;
        members?:
          | Array<
              | {
                  __typename?: 'Member';
                  image: string;
                  firstName: string;
                  role: string;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const CreateTeamCardDocument = `
    mutation CreateTeamCard($input: CreateTeamCardInput!) {
  createTeamCard(input: $input) {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
export const useCreateTeamCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateTeamCardMutation,
    TError,
    CreateTeamCardMutationVariables,
    TContext
  >,
) =>
  useMutation<
    CreateTeamCardMutation,
    TError,
    CreateTeamCardMutationVariables,
    TContext
  >(
    ['CreateTeamCard'],
    (variables?: CreateTeamCardMutationVariables) =>
      amplifyFetcher<CreateTeamCardMutation, CreateTeamCardMutationVariables>(
        CreateTeamCardDocument,
        variables,
      )(),
    //@ts-ignore
    options,
  );
export const UpdateTeamCardDocument = `
    mutation UpdateTeamCard($input: UpdateTeamCardInput!) {
  updateTeamCard(input: $input) {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
export const useUpdateTeamCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateTeamCardMutation,
    TError,
    UpdateTeamCardMutationVariables,
    TContext
  >,
) =>
  useMutation<
    UpdateTeamCardMutation,
    TError,
    UpdateTeamCardMutationVariables,
    TContext
  >(
    ['UpdateTeamCard'],
    (variables?: UpdateTeamCardMutationVariables) =>
      amplifyFetcher<UpdateTeamCardMutation, UpdateTeamCardMutationVariables>(
        UpdateTeamCardDocument,
        variables,
      )(), //@ts-ignore
    options,
  );
export const DeleteTeamCardDocument = `
    mutation DeleteTeamCard($input: DeleteTeamCardInput!) {
  deleteTeamCard(input: $input) {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
export const useDeleteTeamCardMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteTeamCardMutation,
    TError,
    DeleteTeamCardMutationVariables,
    TContext
  >,
) =>
  useMutation<
    DeleteTeamCardMutation,
    TError,
    DeleteTeamCardMutationVariables,
    TContext
  >(
    ['DeleteTeamCard'],
    (variables?: DeleteTeamCardMutationVariables) =>
      amplifyFetcher<DeleteTeamCardMutation, DeleteTeamCardMutationVariables>(
        DeleteTeamCardDocument,
        variables,
      )(), //@ts-ignore
    options,
  );
export const GetTeamCardDocument = `
    query GetTeamCard($id: ID!) {
  getTeamCard(id: $id) {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
export const useGetTeamCardQuery = <TData = GetTeamCardQuery, TError = unknown>(
  variables: GetTeamCardQueryVariables,
  options?: UseQueryOptions<GetTeamCardQuery, TError, TData>,
) =>
  //@ts-ignore
  useQuery<GetTeamCardQuery, TError, TData>(
    ['GetTeamCard', variables],
    amplifyFetcher<GetTeamCardQuery, GetTeamCardQueryVariables>(
      GetTeamCardDocument,
      variables,
    ),
    options,
  );
export const ListTeamCardsDocument = `
    query ListTeamCards($filter: ModelTeamCardFilterInput, $limit: Int, $nextToken: String) {
  listTeamCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teamName
      teamDescription
      tags
      members {
        image
        firstName
        role
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
    `;
export const useListTeamCardsQuery = <
  TData = ListTeamCardsQuery,
  TError = unknown,
>(
  variables?: ListTeamCardsQueryVariables,
  options?: UseQueryOptions<ListTeamCardsQuery, TError, TData>,
) =>
  //@ts-ignore
  useQuery<ListTeamCardsQuery, TError, TData>(
    variables === undefined ? ['ListTeamCards'] : ['ListTeamCards', variables],
    amplifyFetcher<ListTeamCardsQuery, ListTeamCardsQueryVariables>(
      ListTeamCardsDocument,
      variables,
    ),
    options,
  );
export const OnCreateTeamCardDocument = `
    subscription OnCreateTeamCard {
  onCreateTeamCard {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
export const OnUpdateTeamCardDocument = `
    subscription OnUpdateTeamCard {
  onUpdateTeamCard {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
export const OnDeleteTeamCardDocument = `
    subscription OnDeleteTeamCard {
  onDeleteTeamCard {
    id
    teamName
    teamDescription
    tags
    members {
      image
      firstName
      role
    }
    createdAt
    updatedAt
  }
}
    `;
