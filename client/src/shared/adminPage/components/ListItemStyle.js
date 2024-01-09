import styled from "styled-components";

export const ListBox = styled.div`
  list-style-type: none;
  margin: 1px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 81px;
  }
  @media (max-width: 390px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 65px;
  }
`;
export const ListIconImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  @media (max-width: 767px) {
    width: 20px;
    height: 20px;
    margin-top: 10px;
    margin-bottom: 6px;
    margin-right: 0px;
  }
`;
export const ListIconImg2 = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  @media (max-width: 767px) {
    display: none;
    margin-right: 0px;
  }
`;
export const ListItemBox = styled.div`
  width: 300px;
  margin-left: 3px;

  @media (max-width: 767px) {
    width: 68px;
    margin-left: 0;
    text-align: center;
    font-size: smaller;
  }
`;
