import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { Button, Input, Radio, Message } from '../../components/atoms';
import { SelectWithInput, FamilyRow } from '../../components/molecules';
import { SmallLayout } from '../../components/organisms';
import { dateValidation, documentValidation } from '../../util/functions';
import Back from '../../assets/images/icons/back.png';
import './styles.scss';

type StateType = {
  new: boolean;
  document_type?: string;
  document_number?: string;
  name?: string;
  last_name?: string;
  maternal_name?: string;
  birthday?: string;
  genre?: string;
}

type RelationType = {
  id: number,
  relation: string,
  birthday: string;
}

const documentOptions = [
  {
    value: 'dni',
    label: 'DNI',
  },
  {
    value: 'ce',
    label: 'C.E.',
  }
]

const options = [
  {
    value: 'partner',
    label: 'Cónyugue',
  },
  {
    value: 'child',
    label: 'Hijo',
  },
];

const Data: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation<StateType>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [form, setForm] = useState({
    name: state.name || '',
    last_name: state.last_name || '',
    maternal_name: state.maternal_name || '',
    document_type: state.document_type || 'dni',
    document_number: state.document_number || '',
    birthday: state.birthday || '',
    genre: state.genre || '',
    insurance: '',
  });
  const [errors, setErrors] = useState({
    document_number: false,
    birthday: false,
  });
  const [famForm, setFamForm] = useState({
    relation: 'partner',
    birthday: '',
  });
  const [index, setIndex] = useState<number>(1);
  const [famFormError, setFamFormError] = useState<boolean>(false);
  const [relations, setRelations] = useState<Array<RelationType>>([]);

  useEffect(() => {
    if (state.new) {
      if (
        (form.name && form.insurance && form.insurance !== 'family')
        || (form.name && form.insurance && form.insurance === 'family' && relations.length > 0)
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      // @ts-ignore
      const every = Object.keys(form).every(key => form[key]);
      if (
        (every && form.insurance !== 'family')
        || (every && form.insurance === 'family' && relations.length > 0)
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [form, relations]);

  const handleAddRelation = () => {
    let isValid = true;

    if (!dateValidation(famForm.birthday)) {
      setFamFormError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const aux = [
      ...relations,
      {
        id: index,
        relation: famForm.relation,
        birthday: famForm.birthday,
      },
    ];

    setFamFormError(false);
    setRelations(aux);
    setIndex(index + 1);
  }

  const handleDeleteRelation = (id: number) => {
    const aux = relations.filter(relation => relation.id !== id);
    setRelations(aux);
  }

  const handleContinue = () => {
    let isValid = true;

    const validation = {
      document_number: false,
      birthday: false,
    }

    if (!state.new) {
      if (!dateValidation(form.birthday)) {
        validation.birthday = true;
        isValid = false;
      }

      if (!documentValidation(form.document_number, form.document_type)) {
        validation.document_number = true;
        isValid = false;
      }
    }

    setErrors(validation);

    if (!isValid) {
      return;
    }

    history.push('/planes', {
      relations,
    });
  }

  if (!state) {
    return <Redirect to='/' />;
  }

  return (
    <SmallLayout>
      <div className='data_form'>
        <div className='data_form_navigate'>
          <img
            src={Back}
            alt='back_button'
            onClick={() => history.replace('/')}
          />
          <p><span>PASO 1</span> DE 7</p>
        </div>
        <div className='data_form_title'>
          {state.new ? (
            <>
              <h2>Hola, <span>¡empecemos!</span></h2>
              <p className=''>Cuentanos un poco sobre ti</p>
            </>
          ) : (
            <>
              <h2>Hola, <span>{state.name}</span></h2>
              <p className=''>Valida que los datos sean correctos.</p>
            </>
          )}
        </div>

        <p className='input_label'>
          {state.new
            ? 'Ingresa tu nombre'
            : 'Datos personales del titular'
          }
        </p>

        {state.new ? (
          <Input
            value={form.name}
            label='Nombre y apellido'
            onChange={text => setForm({
              ...form,
              name: text,
            })}
            margin='0 0 32px'
          />
        ) : (
          <>
            <SelectWithInput
              selectOptions={documentOptions}
              selectValue={form.document_type}
              inputValue={form.document_number}
              inputLabel='Nro. de documento'
              onInputChange={text => setForm({
                ...form,
                document_number: text,
              })}
              onSelectChange={value => setForm({
                ...form,
                document_type: value,
              })}
              maxLength={form.document_type === 'dni' ? 8 : 12}
              error={errors.document_number}
            />

            {errors.document_number && (
              <Message>{`Tu número de ${form.document_type.toUpperCase()} es inválido`}</Message>
            )}

            <Input
              value={form.name}
              label='Nombres'
              onChange={text => setForm({
                ...form,
                name: text,
              })}
              margin='16px 0 0'
            />

            <Input
              value={form.last_name}
              label='Apellido Paterno'
              onChange={text => setForm({
                ...form,
                last_name: text,
              })}
              margin='16px 0 0'
            />

            <Input
              value={form.maternal_name}
              label='Apellido Materno'
              onChange={text => setForm({
                ...form,
                maternal_name: text,
              })}
              margin='16px 0 0'
            />

            <Input
              value={form.birthday}
              label='Fecha de nacimiento'
              onChange={text => setForm({
                ...form,
                birthday: text,
              })}
              margin='16px 0 0'
              error={errors.birthday}
            />

            {errors.birthday && (
              <Message>{`La fecha es inválida. Use el formato DD/MM/AAAA.`}</Message>
            )}

            <p className='input_label small'>Género</p>

            <Radio
              name='genre'
              value='m'
              checked={form.genre === 'm'}
              label='Masculino'
              onChange={value => setForm({
                ...form,
                genre: value,
              })}
              margin='0 0 16px'
            />
            <Radio
              name='genre'
              value='f'
              checked={form.genre === 'f'}
              label='Femenino'
              onChange={value => setForm({
                ...form,
                genre: value,
              })}
              margin='0 0 40px'
            />
          </>
        )}

        <p className='input_label'>¿A quién vamos a asegurar?</p>

        <Radio
          name='insurance'
          value='me'
          checked={form.insurance === 'me'}
          label='Solo a mí'
          onChange={value => setForm({
            ...form,
            insurance: value,
          })}
          margin='0 0 16px'
        />
        <Radio
          name='insurance'
          value='family'
          checked={form.insurance === 'family'}
          label='A mí y mi familia'
          onChange={value => setForm({
            ...form,
            insurance: value,
          })}
          margin='0 0 40px'
        />

        {form.insurance === 'family' && (
          <>
            <p className='input_label'>Datos de tus familiares</p>

            <div className='relation_form'>
              <div className='relation_form_inputs'>
                <SelectWithInput
                  calendar
                  selectOptions={options}
                  selectValue={famForm.relation}
                  onSelectChange={value => setFamForm({
                    ...famForm,
                    relation: value,
                  })}
                  inputValue={famForm.birthday}
                  onInputChange={text => setFamForm({
                    ...famForm,
                    birthday: text,
                  })}
                  inputLabel='Fecha de nacimiento'
                  error={famFormError}
                />
              </div>
              <span
                className='relation_form_button'
                onClick={() => handleAddRelation()}
              >
                Agregar
              </span>
            </div>

            {famFormError && (
              <Message>{`La fecha es inválida. Use el formato DD/MM/AAAA.`}</Message>
            )}
            <div>
            {relations.map(relation => (
              <FamilyRow
                key={relation.id}
                relation={relation.relation === 'partner' ? 'Cónyugue' : 'Hijo'}
                birthday={relation.birthday}
                onDelete={() => handleDeleteRelation(relation.id)}
              />
            ))}
            </div>
          </>
        )}

        <div className='button_container'>
          <Button
            disabled={disabled}
            onClick={() => handleContinue()}
            label='CONTINUAR'
          />
        </div>
      </div>
    </SmallLayout>
  )
};

export default Data;