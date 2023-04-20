import { useEffect, useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";

import List from "../../../commons/ListItems/index";
import RouteP from "../../RouteP/index";

import {
  STORE_ENGINES,
  INITIAL_STATE,
} from "../../../../utils/store/reducers/engine";
import { STORE_COMPONENTS } from "../../../../utils/store/reducers/components";

const EngineSection = (props) => {
  const modelID = props.modelID;
  const year = props.year;

  const [engines, setEngines] = useState([]);
  const [route, setRoute] = useState("");

  useEffect(() => {
    // if (props.enginesState.engines.length > 0) {
    //   if (modelID !== props.enginesState.engines[0]["modelID"]["_id"]) {
    //     retrieveData();
    //   } else {
    //     setEngines(props.enginesState.engines);
    //     setRoute(
    //       `${props.enginesState.route.brand}/${year}/${props.enginesState.route.model}`
    //     );
    //   }
    // } else {
    //   retrieveData();
    // }
    retrieveData();
  }, []);

  const retrieveData = () => {
    privAxios
      .get(URL + "/engines/getengines/" + modelID)
      .then((engines) => {
        setEngines(engines.data);
        if (engines.data.length > 0) {
          props.onStoreEngines({
            engines: engines.data,
            brand: engines.data[0].brandID.name,
            year: year,
            model: engines.data[0].modelID.name,
          });
          setRoute(
            `${engines.data[0].brandID.name}/${year}/${engines.data[0].modelID.name}`
          );
        } else {
          props.onInitialState();
        }
      })
      .catch((e) => console.log(e));
  };

  const storeComponents = (id) => {
    const data = engines.find((allEngines) => allEngines._id == id);
    props.onStoreComponents({
      components: data.components,
      brand: data.brandID.name,
      year: year,
      model: data.modelID.name,
      engine: data.name,
    });
  };

  const deleteItem = (id) => {
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
            .delete(URL + "/engines/deleteengine", {
              data: {
                engineID: id,
              },
            })
            .then((res) => retrieveData())
            .catch((e) => console.log(e));
        }
      });
  };

  const updateHandler = async (engine) => {
    try {
      const { value: formValues } = await swal.fire({
        title: "Editar Motor",
        html:
          "<p>Nombre</p>" +
          `<input id="engine-name" class="swal2-input" value="${engine.name}">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("engine-name").value];
        },
      });

      if (formValues) {
        if (formValues[0].split() !== "") {
          const resp = await privAxios.put(URL + "/engines/updateengine", {
            engineID: engine._id,
            name: formValues[0],
          });

          retrieveData();

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
      {/* <SearchBar /> */}
      <RouteP>{route}</RouteP>
      <List
        deleteHandler={(id) => deleteItem(id)}
        updateHandler={(item) => updateHandler(item)}
        isInAdmin={props.isInAdmin}
        items={engines}
        onClick={(id) => storeComponents(id)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    enginesState: state.engines,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreComponents: (data) =>
      dispatch({
        type: STORE_COMPONENTS,
        payload: data,
      }),
    onStoreEngines: (data) =>
      dispatch({
        type: STORE_ENGINES,
        payload: data,
      }),
    onInitialState: () => {
      dispatch({
        type: INITIAL_STATE,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EngineSection);
