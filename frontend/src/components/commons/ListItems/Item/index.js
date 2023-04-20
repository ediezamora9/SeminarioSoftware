import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ADMIN } from "../../../../utils/roles";

import { StyledItem } from "./style";

const item = (props) => {
  let returnedItem = !props.none ? (
    <div className="linkContainer" onClick={props.onClick}>
      <Link to={props.link}>{props.children}</Link>
    </div>
  ) : (
    <div>
      <p>{props.children}</p>
    </div>
  );
  return (
    <StyledItem>
      {returnedItem}
      {props.userRole === ADMIN && props.isInAdmin ? (
        <div className="adminBtnsContainer">
          {props.updateHandler ? (
            <button onClick={props.updateHandler} className="updateBtn">
              Editar
            </button>
          ) : null}
          <button onClick={props.deleteHandler} className="deleteBtn">
            Borrar
          </button>
        </div>
      ) : null}
    </StyledItem>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.auth.role,
  };
};

export default connect(mapStateToProps)(item);
