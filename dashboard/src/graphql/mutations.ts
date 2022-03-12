/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeamCard = /* GraphQL */ `
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
export const updateTeamCard = /* GraphQL */ `
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
export const deleteTeamCard = /* GraphQL */ `
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
