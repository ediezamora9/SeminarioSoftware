import { ThemeProvider } from 'styled-components';

import { StyledButton } from './style';
import { mainTheme, secondaryTheme } from './theme';

const button = (props) => {
  let theme = mainTheme;
  switch(props.theme) {
    case 'secondary':
      theme = secondaryTheme;
      break;
    default:
      theme = mainTheme;
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
    </ThemeProvider>
  );
};

export default button;