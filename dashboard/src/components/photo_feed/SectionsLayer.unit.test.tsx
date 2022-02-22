// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { HistoryInformation } from '../../shared/interfaces';
import SectionsLayer from './SectionsLayer';

describe('<SectionsLayer />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <SectionsLayer
        sectionSize={{ width: 100, height: 100 }}
        historyInformation={new HistoryInformation(2)}
        onClick={jest.fn()}
      />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
