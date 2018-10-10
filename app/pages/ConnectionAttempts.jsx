import React, { Component } from "react";
import { Row, Col, Card, Icon } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import "./Dashboard.css";
import { filterByConnectionResult, revalidate, filterChange } from '../redux/dispatcher/logs_action';
import DropDown from "../components/SubComponents/DropDownRender";
import AreaChart from "../components/AreaChart";
import Tables from "../components/Tables";
import {MOD_NAME} from "../redux/reducers/ConnectionAttempt/activity"

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
      <div className="page-1">
        <span className="page-1-head">
          <h1 className="page-1-head-title">Connection Attempts <Icon type="info-circle" theme="outlined" style={{fontSize: '14px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.45)'}}/></h1>
          <div className="page-1-head-opts">
            <h3 className="page-1-head-opts-title">Connection result:</h3>
            {/* <ButtonGroup selectedIndex={this.props.store.connectionResultFilter}
              changeFilter={this.props.filterByConnectionResult} /> */}
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
            <DropDown contents={["NAT Type", "Protocol", "O.S.", "Country"]} data={this.props.store.filteredConnectionResults} mod={MOD_NAME} filterAction={this.props.filterChange} 
              labels={this.props.store.filteredLogs} selectedLabel={this.props.activity.filter}/>
            </Card>
          </Col>
        </Row>
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
            <AreaChart data={formatAreaChart(this.props.activity.filteredLogs)} />
            </Card>
          </Col>
        </Row>
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
