import styled from "styled-components";

export const StyledPart = styled.div`
  margin: 1rem;
  border: 1px #000000 solid;
  -webkit-box-shadow: 0px 1px 2px #444444;
  -moz-box-shadow: 0px 1px 2px #444444;
  box-shadow: 0px 1px 2px #444444;

  h1 {
    text-align: center;
  }

  .editButton {
    /* width: 100px; */

    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #28884f;
    color: #ffffff;
    cursor: pointer;
  }

  .editButton:hover {
    background-color: #1c5e36;
  }

  .title {
    padding: 0.1rem 0rem;

    -webkit-box-shadow: 0px 3px 3px #444444;
    -moz-box-shadow: 0px 3px 3px #444444;
    box-shadow: 0px 3px 3px #444444;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0 1rem 1rem 1rem;

    & img {
      display: block;
      width: 100%;
      height: auto;

      margin: 2rem auto;

      @media (min-width: 1200px) {
        width: 60%;
      }
    }

    .spec {
      margin: 1rem 0;

      & > p:first-child {
        font-weight: bold;
      }

      p {
        display: inline;
      }
    }

    .bold {
      font-weight: bold;
    }

    ul {
      padding-left: 2rem;
    }
  }

`;
