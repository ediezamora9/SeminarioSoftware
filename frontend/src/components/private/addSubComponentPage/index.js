import { useState, Fragment } from 'react';

import { privAxios } from '../../../utils/axios';
import { URL } from '../../../utils/config';

import GeneralForm from '../../commons/Forms/GeneralForm/index';
 
const AddSubComponentPage = (props) => {
  const [form, setForm] = useState({
    name: ""
  });

  const engineID = props.match.params.engineID;
  const category = props.match.params.category;
  const brandID = props.match.params.brandID;
  const modelID = props.match.params.modelID;
  const year = props.match.params.year;

  const formHandler = (e) => {
    const { name, value  } = e.target;
    const newForm = {...form};

    newForm[name] = value;
    setForm(newForm);
  }

  const onSave = (e) => {
    privAxios.post(URL + '/subcomponents/addsubcomponent', 
    {
      name: form.name,
      engineID: engineID,
      category: category,
      brandID: brandID,
      modelID: modelID,
      year:year
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
      {/* <p>Marca - Año</p> */}
      <GeneralForm title="Agregar Componente" nameLbl="Nombre:" onChange={formHandler} names={{nameInput:"name"}} values={{nameValue: form.name}} onClicks={{save:onSave}} />
    </Fragment>
	);
};

export default AddSubComponentPage;