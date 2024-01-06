import styled from "styled-components";
{
  /* <StyleSheetManager shouldForwardProp={...}>
   */
}

// </StyleSheetManager>

export const PageNationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#333" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid #333;
  border-radius: 4px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
