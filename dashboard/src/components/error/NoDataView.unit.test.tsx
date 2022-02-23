// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import NoDataView from './NoDataView';

jest.mock('../../shared/utils', () => ({
  getCurrentDateTime: () => new Date('2022-02-14T00:00:00'),
}));

jest.mock('../../contexts/CropCycleProvider', () => ({
  useCropCycleDetails: () => ({
    startTime: new Date(2022, 2, 12),
    range: { start: new Date(2022, 2, 1), end: new Date(2022, 2, 14) },
    onChange: jest.fn(),
  }),
}));

describe('<NoDataView />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<NoDataView />);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
