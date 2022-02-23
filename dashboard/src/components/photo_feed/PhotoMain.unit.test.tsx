// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { HistoryInformation } from '../../shared/interfaces';
import PhotoMain from './PhotoMain';

describe('<PhotoMain />', () => {
  it('renders PhotoMain', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <PhotoMain
        checkIsOutOfScale={jest.fn()}
        imageSize={{ width: 1000, height: 1000 }}
        historyInformation={new HistoryInformation(2)}
        miniMapPosition={{ x: 0, y: 0 }}
        onChangePosition={jest.fn()}
        onChangeScale={jest.fn()}
        onChangeScaleDelta={jest.fn()}
        onClick={jest.fn()}
        presentationSize={{ width: 1000, height: 1000 }}
        scale={1}
        scaleDelta={1}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
