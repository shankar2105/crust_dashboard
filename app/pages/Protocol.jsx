import React, { Component } from 'react';
import { Row, Col, Card, Tabs } from "antd";

import Tables from "../components/Tables";
import DropdownOptions from "../components/SubComponents/DropDownRender";
import RenderPieChart from "../components/SubComponents/PieChartRender"
import ButtonGroup from "../components/ButtonGroup";
import data, { AreaChartArray } from "../assets/data";
import AreaChart from "../components/AreaChart";


function callback(key) {
    console.log(key);
}

const TabPane = Tabs.TabPane;
class Protocol extends Component {
    render() {
        return (
            <div className="gutter-example">
                {/* <h1 style={{ padding: "10px 0px 0px 30px" }}>Protocol</h1> */}
                <span>                        
                        <h1 style={{ padding: "5px 0px 0px 40px", display: "inline"}}>PROTOCOL</h1>
                    <span style={{ float: "right", padding: "10px 20px 0px 0px" }}>
                        <h3 style={{ float: "left", padding: "5px 30px 0px 0px" }}>  Connection result:</h3>
                        <ButtonGroup />
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
                                <TabPane tab={"All Protocols"} key={1} />
                                <TabPane tab={"TCP Direct"} key={2} />
                                <TabPane tab={"TCP Hole Punched"} key={3} />
                                <TabPane tab={"uTP Hole Punched"} key={4} />
                            </Tabs>

                            <Row gutter={24} style={{ margin: "24px 8px" }}>
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                                <RenderPieChart passed={10} failed={4} />
                            </Row>

                            <DropdownOptions contents={["NAT Type", "O.S.", "Country"]} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24} style={{ margin: "24px 8px" }}>
                <Col className="gutter-row" span={24}>
                <Card title="Protocol Acceptance Rate Result: "
                            style={{
                                background: "#fff",
                                minHeight: 280
                            }}
                        >
                    <AreaChart data={AreaChartArray}/>
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
                            <Tables dataSource={data.logs}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Protocol;