import React, { Component } from "react";
import { Row, Col, Card, Icon } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TabComp from "../components/TabComp";
import "./Dashboard.css";
import ButtonGroup from "../components/ButtonGroup";
import { filterByConnectionResult } from '../redux/dispatcher/logs_action';

import data from "../assets/data";
import { LineChartArray } from "../assets/data"
//import "./pages.css"
class ConnectionAttempts extends Component {
  prepareChartData() {
    const osArr = [];
    data.logs.forEach((log) => {
      osArr.push(log.peer_requester.os, log.peer_responder.os);
    });

    let osNames = new Set(osArr);
    const osName = Array.from(osNames);
    const osCount = osName.map(osN => (osArr.filter(os => os === osN).length));

    let osList = []
    osName.forEach((os, i) => {
      let osObj = {};
      osObj["x"] = os;
      osObj["y"] = osCount[i];
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
      {
        "values": LineChartArray,
        "dataSource": null,
        "interval": null
      },
      {
        "values": listCountry,
        "dataSource": data.globalNetworkActivity,
        "interval": 1000
      },
      {
        "values": listOS,
        "dataSource": osList,
        "interval": 10
      }
    ]
  }

  render() {
    return (
      <div className="page-1">
        <span className="page-1-head">
          <h1 className="page-1-head-title">Connection Attempts <Icon type="info-circle" theme="outlined" style={{fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.45)'}}/></h1>
          <div className="page-1-head-opts">
            <h3 className="page-1-head-opts-title">Connection result:</h3>
            <ButtonGroup selectedIndex={this.props.store.connectionResultFilter}
              changeFilter={this.props.filterByConnectionResult} />
          </div>
        </span>
        <Row gutter={24}>
          <Col className="gutter-row" span={24}>
            <Card
              bordered={false}
              style={{
                background: "#fff",
                borderRadius: 5,
                minHeight: 100
              }}
               className="tab-1-base"
            >
              <TabComp chartData={this.prepareChartData()} tableData={this.props.store.filteredConnectionResults} />
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
