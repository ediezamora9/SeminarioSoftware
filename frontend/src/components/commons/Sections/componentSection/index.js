import { useEffect, useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";

import List from "../../../commons/ListItems/index";
import RouteP from "../../RouteP/index";

const ComponentSection = (props) => {
  const engineID = props.engineID;
  const year = props.year;
  const [components, setComponents] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // if (props.componentsState.components.length > 0) {
    //   setComponents(props.componentsState.components);
    //   setRoute(
    //     `${props.componentsState.route.brand}/${year}/${props.componentsState.route.model}/${props.componentsState.route.engine}`
    //   );
    // } else {
    //   retrieveData();
    // }
    retrieveData();
  }, []);

  const retrieveData = () => {
    privAxios
      .get(URL + "/engines/getengine/" + engineID)
      .then((engine) => {
        setComponents(engine.data.components);
        setRoute(
          `${engine.data.brandID.name}/${year}/${engine.data.modelID.name}/${engine.data.name}`
        );
      })
      .catch((e) => console.log(e));
  };

  const deleteHandler = (component) => {
    swal
      .fire({
        title: "¿Estás seguro?",
        text: "Esto eliminará todos los componentes de adentro también, está acción es irreversible",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#18a30b",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#a30723",
      })
      .then((res) => {
        if (res.isConfirmed) {
          privAxios
            .put(URL + "/engines/deletecomponent", {
              engineID: engineID,
              component: component,
            })
            .then((res) => retrieveData())
            .catch((e) => console.log(e));
        }
      });
  };

  const updateHandler = async (prevComponent) => {
    try {
      const { value: formValues } = await swal.fire({
        title: "Editar Component",
        html:
          "<p>Año</p>" +
          `<input id="component-id" class="swal2-input" value="${prevComponent}">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("component-id").value];
        },
      });

      if (formValues) {
        if (formValues[0].split() !== "") {
          const resp = await privAxios.put(URL + "/engines/updatecomponent", {
            engineID: props.engineID,
            component: formValues[0],
            prevComponent: prevComponent,
          });

          if (resp.status === 200) {
            swal.fire({
              title: "Actualizado correctamente",
            });

            retrieveData();
          } else {
            swal.fire({
              title: "No se pudo actualizar",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <RouteP>{route}</RouteP>
      <List
        isInAdmin={props.isInAdmin}
        deleteHandler={(component) => deleteHandler(component)}
        updateHandler={(prevComponent) => updateHandler(prevComponent)}
        items={components}
        variant
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    componentsState: state.components,
  };
};

export default connect(mapStateToProps)(ComponentSection);
