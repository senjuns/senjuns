// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { NonAuthLayout } from './NonAuthLayout';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/reset',
  }),
  useParams: () => ({
    username: '../../qa@neatleaf.com',
  }),
}));

describe('<NonAuthLayout />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<NonAuthLayout>Auth Layout</NonAuthLayout>);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
