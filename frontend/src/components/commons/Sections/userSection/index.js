import { useEffect, useState } from "react";
import swal from 'sweetalert2';

import { privAxios } from "../../../../utils/axios";
import { URL } from "../../../../utils/config";

import List from "../../../commons/ListItems/index";

const UserSection = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    privAxios
    .get(URL + "/users/getallusers")
    .then((users) => {
      setUsers(users.data);
    })
    .catch((e) => console.log(e));
  }

  const deleteItem = (id) => {
    swal.fire({
      title: '¿Estás seguro?',
      text:"Esto eliminará el usuario, esta acción es irreversible.",
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#18a30b',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#a30723',
    })
    .then((res) => {
      if(res.isConfirmed) {
        privAxios.delete(URL + '/users/deleteuser',
        {
          data: {
            userID:id
          }
        })
        .then(res => retrieveData())
        .catch(e => console.log(e));
      }
    })
  }

  return (
    <div>
      <List isInAdmin={props.isInAdmin} userVariant none deleteHandler={(id) => deleteItem(id)} items={users} onClick={() => {}} />
    </div>
  );
};

export default UserSection;
