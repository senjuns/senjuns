// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { Providers } from '../../shared/tests/unitTestHelper';
import SectionView from './PhotoSectionView';

describe('<SectionView />', () => {
  it('renders the active SectionView.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <SectionView
          miniMap={<div>Minimap Placeholder</div>}
          systemId={2}
          position={{
            x: 1,
            y: 1,
          }}
          gridSize={{ width: 10, height: 10 }}
          onChangeSection={jest.fn()}
        />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
