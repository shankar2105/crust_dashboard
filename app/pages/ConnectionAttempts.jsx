import React, { Component } from "react";
import { Row, Col, Card, Button } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TabComp from "../components/TabComp";
import "./Dashboard.css";
import ButtonGroup from "../components/ButtonGroup";
import { filterByConnectionResult, revalidate, filterChange } from '../redux/dispatcher/logs_action';
import { mods } from "../redux/FilterTypes"
import data, { AreaChartArray } from "../assets/data";
import { LineChartArray } from "../assets/data"
import ActionType from "../redux/ActionType";
import { NatType, OS, PROTOCOL } from "../redux/FilterTypes";
import DropDown from "../components/SubComponents/DropDownRender";
import AreaChart from "../components/AreaChart";
import Tables from "../components/Tables";

const formatAreaChart = (logs) => {
  let logCount = 0
  let TCP_D = 0
  let TCP_HP = 0
  let uTP_HP = 0
  const arrayList = []

  logs.forEach(log => {
      logCount++
      log.is_direct_successful? TCP_D++ : TCP_D--
      log.tcp_hole_punch_result === 'Succeeded' ? TCP_HP++ : TCP_HP--;
      log.utp_hole_punch_result === 'Succeeded' ? uTP_HP++ : uTP_HP--;
      arrayList.push({
        "logCount": logCount,
            "TCP_D": TCP_D,
            "TCP_HP": TCP_HP,
            "uTP_HP": uTP_HP
        })
    })
    return (arrayList);
};

//import "./pages.css"
class ConnectionAttempts extends Component {
  constructor(props) {
    super(props);
    // this.props.revalidate(mods.CON_ACT_,this.props.store.filteredConnectionResults);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   //initially if returns false since the state isn't changed. 
  //   //we set the initial state using constructor and this function for later changes
  //   if (this.props.store.filteredConnectionResults != nextProps.store.filteredConnectionResults) {
  //     this.props.revalidate(mods.CON_ACT_,nextProps.store.filteredConnectionResults);
  //   }
  // }

  componentDidMount() {
    this.props.revalidate(this.props.store.filteredConnectionResults);
  }

  render() {
    return (
      <div className="gutter-example">
        <span className="page-heading">
          <h1 style={{ padding: "5px 0px 0px 40px", display: "inline" }}>Connection Attempts </h1>
          {/* <span style={{ float: "right", padding: "10px 20px 0px 0px" }}>
            <h3 style={{ float: "left", padding: "5px 30px 0px 0px" }}>  Connection result:</h3>
            <ButtonGroup selectedIndex={this.props.store.connectionResultFilter}
              changeFilter={this.props.filterByConnectionResult} />
          </span> */}
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
              <DropDown contents={["NAT Type", "Protocol", "O.S.", "Country"]} mod={""} filterAction={""} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ margin: "24px 8px" }}>
          <Col className="gutter-row" span={24}>
            <Card title="Connection Success Rate"
              style={{
                background: "#fff",
                borderRadius: 5,
                minHeight: 500
              }}>
              <AreaChart data={formatAreaChart(this.props.activity.filteredLogs)} />
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
              <Tables dataSource={this.props.activity.filteredLogs} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    store: store.logReducer,
    activity: store.connectionAttemptActivity
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    filterByConnectionResult,
    revalidate,
    filterChange
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionAttempts);
