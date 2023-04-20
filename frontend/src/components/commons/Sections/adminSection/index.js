import Link from "../../Link/index";

import { StyledDiv } from "./style";

const adminSection = (props) => {
  return (
    <StyledDiv>
      <h1>Administración</h1>
      <Link link={props.link}>{props.name}</Link>
      <h2>Editar</h2>
    </StyledDiv>
  );
};

export default adminSection;
