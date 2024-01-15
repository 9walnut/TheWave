import styled from "styled-components";

export const AdminButtonGreyStyle = styled.button`
  /* background: #8a8b8d; */
  background: #99aab7;
  color: whitesmoke;
  border: none;
  display: inline-flex;
  width: 80px;
  height: 30px;
  padding: 12px;
  margin: 10px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #a4afbb;
  }

  @media (max-width: 396px) {
    width: 76px;
    height: 27px;
    font-size: xx-small;
    margin: 2px;
  }
`;
