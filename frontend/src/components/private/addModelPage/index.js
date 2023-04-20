import { useState, Fragment } from 'react';

import { privAxios } from '../../../utils/axios';
import { URL } from '../../../utils/config';

import GeneralForm from '../../commons/Forms/GeneralForm/index';
 
const AddModelPage = (props) => {
  const [form, setForm] = useState({
    name: ""
  });

  const brandID = props.match.params.brandID;
  const year = props.match.params.year;

  const formHandler = (e) => {
    const { name, value  } = e.target;
    const newForm = {...form};

    newForm[name] = value;
    setForm(newForm);
  }

  const onSave = (e) => {
    privAxios.post(URL + '/models/addmodel', 
    {
      name: form.name,
      brandID: brandID,
      year: year
    })
    .then((res) => {
      setForm(
        {
          ...form,
          name: ""
        }
      );
    })
    .catch(e => console.log(e));
  }

	return (
    <Fragment>
      <GeneralForm title="Agregar Modelo" nameLbl="Nombre:" onChange={formHandler} names={{nameInput:"name"}} values={{nameValue: form.name}} onClicks={{save:onSave}} />
    </Fragment>
	);
};

export default AddModelPage;