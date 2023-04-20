import AdminSection from '../../../commons/Sections/adminSection/index';
import BrandSection from '../../../commons/Sections/brandSection/index';

import { StyledPage } from '../style';

const adminBrandPage = (props) => (
  <StyledPage>
    <AdminSection link='/admin/main/add' name="Añadir Marca" />
    <BrandSection isInAdmin />
  </StyledPage>
);

export default adminBrandPage;