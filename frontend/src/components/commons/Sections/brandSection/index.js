import { useState, useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";

import List from "../../../commons/ListItems/index";
import SearchBar from "../../../commons/SearchBar/index";

import {
  STORE_BRANDS,
  INITIAL_STATE,
  SELECT_BRAND,
  CHANGE_BRAND_NAME,
} from "../../../../utils/store/reducers/brands";
import { STORE_YEARS } from "../../../../utils/store/reducers/years";

const BrandSection = (props) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    // if (props.brandsState.length > 0) {
    //   setBrandsState(props.brandsState.brands);
    // } else {
    //   retrieveData();
    // }
    retrieveData();
  }, []);

  const saveYears = (id) => {
    const data = cars.find((allCars) => allCars._id == id);
    props.onStoreYears({ years: data.years, brand: data.name });
    props.onSelectBrand(id);
  };

  const searchBrandHandler = (e) => {
    let searchTerm = e.target.value;
    let filtered = cars.filter((car) => {
      return car.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCars(filtered);
  };

  const setBrandsState = (data) => {
    setCars(data);
    setFilteredCars(data);
  };

  const retrieveData = () => {
    privAxios
      .get(URL + "/brands/getbrands")
      .then((brands) => {
        setBrandsState(brands.data);
        props.onStoreBrands(brands.data);
        if (brands.data.length === 0) {
          props.onInitialState();
        }
      })
      .catch((e) => console.log(e));
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
            .delete(URL + "/brands/deletebrand", {
              data: {
                brandID: id,
              },
            })
            .then((res) => retrieveData())
            .catch((e) => console.log(e));
        }
      });
  };

  const updateHandler = async (brand) => {
    try {
      const { value: formValues } = await swal.fire({
        title: "Editar Marca",
        html:
          "<p>Nombre</p>" +
          `<input id="brand-name" class="swal2-input" value="${brand.name}">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("brand-name").value];
        },
      });

      if (formValues) {
        if (formValues[0].split() !== "") {
          const resp = await privAxios.put(URL + "/brands/updatebrand", {
            brandID: brand._id,
            name: formValues[0],
          });

          if (resp.status === 200) {
            props.onChangeBrandName({ _id: brand._id, name: formValues[0] });

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
      <SearchBar onChange={(e) => searchBrandHandler(e)} />
      <List
        isInAdmin={props.isInAdmin}
        deleteHandler={(id) => deleteItem(id)}
        updateHandler={(id) => updateHandler(id)}
        items={filteredCars}
        onClick={(id) => saveYears(id)}
        labels
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    brandsState: state.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreYears: (data) =>
      dispatch({
        type: STORE_YEARS,
        payload: data,
      }),
    onStoreBrands: (brands) => {
      dispatch({
        type: STORE_BRANDS,
        brands: brands,
      });
    },
    onInitialState: () => {
      dispatch({
        type: INITIAL_STATE,
      });
    },
    onSelectBrand: (id) => {
      dispatch({
        type: SELECT_BRAND,
        payload: id,
      });
    },
    onChangeBrandName: (brand) => {
      dispatch({
        type: CHANGE_BRAND_NAME,
        payload: brand,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandSection);
