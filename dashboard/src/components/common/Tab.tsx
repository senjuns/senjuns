import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/constants';

interface TabProps {
  selected: boolean;
  label: string;
  onClick: () => void;
  id: string;
}

const Tab: React.FC<TabProps> = ({
  selected,
  label,
  onClick,
  id,
}: TabProps) => {
  const labelStyle = {
    color: selected ? Colors.orange2 : Colors.dark7,
    fontWeight: selected ? 600 : 400,
  };

  return (
    <Container data-selected={selected} id={id}>
      <Label style={labelStyle} onClick={onClick}>
        {label}
      </Label>
      {selected && (
        <CircleContainer>
          <Circle />
        </CircleContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;
`;

const Label = styled.div`
  font-family: Poppins;
  font-size: 20px;
  height: 30px;
  cursor: pointer;
  white-space: nowrap;
`;

const Circle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #e86339;
`;

const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default Tab;
