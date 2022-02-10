import { render, screen } from '@testing-library/react';
import { Colors, Fonts } from 'shared/constants';
import { Typography } from './Typography';

describe('<Typography />', () => {
  describe('Typography with default props', () => {
    beforeEach(() => {
      render(
        <Typography className="best-class-name" variant="h1">
          Test
        </Typography>
      );
    });

    test('should render Typography', () => {
      const typography = screen.getByText('Test');
      expect(typography).toBeInTheDocument();
      expect(typography).toHaveClass('best-class-name');
      expect(typography).toHaveStyle(`font-size: ${Fonts.h1.size}px`);
      expect(typography).toHaveStyle(`font-style: ${Fonts.h1.style}`);
      expect(typography).toHaveStyle('line-height: 1.25');
    });
  });

  test('Typography with gray color', () => {
    render(
      <Typography variant="h1" color="gray">
        Test
      </Typography>
    );
    expect(screen.getByText('Test')).toHaveStyle(`color: ${Colors.dark7}`);
  });

  test('Typography with custom font weight', () => {
    render(
      <Typography variant="h1" fontWeight="bolder">
        Test
      </Typography>
    );
    expect(screen.getByText('Test')).toHaveStyle(`font-weight: bolder`);
  });

  test('Typography with custom line height', () => {
    render(
      <Typography variant="h1" lineHeight={2}>
        Test
      </Typography>
    );
    expect(screen.getByText('Test')).toHaveStyle(`line-height: 2`);
  });
});
