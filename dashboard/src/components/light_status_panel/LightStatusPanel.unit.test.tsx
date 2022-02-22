// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import LightStatusPanel from './LightStatusPanel';

describe('<LightStatusPanel />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <LightStatusPanel
        lightHours={12}
        currentTimeInHours={16}
      ></LightStatusPanel>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
