import styled from "styled-components";

export const StyledNavBar = styled.nav`
  overflow-y: hidden;
  width: 100%;

  .hamburgerBtn {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    width: 2rem;
    height: 2rem;

    z-index: 12;

    margin-left: 1rem;

    .line {
      background-color: #ffffff;
      width: 100%;
      height: 0.2rem;
      border-radius: 3px;

      z-index: 13;
    }
  }

  .content {
    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    overflow-y: hidden;
    width: 100%;
    height: 0;
    background-color: #0d4880;
    z-index: 10;
  }

  .activeContent {
    height: 100vh;
  }

  @media (min-width: 1200px) {
    width: 100%;
    height: 100%;

    .hamburgerBtn {
      display: none;
    }

    .content {
      flex-direction: row;

      position: relative;

      justify-content: left;

      height: 100%;
    }
  }
`;
