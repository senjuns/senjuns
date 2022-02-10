import { MeasurementTypes } from 'shared/interfaces';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import HeatMapGradient from './HeatMapGradient';

describe('<HeatMapGradient />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <HeatMapGradient
        measurementOption={MeasurementTypes.Airflow}
        statistic={{ max: 91, min: 54, mean: 75 }}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
