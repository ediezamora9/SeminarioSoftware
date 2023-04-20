import { useState } from "react";

import { privAxios } from "../../../utils/axios";
import { URL } from "../../../utils/config";

import GeneralForm from "../../commons/Forms/GeneralForm/index";

const AddBrandPage = (props) => {
  const [form, setForm] = useState({
    name: "",
    year: "",
  });

  const [years, setYears] = useState([]);

  const formHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    newForm[name] = value;
    setForm(newForm);
  };

  const onSave = (e) => {
    privAxios
      .post(URL + "/brands/addbrand", {
        name: form.name.charAt(0).toUpperCase() + form.name.slice(1),
        years: years,
      })
      .then((res) => {
        setYears([]);
        setForm({
          ...form,
          name: "",
          year: "",
        });
      })
      .catch((e) => console.log(e));
  };

  const onAddYear = () => {
    const newYears = [...years];
    if (!newYears.includes(parseInt(form.year))) {
      newYears.push(parseInt(form.year));
      setYears(newYears);
      setForm({
        ...form,
        year: "",
      });
    }
  };

  const deleteYear = (yearName) => {
    setYears(years.filter((year) => year !== yearName));
  };

  return (
    <GeneralForm
      title="Agregar Marca"
      nameLbl="Nombre:"
      listLbl="Año:"
      items={years}
      onChange={formHandler}
      names={{ nameInput: "name", listInput: "year" }}
      values={{ nameValue: form.name, listValue: form.year }}
      onClicks={{ add: onAddYear, save: onSave, deleteItem: deleteYear }}
    />
  );
};

export default AddBrandPage;
