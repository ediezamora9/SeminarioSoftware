import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  width: 100vw;
  height: 3rem;
  background-color: #0d4880;
  color: #ffffff;

  box-sizing: border-box;

  a {
    display: inline-block;

    margin: 0;
    margin-left: 1rem;
    font-size: 1.5rem;

    color: #ffffff;
    cursor: pointer;
  }

  & svg {
    margin-left: auto;
    margin-right: 1rem;
    z-index: 13;


    @media (min-width: 1200px) {
      margin-right: 5rem;
    }
  }

  & svg {
    color: #e63241;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #ffffff;
  }
`;
