import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { pubAxios, setJWT } from "../../../utils/axios";
import { LOGIN_SUCCESS } from "../../../utils/store/reducers/auth";
import { URL } from "../../../utils/config";
import { ADMIN } from "../../../utils/roles";

import Input from "../../commons/Input/SingleInput/index";
import Button from "../../commons/Button/index";

import { StyledDiv, StyledForm, StyledImage } from "./style";

const Login = (props) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const routeHistory = useHistory();

  useEffect(() => {
    if (props.authState.logged) {
      if(props.authState.role == ADMIN) {
        routeHistory.replace({ pathname: "/admin" });
      }
      else {
        routeHistory.replace({pathname: "/info"});
      }
    }
  }, []);

  const formHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form };

    newForm[name] = value;
    setForm(newForm);
  };

  const onLogin = () => {
    pubAxios
      .post(URL + "/auth/login", {
        username: form.username,
        password: form.password,
      })
      .then((user) => {
        props.onStoreAuth({
          jwt: user.data.token,
          userID: user.data.userID,
          role: user.data.role
        });
        setJWT(user.data.token);
        if(user.data.role == ADMIN) {
          routeHistory.replace({ pathname: "/admin" });
        }
        else {
          routeHistory.replace({pathname: "/info"});
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Error!",
          text: "Usuario o Contraseña erróneos",
          icon: "error",
          showConfirmButton: false,
          timer: 800,
        });
      });
  };

  return (
    <StyledDiv>
      <StyledImage></StyledImage>
      <StyledForm>
        <h1>Inicio de Sesión</h1>
        <Input label="Usuario:" name="username" onChange={formHandler} />
        <Input
          label="Contraseña:"
          name="password"
          onChange={formHandler}
          type="password"
        />
        <Button onClick={onLogin}>Iniciar Sesión</Button>
      </StyledForm>
    </StyledDiv>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreAuth: (data) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
