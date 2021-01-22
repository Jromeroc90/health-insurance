import React from 'react';
import './styles.scss';

type PriceRowProps = {
  label: string;
  price: number;
};

const PriceRow: React.FC<PriceRowProps> = ({ label, price }) => (
  <div className='price_row'>
    <p>{label}</p>
    <div>
      <span>S/</span>
      <h6>{price}</h6>
    </div>
  </div>
);

export default PriceRow;