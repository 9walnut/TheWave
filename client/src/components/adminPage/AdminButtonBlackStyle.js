import styled from "styled-components";

export const AdminButtonBlackStyle = styled.button`
  background: #435d69;
  color: whitesmoke;
  border: none;
  display: inline-flex;
  width: 152px;
  height: 48px;
  padding: 12px;
  border-radius: 6px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #567584;
  }

  @media (max-width: 396px) {
    width: 91px;
    height: 24px;
    font-size: xx-small;
    margin: 2px;
  }
`;
