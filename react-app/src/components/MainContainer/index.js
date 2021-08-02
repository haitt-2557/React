import { Pagination, Row } from "antd";
import React from "react";

import Card from "../Card";
import Sort from "./Sort";
import "./style.scss";

function MainContainer() {
  const handleChangeSize = (current, size) => {
    console.log(current, size);
  };

  return (
    <section id="main-content">
      <Sort />
      <Row gutter={[8, 8]} className="mt-2">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Row>
      <Pagination
        className="mt-4 text-center"
        defaultCurrent={1}
        total={1000}
        onShowSizeChange={handleChangeSize}
      />
    </section>
  );
}

export default MainContainer;
