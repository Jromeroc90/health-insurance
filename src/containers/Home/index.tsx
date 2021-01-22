import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '../../components/atoms';
import { SelectWithInput } from '../../components/molecules';
import { Layout } from '../../components/organisms';
import { dateValidation, phoneValidation, documentValidation } from '../../util/functions';
import './styles.scss';

type FormType = {
  document_type: string;
  document_number: string;
  birthday: string;
  phone: string;
  dataAgree: boolean;
  sendAgree: boolean;
};

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

const Home: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState<FormType>({
    document_type: 'dni',
    document_number: '',
    birthday: '',
    phone: '',
    dataAgree: false,
    sendAgree: false,
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState({
    document_number: false,
    birthday: false,
    phone: false,
  });

  useEffect(() => {
    if (form.dataAgree && form.sendAgree) {
      setDisabled(false);
    }
  }, [form.dataAgree, form.sendAgree]);

  const handleValidate = () => {
    let isValid = true;
    const validation = {
      document_number: false,
      birthday: false,
      phone: false,
    }
    if (!dateValidation(form.birthday)) {
      validation.birthday = true;
      isValid = false;
    }
    if (!phoneValidation(form.phone)) {
      validation.phone = true;
      isValid = false;
    }
    if (!documentValidation(form.document_number, form.document_type)) {
      validation.document_number = true;
      isValid = false;
    }

    setErrors(validation);

    if (!isValid) {
      return;
    }

    axios.post('https://freestyle.getsandbox.com/dummy/obtenerdatospersona', {}, {
      headers: {
        'Content-type': 'application/json',
      }
    })
      .then(() => {
        history.push('/datos', {
          new: false,
          document_type: form.document_type,
          document_number: form.document_number,
          name: 'Julio',
          last_name: 'Romero',
          maternal_name: 'Cárdenas',
          birthday: form.birthday,
          genre: 'm',
        });
      })
      .catch(err => {
        console.log(err);
        history.push('/datos', form.document_number === '46481023'
          ? {
            new: false,
            document_type: form.document_type,
            document_number: form.document_number,
            name: 'Julio',
            last_name: 'Romero',
            maternal_name: 'Cárdenas',
            birthday: form.birthday,
            genre: 'm',
          }
          : {
            new: true,
          });
      })
  }

  return (
    <Layout>
      <div className='home_form'>
        <div className='home_form_title'>
          <h2>Obtén tu <span>seguro ahora</span></h2>
          <p className=''>Ingresa los datos para comenzar.</p>
        </div>

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
          calendar
          value={form.birthday}
          label='Fecha de nacimiento'
          onChange={text => setForm({
            ...form,
            birthday: text,
          })}
          error={errors.birthday}
          margin='16px 0 0'
        />

        {errors.birthday && (
          <Message>{`La fecha es inválida. Use el formato DD/MM/AAAA.`}</Message>
        )}

        <Input
          value={form.phone}
          label='Celular'
          onChange={(text) => setForm({
            ...form,
            phone: text,
          })}
          maxLength={9}
          error={errors.phone}
          margin='16px 0 0'
        />

        {errors.phone && (
          <Message>{`Tu número de celular es inválido.`}</Message>
        )}

        <Checkbox
          checked={form.dataAgree}
          onChange={checked => setForm({
            ...form,
            dataAgree: checked,
          })}
          label={
            <p className='checkbox_label'>
              Acepto la <span>Política de Protección de Datos Personales y los Términos y Condiciones.</span>
            </p>
          }
          margin='16px 0 10px'
        />

        <Checkbox
          checked={form.sendAgree}
          onChange={checked => setForm({
            ...form,
            sendAgree: checked,
          })}
          label={
            <p className='checkbox_label'>
              Acepto la <span>Política de Envío de Comunicaciones Comerciales.</span>
            </p>
          }
        />

        <Button
          disabled={disabled}
          onClick={() => handleValidate()}
          label='COMENCEMOS'
          margin='25px 0 0'
        />
      </div>
    </Layout>
  );
};

export default Home;