// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from '../../../shared/tests/unitTestHelper';
import Header from './Header';

describe('<Header />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <Header userName="tester" onLogOut={jest.fn} />
      </Providers>,
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
