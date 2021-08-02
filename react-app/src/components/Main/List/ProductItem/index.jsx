import React from "react";
import Star from "../../../Star";
import "./style.css";
const productItem = (prop) => {
    const { img, name, price, rate } = prop.data;
    return (
        <div className="col-lg-3 col-md-4 col-12">
            <div className="product-item">
                <div className="product-img">
                    <img src={img} alt="img product"></img>
                </div>
                <div className="product-name">
                    <h3>{name}</h3>
                </div>
                <div className="product-bottom">
                    <Star rate={rate}></Star>
                    <p className="product-price">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default productItem;
