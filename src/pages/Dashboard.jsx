import React, { Component } from "react";
import { Row, Col, Card } from "antd";

import Tables from "../components/Tables";
import Charts from "../components/Charts";
import "./Dashboard.css";
import MiniAreas from "../components/MiniAreas";
import PieCharts from "../components/PieCharts";

import data,{natData,protocolData} from "../assets/data";

const osArr = [];
data.logs.forEach((log) => {
  osArr.push(log.peer_requester.os, log.peer_responder.os);
});

const listCountry = data.globalNetworkActivity.map((coun, i) => (
  <li>
    {coun.x} {coun.y}
  </li>
));

var sortNatData = natData.sort((m, n) => m.value < n.value);
var sortProtocolData = protocolData.sort((m, n) => m.value < n.value);


const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 8,
  xl: 8
};

class Dashboard extends Component {
  render() {
    return (
      <div className="gutter-example">
        <Row gutter={24} style={{ margin: "24px 8px" }}>
          <Col className="gutter-row" span={24}>
            <Card
              title="Global Network Activity"
              style={{
                background: "#fff",
                borderRadius: 5,
                minHeight: 500
              }}
            >
              <Charts
                    values={listCountry}
                    dataSource={data.globalNetworkActivity}
                    interval={1000}
                  />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ margin: "24px 8px" }}>
          <Col className="gutter-row" span={8} {...topColResponsiveProps}>
            <Card
            title="NAT Type"
              style={{
                background: "#fff",
                minHeight: 350
              }}
            >
            <PieCharts data={sortNatData} title="NAT Type" />              
            </Card>
          </Col>
          <Col className="gutter-row" span={8} {...topColResponsiveProps}>
            <Card
            title="Protocol"
              style={{
                background: "#fff",
                minHeight: 350
              }}
            >
            <PieCharts data={sortProtocolData} title="Protocol" />
            </Card>
          </Col>
          <Col className="gutter-row" span={8} {...topColResponsiveProps}>
            <Card
            title="Connection Attempts"
              style={{
                background: "#fff",
                minHeight: 350
              }}
            >
            <MiniAreas />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ margin: "24px 8px" }}>
          <Col className="gutter-row" span={24}>
            <Card
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

export default Dashboard;
