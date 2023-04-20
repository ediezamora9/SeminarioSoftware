import { StyledSearchBar } from './style';

const searchBar = (props) => (
    <StyledSearchBar>
        <p>Buscar:</p>
        <input onChange={props.onChange} value={props.value} />
        {props.searchBtn ? <button onClick={props.onClick}>Buscar</button> : null}
    </StyledSearchBar>
);

export default searchBar;