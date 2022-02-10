import * as ShallowRenderer from 'react-test-renderer/shallow';
import { SectionCaptureList } from 'shared/interfaces';
import TimeTracker from './TimeTracker';

describe('<TimeTracker />', () => {
  const captures: SectionCaptureList = [
    {
      systemId: 1,
      cellX: 0,
      cellY: 0,
      maxImageUrl: 'max-random-url',
      minImageUrl: 'min-random-url',
      capturedAt: new Date(),
    },
  ];

  it('renders the TimeTracker.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <TimeTracker captures={captures} captureIndex={0} onChange={jest.fn()} />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
