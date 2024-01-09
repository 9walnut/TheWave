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
  @media (max-width: 396px) {
    /* margin-top: 20px; */
    margin-bottom: 20px;
  }
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#98b3b7" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#98b3b7")};
  border: 1px solid #98b3b7;
  border-radius: 4px;

  &:hover {
    background-color: #98b3b7;
    color: #fff;
  }

  @media (max-width: 396px) {
    padding: 1px 5px;
    font-size: 9px;
  }
`;
