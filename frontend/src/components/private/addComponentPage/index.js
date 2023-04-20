import { useState, Fragment, useEffect } from 'react';

import { privAxios } from '../../../utils/axios';
import { URL } from '../../../utils/config';

import GeneralForm from '../../commons/Forms/GeneralForm/index';
 
const AddCategoryPage = (props) => {
  const [form, setForm] = useState({
    component: ""
  });

  const [components, setComponents] = useState([]);

  const engineID = props.match.params.engineID;

  useEffect(() => {
    privAxios.get(URL + '/engines/getengine/' + engineID)
    .then(engine => setComponents(engine.data.components))
    .catch(e => console.log(e));
  }, []);

  const formHandler = (e) => {
    const { name, value  } = e.target;
    const newForm = {...form};

    newForm[name] = value;
    setForm(newForm);
  }

  const onSave = (e) => {
    privAxios.put(URL + '/engines/addcomponents', 
    {
      engineID: engineID,
      components: components
    })
    .then((res) => {
      setForm(
        {
          ...form,
          component: ""
        }
      );
    })
    .catch(e => console.log(e));
  }

  const onAddComponent = () => {
    const newComponents = [...components];
    if(!newComponents.includes(form.component)) {
      newComponents.push(form.component);
      setComponents(newComponents);
      setForm({
        ...form,
        component: ""
      });
    }
  }

	return (
    <Fragment>
      <GeneralForm title="Agregar Categoria" listLbl="Categoria:" items={components} onChange={formHandler} names={{listInput:"component"}} values={{listValue: form.component}} onClicks={{add:onAddComponent, save:onSave}} />
    </Fragment>
	);
};

export default AddCategoryPage;