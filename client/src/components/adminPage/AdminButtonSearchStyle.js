import styled from "styled-components";

export const AdminButtonGreyStyle = styled.button`
  /* background: #8a8b8d; */
  background: #b1c1cd;
  color: whitesmoke;
  border: none;
  display: inline-flex;
  width: 80px;
  height: 40px;
  padding: 12px;
  /* margin: 10px; */
  margin-left: 5px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #a4afbb;
  }

  @media (max-width: 396px) {
    width: 62px;
    height: 20px;
    font-size: xx-small;
    margin: 2px;
  }
`;
