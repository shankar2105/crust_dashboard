import React, { Component } from "react";
import { MiniArea } from "ant-design-pro/lib/Charts";
import moment from "moment";

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 30; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      "DD-MMM-YYYY"
    ),
    y: Math.floor(Math.random() * 1000) + 10
  });
}

class MiniAreas extends Component {
  render() {
    return (
    <MiniArea line color="#cceafe" height={100} data={visitData} />
    );
  }
}

export default MiniAreas;
