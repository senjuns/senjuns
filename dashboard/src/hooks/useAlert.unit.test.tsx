// eslint-disable-next-line import/no-extraneous-dependencies
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { FC } from 'react';

import { useAlert } from './useAlert';

const AlertUse: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { render, open, close } = useAlert('Alert test');

  return (
    <div>
      <button onClick={open}>Open Alert</button>
      <button onClick={close}>Close Alert</button>
      {render()}
    </div>
  );
};

describe('useAlert test', () => {
  beforeEach(() => {
    render(<AlertUse />);
  });

  test('should be able to open/close Alert', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Open Alert' }));
    expect(screen.getByText('Alert test')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close Alert' }));
    await waitForElementToBeRemoved(screen.queryByText('Alert test'));
  });
});
