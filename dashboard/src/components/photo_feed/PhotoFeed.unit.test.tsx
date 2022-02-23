// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from '../../shared/tests/unitTestHelper';
import PhotoFeed from './PhotoFeed';

describe('<PhotoFeed />', () => {
  it('renders PhotoFeed', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <PhotoFeed systemId={2} />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
