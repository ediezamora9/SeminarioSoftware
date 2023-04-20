import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert2';

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";
import { SELECT_PART } from "../../../../utils/store/reducers/part";

import List from "../../../commons/ListItems/index";
import RouteP from '../../RouteP/index';

const PartsPage = (props) => {
  const brandID = props.brandID;
  const year = props.year;
  const modelID = props.modelID;
  const engineID = props.modelID;
  const category = props.category;
  const subComponentID = props.subComponentID;

  const [parts, setParts] = useState([]);
  const [route, setRoute] = useState("");

  const history = useHistory();

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    privAxios.get(URL + '/parts/getparts/' + subComponentID)
    .then(parts => {
      setParts(parts.data);
      if(parts.data.length > 0) {
        setRoute(`${parts.data[0].brandID.name}/${year}/${parts.data[0].modelID.name}/${parts.data[0].engineID.name}/${category}/${parts.data[0].subComponentID.name}`);
      }
    })
    .catch(e => console.log(e));
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
        privAxios.delete(URL + '/parts/deletepart',
        {
          data: {
            partID:id
          }
        })
        .then(res => retrieveData())
        .catch(e => console.log(e));
      }
    })
  }

  const updateHandler = (item) => {
    props.onSelectPart(item);
    history.push(`/admin/main/edit/${brandID}/${year}/${modelID}/${engineID}/${category}/${subComponentID}/${item._id}/`);
  } 

  return (
    <div>
      <RouteP>{route}</RouteP>
      <List isInAdmin={props.isInAdmin} updateHandler={(item) => updateHandler(item)} deleteHandler={(id) => deleteItem(id)} none={props.none} items={parts} onClick={() => {}} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectPart: (data) =>
      dispatch({
        type: SELECT_PART,
        payload: data,
      }),
  };
};

export default connect(null, mapDispatchToProps)(PartsPage);

