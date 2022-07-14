import { teamCardsMock } from './mock';

export interface TeamCardType {
  teamName: string;
  teamDescription: string;
  tags: string[];
  members: { image: string; firstName: string; role: string }[];
}

interface IGetTeamCardDataProps {}

export const useListTeamCardData =
  // eslint-disable-next-line no-empty-pattern
  ({}: IGetTeamCardDataProps): TeamCardType[] => {
    return teamCardsMock;
  };
