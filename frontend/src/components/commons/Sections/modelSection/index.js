import { useEffect, useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";

import List from "../../../commons/ListItems/index";
import SearchBar from "../../../commons/SearchBar/index";
import RouteP from "../../RouteP/index";

import {
  STORE_MODELS,
  INITIAL_STATE,
} from "../../../../utils/store/reducers/models";

const ModelSection = (props) => {
  const brandID = props.brandID;
  const year = props.year;

  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [route, setRoute] = useState("");

  useEffect(() => {
    // if (props.modelsState.models.length > 0) {
    //   if (
    //     brandID !== props.modelsState.models[0]["brandID"]["_id"] ||
    //     year !== props.modelsState.models[0]["year"]
    //   ) {
    //     retrieveData();
    //   } else {
    //     setModels(props.modelsState.models);
    //     setFilteredModels(props.modelsState.models);
    //     setRoute(
    //       `${props.modelsState.route.brand}/${props.modelsState.route.year}`
    //     );
    //   }
    // } else {
    //   retrieveData();
    // }

    retrieveData();
  }, []);

  const retrieveData = () => {
    privAxios
      .get(URL + "/models/getmodels/" + brandID + "/" + year)
      .then((models) => {
        setModels(models.data);
        setFilteredModels(models.data);
        if (models.data.length > 0) {
          props.onStoreModels({
            models: models.data,
            brand: models.data[0].brandID.name,
            year: year,
          });
          setRoute(`${models.data[0].brandID.name}/${year}`);
        } else {
          props.onInitialState();
        }
      })
      .catch((e) => console.log(e));
  };

  const searchModelHandler = (e) => {
    let searchTerm = e.target.value;
    let filtered = models.filter((models) => {
      return models.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredModels(filtered);
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
            .delete(URL + "/models/deletemodel", {
              data: {
                modelID: id,
              },
            })
            .then((res) => retrieveData())
            .catch((e) => console.log(e));
        }
      });
  };

  const updateHandler = async (model) => {
    try {
      const { value: formValues } = await swal.fire({
        title: "Editar Modelo",
        html:
          "<p>Nombre</p>" +
          `<input id="model-name" class="swal2-input" value="${model.name}">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("model-name").value];
        },
      });

      if(formValues) {        
        if (formValues[0].split() !== "") {
          const resp = await privAxios.put(URL + "/models/updatemodel", {
            modelID: model._id,
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
      <RouteP>{route}</RouteP>
      <SearchBar onChange={searchModelHandler} />
      <List
        isInAdmin={props.isInAdmin}
        updateHandler={(item) => updateHandler(item)}
        deleteHandler={(id) => deleteItem(id)}
        items={filteredModels}
        onClick={() => {}}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modelsState: state.models,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreModels: (data) => {
      dispatch({
        type: STORE_MODELS,
        payload: data,
      });
    },
    onInitialState: () => {
      dispatch({
        type: INITIAL_STATE,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelSection);
