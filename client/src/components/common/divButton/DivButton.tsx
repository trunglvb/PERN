import { FC, ReactNode } from 'react';

interface CustomDivProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DivButton: FC<CustomDivProps> = ({ children, onClick, className = '' }) => {
  return (
    <div role='presentation' className={`cursor-pointer text-sm font-semibold ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default DivButton;
