import styled from "styled-components";

export const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  margin: 1rem 0.5rem;

  -webkit-box-shadow: 0px 3px 3px #444444;
  -moz-box-shadow: 0px 3px 3px #444444;
  box-shadow: 0px 3px 3px #444444;

  a,
  p {
    display: inline-block;

    padding: 0.5rem 1rem;
    margin: 0;
    width: 100%;
    height: 100%;

    z-index: 2;
  }

  a:hover {
    background-color: #eeeeee;
  }
  
  .linkContainer {
    width: 100%;
  }

  .adminBtnsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .deleteBtn {
    border: none;
    background-color: #a30723;
    color: #ffffff;
    border-radius: 3px;
    padding: 0.3rem;
    margin-right: 1rem;

    cursor: pointer;

    z-index: 5;
  }

  .deleteBtn:hover {
    background-color: #730518;
  }

  .updateBtn {
    border: none;
    background-color: #28884f;
    color: #ffffff;
    border-radius: 3px;
    padding: 0.3rem;
    margin-right: 10px;
    margin-left: 1rem;

    cursor: pointer;

    z-index: 5;
  }

  .updateBtn:hover {
    background-color: #1c5e36;
  }

  @media (min-width: 1200px) {
    -webkit-box-shadow: 0px 1px 2px #444444;
    -moz-box-shadow: 0px 1px 2px #444444;
    box-shadow: 0px 1px 2px #444444;
  }
`;
