import AdminSection from '../../../commons/Sections/adminSection/index';
import UserSection from '../../../commons/Sections/userSection/index';

import { StyledPage } from '../style';

const adminUserPage = (props) => (
  <StyledPage>
    <AdminSection link={'/admin/user/add'} name="Añadir Usuario" />
    <UserSection isInAdmin />
  </StyledPage>
);

export default adminUserPage;