import { useState } from "react";

import { privAxios } from "../../../utils/axios";
import { URL } from "../../../utils/config";

import SearchBar from "../../commons/SearchBar/index";
import SinglePartSection from '../../commons/Sections/SinglePartSection/index';
import { StyledDiv } from "./style";

import { StyledRecommendations } from "./style";

const SearchPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [part, setPart] = useState({});
  const [route, setRoute] = useState("");

  const searchHandler = (e) => {
    if (part) {
      setPart({});
    }
    setSearchTerm(e.target.value);
    privAxios
      .get(URL + "/parts/searchparts?searchTerm=" + e.target.value)
      .then((data) => {
        setRecommendations(data.data);
      })
      .catch((e) => console.log(e));
  };

  const onSearch = (id) => {
    console.log(id);
    privAxios
      .get(URL + "/parts/getpart/" + id)
      .then((part) => {
        setPart(part.data);
        setRecommendations([]);
        setSearchTerm("");
        setRoute(`${part.data.brandID.name}/${part.data.modelID.year}/${part.data.modelID.name}/${part.data.engineID.name}/${part.data.subComponentID.category}/${part.data.subComponentID.name}`);
      })
      .catch((e) => console.log(e));
  };

  let partInfo;
  if (Object.keys(part).length != 0) {
    partInfo = (
      <SinglePartSection part={part} route={route} />
    );
  }

  return (
    <StyledDiv>
      <h1>Buscar Partes</h1>
      <SearchBar onChange={searchHandler} value={searchTerm} />
      {recommendations.length > 0 ? (
        <StyledRecommendations>
          <b>Sugerido:</b>
          <hr />
          {recommendations.map((recommendation) => (
            <div
              className="recommendation"
              key={recommendation.cod}
              onClick={() => onSearch(recommendation._id)}
            >
              <p>{recommendation.cod + " - " + recommendation.name}</p>
              <p className="subCodes">{recommendation.referenceCodes.map((codes) => codes + ". ")}</p>
            </div>
          ))}
        </StyledRecommendations>
      ) : null}
      {partInfo}
    </StyledDiv>
  );
};

export default SearchPage;
