// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';

import { PASSWORD_RULES } from '../../shared/constants';

import { PasswordRules } from './PasswordRules';

describe('<PasswordRules />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <PasswordRules
        confirmPassword="confirm-password"
        password="my-password"
        rules={PASSWORD_RULES}
      >
        Auth Layout
      </PasswordRules>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
