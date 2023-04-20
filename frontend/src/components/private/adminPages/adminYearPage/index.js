import AdminSection from '../../../commons/Sections/adminSection/index';
import YearSection from '../../../commons/Sections/yearSection/index';

import { StyledPage } from '../style';

const adminYearPage = (props) => (
  <StyledPage>
    <AdminSection link={'/admin/main/add/' + props.match.params.brandID} name="Añadir Año" />
    <YearSection isInAdmin brandID={props.match.params.brandID} />
  </StyledPage>
);

export default adminYearPage;