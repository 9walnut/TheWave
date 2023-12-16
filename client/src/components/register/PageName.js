import "./PageName.css";
import styled from "styled-components";

const PageNameBox = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 40px;
  user-select: none;
`;

function PageName(props) {
  return (
    <>
      <PageNameBox>{props.children}</PageNameBox>
    </>
  );
}

export default PageName;
