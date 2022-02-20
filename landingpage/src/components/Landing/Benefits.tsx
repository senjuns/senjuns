import { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../common';
import BenefitCard from '../../components/Landing/BenefitCard';
import { TBenefit } from '../../containers/Landing/constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';

interface BenefitsProps {
  benefits: TBenefit[];
}

const Benefits: FC<BenefitsProps> = ({ benefits }) => {
  const { isMobile } = useScreenSize();

  return (
    <BenefitsContainer isMobile={isMobile}>
      <BenefitsTitleWrapper>
        <BenefitsTitleDivider />
        <BenefitsTitle variant={isMobile ? 'body1' : 'h6'}>
          BENEFITS PROVIDED BY OUR TECHNOLOGY
        </BenefitsTitle>
        <BenefitsTitleDivider />
      </BenefitsTitleWrapper>

      <BenefitsBody>
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </BenefitsBody>
    </BenefitsContainer>
  );
};

export default Benefits;

const BenefitsContainer = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BenefitsTitle = styled(Typography)`
  letter-spacing: 0.3em;
  text-align: center;
`;

const BenefitsTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-bottom: 80px;
`;

const BenefitsTitleDivider = styled.hr`
  flex: 1;
  min-width: 20px;
`;

const BenefitsBody = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  width: 100%;
`;
