import React from "react";
import MenuItem from "./MenuItem";
import './res/menu.css';
import {BLOG_URL, GITHUB_URL, RESUME_URL} from "./Carbonyl";

export default function Menu (props) {
  const open = props.open;
  const animate = props.animate;
  let className = "";
  if (animate) className += open ? "menu fade-out" : "menu fade-in";
  else className += open ? "menu" : "-hide";
  return (
    <div className={className} onAnimationEnd={() => props.endAnimation()}>
      <div className="menu-content">
        <MenuItem text={"BLOG"} href={BLOG_URL}/>
        <MenuItem text={"RÉSUMÉ"} href={RESUME_URL}/>
        <MenuItem text={"GITHUB"} href={GITHUB_URL}/>
      </div>
      <div className="menu-background"/>
    </div>
  );
}
