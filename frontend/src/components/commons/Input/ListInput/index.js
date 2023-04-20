import Button from "../../Button/index";
import { FiDelete } from "react-icons/fi";

import { StyledInput } from "../style";
import { StyledListInput, StyledListElement } from "./style";

const input = ({ label, onClick, theme, data, deleteItem, ...rest }) => (
  <StyledInput>
    <label>{label}</label>
    <StyledListInput>
      <input {...rest} />
      <Button onClick={onClick} theme={theme}>
        Agregar
      </Button>
    </StyledListInput>
    <ul>
      {data.map((item, index) => (
        <StyledListElement key={item} className="list">
          <li>{item}</li>
          {deleteItem ? (
            <span onClick={() => deleteItem(item)} className="icon">
              <FiDelete />
            </span>
          ) : null}
        </StyledListElement>
      ))}
    </ul>
  </StyledInput>
);

export default input;
