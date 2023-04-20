import { Link } from 'react-router-dom';

import { StyledLink } from './style';

const link = (props) => (
  <StyledLink>
    <Link to={props.link}>{props.children}</Link>
  </StyledLink>
);

export default link;