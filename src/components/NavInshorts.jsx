import React from "react";
import './NavInshorts.css'
import HamBurgerDrawer from "./HamBurgerDrawer";


const NavInshorts = ({setCategory}) => {
  return (
    <div className="nav">
      <div className="menu">
        <HamBurgerDrawer setCategory={setCategory}/>
      </div>

      <img
        style={{ cursor: "pointer" }}
        src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png"
        height="80%"
        alt="logo"
      />
    </div>
  );
};

export default NavInshorts;
