import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from 'shared/tests/unitTestHelper';
import DesktopLayout from './DesktopLayout';

describe('<DesktopLayout />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <DesktopLayout />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
