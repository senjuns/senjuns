import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '../../assets/svg/info-icon.svg';
import { Colors } from '../../shared/constants';
import { IPlantInfo } from '../../shared/interfaces';

interface PlantStrainTooltipProps {
  /**
   * Strain Info
   */
  strainInfo: IPlantInfo[] | null;
}

const PlantStrainTooltip: React.FC<PlantStrainTooltipProps> = ({
  strainInfo,
}) => {
  return (
    <>
      <a
        data-tip
        data-for="info"
        data-event="click"
        data-event-off="mouseleave"
        style={{ cursor: 'pointer' }}
      >
        <StyledInfoIcon />
      </a>
      <ReactTooltip id="info" place={'right'} type={'dark'} clickable={true}>
        {strainInfo &&
          strainInfo.map(({ strainName, count }) => (
            <div key={strainName}>
              <TooltipPlantCount>{count}</TooltipPlantCount>
              <TooltipPlantStrain>{strainName}</TooltipPlantStrain>
            </div>
          ))}
      </ReactTooltip>
    </>
  );
};

const StyledInfoIcon = styled(InfoIcon)`
  margin-left: 3px;
  margin-right: 3px;
`;

const TooltipPlantStrain = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-size: 16px;
  line-height: 30px;
  margin-left: 5px;
  white-space: nowrap;
`;

const TooltipPlantCount = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  color: ${Colors.orange3};
`;

export default PlantStrainTooltip;
