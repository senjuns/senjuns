import { FC } from 'react';
import styled from 'styled-components';

import { TBenefit } from 'containers/Landing/constants';
import { Typography } from 'common';
import { COLORS } from 'shared/constants';

interface BenefitCardProps {
  benefit: TBenefit;
}

const BenefitCard: FC<BenefitCardProps> = ({ benefit }) => {
  return (
    <BenefitCardContainer>
      {<benefit.Icon />}
      <BenefitTitle variant="h6">{benefit.title}</BenefitTitle>
      <BenefitContent variant="body1">{benefit.content}</BenefitContent>
    </BenefitCardContainer>
  );
};

const BenefitCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;

  background: white;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const BenefitTitle = styled(Typography)`
  margin-top: 30px;
  lineheight: 1.2;
  fontweight: 600;
`;

const BenefitContent = styled(Typography)`
  margin-top: 15px;
  color: ${COLORS.grey2};
`;

export default BenefitCard;
