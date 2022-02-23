import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/constants';

interface ProfileProps {
  /**
   * Image URL
   */
  imageUrl: string | null;
  /**
   * User name
   */
  userName: string;
  /**
   * Image size in pixels
   */
  size: number;
}

/**
 * Represents user's profile picture.
 *
 * @param {ProfileProps} props imgageUrl, size
 * @returns {JSX.Element} Profile component
 */
const Profile: React.FC<ProfileProps> = ({ imageUrl, userName, size }) => {
  return (
    <>
      {imageUrl ? (
        <StyledImgage src={imageUrl} size={size} />
      ) : (
        <StyledDiv size={size}>{userName.charAt(0)}</StyledDiv>
      )}
    </>
  );
};

const StyledImgage = styled.img<{ size: number }>`
  border-radius: ${(props) => props.size / 2}px;
`;

const StyledDiv = styled.div<{ size: number }>`
  border-radius: ${(props) => props.size / 2}px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  text-transform: uppercase;
  background-color: ${Colors.orange3};
  text-align: center;
  line-height: ${(props) => props.size}px;
  font-family: Poppins;
  font-size: 26px;
`;

export default Profile;
