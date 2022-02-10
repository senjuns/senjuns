import * as ShallowRenderer from 'react-test-renderer/shallow';
import NavigationBar from './NavigationBar';
import { Providers } from 'shared/tests/unitTestHelper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/room-details/1/photo-feed',
  }),
  useParams: () => ({
    id: '1',
  }),
}));

describe('<NavigationBar />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <NavigationBar isSideBarOpen={false} onMenuClick={jest.fn()} />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
