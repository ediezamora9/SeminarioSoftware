import styled from "styled-components";

export const StyledInput = styled.div`
  width: 100%;

  label {
    display: block;
    font-size: 1.2rem;
    font-weight: 500;

    padding-left: 0.5rem;
    margin: 0rem 0 0.5rem 0;
  }

  input {
    border: none;
    -webkit-box-shadow: 0px 0px 2px #444444;
    -moz-box-shadow: 0px 0px 2px #444444;
    box-shadow: 0px 0px 2px #444444;

    width: 100%;
    height: 1.7rem;
  }

  & > input {
    margin-bottom: 1.5rem;
  }
`;
