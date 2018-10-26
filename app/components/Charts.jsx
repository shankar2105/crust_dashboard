import React, { Component } from "react";
import { Chart, Axis, Geom, Tooltip } from "bizcharts";
import { Row, Col } from "antd";

class Charts extends Component {
  render() {
    const { dataSource, maxInterval } = this.props;
    const x = "connectionType";
    const y = "Success"
    const position = x + "*" + y
    return (
      <Col gutter={24} className="bar-chart-1">
        <Chart
          height={300}
          padding="auto"
          data={dataSource}
          scale={{ [y]: { tickInterval: Math.round(maxInterval / 5), max: maxInterval } }}
          forceFit
        >
          <Axis name={x} />
          <Axis name={y} />
          <Tooltip crosshairs={{ type: y }} />
          <Geom type="interval" position={position} />
        </Chart>
        {/* <Col span={6}>
            <ol>
              {this.props.values}
            </ol>
          </Col>  */}
      </Col>
    );
  }
}

export default Charts;
