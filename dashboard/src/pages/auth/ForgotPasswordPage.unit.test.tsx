import * as ShallowRenderer from 'react-test-renderer/shallow';
import { AuthProvider } from 'contexts';
import ForgotPasswordPage from './ForgotPasswordPage';

describe('<ForgotPasswordPage />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
