import React, { useContext, useRef } from "react";
import Logo from "../../assets/imgs/logo-is.webp";
import { ProductsContext } from "../../contexts/context/context";
import axiosClient from "../../untils/axiosClient";
import { Types } from "../../constants/types";
import "./style.scss";

export default function Header() {
  const typingTimeoutRef = useRef(null);
  const productContext = useContext(ProductsContext);

  const handleSearchChange = (e) => {
    const { value } = e.target;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  const onSearch = async (value) => {
    try {
      const payload = {
        ...productContext.payload.filters,
        q: value,
      };
      const { data } = await axiosClient.get("products", {
        params: payload,
      });
      productContext.dispatch({
        type: Types.SEARCH_PRODUCT,
        payload: { products: data, filters: payload },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
              onChange={handleSearchChange}
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
