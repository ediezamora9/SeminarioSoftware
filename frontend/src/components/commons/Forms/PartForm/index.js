import Button from "../../Button/index";
import SingleInput from "../../Input/SingleInput/index";
import ListInput from "../../Input/ListInput/index";

import { StyledForm } from "../style";
import { StyledImg } from "./style";

const partForm = (props) => (
  <StyledForm>
    <h1>{props.title}</h1>
    <SingleInput
      label={props.labels.cod}
      onChange={props.onChange}
      name={props.names.cod}
      value={props.values.cod}
    />
    <SingleInput
      label={props.labels.brand}
      onChange={props.onChange}
      name={props.names.brand}
      value={props.values.brand}
    />
    <SingleInput
      label={props.labels.name}
      onChange={props.onChange}
      name={props.names.name}
      value={props.values.name}
    />
    <SingleInput
      label={props.labels.description}
      onChange={props.onChange}
      name={props.names.description}
      value={props.values.description}
    />
    <SingleInput
      type="file"
      label={props.labels.photo}
      onChange={props.onChange}
      name={props.names.photo}
    />
    {props.photo && <StyledImg src={props.photo} />}
    <SingleInput
      label={props.labels.price}
      onChange={props.onChange}
      name={props.names.price}
      value={props.values.price}
    />
    <ListInput
      label={props.labels.details}
      onChange={props.onChange}
      name={props.names.details}
      value={props.values.details}
      onClick={props.onClicks.addDetail}
      theme="secondary"
      deleteItem={props.onClicks.deleteDetail}
      data={props.detailsItems}
    />
    <ListInput
      label={props.labels.referenceCodes}
      onChange={props.onChange}
      name={props.names.referenceCodes}
      value={props.values.referenceCodes}
      onClick={props.onClicks.addReferenceCode}
      theme="secondary"
      deleteItem={props.onClicks.deleteRefCode}
      data={props.referenceCodesItems}
    />
    <Button onClick={props.onClicks.save}>Guardar</Button>
  </StyledForm>
);

export default partForm;
