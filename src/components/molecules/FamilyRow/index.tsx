import React from 'react';
import Delete from '../../../assets/images/icons/delete.png';
import './styles.scss';

type FamilyRowProps = {
  relation: string;
  birthday: string;
  onDelete: () => void;
}

const FamilyRow: React.FC<FamilyRowProps> = ({ relation, birthday, onDelete }) => (
  <div className='family_row'>
    <div className='family_row_relation'>{relation}</div>
    <div className='family_row_birthday'>{birthday}</div>
    <img
      src={Delete}
      onClick={() => onDelete()}
      alt='delete_button'
    />
    <span
      className='family_row_delete'
      onClick={() => onDelete()}
    >
      ELIMINAR
    </span>
  </div>
);

export default FamilyRow;