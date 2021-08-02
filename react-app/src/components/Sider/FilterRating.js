import React, { useState } from "react";
import { showRating } from "../Card/";

export default function FilterRating() {
  const [index, setIndex] = useState(null);

  const handleClickRating = (i) => {
    if (i === index) {
      setIndex(null);
      return;
    }
    setIndex(i);
  };

  const showListFilterRate = () => {
    const result = [];
    for (let i = 4; i > 0; i--) {
      const className = `list-rating ${index === i ? "active" : ""}`;
      result.push(
        <div className={className} onClick={() => handleClickRating(i)} key={i}>
          {showRating(i)}
          <span className="list-rating__text"> & Up number</span>
        </div>
      );
    }
    return result;
  };

  return <div className="rating-block">{showListFilterRate()}</div>;
}
