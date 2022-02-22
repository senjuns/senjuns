// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { FRAME_TRANSITION_DURATION } from '../../components/heat_map/constants';

import { MeasurementTypes } from '../../shared/interfaces';
import { Providers } from '../../shared/tests/unitTestHelper';
import HeatMapView from './HeatMapView';

describe('<HeatMapView />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <HeatMapView
          frames={[]}
          frameList={[]}
          layoutImageUrl="test-image-url"
          lightInfo={{}}
          measurementOption={MeasurementTypes.Airflow}
          statistic={{ min: 0, mean: 5, max: 10 }}
          transition={{
            duration: FRAME_TRANSITION_DURATION,
            easing: 'circle',
          }}
          plotData={{}}
        />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
