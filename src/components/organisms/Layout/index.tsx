import React, { useState, useRef, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import Logo from '../../../assets/images/logo.png';
import Family from '../../../assets/images/family.png';
import Clinic from '../../../assets/images/icons/clinic.png';
import Mobile from '../../../assets/images/icons/mobile.png';
import Money from '../../../assets/images/icons/money.png';
import Shield from '../../../assets/images/icons/shield.png';
import Control from '../../../assets/images/icons/control.png';
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

const BenefitRow: React.FC<BenefitType> = ({ icon, text, id  }) => (
  <div id={`item-${id}`} className='container_content_benefit-item'>
    <img src={icon} alt='benefit_icon' />
    <span>{text}</span>
  </div>
);

const Layout: React.FC = ({ children }) => {
  const carousel = useRef<any>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (carousel.current) {
      carousel.current.slideTo(index);
    }
  }, [index, carousel]);

  return (
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
            <ul className='desktop_list'>
              {benefits.map(benefit => (
                <BenefitRow
                  key={benefit.id}
                  id={benefit.id}
                  icon={benefit.icon}
                  text={benefit.text}
                />
              ))}
            </ul>
            <div className='slider-container'>
              <AliceCarousel
                ref={carousel}
                disableButtonsControls={true}
                disableDotsControls={true}
                activeIndex={index}
                items={benefits.map(benefit => (
                  <BenefitRow
                    key={benefit.id}
                    id={benefit.id}
                    icon={benefit.icon}
                    text={benefit.text}
                  />
                ))}
              />
              <div className='slider-container_control'>
                <img
                  className='button_prev'
                  src={Control}
                  alt='prev'
                  onClick={() => {
                    if (index > 0) {
                      setIndex(index - 1);
                    }
                  }}
                />
                <p><span>{`0${index + 1}`}</span> / 04</p>
                <img
                  src={Control}
                  alt='next'
                  onClick={() => {
                    if (index < 3) {
                      setIndex(index + 1);
                    }
                  }}
                />
              </div>
            </div>
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
}

export default Layout;
