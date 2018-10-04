import React, { Component } from "react";
import PieCharts from "../PieCharts"
import { Row, Col } from "antd";

class RenderPieChart extends Component {
    render() {
        const { passed, failed } = this.props
        var calc = Math.round((failed / (passed + failed)) * 100) + "%";
        return (
            <div>
                <Col className="gutter-row" span={3}>

                    <Col className="gutter-row" span={10}>
                        <Row gutter={3} style={{ margin: "24px 8px" }}> Failed </Row>
                        <Row gutter={3} style={{ margin: "24px 8px" }}> {calc} </Row>
                    </Col>

                    <Col className="gutter-row" span={10} >
                        {/* <PieCharts data={[calc]} /> */}
                        PieChart here
                    </Col>
                </Col>
            </div>
        )
    }
}
export default RenderPieChart;
