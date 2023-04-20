import ComponentSection from '../../commons/Sections/componentSection/index';

const componentPage = (props) => {
  const engineID = props.match.params.engineID;
  const year = props.match.params.year;

  return (
    <ComponentSection engineID={engineID} year={year} />
  );
};

export default componentPage;
