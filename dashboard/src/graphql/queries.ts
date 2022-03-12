/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeamCard = /* GraphQL */ `
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
export const listTeamCards = /* GraphQL */ `
  query ListTeamCards(
    $filter: ModelTeamCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
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
