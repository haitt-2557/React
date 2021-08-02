import React, { useState } from "react";

import Star from "../../Star";

import { AiOutlineClear } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";

import "./style.css";

const categoriesData = [
    {
        id: 1,
        name: " Appliances",
        list: [
            { id: 1, name: " Dishwashers" },
            { id: 2, name: "Fans" },
            { id: 3, name: "Freezers & Ice Makers" },
            { id: 4, name: " Heaters " },
            { id: 5, name: " Humidifiers " },
            { id: 6, name: " Microwaves " },
            { id: 7, name: " Ranges, Cooktops & Ovens " },
            { id: 8, name: " Refrigerators " },
            { id: 9, name: " Small Kitchen Appliances " },
            { id: 10, name: " Washers & Dryers " },
        ],
    },
    {
        id: 2,
        name: " Audio",
        list: [
            { id: 1, name: " Auxiliary Input Cables " },
            { id: 2, name: " Cables & Chargers " },
            { id: 3, name: " Cases & Armbands " },
            { id: 4, name: " Docks, Radios & Boomboxes " },
            { id: 5, name: " FM Transmitters " },
            { id: 6, name: " Headphones " },
            { id: 7, name: " Home Audio " },
            { id: 8, name: " Home Audio Accessories " },
            { id: 9, name: " In-Home Speakers " },
        ],
    },
    { id: 3, name: " Cameras & Camcorders" },
    { id: 4, name: " Car Electronics & GPS" },
    { id: 5, name: " Cell Phones" },
    { id: 6, name: " Computers & Tablets" },
    { id: 7, name: " Health, Fitness & Beauty" },
];
const typeData = [
    { id: 1, name: "Coffee/cappuccino" },
    { id: 2, name: "Food" },
    { id: 3, name: "Blenders" },
    { id: 4, name: "Multicookers" },
    { id: 5, name: "Portable beverage" },
];
const brandData = [
    { id: 1, name: "Hamilton Beach" },
    { id: 2, name: "KitchenAid" },
    { id: 3, name: "Cuisinart" },
    { id: 4, name: "Keurig" },
    { id: 5, name: "Black & Decker" },
];

const Sidebar = (props) => {
    const [dropdown, setDropdown] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    const handelTonggleDropdown = (id) => {
        const dropdownIndex = dropdown.findIndex((moreId) => moreId === id);
        if (dropdownIndex === -1) {
            setDropdown([...dropdown, id]);
        } else {
            const newDropdown = dropdown;
            newDropdown.splice(dropdownIndex, 1);
            setDropdown([...newDropdown]);
        }
        setIsFilter(true);
    };
    const categories = () => {
        return categoriesData.map((item, index) => {
            return (
                <li
                    className="categories-item text-clamp text-clamp--1"
                    onClick={() => handelTonggleDropdown(item.id)}
                    key={`categories-${index}`}
                >
                    <a href="#">{item.name}</a>
                    {item.list && (
                        <ul
                            className={`categories-dropdown ${
                                dropdown.findIndex((id) => id === item.id) !== -1 &&
                                "categories-dropdown-active"
                            }`}
                        >
                            {item.list.map((item, index) => {
                                return (
                                    <li
                                        className="categories-item text-clamp text-clamp--1"
                                        key={`categories-dropdown-${index}`}
                                    >
                                        {item.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </li>
            );
        });
    };

    const renderSoft = (data) => {
        return data.map((item, index) => {
            return (
                <li className="sort-item" key={`soft-${index}`}>
                    <input type="checkbox" className="mr-1"></input>
                    {item.name}
                </li>
            );
        });
    };

    const renderStar = () => {
        const arrStar = [5, 4, 3, 2, 1];
        return arrStar.map((item, index) => (
            <li className="rate-item">
                <input type="checkbox"></input>
                <Star rate={item}></Star>
            </li>
        ));
    };

    return (
        <aside className="sidebar">
            {isFilter && (
                <div className="clear-filter">
                    <AiOutlineClear />
                    Clear all filters
                </div>
            )}

            <section className="categories">
                <h3 className="categories-title">Show results for</h3>
                <ul className="categories-container">{categories()}</ul>
            </section>
            <section className="sort">
                <h3>Refine by</h3>
                <h2 className="categories-title">Type</h2>
                <div className="categories-container">{renderSoft(typeData)}</div>

                <h2 className="categories-title">Brand</h2>
                <div className="sort-search">
                    <button className="btn ">
                        <BiSearchAlt2 />
                    </button>
                    <input className="header-input" />
                </div>
                <div className="categories-container">{renderSoft(brandData)}</div>
            </section>
            <section className="rate">
                <h2 className="categories-title">Rating</h2>
                <div className="categories-container">
                    <ul className="rate-list">{renderStar()}</ul>
                </div>
            </section>
            <section className="price">
                <h2 className="categories-title">Prices</h2>
                <div className="categories-container">
                    <ul className="price-list">
                        <li className="price-item">$1 - 80</li>
                        <li className="price-item">$80 - 160</li>
                        <li className="price-item">$160 - 240</li>
                        <li className="price-item">$240 - 1.820</li>
                        <li className="price-item">$1.820 - 3.400</li>
                        <li className="price-item">$3.400 - 4.980</li>
                        <li className="price-item">&#62; $4.980</li>
                    </ul>
                    <div className="price-range">
                        <span>$ </span>
                        <input type="number" />
                        <span> to $ </span>
                        <input type="number" />
                        <button>Go</button>
                    </div>
                </div>
            </section>
        </aside>
    );
};

export default Sidebar;
