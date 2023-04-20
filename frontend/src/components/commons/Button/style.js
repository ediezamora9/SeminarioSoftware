import styled from "styled-components";

export const StyledButton = styled.button`
  width: ${props => props.theme.width};
  padding: 0.5rem;
  color: ${props => props.theme.fg};
  font-size: ${props => props.theme.fontSize};
  border: none;
  background-color: ${props => props.theme.bg};
  border-radius: 5px;
  cursor: pointer;
`;
