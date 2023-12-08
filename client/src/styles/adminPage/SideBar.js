import styled from "styled-components";

export const NavLinksLayout = styled.ul`
  &.nav-link {
    padding-left: 0;
  }
`;

export const SideBarBox = styled.div`
  width: 255px;
  height: 1187px;
  background-color: #363740;
`;

/* 활성화 되어 있는 상태 */
export const NavLinkList = styled.a`
  &.active {
    background: #dbdade;
    /* opacity: 0.08; */
    border: none;
    color: cornflowerblue;
    text-decoration: none;
  }
  /* 그냥 있을 때 */
  &:not(.active) {
    background: none;
    border: none;
    text-decoration: none;
    color: whitesmoke;
  }
`;

export const NavListItem = styled.li`
  &.nav-link {
    list-style-type: none;
    color: whitesmoke;
  }

  &.nav-link {
    padding: 30px;
  }
`;
