// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { ReactComponent as HumidityIcon } from '../../assets/svg/humidity-icon.svg';
import { MeasurementUnit, NotificationLevel } from '../../shared/constants';
import MeasurementCard from './MeasurementCard';

describe('<MeasurementCard />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <MeasurementCard
        icon={<HumidityIcon />}
        title={'Humidity'}
        value={30}
        unit={MeasurementUnit.Percent}
        notificationLevel={NotificationLevel.Warning}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
