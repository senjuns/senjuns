// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import Tab from './Tab';

describe('<Tab />', () => {
  it('renders correctly.', async () => {
    const handleClick = jest.fn();
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Tab id={'test_tab'} selected={true} label="test" onClick={handleClick} />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
