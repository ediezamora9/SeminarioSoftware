import AdminSection from '../../../commons/Sections/adminSection/index';
import ComponentSection from '../../../commons/Sections/componentSection/index';

import { StyledPage } from '../style';

const adminBrandPage = (props) => {
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;
  const modelID = props.match.params.modelID;
  const engineID = props.match.params.engineID;

  return (
    <StyledPage>
      <AdminSection link={'/admin/main/add/' + brandID + '/' + year + '/' + modelID + '/' + engineID} name="Añadir Categoria" />
      <ComponentSection isInAdmin engineID={engineID} year={year} />
    </StyledPage>
  );
};

export default adminBrandPage;