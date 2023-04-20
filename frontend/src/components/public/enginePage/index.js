import EngineSection from '../../commons/Sections/engineSection/index';

const enginePage = (props) => {
  const modelID = props.match.params.modelID;
  const year = props.match.params.year;

  return (
    <EngineSection modelID={modelID} year={year} />
  );
};

export default enginePage;
