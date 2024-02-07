import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media (max-width: 767px) {
    height: 5vh;
    width: auto;
  }
  @media (max-width: 390px) {
    height: 5vh;
    width: auto;
  }
`;

export const SideBarBox = styled.div`
  width: 255px;
  height: 1000px;
  border: 1px solid #e2e6e9;
  box-shadow: 2px 11px 14px -4px #b5bfc6;
  border-radius: 8px;
  background-color: #e4ebf1;
  margin-left: 14px;
  margin-bottom: 20px;
  position: fixed;

  @media (max-width: 767px) {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    margin-bottom: 3px;
    margin-left: 0px;
    z-index: 5;
  }
  @media (max-width: 390px) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    font-size: smaller;
  }
`;
export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
  }
  @media (max-width: 390px) {
    width: 40%;
    margin-left: 120px;
  }
`;

export const NavListItem = styled.li`
  &.nav-link {
    list-style-type: none;
    color: #6e7f8d;
  }
  &.active {
    font-weight: bold;
    font-size: larger;
  }
  &.nav-link {
    font-weight: 600;
    padding: 30px;
  }

  &.nav-link:active {
    padding: 30px;
    background-color: #b5bfc6;
  }
  &.nav-link:hover {
    padding: 30px;
    background-color: #d7e0e5;
  }

  @media (max-width: 767px) {
    margin: 0px;
    height: 59px;

    &.nav-link {
      font-weight: 900;
      font-size: smaller;
      padding: 0;
    }
    &.nav-link:active {
      padding: 0;
      background-color: #b5bfc6;
    }
    &.nav-link:hover {
      padding: 0;
      background-color: #d7e0e5;
    }
  }
`;
export const NavListItemNone = styled.li`
  &.nav-link {
    padding: 30px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #000;
  &.active {
    font-weight: 900;
    & li {
      background-color: #cddae3;
    }
  }
  @media (max-width: 767px) {
    margin: 0;
    &.active {
      font-weight: 900;
      font-size: small;
      & li {
        background-color: #cddae3;
      }
    }
  }
`;
