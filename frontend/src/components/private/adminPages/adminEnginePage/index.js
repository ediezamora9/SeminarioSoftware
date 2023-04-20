import AdminSection from '../../../commons/Sections/adminSection/index';
import EngineSection from '../../../commons/Sections/engineSection/index';

import { StyledPage } from '../style';

const adminEnginePage = (props) => {
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;
  const modelID = props.match.params.modelID;

  return (
    <StyledPage>
      <AdminSection link={'/admin/main/add/' + brandID + '/' + year + '/' + modelID} name="Añadir Motor" />
      <EngineSection isInAdmin modelID={modelID} year={year}/>
    </StyledPage>
  );
};

export default adminEnginePage;