import React from 'react';
import './styles.scss';

const Message: React.FC = ({ children }) => (
  <span className='message error'>
    {children}
  </span>
);

export default Message;