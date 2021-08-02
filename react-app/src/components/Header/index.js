import React from "react";
import Logo from "../../assets/imgs/logo-is.webp";
import "./style.scss";

export default function Header() {
  return (
    <header id="header">
      <div className="header__container">
        <a className="logo-is mr-4" href="./">
          <img src={Logo} alt="logo" />
        </a>
        <a className="logo-name mr-4" href="./">
          amazing
        </a>
        <div className="input-group">
          <div className="input-search">
            <input
              type="text"
              className="form-control ais-search-box--input"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Search a product"
              spellCheck="false"
            />
          </div>
          <span className="input-group-btn">
            <button>
              <i className="fas fa-search fw-6"></i>
            </button>
          </span>
        </div>
      </div>
    </header>
  );
}
