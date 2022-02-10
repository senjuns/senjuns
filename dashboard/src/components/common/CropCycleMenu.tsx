import {
  ChangeEvent,
  FC,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { addDays, differenceInDays, subDays, subWeeks } from 'date-fns';
import Menu from '@material-ui/core/Menu';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Slider from 'components/common/Slider';
import { Typography } from 'components/common/Typography';
import { useScreenSize } from 'hooks';
import { Colors } from 'shared/constants';
import { TimeRange } from 'shared/interfaces/general';
import { ReactComponent as HistoryIcon } from 'assets/svg/history.svg';
import { ReactComponent as ExpandMoreIcon } from 'assets/svg/expand_more.svg';
import { ReactComponent as ExpandLessIcon } from 'assets/svg/expand_less.svg';

interface StyleProps {
  isMobile: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    menuPaper: {
      background: '#ffffff',
      boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.1)',
      width: ({ isMobile }: StyleProps) => (isMobile ? '100%' : 320),
      borderRadius: 20,
      zIndex: 1001,
      padding: 20,
      boxSizing: 'border-box',
    },
  })
);

interface IMenuOption {
  label: string;
  startDay: Date;
  endDay: Date;
}

interface ICropCycleMenuProps {
  current: TimeRange;
  defaultLabel: string;
  isInvalid: boolean;
  whole: TimeRange;
  onSelectRange: (range: TimeRange) => void;
}

export const CropCycleMenu: FC<ICropCycleMenuProps> = ({
  current,
  defaultLabel,
  isInvalid,
  whole: { start: startDay, end: endDay },
  onSelectRange,
}) => {
  const { isMobile } = useScreenSize();
  const classes = useStyles({ isMobile });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [label, setLabel] = useState(defaultLabel);
  const [range, setRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [showCustomOption, setShowCustomOption] = useState(false);

  const daysInTotal = differenceInDays(endDay, startDay);

  const selectRangeCallback = useDebouncedCallback((range: TimeRange) => {
    onSelectRange(range);
  }, 300);

  useEffect(() => {
    setRange({
      start: differenceInDays(current.start, startDay) + 1,
      end: differenceInDays(current.end, startDay),
    });
  }, [startDay]);

  const isOpen = Boolean(anchorEl);

  const OPTIONS: IMenuOption[] = useMemo(() => {
    return [
      {
        label: 'Last 3 days',
        startDay: subDays(endDay, 3),
        endDay,
      },
      {
        label: 'Last week',
        startDay: subWeeks(endDay, 1),
        endDay,
      },
      {
        label: 'Last 2 weeks',
        startDay: subWeeks(endDay, 2),
        endDay,
      },
      {
        label: 'Whole growth cycle',
        startDay,
        endDay,
      },
    ].filter((option) => option.startDay >= startDay);
  }, [startDay, endDay]);

  const handleChangePosition = (
    _event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (typeof value === 'number') {
      return;
    }

    setRange({ start: value[0], end: value[1] });
    setLabel(`Day ${value[0]} to ${value[1]}`);

    selectRangeCallback({
      start: addDays(startDay, value[0] - 1),
      end: addDays(startDay, value[1]),
    });
  };

  const handleToggleShowCustomOption: MouseEventHandler = () => {
    setShowCustomOption((show) => !show);
  };

  const handleSelectOption = (option: IMenuOption): void => {
    selectRangeCallback({
      start: option.startDay,
      end: option.endDay,
    });
    setLabel(option.label);

    handleClose();
  };

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!isInvalid) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Label
        id="crop-cycle-menu-button"
        aria-controls={isOpen ? 'crop-cycle-menu' : undefined}
        aria-haspopup={true}
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        {isInvalid ? 'No available cycle' : label}
      </Label>

      <Menu
        id="crop-cycle-menu"
        MenuListProps={{
          'aria-labelledby': 'crop-cycle-menu-button',
        }}
        classes={{
          paper: classes.menuPaper,
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        <MenuList>
          {OPTIONS.map((option) => (
            <MenuOption
              key={option.label}
              onClick={() => handleSelectOption(option)}
            >
              <OptionHistoryIcon />
              <Typography variant="body1">{option.label}</Typography>
            </MenuOption>
          ))}
        </MenuList>

        <Splitter />

        <CustomMenuOption onClick={handleToggleShowCustomOption}>
          <Typography variant="body1">Custom</Typography>
          {showCustomOption ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </CustomMenuOption>

        {showCustomOption && (
          <CropCycleSliderWrapper>
            <CropCycleSlider
              aria-label="heatmap tracker"
              value={[range.start, range.end]}
              min={1}
              max={daysInTotal + 1}
              valueLabelDisplay="on"
              onChange={handleChangePosition}
            />
            <DropCycleDayLabel variant="body1">
              DAY IN CROP CYCLE
            </DropCycleDayLabel>
          </CropCycleSliderWrapper>
        )}
      </Menu>
    </>
  );
};

const Label = styled.p`
  cursor: pointer;
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.dark7};
`;

const MenuList = styled.ul`
  cursor: pointer;
  list-style-type: none;
  padding-left: 0px;
  margin: 0;
`;

const MenuOption = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;

  &:not(:last-type-of) {
    margin-bottom: 5px;
  }

  :hover {
    background: ${Colors.hb5};
    border-radius: 10px;
  }
`;

const CustomMenuOption = styled(MenuOption)`
  justify-content: space-between;
`;

const Splitter = styled.hr`
  border-color: ${Colors.grey5};
  margin: 20px 0;
`;

const OptionHistoryIcon = styled(HistoryIcon)`
  margin-right: 10px;
`;

const CropCycleSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CropCycleSlider = styled(Slider)`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DropCycleDayLabel = styled(Typography)`
  color: ${Colors.dark7};
  font-size: 12px;
`;
