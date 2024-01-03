import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavLinksLayout = styled.ul`
  &.nav-link {
    padding-left: 0;
  }
`;

export const SideBarBox = styled.div`
  margin-top: -13px;
  width: 255px;
  height: 1187px;
  background-color: #363740;
`;

export const NavListItem = styled.li`
  &.nav-link {
    list-style-type: none;
    color: whitesmoke;
  }
  &.active {
    font-weight: bold;
    font-size: larger;
  }
  &.nav-link {
    padding: 30px;

    /* &:first-child {
      padding-bottom: 60px;
    }

    &:last-child {
      padding-top: 60px;
    } */
  }

  &.nav-link:active {
    padding: 30px;
    background-color: #515362;

    /* background: blue; */
  }
`;
export const StyledNavLink = styled(NavLink)`
  color: #000;
  &.active {
    font-weight: bold;
    & li {
      background-color: #515362;
    }
  }
`;
