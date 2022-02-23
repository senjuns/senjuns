import { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../common';
import UniqueValuePropositionCard from '../../components/Landing/UniqueValuePropositionCard';
import { TUniqueValue } from '../../containers/Landing/constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import { COLORS } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

interface UniqueValuePropositionProps {
  uniqueValues: TUniqueValue[];
}

const UniqueValueProposition: FC<UniqueValuePropositionProps> = ({
  uniqueValues,
}) => {
  const { isMobile } = useScreenSize();

  return (
    <UniqueValuePropositionContainer>
      <OrangeRect />

      <Title isMobile={isMobile} variant="h2">
        Our Unique Value Proposition
      </Title>

      <CardsContainer isMobile={isMobile}>
        {uniqueValues.map((uniqueValue, index) => (
          <UniqueValuePropositionCard
            key={uniqueValue.title}
            direction={index % 2}
            order={index + 1}
            uniqueValue={uniqueValue}
          />
        ))}
      </CardsContainer>
    </UniqueValuePropositionContainer>
  );
};

const UniqueValuePropositionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1440px;
  margin: auto;
`;

const OrangeRect = styled.div`
  width: 80px;
  height: 10px;
  background: ${COLORS.orange2};
  margin-bottom: 30px;
`;

const Title = styled(Typography)<ResponsiveLayoutProps>`
  max-width: 600px;
  text-align: center;
  margin-bottom: 120px;
  ${({ isMobile }) => (isMobile ? 'font-size: 30px;' : '')}
`;

const CardsContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ isMobile }) => (isMobile ? '100px' : '160px')};
  width: 100%;
`;

export default UniqueValueProposition;
