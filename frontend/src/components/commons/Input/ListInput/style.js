import styled from "styled-components";
import { StyledButton } from "../../Button/style";

export const StyledListInput = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.5rem;

  height: 1.5rem;

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  ${StyledButton} {
    margin-left: 1rem;
    padding: 0.4rem;
  }
`;

export const StyledListElement = styled.div`
  display: flex;
  align-items: center;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;
    color: #ff0000;
    cursor: pointer;
  }

  .icon:hover {
    color: #9b0000;
  }
`;
