import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { Dropdown, Button } from '../../components/atoms';
import { PlanBox, PriceRow } from '../../components/molecules';
import { SmallLayout, PlanCard } from '../../components/organisms';
import Back from '../../assets/images/icons/back.png';
import Down from '../../assets/images/icons/down.png';
import Guy from '../../assets/images/tyc.png';
import DownRed from '../../assets/images/icons/down_red.png';
import './styles.scss';

type RelationType = {
  id: number,
  relation: string,
  birthday: string;
}

type StateType = {
  new: boolean;
  document_type?: string;
  document_number?: string;
  name?: string;
  last_name?: string;
  maternal_name?: string;
  birthday?: string;
  genre?: string;
  relations: Array<RelationType>;
};

const Plans: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation<StateType>();

  const [openServices, setOpenServices] = useState<boolean>(false);
  const [openExclusions, setOpenExclusions] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [partners, setPartners] = useState<number>(0);
  const [plans, setPlans] = useState([
    {
      name: 'básico',
      price: 0,
      base: 0,
    },
    {
      name: 'avanzado',
      price: 0,
      base: 0,
    },
    {
      name: 'premium',
      price: 0,
      base: 0,
    },
    {
      name: 'full',
      price: 0,
      base: 0,
    },
  ]);
  const [selectedPlan, setSelectedPlan] = useState<string>('básico');
  const [basePrice, setBasePrice] = useState<number>(40);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  useEffect(() => {
    let children = 0;
    let partners = 0;

    if (state && state.relations) {
      state.relations.forEach(relation => {
        if (relation.relation === 'partner') {
          partners += 1;
        } else if (relation.relation === 'child') {
          children += 1;
        }
      });

      setPlans([
        {
          name: 'básico',
          price: (1 + partners) * 60 + (children) * 40,
          base: 40,
        },
        {
          name: 'avanzado',
          price: (1 + partners) * 80 + (children) * 60,
          base: 60,
        },
        {
          name: 'premium',
          price: (1 + partners) * 100 + (children) * 80,
          base: 80,
        },
        {
          name: 'full',
          price: (1 + partners) * 120 + (children) * 100,
          base: 100,
        },
      ]);
      setQuantity(1 + partners + children);
      setPartners(partners);
      setChildren(children);
    }
  }, [state]);

  const handleBuy = () => {
    history.push('/gracias', {
      link: true,
    });
  }

  if (!state) {
    return <Redirect to='/' />;
  }

  return (
    <SmallLayout>
      <div className='plan_form'>
        <div className='plan_form_navigate'>
          <img
            src={Back}
            alt='back_button'
            onClick={() => history.replace('/datos', {
              ...state,
            })}
          />
          <p><span>PASO 2</span> DE 7</p>
        </div>

        <div className='plan_form_title'>
          <h2>Elige <span>tu protección</span></h2>
          <p className=''>Selecciona un plan de salud ideal.</p>
        </div>

        <div className='plan_form_wrapper'>
          <div>
            {plans.map(plan => (
              <PlanBox
                key={plan.name}
                selected={plan.name === selectedPlan}
                name={plan.name}
                price={plan.price}
                onClick={() => {
                  setSelectedPlan(plan.name);
                  setBasePrice(plan.base);
                }}
              />
            ))}
          </div>
        </div>

        <div className='plan_form_summary'>
          <p>{`Tienes (${quantity}) asegurados`}</p>
          <div onClick={() => setOpenDetail(!openDetail)}>
            <span>RESUMEN DEL PLAN</span>
            <img src={Down} alt='drop'/>
          </div>
        </div>

        <Dropdown open={openDetail}>
          <PriceRow
            label='Titular'
            price={basePrice + 20}
          />
          {state.relations && state.relations.map(relation => (
            <PriceRow
              key={relation.id}
              label={relation.relation === 'child' ? 'Hijo' : 'Cónyugue'}
              price={relation.relation === 'child' ? basePrice : basePrice + 20}
            />
          ))}

          <div className='plan_form_total'>
            <p>PAGO TOTAL MENSUAL</p>
            <span>{`S/ ${((1 + partners) * (basePrice + 20)) + (children * basePrice)}`}</span>
          </div>
        </Dropdown>

        <PlanCard plan={selectedPlan}/>

        <div className='plan_form_tyc'>
          <div className='plan_form_tyc-title'>
            <h2>Revisa nuestros<br/><span>servicios y exclusiones</span></h2>
            <img src={Guy} alt='check_guy'/>
          </div>

          <div
            className='plan_form_tyc-item'
            onClick={() => setOpenServices(!openServices)}
          >
            <h2>Servicios brindados</h2>
            <img src={DownRed} alt='drop'/>
          </div>

          <Dropdown open={openServices}>
            <div className='text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
          </Dropdown>

          <div
            className='plan_form_tyc-item'
            onClick={() => setOpenExclusions(!openExclusions)}
          >
            <h2>Exclusiones</h2>
            <img src={DownRed} alt='drop'/>
          </div>

          <Dropdown open={openExclusions}>
            <div className='text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
          </Dropdown>
        </div>

        <div className='plan_form_buttons'>
          <span className='send-button'>ENVIAR COTIZACIÓN POR CORREO</span>
          <Button
            disabled={!selectedPlan}
            onClick={() => handleBuy()}
            label='COMPRAR PLAN'
          />
        </div>
      </div>
    </SmallLayout>
  );
};

export default Plans;