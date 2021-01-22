import React from 'react';
import Check from '../../../assets/images/icons/check.png';
import './styles.scss';

type PlanBoxProps = {
  selected: boolean;
  name: string;
  price: number;
  onClick: () => void;
};

const PlanBox: React.FC<PlanBoxProps> = ({ selected, name, price, onClick }) => (
  <div className={`plan_box_container ${selected && 'selected'}`} onClick={() => onClick()}>
    <div className='check'>
      {selected ? (
        <img src={Check} alt='check' />
      ) : (
        <div />
      )}
    </div>
    <h3>{name}</h3>
    <div className='price'>
      <span>S/.</span>
      <h4>{price}</h4>
    </div>
    <span>mensual</span>
  </div>
);

export default PlanBox;