import Link from "../../commons/Link/index";

import { StyledDiv } from './style';

const mainPage = (props) => (
  <StyledDiv>
    <h1>Administración</h1>
    <Link link='/admin/user'>Usuarios</Link>
    <Link link='/admin/main'>Carros</Link>
  </StyledDiv>
);

export default mainPage;