// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { PasswordChangedDialog } from './PasswordChangedDialog';

describe('<PasswordChangedDialog />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<PasswordChangedDialog open={true} onClose={jest.fn()} />);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
