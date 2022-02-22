// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from '../../shared/tests/unitTestHelper';
import TimeHistoryButton from './TimeHistoryButton';

describe('<TimeHistoryButton />', () => {
  const capturedAt = new Date(2021, 9, 20, 5, 4);

  it('renders the default TimeHistoryButton.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <TimeHistoryButton
          capturedAt={capturedAt}
          isTrackerOpen={false}
          onClick={jest.fn()}
        />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders the TimeHistoryButton with tracker open.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <TimeHistoryButton
          capturedAt={capturedAt}
          isTrackerOpen={true}
          onClick={jest.fn()}
        />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
