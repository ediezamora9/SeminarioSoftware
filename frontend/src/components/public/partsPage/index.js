import PartSection from '../../commons/Sections/partSection/index';

const partPage = (props) => {
  const subComponentID = props.match.params.subComponentID;
  const year = props.match.params.year;
  const category = props.match.params.category;

  return (
    <PartSection subComponentID={subComponentID} year={year} category={category} />
  );
};

export default partPage;
