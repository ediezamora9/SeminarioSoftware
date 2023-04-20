import styled from "styled-components";

export const StyledDiv = styled.div`
  h1 {
    text-align: center;
  }
`;

export const StyledRecommendations = styled.div`
  width: 100%;
  height: auto;
  border: 1px #000 solid;
  -webkit-box-shadow: 0px 3px 3px #444444;
  -moz-box-shadow: 0px 3px 3px #444444;
  box-shadow: 0px 3px 3px #444444;

  hr {
    margin-bottom: 0;
  }

  .recommendation {
    padding-top: 0.7rem;
  }

  .recommendation:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }

  p {
    margin: 0;
    padding-top: 0.7rem 0 0 0;
  }

  .subCodes {
    padding-bottom: 0.7rem;
    font-size: 0.8rem;
    color: #777777;
  }

  @media (min-width: 1200px) {
    width: 98%;
    margin: 0 auto;
  }
`;
