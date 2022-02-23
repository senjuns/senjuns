// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePlayInRange } from './usePlayInRange';

const PlayInRangeUse = () => {
  const { isPlaying, index, setIndex, togglePlay } = usePlayInRange(4);

  return (
    <div>
      <div data-testid="is-playing">{isPlaying ? 'Playing' : 'Paused'}</div>
      <div data-testid="index">{index}</div>
      <button onClick={() => setIndex(3)}>Set Max Index</button>
      <button onClick={togglePlay}>Toggle Play</button>
    </div>
  );
};

describe('usePlayInRange test', () => {
  beforeEach(() => {
    render(<PlayInRangeUse />);
  });

  test('should be able to render the PlayInRangeUse', () => {
    expect(screen.getByTestId('is-playing')).toHaveTextContent('Paused');
    expect(screen.getByTestId('index')).toHaveTextContent('0');
  });

  test('should be able to toggle playing the frames', async () => {
    const togglePlayButton = screen.getByRole('button', {
      name: 'Toggle Play',
    });
    fireEvent.click(togglePlayButton);
    expect(screen.getByTestId('is-playing')).toHaveTextContent('Playing');
    await waitFor(() => {
      expect(screen.getByTestId('index')).toHaveTextContent('1');
    });

    fireEvent.click(togglePlayButton);
    expect(screen.getByTestId('is-playing')).toHaveTextContent('Paused');
  });
});
