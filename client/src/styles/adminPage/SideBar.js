import styled from "styled-components";
import { NavLink } from "react-router-dom";

// export const NavLinksLayout = styled.ul`
//   &.nav-link {
//     padding-left: 100;
//   }
// `;

export const SideBarBox = styled.div`
  width: 255px;
  height: 1012px;
  border: 1px solid #e2e6e9;
  box-shadow: 2px 11px 14px -4px #b5bfc6;
  border-radius: 8px;
  background-color: #e4ebf1;
  margin-top: 25px;
  margin-left: 14px;
  margin-bottom: 20px;
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

    /* &:first-child {
      padding-bottom: 60px;
    }

    &:last-child {
      padding-top: 60px;
    } */
  }

  &.nav-link:active {
    padding: 30px;
    background-color: #b5bfc6;

    /* background: blue; */
  }
  &.nav-link:hover {
    padding: 30px;
    background-color: #d7e0e5;

    /* background: blue; */
  }
`;
export const NavListItemNone = styled.li`
  &.nav-link {
    padding: 30px;
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
`;
