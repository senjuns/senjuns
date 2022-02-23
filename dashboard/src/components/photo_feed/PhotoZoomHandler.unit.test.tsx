// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import PhotoZoomHandler from './PhotoZoomHandler';

describe('<PhotoZoomHandler />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <PhotoZoomHandler
        isZoomOutDisabled={true}
        scale={1}
        presentationSize={{ height: 500, width: 500 }}
        onChangeScaleDelta={jest.fn()}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
