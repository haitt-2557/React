import React from "react";
import { Col } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

import "./style.scss";

export const showRating = (rating) => {
  const template = [];
  let i = 1;
  while (i <= 5) {
    if (i <= rating) {
      template.push(<StarFilled className="is-rating" key={i} />);
    } else template.push(<StarOutlined className="is-rating" key={i} />);
    i++;
  }
  return template;
};

function Card(props) {
  const { product } = props;
  return (
    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
      <article className="card">
        <img className="card__img" src={product?.image} alt={product?.image} />
        <span className="card__name mt-2">{product?.name}</span>
        <div className="group-price">
          <span className="group-price__star">
            {showRating(product?.rating)}
          </span>
          <span className="price fw-7">{product?.price}</span>
        </div>
      </article>
    </Col>
  );
}

export default Card;
