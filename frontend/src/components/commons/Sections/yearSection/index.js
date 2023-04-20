import { useEffect, useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";
import { SELECT_BRAND } from "../../../../utils/store/reducers/brands";
import { INITIAL_STATE } from "../../../../utils/store/reducers/years";

import List from "../../ListItems/index";
import RouteP from "../../RouteP/index";

const YearsSection = (props) => {
  const [route, setRoute] = useState("");
  const [years, setYears] = useState([]);

  const brandID = props.brandID;

  useEffect(() => {
    // if (props.yearsState.years.length > 0) {
    //   sortYears(props.yearsState.years);
    //   setRoute(props.yearsState.brand);
    // } else {
    //   retrieveData();
    // }

    retrieveData();
  }, []);

  const sortYears = (years) => {
    const sortedYears = years.sort((a, b) => b - a);
    setYears(sortedYears);
  };

  const retrieveData = () => {
    privAxios
      .get(URL + "/brands/getbrand/" + brandID)
      .then((brands) => {
        props.onSelectBrand(brands.data._id);
        sortYears(brands.data.years);
        setRoute(brands.data.name);
      })
      .catch((e) => console.log(e));
  };

  const deleteHandler = (year) => {
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
          props.OnInitialState();
          privAxios
            .put(URL + "/brands/deleteyear", {
              brandID: brandID,
              year: year,
            })
            .then((res) => retrieveData())
            .catch((e) => console.log(e));
        }
      });
  };

  const updateHandler = async (prevYear) => {
    try {
      const { value: formValues } = await swal.fire({
        title: "Editar Año",
        html:
          "<p>Año</p>" +
          `<input id="year-id" class="swal2-input" value="${prevYear}">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("year-id").value];
        },
      });

      if(formValues) {
        if (formValues[0].split() !== "") {
          const resp = await privAxios.put(URL + "/brands/updateyear", {
            brandID: props.brandsState.currentBrand,
            year: Number(formValues[0]),
            prevYear: Number(prevYear),
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
        updateHandler={(year) => updateHandler(year)}
        deleteHandler={(year) => deleteHandler(year)}
        items={years}
        variant
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    yearsState: state.years,
    brandsState: state.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnInitialState: () =>
      dispatch({
        type: INITIAL_STATE,
      }),
    onSelectBrand: (id) => {
      dispatch({
        type: SELECT_BRAND,
        payload: id,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearsSection);
