import { styled } from "styled-components";
import "./PageInput.css";
function PageInput(props) {
  const StyledInput = styled.input`
    width: 600px;
    padding: 15px 15px;
    margin-top: 10px;
    margin-bottom: 16px;
    border: 1px solid #d2d2d7;
  `;
  return (
    <>
      <div className="InputBox">
        <div>{props.children}</div>

        <StyledInput type={props.type} placeholder={props.placeholder} />
        {/* <input
          type={props.type}
          placeholder={props.placeholder}
          className="pageInput"
        /> */}
      </div>
    </>
  );
}

export default PageInput;
