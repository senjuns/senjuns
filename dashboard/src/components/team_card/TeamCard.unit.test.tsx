// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
// import * as ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { ListTeamCardsQuery } from '../../lib/api';
import TeamCard from './TeamCard';
import { teamCardsMock } from './mock';

const queryClient = new QueryClient();

const listTeamCards: ListTeamCardsQuery = {
  listTeamCards: {
    items: teamCardsMock.map((teamCard, index) => {
      return {
        id: index.toString(),
        teamName: teamCard.teamName,
        tags: teamCard.tags,
        teamDescription: teamCard.teamDescription,
        members: teamCard.members,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
  },
};

const mockListTeamCardQuery = { data: listTeamCards, isLoading: false };

jest.mock('../../lib/api', () => ({
  useListTeamCardsQuery: () => {
    return mockListTeamCardQuery;
  },
}));

describe('<TeamCard />', () => {
  // it('renders correctly.', async () => {
  //   const utils = ShallowRenderer.createRenderer();
  //   utils.render(
  //     <QueryClientProvider client={queryClient}>
  //       <TeamCard />
  //     </QueryClientProvider>,
  //   );

  //   const view = utils.getRenderOutput();
  //   expect(view).toMatchSnapshot();
  // });

  it('deep renders correctly.', async () => {
    const tree = renderer
      .create(
        <QueryClientProvider client={queryClient}>
          <TeamCard />
        </QueryClientProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
