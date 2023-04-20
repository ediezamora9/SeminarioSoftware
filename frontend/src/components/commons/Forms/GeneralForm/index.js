import Button from "../../Button/index";
import SingleInput from "../../Input/SingleInput/index";
import ListInput from "../../Input/ListInput/index";

import { StyledForm } from "../style";

const generalForm = (props) => (
  <StyledForm>
    <h1>{props.title}</h1>
    {props.nameLbl ? (
      <SingleInput
        label={props.nameLbl}
        onChange={props.onChange}
        name={props.names.nameInput}
        value={props.values.nameValue}
      />
    ) : null}
    {props.listLbl ? (
      <ListInput
        label={props.listLbl}
        onChange={props.onChange}
        name={props.names.listInput}
        value={props.values.listValue}
        onClick={props.onClicks.add}
        theme="secondary"
        data={props.items}
        deleteItem={props.onClicks.deleteItem}
      />
    ) : null}
    <Button onClick={props.onClicks.save}>Guardar</Button>
  </StyledForm>
);

export default generalForm;
