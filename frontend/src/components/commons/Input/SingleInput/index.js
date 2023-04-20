import { StyledInput } from "../style";

const input = ({ label, ...rest }) => (
  <StyledInput>
    <label>{label}</label>
    <input {...rest} />
  </StyledInput>
);

export default input;
