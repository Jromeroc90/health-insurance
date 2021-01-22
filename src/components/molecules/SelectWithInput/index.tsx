import React from 'react';
import { Input } from '../../atoms';
import './styles.scss'

type Option = {
  value: string;
  label: string;
}

type ComponentProps = {
  selectOptions: Array<Option>;
  selectValue: string;
  onSelectChange: (value: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  inputLabel: string;
  maxLength?: number;
  error?: boolean;
  margin?: string;
  calendar?: boolean;
}

const SelectWithInput: React.FC<ComponentProps> = ({
  selectOptions,
  inputValue,
  inputLabel,
  onInputChange,
  selectValue,
  onSelectChange,
  maxLength,
  error,
  margin,
  calendar,
}) => {
  return (
    <div className={`compose_field ${error && 'error'}`} style={{ margin: margin }}>
      <select
        value={selectValue}
        onChange={({ target }) => onSelectChange(target.value)}
      >
        {selectOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <Input
        calendar={calendar}
        compose
        value={inputValue}
        label={inputLabel}
        onChange={text => onInputChange(text)}
        maxLength={maxLength}
        error={error}
        margin='0'
      />
    </div>
  );
};

export default SelectWithInput;