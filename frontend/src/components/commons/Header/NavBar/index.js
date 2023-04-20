import { StyledNavBar } from './style';

const navBar = (props) => {
  return(
    <StyledNavBar>
      <div className="hamburgerBtn" onClick={props.onClick}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <div className={"content " + (props.isActive && "activeContent")}>
        {props.children}
      </div>
    </StyledNavBar>
  );
};

export default navBar;