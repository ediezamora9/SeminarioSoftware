import { Fragment, useState } from "react";
import swal from "sweetalert2";

import { privAxios } from "../../../utils/axios";
import { URL } from "../../../utils/config";

import UserForm from "../../commons/Forms/UserForm/index";

const AddUserPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    newForm[name] = value;
    setForm(newForm);
  };

  const onAdd = () => {
    if(form.password === form.confirmPassword) {
      privAxios.post(URL + "/auth/signup",
      {
        username:form.username,
        password:form.password,
        role:"basic"
      }).then(() => {
        swal.fire({
          title: "Usuario Agregado Correctamente",
          icon: "success",
          timer: 800,
        });
        setForm({...form, username: "", password: "", confirmPassword: ""});
      }).catch(() => {
        swal.fire({
          title: "No se ha podido agregar",
          icon: "error",
          timer: 800,
        });
      });
    }
    else {
      swal.fire({
        title: "Las contraseñas no coinciden",
        icon: "error",
        timer: 800,
      });
    }
  };

  return (
    <Fragment>
      <UserForm
        title="Añadir Usuario"
        labels={{
          username: "Usuario:",
          password: "Contraseña:",
          confirmPassword: "Confirmar Contraseña:",
        }}
        names={{
          username: "username",
          password: "password",
          confirmPassword: "confirmPassword",
        }}
        values={{
          username: form.username,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }}
        onChange={formHandler}
        onClick={onAdd}
      />
    </Fragment>
  );
};

export default AddUserPage;
