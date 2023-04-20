import AdminSection from '../../../commons/Sections/adminSection/index';
import PartSection from '../../../commons/Sections/partSection/index';

import { StyledPage } from '../style';

const adminBrandPage = (props) => {
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;
  const modelID = props.match.params.modelID;
  const engineID = props.match.params.engineID;
  const category = props.match.params.category;
  const subComponentID = props.match.params.subComponentID;

  return (
    <StyledPage>
      <AdminSection link={'/admin/main/add/' + brandID + '/' + year + '/' + modelID + '/' + engineID + '/' + category + '/' + subComponentID} name="Añadir Parte" />
      <PartSection isInAdmin none subComponentID={subComponentID} year={year} category={category} brandID={brandID} modelID={modelID} engineID={engineID} />
    </StyledPage>
  );
};

export default adminBrandPage;