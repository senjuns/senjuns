// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from '../../../shared/tests/unitTestHelper';
import NavigationBar from './NavigationBar';

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
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <NavigationBar isSideBarOpen={false} onMenuClick={jest.fn()} />
      </Providers>,
    );

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
