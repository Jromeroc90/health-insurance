import React from 'react';
import './style.scss';

type InputProps = {
  calendar?: boolean;
  compose?: boolean;
  width?: string;
  placeholder?: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  maxLength?: number;
  error?: boolean;
  margin?: string;
};

const Input: React.FC<InputProps> = ({
  maxLength,
  compose,
  calendar,
  width,
  placeholder,
  value,
  label,
  onChange,
  error,
  margin,
}) => (
  <div className={compose ? 'field compose' : 'field'} style={{ margin: margin }}>
    <input
      className={`${calendar && 'calendar'} ${error && 'error'}`}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      style={{
        width: width || '100%',
      }}
      maxLength={maxLength}
    />
    <label className={value ? 'active' : ''}>{label}</label>
  </div>
);

export default Input;