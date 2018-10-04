import React, { Component } from "react";
import { Tabs, Row, Col, Dropdown, Button, Icon, Menu, Card } from "antd";
import DropdownOptions from "./SubComponents/DropDownRender";
import Charts from "./Charts";
import LineChart from "./LineChart";
const TabPane = Tabs.TabPane;


export class BarChartTabs extends Component {
  render() {
    const { chartData } = this.props;
    return (
      <Row gutter={24} style={{ margin: "24px 8px" }}>
        <Col className="gutter-row" span={24}>
          <Card
            style={{
              background: "#fff",
              borderRadius: 5,
              minHeight: 500
            }}>
            <Charts values={chartData.values} dataSource={chartData.dataSource} interval={chartData.interval} />
          </Card>
        </Col>
      </Row>
    )
  }
}

export class LineChartTabs extends Component {
  render() {
    const {data}=this.props;
    return (
        <Row gutter={24} style={{ margin: "24px 8px" }}>
          <Col className="gutter-row" span={24}>
            <Card
              style={{
                background: "#fff",
                borderRadius: 5,
                minHeight: 500
              }}>
              <LineChart data={data} height={400} titleMap={{ y1: 'Total', y2: 'Successful', y3: 'Failed' }} />
            </Card>
          </Col>
        </Row>
    )
  }
}


export class ChartGenerator extends Component {
  callback(key) {
    console.log(key);
  }  
  render() {
    const { type,tabName1,tabName2,data1, data2 } = this.props;
    if (type === "tabbedBarChart") {
      return (
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
          <TabPane tab={tabName1} key={1}>
            <BarChartTabs chartData={data1} />
          </TabPane>

          <TabPane tab={tabName2} key={2}>
            <BarChartTabs chartData={data2} />
          </TabPane>
        </Tabs>
      )
    }
    else if(type === "tabbedLineChart")
    {
      return (
        <div>
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
          <TabPane tab={tabName1} key={1}>
            <LineChartTabs data={data1}/>
          </TabPane>
           <TabPane tab={tabName2} key={2}>
            <LineChartTabs data={data1}/>
          </TabPane>
        </Tabs>
        </div>
      )
    }
    else {
      return (
        <Row gutter={24} style={{ margin: "24px 8px" }}>
          <Col className="gutter-row" span={24}>
            <Card
              style={{
                background: "#fff",
                borderRadius: 5,
                minHeight: 500
              }}>
              <LineChart data={data1} height={400} titleMap={{ y1: 'Total', y2: 'Successful', y3: 'Failed' }} />
            </Card>
          </Col>
        </Row>
      )
    }
  }
}

class TabComp extends Component {
  callback(key) {
    console.log(key);
  }  

  NestedTabChart(key, tabName, tabTypes, chartType, chartData1, chartData2) {
    return (
      <TabPane tab={tabName} key={key}>
        <DropdownOptions contents={tabTypes} />
        <ChartGenerator type={chartType} tabName1={"Success Rate"} tabName2={"Failure Rate"} data1={chartData1} data2={chartData2} />
      </TabPane>
    )
  }

  render() {
    const Chart1Data = this.props.chartData[0];
    const Chart2Data = this.props.chartData[1];
    const Chart3Data = this.props.chartData[2];
    return (
          <div>
            <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
              {this.NestedTabChart(1, "All Activity", ["NAT Type", "O.S.", "Protocol", "Country"], "lineChart", Chart1Data.values)}
              {this.NestedTabChart(2, "Country", ["NAT Type", "Protocol", "O.S."], "tabbedBarChart", Chart2Data, Chart2Data)}
              {this.NestedTabChart(3, "Operating System", ["NAT Type", "Protocol", "O.S."], "tabbedBarChart", Chart3Data, Chart3Data)}
            </Tabs>
          </div>
        );
    }

}
export default TabComp;
