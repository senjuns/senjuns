// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('<Dropdown />', () => {
  const mockOnChange = jest.fn();
  const mockedOptions = [
    { id: 1, label: 'Option1' },
    { id: 2, label: 'Option2' },
    { id: 3, label: 'Option3' },
  ];

  describe('Dropdown without testId', () => {
    beforeEach(() => {
      render(
        <Dropdown value={1} options={mockedOptions} onChange={mockOnChange} />
      );
    });

    test('should render Dropdown with default values', () => {
      expect(screen.getByTestId('select')).toBeInTheDocument();
      expect(
        (screen.getByTestId('select-option-1') as HTMLOptionElement).selected
      ).toBeTruthy();
      expect(
        (screen.getByTestId('select-option-2') as HTMLOptionElement).selected
      ).toBeFalsy();
    });

    test('should be able to change the option', () => {
      fireEvent.change(screen.getByTestId('select'), { target: { value: 2 } });
      expect(mockOnChange).toHaveBeenCalledWith('2', expect.anything());
    });
  });

  describe('Dropdown with testId', () => {
    beforeEach(() => {
      render(
        <Dropdown
          value={1}
          options={mockedOptions}
          testId="best-select"
          onChange={mockOnChange}
        />
      );
    });

    test('should render Dropdown with default values', () => {
      expect(screen.getByTestId('best-select')).toBeInTheDocument();
      expect(
        (screen.getByTestId('best-select-option-1') as HTMLOptionElement)
          .selected
      ).toBeTruthy();
    });
  });
});
