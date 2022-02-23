// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import ErrorBoundary from './ErrorBoundary';

describe('<ErrorBoundary />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<ErrorBoundary>Error Boundary</ErrorBoundary>);

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
