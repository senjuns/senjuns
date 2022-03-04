// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { AuthProvider } from '../../contexts';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>,
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
