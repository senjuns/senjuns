// eslint-disable-next-line import/no-extraneous-dependencies
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { ROOM_DETAIL_TABS } from '../../shared/constants';
import { Providers } from '../../shared/tests/unitTestHelper';

import MobileDetailTabView from './MobileDetailTabView';

describe('<MobileDetailTabView />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <MobileDetailTabView
          roomId={1}
          currentTab={ROOM_DETAIL_TABS.HEAT_MAP}
          onChangeTab={jest.fn()}
        />
      </Providers>
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
