import React from "react";
import { NavLink, Outlet  } from "react-router-dom";

const Nav = () => {

  return (
    <div>
      <nav className="main-nav">
      <ul>
          <li><NavLink to='sunsets' >Sunsets</NavLink></li>
          <li><NavLink to='waterfalls' >Waterfalls</NavLink></li>
          <li><NavLink to='rainbows' >Rainbows</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Nav;
