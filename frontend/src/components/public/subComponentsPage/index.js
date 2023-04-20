import SubComponentSection from '../../commons/Sections/subComponentSection/index';

const subComponentPage = (props) => {
  const engineID = props.match.params.engineID;
  const category = props.match.params.category;
  const year = props.match.params.year;

  return (
    <SubComponentSection engineID={engineID} category={category} year={year} />
  );
};

export default subComponentPage;
