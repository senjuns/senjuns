// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { AuthProvider } from '../../contexts';
import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <AuthProvider>
        <NotFoundPage />
      </AuthProvider>,
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
