import { Fragment, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { IoLogInOutline } from "react-icons/io5";

import NavBar from './NavBar/index';

import { ADMIN } from "../../../utils/roles";
import { LOGOUT } from "../../../utils/store/reducers/auth";

import { StyledHeader } from "./style";

const Header = (props) => {
  const [isActive, setActive] = useState(false);
  let links;
  const routeHistory = useHistory();

  const onLogout = () => {
    props.onLogout();
    routeHistory.replace({ pathname: "/login" });
  };

  if (props.role === ADMIN) {
    links = (
      <Fragment>
        <NavLink activeClassName="active" to="/info">
          Principal
        </NavLink>
        <NavLink exact activeClassName="active" to="/search">
          Buscar Parte
        </NavLink>
        <NavLink activeClassName="active" to="/admin">
          Administración
        </NavLink>
      </Fragment>
    );
  } else {
    links = (
      <Fragment>
        <NavLink activeClassName="active" to="/info">
          Principal
        </NavLink>
        <NavLink exact activeClassName="active" to="/search">
          Buscar Parte
        </NavLink>
      </Fragment>
    );
  }

  const navBarHandler = () => {
    let newActive = !isActive;
    setActive(newActive);
  }

  return (
    <StyledHeader>
      <NavBar isActive={isActive} onClick={navBarHandler}>
        {links}
      </NavBar>
      <IoLogInOutline size="2rem" onClick={onLogout} />
    </StyledHeader>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () =>
      dispatch({
        type: LOGOUT,
      }),
  };
};

export default connect(null, mapDispatchToProps)(Header);
