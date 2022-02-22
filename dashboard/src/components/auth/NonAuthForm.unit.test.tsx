// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { NonAuthForm } from './NonAuthForm';

describe('<NonAuthForm />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <NonAuthForm header="Header" instructions="Instructions" footer="Footer">
        Form Values
      </NonAuthForm>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
