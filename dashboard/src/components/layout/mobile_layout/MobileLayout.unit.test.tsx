import * as ShallowRenderer from 'react-test-renderer/shallow';
import MobileLayout from './MobileLayout';

describe('<MobileLayout />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<MobileLayout />);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
