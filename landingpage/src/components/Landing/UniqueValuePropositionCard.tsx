import { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../common';
import { TUniqueValue } from '../../containers/Landing/constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import { COLORS } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';
import { padLeadingZeros } from '../../shared/utils';

interface UniqueValuePropositionCardProps {
  order: number;
  direction: number;
  uniqueValue: TUniqueValue;
}

const UniqueValuePropositionCard: FC<UniqueValuePropositionCardProps> = ({
  order,
  direction,
  uniqueValue,
}) => {
  const { isMobile } = useScreenSize();

  return (
    <CardContainer isMobile={isMobile} direction={direction}>
      <CardImageWrapper>
        <uniqueValue.Image width="100%" />
      </CardImageWrapper>
      <CardDetails>
        <CardNumberWrapper>
          <CardNumber variant="h5">{padLeadingZeros(order, 2)}.</CardNumber>
          <CardNumberOrangeBox />
        </CardNumberWrapper>
        <CardTitle variant="h5">{uniqueValue.title}</CardTitle>
        <CardDescription variant="body1">{uniqueValue.content}</CardDescription>
      </CardDetails>
    </CardContainer>
  );
};

interface CardContainerProps extends ResponsiveLayoutProps {
  direction: number;
}

const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  align-items: center;
  gap: ${({ isMobile }) => (isMobile ? '50px' : '160px')};
  flex-direction: ${({ direction, isMobile }) =>
    isMobile ? 'column' : direction ? 'row' : 'row-reverse'};
`;

const CardImageWrapper = styled.div`
  flex: 1;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const CardNumber = styled(Typography)`
  font-size: 22px;
  margin-right: 4px;
`;

const CardNumberOrangeBox = styled.div`
  width: 30px;
  height: 3px;
  background: ${COLORS.orange3};
  margin-bottom: 8px;
`;

const CardTitle = styled(Typography)`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const CardDescription = styled(Typography)`
  color: ${COLORS.grey2};
`;

export default UniqueValuePropositionCard;
