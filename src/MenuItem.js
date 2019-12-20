import React from "react";
import './res/menu.css'

export default function MenuItem (props) {
  return (
    <div className="menu-item">
      <a href={props.href}
         rel="noopener noreferrer"
         target="_blank">
        <span>{props.text}</span>
      </a>
    </div>
  )
}
