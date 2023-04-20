import { useState } from "react";

import { privAxios } from "../../../utils/axios";
import { URL } from "../../../utils/config";

import GeneralForm from "../../commons/Forms/GeneralForm/index";

const AddEnginePage = (props) => {
  const [form, setForm] = useState({
    name: "",
    component: "",
  });

  const [components, setComponents] = useState([]);

  const modelID = props.match.params.modelID;
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;

  const formHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    newForm[name] = value;
    setForm(newForm);
  };

  const onSave = (e) => {
    privAxios
      .post(URL + "/engines/addengine", {
        name: form.name,
        components: components,
        modelID: modelID,
        brandID: brandID,
        year: year,
      })
      .then((res) => {
      setComponents([]);
        setForm({
          ...form,
          name: "",
          component: "",
        });
      })
      .catch((e) => console.log(e));
  };

  const onAddComponent = () => {
    const newYears = [...components];
    if (!newYears.includes(form.component)) {
      newYears.push(form.component);
      setComponents(newYears);
      setForm({
        ...form,
        component: "",
      });
    }
  };

  const deleteComponent = (componentName) => {
    setComponents(
      components.filter((component) => component !== componentName)
    );
  };

  return (
    <GeneralForm
      title="Agregar Motor"
      nameLbl="Nombre:"
      listLbl="Categoria:"
      items={components}
      onChange={formHandler}
      names={{ nameInput: "name", listInput: "component" }}
      values={{ nameValue: form.name, listValue: form.component }}
      onClicks={{ add: onAddComponent, save: onSave, deleteItem: deleteComponent }}
    />
  );
};

export default AddEnginePage;
