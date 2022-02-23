// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { MeasurementTypes } from '../../shared/interfaces';
import { COLOR_SCALE_VALUES } from './constants';
import HeatMapGradient from './HeatMapGradient';

describe('<HeatMapGradient />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <HeatMapGradient
        measurementOption={MeasurementTypes.Airflow}
        scaleValues={COLOR_SCALE_VALUES}
        statistic={{ max: 91, min: 54, mean: 75 }}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
