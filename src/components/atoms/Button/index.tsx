import React from 'react';
import './styles.scss';

type ButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  margin?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled, margin }) => (
  <div
    onClick={() => {
      if (!disabled) {
        onClick()
      }
    }}
    className={`button_rimac ${disabled && 'disabled'}`}
    style={{
      margin: margin || 0,
    }}
  >
    {label}
  </div>
);

export default Button;
