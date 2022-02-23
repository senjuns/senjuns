// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { MeasurementTypes } from '../../shared/interfaces';
import MeasurementTypeBar from './MeasurementTypeBar';

describe('<MeasurementCard />', () => {
  it('renders correctly.', async () => {
    const handleOptionChange = jest.fn();
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <MeasurementTypeBar
        airflowSensorFlag={true}
        value={MeasurementTypes.Temperature}
        onOptionChange={handleOptionChange}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
