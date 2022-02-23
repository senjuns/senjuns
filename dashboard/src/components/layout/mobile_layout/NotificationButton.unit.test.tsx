// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import NotificationButton from './NotificationButton';

describe('<NotificationButton />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<NotificationButton />);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
