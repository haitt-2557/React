import React from "react";
import ProductItem from "./ProductItem";
import "./style.css";
const GroupList = (props) => {
    const arr = [
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
        {
            id: 1,
            name: "Amazon - Fire TV Stick with Alexa Voice Remote - Black",
            price: 10,
            parentType: 1,
            childrenType: 1,
            type: 1,
            brand: 1,
            rate: 4,
            img: "https://cdn-demo.algolia.com/bestbuy-0118/1313531168_sb.jpg",
        },
    ];
    const renderProduct = (data) => {
        return data.map((item, index) => {
            return <ProductItem key={`product-${index}`} data={item} />;
        });
    };
    const renderPagination = () => {
        const arrPagination = ["Previous page", "1", "2", "3", "4", "5", "Next page"];
        return arrPagination.map((item, index) => {
            return (
                <li>
                    <button
                        className={`btn pagination-item ${
                            item === "1"
                                ? "pagination-item-active"
                                : item === "Previous page"
                                ? "pagination-item-disable"
                                : ""
                        } `}
                        key={`pagination-${index}`}
                    >
                        {index === 0 ? `< ${item}` : index === arrPagination.length - 1 ? `${item} >` : item}
                    </button>
                </li>
            );
        });
    };
    return (
        <div className="list">
            <div className="container-fluid">
                <section className="list-sort px-4">
                    <p className="list-sort-text">334ms</p>
                    <div className="list-select">
                        <label>Sort by</label>
                        <select>
                            <option selected>Featured</option>
                            <option>Price asc</option>
                            <option>Price desc</option>
                        </select>
                    </div>
                </section>
                <section className="list-product mt-5 px-4">
                    <div className="row">{renderProduct(arr)}</div>
                </section>
                <section className="pagination">
                    <ul className="pagination-list">{renderPagination()}</ul>
                </section>
            </div>
        </div>
    );
};

export default GroupList;