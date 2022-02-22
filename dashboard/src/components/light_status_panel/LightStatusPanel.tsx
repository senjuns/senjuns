import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LightOffIcon } from '../../assets/svg/light-off.svg';
import { ReactComponent as LightOnIcon } from '../../assets/svg/light-on.svg';
import { Colors } from '../../shared/constants';
import { circumferenceFromRadius, getOffset } from '../../shared/utils';

const PROGRESS_CIRCLE_WIDTH = 100;
const PROGRESS_CIRCLE_HEIGHT = 100;
const SCALE_CIRCLE_RADIUS = 4;
const CIRCLE_GAP = 3;
const LIGHT_PROGRESS_STROKE_WIDTH = 3;
const LIGHT_PROGRESS_CIRCLE_RADIUS = 50;
const lightProgressCircleInnerRadius =
  LIGHT_PROGRESS_CIRCLE_RADIUS - LIGHT_PROGRESS_STROKE_WIDTH;
const INNER_CIRCLE_RADIUS = 40;

/*
@props lightHours: represents the hours the light is on.
@props currentTimeInHours: represents the current time based on the 24-hour light/dark cycle.

                                                    [currentTimeInHours]
0--------------------------|---------------------------------^------------24
<-------lightHours--------><--------Dark Hours(24 - lightHours)---------->

 */
interface LightStatusPanelProps {
  lightHours: number;
  currentTimeInHours: number;
}

const LightStatusPanel: React.FC<LightStatusPanelProps> = ({
  lightHours,
  currentTimeInHours,
}: LightStatusPanelProps) => {
  const isLightOn = currentTimeInHours < lightHours;
  const lightStrokeDashoffset = getOffset(
    (lightHours / 24) * 100,
    lightProgressCircleInnerRadius
  );
  const darkStrokeDashoffset = getOffset(
    ((24.0 - lightHours) / 24) * 100,
    lightProgressCircleInnerRadius
  );
  const currentTimeX =
    LIGHT_PROGRESS_CIRCLE_RADIUS +
    Math.cos((currentTimeInHours / 24) * 2 * Math.PI - Math.PI) *
      lightProgressCircleInnerRadius;
  const currentTimeY =
    LIGHT_PROGRESS_CIRCLE_RADIUS +
    Math.sin((currentTimeInHours / 24) * 2 * Math.PI - Math.PI) *
      lightProgressCircleInnerRadius;

  return (
    <Container>
      <OnOffStateContainer>
        {isLightOn ? <LightOnIcon /> : <LightOffIcon />}
        <LightStateContainer>
          <LightStateTitle>Light</LightStateTitle>
          <LightStateLabel>{isLightOn ? 'ON' : 'OFF'}</LightStateLabel>
        </LightStateContainer>
      </OnOffStateContainer>
      <CircleProgressContainer>
        <svg
          width={PROGRESS_CIRCLE_WIDTH + SCALE_CIRCLE_RADIUS}
          height={PROGRESS_CIRCLE_HEIGHT + SCALE_CIRCLE_RADIUS}
        >
          <circle
            cx={LIGHT_PROGRESS_CIRCLE_RADIUS}
            cy={LIGHT_PROGRESS_CIRCLE_RADIUS}
            r={lightProgressCircleInnerRadius}
            fill={'none'}
            stroke={Colors.orange4}
            strokeWidth={LIGHT_PROGRESS_STROKE_WIDTH}
            strokeDasharray={`${circumferenceFromRadius(
              lightProgressCircleInnerRadius
            )}`}
            transform={`rotate(${
              -180 /* interpolate -180 degree to move the start point of the circle to the left */
            }
               ${LIGHT_PROGRESS_CIRCLE_RADIUS} ${LIGHT_PROGRESS_CIRCLE_RADIUS})`}
            strokeDashoffset={lightStrokeDashoffset + CIRCLE_GAP}
          />
          <circle
            cx={LIGHT_PROGRESS_CIRCLE_RADIUS}
            cy={LIGHT_PROGRESS_CIRCLE_RADIUS}
            r={lightProgressCircleInnerRadius}
            fill={'none'}
            stroke={Colors.hb3}
            strokeWidth={LIGHT_PROGRESS_STROKE_WIDTH}
            strokeDasharray={`${circumferenceFromRadius(
              lightProgressCircleInnerRadius
            )}`}
            strokeDashoffset={darkStrokeDashoffset + CIRCLE_GAP}
            // move the start point of this circle to the end point of the light time circle
            transform={`rotate(${
              (lightHours / 24) * 360 - 180
            }, ${LIGHT_PROGRESS_CIRCLE_RADIUS} ${LIGHT_PROGRESS_CIRCLE_RADIUS})`}
          />
          <circle
            cx={currentTimeX}
            cy={currentTimeY}
            r={5}
            fill={Colors.hb6}
            stroke={isLightOn ? Colors.orange4 : Colors.hb3}
            strokeWidth={LIGHT_PROGRESS_STROKE_WIDTH}
          />
          <circle
            cx={LIGHT_PROGRESS_CIRCLE_RADIUS}
            cy={LIGHT_PROGRESS_CIRCLE_RADIUS}
            r={INNER_CIRCLE_RADIUS}
            fill={'white'}
            style={{ transition: 'all 1s ease-out 0s' }}
          />
        </svg>
        <CircleProgressLabelContainer>
          <CircleProgressLabelInnerContainer>
            <HourContainer>
              <Hour>
                {isLightOn
                  ? lightHours - currentTimeInHours
                  : 24 - currentTimeInHours}
              </Hour>
              <HourLabel>h</HourLabel>
            </HourContainer>
            <TilLabel>TIL {isLightOn ? 'DARK' : 'LIGHT'}</TilLabel>
          </CircleProgressLabelInnerContainer>
        </CircleProgressLabelContainer>
      </CircleProgressContainer>
      <CycleContainer>
        <CycleTitle>CYCLE</CycleTitle>
        <CycleLabel>{lightHours + '/' + (24 - lightHours)}</CycleLabel>
      </CycleContainer>
    </Container>
  );
};

const CircleProgressLabelInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HourContainer = styled.div`
  display: flex;
`;

const Hour = styled.div`
  line-height: 40px;
  font-size: 30px;
`;

const HourLabel = styled.div`
  line-height: 28px;
  font-size: 12px;
`;

const TilLabel = styled.div`
  font-family: Poppins;
  font-weight: 500;
  font-size: 10px;
  color: ${Colors.dark7};
`;

const Container = styled.div`
  display: flex;
  gap: 28px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${Colors.hb6};
  border-radius: 20px;
  padding: 20px 0 20px 0;
`;

const CycleContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const OnOffStateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CircleProgressContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;

  & > svg {
    overflow: visible;
  }
`;

const CircleProgressLabelContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightStateContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const LightStateTitle = styled.div`
  line-height: 20px;
  font-weight: 500;
  font-size: 16px;
`;

const LightStateLabel = styled.div`
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
`;

const CycleTitle = styled.div`
  font-family: Poppins;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: ${Colors.dark7};
`;

const CycleLabel = styled.div`
  line-height: 20px;
  font-size: 14px;
`;

export default LightStatusPanel;
