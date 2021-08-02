import React from "react";
import logo from "../../assets/images/logo.png";
import { BiSearchAlt2 } from "react-icons/bi";

import "./style.css";

const Header = () => {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="header-container">
                    <a href="#">
                        <img src={logo} alt="logo" className="logo"></img>
                    </a>
                    <a href="#" className="logo-text">
                        amazing
                    </a>
                    <div className="header-search">
                        <input className="header-input" placeholder="Search a product" />
                        <button className="btn ">
                            <BiSearchAlt2 />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;