import React, { Component } from "react";
import { Col } from "antd";
import { Pie } from 'ant-design-pro/lib/Charts';
import './PieChartRender.css';

class RenderPieChart extends Component {
    render() {
        const { passed, failed } = this.props
        var calc = Math.round((passed / (passed + failed)) * 100);
        return (
            <div className="container">
                <Col className="gutter-row" span={6}>
                    <Col span={12} className="text">
                        <div>
                            Failed
                    <br />
                            {calc + "%"}
                        </div>
                    </Col> */}

                    <Col span={12} className="chart">
                        <Pie percent={calc} subTitle="Success Rate" height={140} total={calc + "%"}/>
                    </Col>
                </Col>
            </div>
        )
    }
}
export default RenderPieChart;
