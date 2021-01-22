import React from 'react';
import Logo from '../../../assets/images/logo.png';
import Family from '../../../assets/images/family.png';
import './styles.scss';

const LayoutSmall: React.FC = ({ children }) => (
  <div className='layout-small'>
    <div className='bg-left'>
      <div className='logo_wrapper'>
        <img src={Logo} alt='logo' />
      </div>
      <hr />
      <div className='container_image'>
        <img src={Family} alt='' />
      </div>
    </div>
    <div className='layout-small_container'>
      <div className='container'>
        <div className='container_form'>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default LayoutSmall;
