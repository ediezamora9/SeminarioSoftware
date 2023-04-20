import styled from 'styled-components';

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem 2rem;

  h1 {
    margin: 0 0 1.5rem 0;
    text-align: center;
  }

  @media (min-width: 1200px) {
    padding: 2rem 22rem;
  }

  @media (min-width: 1760px) {
    padding: 2rem 35rem;
  }
`;