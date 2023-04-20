import AdminSection from '../../../commons/Sections/adminSection/index';
import SubComponentSection from '../../../commons/Sections/subComponentSection/index';

import { StyledPage } from '../style';

const adminBrandPage = (props) => {
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;
  const modelID = props.match.params.modelID;
  const engineID = props.match.params.engineID;
  const category = props.match.params.category

  return (
    <StyledPage>
      <AdminSection link={'/admin/main/add/' + brandID + '/' + year + '/' + modelID + '/' + engineID + '/' + category} name="Añadir Componente" />
      <SubComponentSection isInAdmin engineID={engineID} category={category} year={year} />
    </StyledPage>
  );
};

export default adminBrandPage;