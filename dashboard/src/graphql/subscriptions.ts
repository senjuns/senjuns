/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeamCard = /* GraphQL */ `
  subscription OnCreateTeamCard($owner: String) {
    onCreateTeamCard(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateTeamCard = /* GraphQL */ `
  subscription OnUpdateTeamCard($owner: String) {
    onUpdateTeamCard(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteTeamCard = /* GraphQL */ `
  subscription OnDeleteTeamCard($owner: String) {
    onDeleteTeamCard(owner: $owner) {
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
      owner
    }
  }
`;
