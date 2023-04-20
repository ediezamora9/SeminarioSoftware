import ModelSection from '../../commons/Sections/modelSection/index';

const modelPage = (props) => {
  const brandID = props.match.params.brandID;
  const year = props.match.params.year;

  return (
    <ModelSection brandID={brandID} year={year} />
  );
};

export default modelPage;
