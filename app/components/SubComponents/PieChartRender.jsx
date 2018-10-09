import React, { Component } from "react";
import { Col } from "antd";
import { Pie } from 'ant-design-pro/lib/Charts';
import './PieChartRender.css';

class RenderPieChart extends Component {
    render() {
        const { passed, failed } = this.props
        var calc = Math.round((failed / (passed + failed)) * 100);
        return (
            <div className="container">
                <Col className="gutter-row" span={6}>
                    <Col span={12} className="text">
                        <div>
                            Failed
                    <br />
                            {calc + "%"}
                        </div>
                    </Col>

                    <Col span={12} className="chart">
                        <Pie percent={calc} height={140}  />
                    </Col>
                </Col>
            </div>
        )
    }
}
export default RenderPieChart;
