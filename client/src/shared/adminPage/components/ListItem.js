import React from "react";
import "./ListItem.css";

function ListItem(props) {
  return (
    <li className="list-item">
      <img src={props.icon} alt="Icon" className="list-icon" />
      <div className="list-item-text">{props.children}</div>
      <img src={props.arrow} alt="arrow" className="list-arrow" />
    </li>
  );
}

export default ListItem;
