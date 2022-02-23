// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import MeasurementInfo from './MeasurementInfo';

describe('<MeasurementInfo />', () => {
  it('renders correctly when the lastCapturedTime is provided.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <MeasurementInfo lastCapturedTime={new Date(2021, 9, 10, 12, 30, 20)} />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the lastCapturedTime is null.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<MeasurementInfo lastCapturedTime={null} />);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
