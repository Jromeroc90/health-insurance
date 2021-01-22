import React from 'react';
import Logo from '../../../assets/images/logo.png';
import Family from '../../../assets/images/family.png';
import Clinic from '../../../assets/images/icons/clinic.png';
import Mobile from '../../../assets/images/icons/mobile.png';
import Money from '../../../assets/images/icons/money.png';
import Shield from '../../../assets/images/icons/shield.png';
import './styles.scss';

type BenefitType = {
  id?: number;
  icon: string;
  text: string;
}

const benefits: Array<BenefitType> = [
  {
    id: 1,
    icon: Shield,
    text: 'Cómpralo de manera fácil y rápida',
  },
  {
    id: 2,
    icon: Mobile,
    text: 'Cotiza y compra tu seguro 100% digital',
  },
  {
    id: 3,
    icon: Money,
    text: 'Hasta S/.12 millones de cobertura anual',
  },
  {
    id: 4,
    icon: Clinic,
    text: 'Más de 300 clínicas en todo el Perú',
  },
];

const BenefitRow: React.FC<BenefitType> = ({ icon, text  }) => (
  <li>
    <img src={icon} alt='benefit_icon' />
    <span>{text}</span>
  </li>
)

const Layout: React.FC = ({ children }) => (
  <div className='layout'>
    <div className='bg-left'>
      <img src={Family} alt='family' />
      <hr />
    </div>
    <div className='layout_container'>
      <div className='header'>
        <div className='header_wrapper'>
          <img src={Logo} alt='logo' />
        </div>
      </div>

      <div className='container'>
        <div className='container_content'>
          <h1 className='title'>Seguro de <br /><b>Salud</b></h1>
          <ul>
            {benefits.map(benefit => (
              <BenefitRow
                key={benefit.id}
                icon={benefit.icon}
                text={benefit.text}
              />
            ))}
          </ul>
          <span className='signature'>© 2020 RIMAC Seguros y Reaseguros.</span>
        </div>

        <div className='container_image'>
          <img src={Family} alt='' />
        </div>

        <div className='container_form'>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
