import { fireEvent, render, screen } from '@testing-library/react';
import { Colors } from 'shared/constants';
import { Button } from './Button';

describe('<Button />', () => {
  describe('Button with default props', () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
      render(<Button onClick={mockOnClick}>Test Button</Button>);
    });

    test('should render Button', () => {
      expect(
        screen.getByRole('button', { name: 'Test Button' })
      ).toBeInTheDocument();
    });

    test('should fire onClick when user clicks on the button', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Test Button' }));
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  test('should render Button disabled', () => {
    render(<Button disabled={true}>Test Button</Button>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeDisabled();
  });

  test('should render Button with fullWidth', () => {
    render(<Button fullWidth={true}>Test Button</Button>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toHaveStyle(
      'width: 100%'
    );
  });

  test('should render Button with submit type', () => {
    render(<Button type="submit">Test Button</Button>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toHaveAttribute(
      'type',
      'submit'
    );
  });

  test('should render Button with primary color', () => {
    render(<Button color="primary">Test Button</Button>);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveStyle(`background-color: ${Colors.orange3}`);
    expect(button).toHaveStyle(`color: ${Colors.white}`);
  });

  test('should render Button with secondary color', () => {
    render(<Button color="secondary">Test Button</Button>);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveStyle(`background-color: ${Colors.dark1}`);
    expect(button).toHaveStyle(`color: ${Colors.white}`);
  });

  test('should render Button with white color', () => {
    render(<Button color="white">Test Button</Button>);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveStyle(`background-color: ${Colors.white}`);
    expect(button).toHaveStyle(`color: ${Colors.black}`);
  });
});
