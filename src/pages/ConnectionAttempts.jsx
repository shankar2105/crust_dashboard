import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tables from "../components/Tables";
import TabComp from "../components/TabComp";
import "./Dashboard.css";
import ButtonGroup from "../components/ButtonGroup";
import { filterByConnectionResult } from '../redux/dispatcher/logs_action';

import data from "../assets/data";
import { LineChartArray } from "../assets/data"

class ConnectionAttempts extends Component {

  prepareChartData() {
    const osArr = [];
    data.logs.forEach((log) => {
      osArr.push(log.peer_requester.os, log.peer_responder.os);
    });

    let osNames = new Set(osArr);
    const osName = Array.from(osNames);
    const osCount = osName.map(osN => (osArr.filter(os => os===osN).length));

    let osList = []
    osName.forEach((os, i) => {
      let osObj = {};
      osObj["x"]=os;
      osObj["y"]=osCount[i];
      osList.push(osObj);
    }
    );

    const listCountry = data.globalNetworkActivity.map((coun, i) => (
      <li>
        {coun.x} {coun.y}
      </li>
    ));

    const listOS = osName.map((os, i) => (
      <li>
        {os}
      </li>
    ))

    return [
      {"values":LineChartArray,
      "dataSource":null,
      "interval":null
      },
      {"values":listCountry,
      "dataSource":data.globalNetworkActivity,
      "interval":1000
      },
      {"values":listOS,
      "dataSource":osList,
      "interval":10
      }
    ]  
  }

  render() {
    return (
      <div className="gutter-example">
      <span>
          <h1 style={{ padding: "10px 0px 0px 30px", display: "inline" }}>Connection Attempts </h1>
          <span style={{ float: "right", padding: "10px 20px 0px 0px"}}>
            Connection result: <ButtonGroup selectedIndex={this.props.store.connectionResultFilter}  
            changeFilter={this.props.filterByConnectionResult}/>
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
            <TabComp chartData={this.prepareChartData()}/>
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
              <Tables dataSource={this.props.store.filteredConnectionResults}/>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store: store.logReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    filterByConnectionResult
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionAttempts);
