import React, { Component } from 'react';
import { Row, Col, Card, Tabs } from "antd";

import Tables from "../components/Tables";
import Charts from "../components/Charts";
import { ChartGenerator } from "../components/TabComp"
import DropdownOptions from "../components/SubComponents/DropDownRender";
import RenderPieChart from "../components/SubComponents/PieChartRender"
import ButtonGroup from "../components/ButtonGroup";
import data, { LineChartArray } from "../assets/data";

const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}

class NatType extends Component {
    render() {
        return (
            <div className="gutter-example">
                {/* <h1 style={{ padding: "10px 0px 0px 30px" }}>Nat Type</h1> */}
                <span>
                    <h1 style={{ padding: "10px 0px 0px 30px", display: "inline" }}>NAT TYPE </h1>
                    <span style={{ float: "right", padding: "10px 20px 0px 0px" }}>
                        Connection result: <ButtonGroup />
                    </span>
                </span>
                <Row gutter={24} style={{ margin: "24px 8px" }}>
                    <Col className="gutter-row" span={24}>
                        <Card
                            style={{
                                background: "#fff",
                                borderRadius: 5,
                                minHeight: 100
                            }}
                        >
                            <Tabs defaultActiveKey="1" onChange={callback} size="large">
                                <TabPane tab={"All NAT Types"} key={1} />
                                <TabPane tab={"EDM"} key={2} />
                                <TabPane tab={"EIM"} key={3} />
                                <TabPane tab={"EDM Random"} key={4} />
                                <TabPane tab={"EDM to EIM"} key={5} />
                                <TabPane tab={"EIM to EDM Random"} key={6} />
                                <TabPane tab={"EDM to EDM Random"} key={7} />
                            </Tabs>

                            <Row gutter={24} style={{ margin: "24px 8px" }}>
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                            </Row>

                            <DropdownOptions contents={["Protocol", "O.S.", "Country"]} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24} style={{ margin: "24px 8px" }}>
                    <Col className="gutter-row" span={24}>
                        <Card
                            style={{
                                background: "#fff",
                                borderRadius: 5,
                                minHeight: 500
                            }}>
                            <ChartGenerator type={"tabbedLineChart"} tabName1={"Success Rate"} tabName2={"Failure Rate"} data1={LineChartArray}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24} style={{ margin: "24px 8px" }}>
                    <Col className="gutter-row" span={24}>
                        <Card title="Connection Result: "
                            style={{
                                background: "#fff",
                                minHeight: 280
                            }}
                        >
                            <Tables dataSource={data.logs} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NatType;