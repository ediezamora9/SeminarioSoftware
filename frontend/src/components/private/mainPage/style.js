import styled from 'styled-components';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  div {
    text-align: center;
    width: 60%;

    margin-top: 25%;

    a {
      display: inline-block;
      width: 100%;
    }

    @media (min-width: 1200px) {
      width: 30%;
      margin-top: 10%;
    }
  }
`;