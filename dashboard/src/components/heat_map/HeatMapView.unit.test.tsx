import * as ShallowRenderer from 'react-test-renderer/shallow';
import { FRAME_TRANSITION_DURATION } from 'components/heat_map/constants';

import HeatMapView from './HeatMapView';
import { Providers } from 'shared/tests/unitTestHelper';
import { MeasurementTypes } from 'shared/interfaces';

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
