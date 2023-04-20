import { useState, Fragment, useEffect } from "react";

import { privAxios } from "../../../utils/axios";
import { URL } from "../../../utils/config";

import GeneralForm from "../../commons/Forms/GeneralForm/index";

const AddYearPage = (props) => {
  const [form, setForm] = useState({
    name: "",
    year: "",
  });

  const [years, setYears] = useState([]);

  const brandID = props.match.params.brandID;

  useEffect(() => {
    privAxios
      .get(URL + "/brands/getbrand/" + brandID)
      .then((brands) => setYears(brands.data.years))
      .catch((e) => console.log(e));
  }, []);

  const formHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    newForm[name] = value;
    setForm(newForm);
  };

  const onSave = (e) => {
    privAxios
      .put(URL + "/brands/addyear", {
        brandID: brandID,
        year: years,
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
    console.log(newYears);
    if (!newYears.includes(parseInt(form.year))) {
      newYears.push(parseInt(form.year));
      setYears(newYears);
      setForm({
        ...form,
        year: "",
      });
    }
  };

  return (
    <Fragment>
      {/* <p>Marca</p> */}
      <GeneralForm
        title="Agregar Año"
        listLbl="Año:"
        items={years}
        onChange={formHandler}
        names={{ listInput: "year" }}
        values={{ listValue: form.year }}
        onClicks={{ add: onAddYear, save: onSave }}
      />
    </Fragment>
  );
};

export default AddYearPage;
