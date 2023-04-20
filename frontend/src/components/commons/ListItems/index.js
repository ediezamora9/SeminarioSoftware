import Item from "./Item/index";

import { ADMIN } from '../../../utils/roles';

import { StyledList, StyledPLabel } from "./style";

const List = (props) => {
    
  let list;
  if(props.variant) {
    list = props.items.map((item, index) => (
      <Item isInAdmin={props.isInAdmin} updateHandler={() => props.updateHandler(item)} deleteHandler={() => props.deleteHandler(item)} key={index} link={(window.location.pathname.slice(-1) === '/') ?  window.location.pathname + item : window.location.pathname + '/' + item}>
        {item}
      </Item>
    ));
  }
  else if(props.userVariant) {
    list = props.items.map((item) => {
    let isInAdmin = props.isInAdmin;
      if(item.role == ADMIN) {
        isInAdmin = null
      }
      else {
        isInAdmin = true
      }
      return (
        <Item none={props.none} isInAdmin={isInAdmin} /*updateHandler={() => props.updateHandler(item._id)}*/ deleteHandler={() => props.deleteHandler(item._id)} key={item._id} link={(window.location.pathname.slice(-1) === '/') ?  window.location.pathname + item._id : window.location.pathname + '/' + item._id}>
          {item.username}
        </Item>
      );
    });
  }
  else {
    let prevLabel = null;
    list = props.items.map(item => {
      let label = null;
      if(props.labels) {
        if(item.name.charAt(0) !== prevLabel) {
          label = item.name.charAt(0);
          prevLabel = label;
        }
      } 
      return (
        <div key={item._id}>
          <StyledPLabel>{label}</StyledPLabel>
          <Item 
            isInAdmin={props.isInAdmin}
            none={props.none}
            deleteHandler={() => props.deleteHandler(item._id)}
            updateHandler={() => props.updateHandler(item)}
            onClick={() => props.onClick(item._id)}
            link={(window.location.pathname.slice(-1) === '/') ?  window.location.pathname + item._id : window.location.pathname + '/' + item._id}
          >
            {item.name}
          </Item>
        </div>
      )
    })
  }

  return (
    <StyledList>
      {list}
    </StyledList>
  );
};

export default List;
