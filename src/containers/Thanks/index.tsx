import React from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { SmallLayout } from '../../components/organisms';
import ThanksImg from '../../assets/images/thanks.png';
import './styles.scss';
import { Button } from '../../components/atoms';

type StateProps = {
  link: boolean;
}

const Thanks: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation<StateProps>();

  if (!state.link) {
    return <Redirect to='/'/>;
  }
  return (
    <SmallLayout>
      <div className='thanks_container'>
        <img src={ThanksImg} alt='thanks'/>

        <div className='thanks_title'>
          <h2>¡Gracias por <span>confiar en nosotros!</span></h2>
          <p>Queremos conocer mejor la salud de los asegurados. Un asesor <b>se pondrá en contacto</b> contigo en las
            siguientes <b>48 horas</b>.</p>
        </div>

        <div className='thanks_button'>
          <Button onClick={() => history.push('/')} label='IR A SALUD RIMAC' />
        </div>
      </div>
    </SmallLayout>
  );
};

export default Thanks;