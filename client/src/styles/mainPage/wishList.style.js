import styled from "styled-components";

export const ProductContentBox = styled.div`
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;

export const CardItemBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 0.6;
    .buttons-container {
      opacity: 1;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
  }

  img {
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  div {
    padding: 15px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 5px;
        font-size: 14px;
      }

      li:first-child {
        font-size: 16px;
        font-weight: bold;
      }

      li:last-child {
        color: #e44d26;
        font-weight: bold;
      }
    }
  }

  .buttons-container {
    position: absolute;
    top: 25%;
    left: 40%;
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: none;
    opacity: 0;
    transition: opacity 0.3s;
  }

  button {
    opacity: 0.8;
    background-color: #5a5a5a;
    color: #fff;
    border: none;
    padding: 8px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #7a7a7a;
    }
  }
`;
