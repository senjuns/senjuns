import * as ShallowRenderer from 'react-test-renderer/shallow';
import MeasurementTypeBar from './MeasurementTypeBar';
import { MeasurementTypes } from 'shared/interfaces';

describe('<MeasurementCard />', () => {
  it('renders correctly.', async () => {
    const handleOptionChange = jest.fn();
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <MeasurementTypeBar
        onOptionChange={handleOptionChange}
        value={MeasurementTypes.Temperature}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
