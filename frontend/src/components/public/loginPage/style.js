import styled from "styled-components";

import carBg from "../../../public/images/car-bg.jpg";

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  /* background-image: url(${carBg});
  background-size: cover;
  background-position-x: 50%;
  background-repeat: no-repeat; */

  /* padding: 0 2rem; */

  h1 {
    color: #000000;
    margin-top: 0;
    margin-bottom: 2rem;
    text-align: center;
  }

  label {
    color: #000000;
  }

  @media (min-width: 1200px) {
    h1 {
      margin-bottom: 5rem;
    }
  }
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 2rem;
  margin: 0 1rem;

  /* background: rgba(87, 61, 61, 0.2); */
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px; */
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  box-shadow: 0 0 15px 0 #c9c9c9;

  width: 100%;
  height: 25rem;

  @media (min-width: 700px) {
    margin: 0 10rem;
  }

  @media (min-width: 1200px) {
    width: 60%;
    height: 60%;
    margin: 0 2rem;
    justify-content: center;

    & input {
      margin-bottom: 3rem;
    }
  }

  @media (min-width: 1760px) {
    width: 45%;
    margin: 0 5rem;
    justify-content: center;

    & input {
      margin-bottom: 3rem;
    }
  }
`;

export const StyledImage = styled.div`

  @media (min-width: 1200px) {
    width: 80%;
    height: 100%;
    background-image: url(${carBg});
    background-size: cover;
    background-position-x: 50%;
    background-repeat: no-repeat;
  } 
`;
