import { useEffect, useState } from "react";

import { privAxios } from "../../../utils/axios";
import { URL } from "../../../utils/config";

import SinglePartSection from "../../commons/Sections/SinglePartSection/index";

const PartPage = (props) => {
  const partID = props.match.params.partID;
  const year = props.match.params.year;
  const category = props.match.params.category;

  const [parts, setParts] = useState({});
  const [route, setRoute] = useState("");

  useEffect(() => {
    privAxios
      .get(URL + "/parts/getpart/" + partID)
      .then((part) => {
        setParts(part.data);
        setRoute(
          `${part.data.brandID.name}/${year}/${part.data.modelID.name}/${part.data.engineID.name}/${category}/${part.data.subComponentID.name}`
        );
      })
      .catch((e) => console.log(e));
  }, []);

  let partsInfo;
  if (parts) {
    partsInfo = (
      <SinglePartSection
        part={parts}
        route={route}
        partID={partID}
      />
    );
  }

  return <div>{partsInfo}</div>;
};

export default PartPage;
