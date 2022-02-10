import * as ShallowRenderer from 'react-test-renderer/shallow';
import { ROOM_DETAIL_TABS } from 'shared/constants';
import { Providers } from 'shared/tests/unitTestHelper';

import RoomDetailTabView from './RoomDetailTabView';

describe('<RoomDetailTabView />', () => {
  it('renders correctly.', async () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(
      <Providers>
        <RoomDetailTabView
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
