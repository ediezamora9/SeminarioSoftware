import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { URL_IMAGES } from "../../../../utils/config";

import RouteP from "../../RouteP/index";

import { StyledPart } from "./style";
import { connect } from "react-redux";
import { ADMIN } from "../../../../utils/roles";

const SinglePartSection = (props) => {

  // const brandID = props.brandID;
  // const year = props.year;
  // const modelID = props.modelID;
  // const engineID = props.engineID;
  // const category = props.category;
  // const subComponentID = props.subComponentID;
  // const partID = props.partID;

  const history = useHistory();

  const editHandler = () => {
    console.log(props);
    history.push(`/admin/main/edit/${props.part.brandID._id}/${props.part.year}/${props.part.modelID._id}/${props.part.engineID._id}/${props.part.category}/${props.part.subComponentID._id}/${props.part._id}/`);
  }

  return (
    <Fragment>
      {props.part.name ? (
        <Fragment>
          <RouteP>{props.route}</RouteP>
          <StyledPart>
            <div className="title">
              <h1>{props.part.name}</h1>
            </div>
            <div className="content">
              {props.authState.role === ADMIN ? (
                <button onClick={editHandler} className="editButton">
                  Editar
                </button>
              ) : null}
              {props.part.photoUrl && (
                <img src={URL_IMAGES + props.part.photoUrl} />
              )}
              <p className="bold">
                {props.part.cod && "Código: " + props.part.cod}
              </p>
              <div className="spec">
                <p>{props.part.partBrand && "Marca: "}</p>
                <p>{props.part.partBrand && props.part.partBrand}</p>
              </div>
              <div className="spec">
                <p>{props.part.price && "Precio: "}</p>
                <p>{props.part.price && props.part.price}</p>
              </div>
              <p className="bold">{props.part.description && "Descripción:"}</p>
              <p>{props.part.description && props.part.description}</p>
              {props.part.details ? (
                <div>
                  {props.part.details.length > 0 ? (
                    <p className="bold">Especificaciones: </p>
                  ) : null}
                  <ul>
                    {props.part.details.map((data) => {
                      return <li key={data}>{data}</li>;
                    })}
                  </ul>
                </div>
              ) : null}
              {props.part.referenceCodes ? (
                <div>
                  {props.part.referenceCodes.length > 0 ? (
                    <p className="bold">Códigos de Equivalencia: </p>
                  ) : null}
                  <ul>
                    {props.part.referenceCodes.map((data) => {
                      return <li key={data}>{data}</li>;
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          </StyledPart>
        </Fragment>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          No hay información sobre esta parte.
        </h1>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

export default connect(mapStateToProps)(SinglePartSection);
