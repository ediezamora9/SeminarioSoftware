import YearsSection from '../../commons/Sections/yearSection';

const yearsPage = (props) => {
  const brandID = props.match.params.brandID;

  return (
    <YearsSection brandID={brandID} />
  );
};

export default yearsPage;
