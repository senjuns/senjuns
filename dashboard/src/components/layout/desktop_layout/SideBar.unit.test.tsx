import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from 'shared/tests/unitTestHelper';
import SideBar from './SideBar';

describe('<SideBar />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <SideBar onLogOut={jest.fn} />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
