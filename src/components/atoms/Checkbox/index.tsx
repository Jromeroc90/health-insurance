import React, { ReactElement } from 'react';
import './styles.scss';

type CheckboxProps = {
  checked: boolean;
  label: string | ReactElement;
  onChange: (checked: boolean) => void;
  margin?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, label, onChange, margin }) => (
  <div className='checkbox' style={{ margin: margin }}>
    <input type='checkbox' checked={checked} />
    <label onClick={() => onChange(!checked)}>{label}</label>
  </div>
);

export default Checkbox;
