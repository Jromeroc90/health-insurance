import React from 'react';
import './styles.scss';

type RadioProps = {
  name: string;
  checked: boolean;
  value: string;
  label: string;
  onChange: (value: string) => void;
  margin?: string;
}

const Radio: React.FC<RadioProps> = ({
  name,
  checked,
  label,
  onChange,
  value,
  margin
}) => (
  <div className='radio_button' style={{ margin: margin }}>
    <input
      type='radio'
      value={value}
      checked={checked}
      name={name}
    />
    <label onClick={() => onChange(value)}>{label}</label>
  </div>
);

export default Radio;