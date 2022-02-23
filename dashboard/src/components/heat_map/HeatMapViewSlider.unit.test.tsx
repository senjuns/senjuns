// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';

import { Providers } from '../../shared/tests/unitTestHelper';

import HeatMapViewSlider from './HeatMapViewSlider';
import { STATISTICS } from './mocks';

describe('<HeatMapViewSlider />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <HeatMapViewSlider
          isPlaying={true}
          frameList={[
            {
              systemId: 2,
              startTime: '2021-10-17T14:40:51',
              statistics: STATISTICS,
            },
          ]}
          lightInfo={{}}
          onTogglePlay={jest.fn()}
          onChangePosition={jest.fn()}
          position={0}
        />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
