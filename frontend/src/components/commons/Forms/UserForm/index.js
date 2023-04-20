import Input from '../../Input/SingleInput/index';
import Button from '../../Button/index';

import { StyledForm } from '../style';

const userFormPage = (props) => {
  return (
    <StyledForm>
      <h1>{props.title}</h1>
      <Input label={props.labels.username} value={props.values.username} onChange={props.onChange} name={props.names.username}/>
      <Input label={props.labels.password} value={props.values.password} onChange={props.onChange} name={props.names.password} type="password"/>
      <Input label={props.labels.confirmPassword} value={props.values.confirmPassword} onChange={props.onChange} name={props.names.confirmPassword} type="password"/>
      <Button onClick={props.onClick}>Añadir</Button>
    </StyledForm>
  );
};

export default userFormPage;