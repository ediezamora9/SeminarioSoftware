import AdminSection from '../../../commons/Sections/adminSection/index';
import ModelSection from '../../../commons/Sections/modelSection/index';

import { StyledPage } from '../style';

const adminBrandPage = (props) => {
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;

  return (
    <StyledPage>
      <AdminSection link={'/admin/main/add/' + brandID + '/' + year} name="Añadir Modelo" />
      <ModelSection isInAdmin brandID={brandID} year={year} />
    </StyledPage>
  );
};

export default adminBrandPage;