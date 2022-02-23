// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { AuthProvider } from '../../contexts';
import ResetPasswordPage from './ResetPasswordPage';

describe('<ResetPasswordPage />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <AuthProvider>
        <ResetPasswordPage />
      </AuthProvider>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
