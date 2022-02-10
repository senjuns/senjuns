import * as ShallowRenderer from 'react-test-renderer/shallow';
import PhotoMiniMap from './PhotoMiniMap';

describe('<PhotoMiniMap />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <PhotoMiniMap
        cursorPosition={{ x: 0, y: 0 }}
        draggable={false}
        imageSize={{ height: 1000, width: 1000 }}
        miniMapSize={{ height: 100, width: 100 }}
        miniMapImageUrl=""
        presentationSize={{ height: 500, width: 500 }}
        scale={0}
        onChangeMiniMapPosition={jest.fn()}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
