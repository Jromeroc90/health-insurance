import React from 'react';
import './styles.scss';

type DropdownProps = {
  open: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ children, open }) => (
  <div className={`dropdown ${open ? 'open' : ''}`}>
    {children}
  </div>
);

export default Dropdown;