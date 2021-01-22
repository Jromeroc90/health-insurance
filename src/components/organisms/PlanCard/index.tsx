import React from 'react';
import Shield from '../../../assets/images/shield.png';
import Heart from '../../../assets/images/icons/heart.png';
import HeartGray from '../../../assets/images/icons/heart_gray.png';
import './styles.scss';

type PlanCardProps = {
  plan: string;
}

const benefits = [
  {
    id: 'lima',
    label: 'Lima',
    sub: '(zona de covertura)',
  },
  {
    id: 'clinic',
    label: '+30 clínicas',
    sub: '(en red afiliadas)',
  },
  {
    id: 'delivery',
    label: 'Médico a domicilio',
    sub: '',
  },
  {
    id: 'prevent',
    label: 'Chequeos preventivos',
    sub: '',
  },
  {
    id: 'national',
    label: 'Reembolso nacional',
    sub: '',
  },
  {
    id: 'international',
    label: 'Reembolso internacional',
    sub: '',
  },
]

const data = {
  básico: {
    total: 1,
    benefits: ['lima', 'clinic']
  },
  avanzado: {
    total: 5,
    benefits: ['lima', 'clinic', 'delivery']
  },
  premium: {
    total: 8,
    benefits: ['lima', 'clinic', 'delivery', 'prevent']
  },
  full: {
    total: 15,
    benefits: ['lima', 'clinic', 'delivery', 'prevent', 'national', 'international']
  },
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => (
  <div className='plan_card'>
    <div className='plan_card_title'>
      Cuentas con estos beneficios:
    </div>

    <div className='plan_card_body'>
      <div className='plan_card_body-head'>
        <div>
          <h2>Cobertura máxima</h2>
          {/* @ts-ignore */}
          <h3>{`S/ ${data[plan].total}MM`}</h3>

          <div className='pill'>
            {`PLAN ${plan.toUpperCase()}`}
          </div>
        </div>

        <div className='image'>
          <img src={Shield} alt='shield' />
        </div>
      </div>

      <div className='plan_card_body-benefits'>
        {benefits.map(benefit => {
          // @ts-ignore
          if (data[plan].benefits.includes(benefit.id)) {
            return (
              <div key={benefit.id} className='allowed_benefit'>
                <img src={Heart} alt='heart' />
                <span>{benefit.label}</span>
                {benefit.sub && (
                  <span className='sub'>{benefit.sub}</span>
                )}
              </div>
            );
          }
          return (
            <div key={benefit.id} className='not-allowed_benefit'>
              <img src={HeartGray} alt='heart' />
              <span>{`${benefit.label} ${benefit.sub}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default PlanCard;