// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import HarvestProgress from './HarvestProgress';

jest.mock('../../shared/utils', () => ({
  getCurrentDateTime: () => new Date('2021-12-01T00:00:00'),
}));

describe('<HarvestProgress />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();

    renderer.render(
      <HarvestProgress
        startTime={new Date('2021-11-01T00:00:00')}
        endTime={new Date('2021-12-27T00:00:00')}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
