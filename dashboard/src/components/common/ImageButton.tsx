import React from 'react';

interface ImageButtonProps {
  icon: string;
  onClick?: () => void;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  icon,
  onClick,
}: ImageButtonProps) => {
  return (
    <div onClick={onClick} role="button">
      <img src={icon} />
    </div>
  );
};
