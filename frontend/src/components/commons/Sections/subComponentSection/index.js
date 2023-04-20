import { useEffect, useState } from "react";
import swal from 'sweetalert2';

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";

import List from "../../../commons/ListItems/index";
import RouteP from '../../RouteP/index';

const SubComponentSection = (props) => {
  const engineID = props.engineID;
  const category = props.category;
  const year = props.year;
  const [subComponents, setSubComponents] = useState([]);
  const [route, setRoute] = useState("");

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    privAxios
    .get(URL + "/subcomponents/getsubcomponents/" + engineID + "/" + category)
    .then((subComponents) => {
      setSubComponents(subComponents.data);
      if(subComponents.data.length > 0) {
        setRoute(`${subComponents.data[0].brandID.name}/${year}/${subComponents.data[0].modelID.name}/${subComponents.data[0].engineID.name}/${category}`);
      }
    })
    .catch((e) => console.log(e));
  }

  const deleteItem = (id) => {
    swal.fire({
      title: '¿Estás seguro?',
      text:"Esto eliminará todos los componentes de adentro también, está acción es irreversible",
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#18a30b',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#a30723',
    })
    .then((res) => {
      if(res.isConfirmed) {
        privAxios.delete(URL + '/subcomponents/deletesubcomponent',
        {
          data: {
            subComponentID:id
          }
        })
        .then(res => retrieveData())
        .catch(e => console.log(e));
      }
    })
  }

  const updateHandler = async (subComponent) => {
    try {
      const { value: formValues } = await swal.fire({
        title: "Editar Motor",
        html:
          "<p>Nombre</p>" +
          `<input id="engine-name" class="swal2-input" value="${subComponent.name}">`,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("engine-name").value];
        },
      });

      if (formValues) {
        if (formValues[0].split() !== "") {
          const resp = await privAxios.put(URL + "/subcomponents/updatesubcomponent", {
            subComponentID: subComponent._id,
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
  }

  return (
    <div>
      <RouteP>{route}</RouteP>
      <List isInAdmin={props.isInAdmin} updateHandler={(item) => updateHandler(item)} deleteHandler={(id) => deleteItem(id)} items={subComponents} onClick={() => {}} />
    </div>
  );
};

export default SubComponentSection;
