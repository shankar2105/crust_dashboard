import React, { Component } from "react";
import { Table, Card, Button } from "antd";

import columns from '../assets/tableData/tableColumn';

const { Meta } = Card;

function filterLogs(rawData) {
  let rand = Math.floor(Math.random() * 10000);
  var dataSource = [];
  rawData.forEach(log => {
    dataSource.push({
      key: Math.floor(Math.random() * 10000),
      num: rand += 1,
      direct: log.is_direct_successful === true ? "Yes" : "No",
      tcp_hp: log.tcp_hole_punch_result === "success" ? "Yes" : "Fail",
      utp_hp: !(log.utp_hole_punch_result.Succeeded) ? "Fail" : `${log.utp_hole_punch_result.Succeeded.time_spent.secs}:${log.utp_hole_punch_result.Succeeded.time_spent.nanos}`,
      nat_type: [log.peer_requester.nat_type, log.peer_responder.nat_type],
      os: [log.peer_requester.os, log.peer_responder.os],
      country: [log.peer_requester.geo_info.country_name, log.peer_responder.geo_info.country_name]
    });
  });
  return dataSource
}

class Tables extends Component {
  render() {
    const { dataSource } = this.props;
    var filterData = filterLogs(dataSource)
    return (
      <Card
        style={{
          background: "#fff",
          borderRadius: 5,
        }}
        className="cus-card-1 table-1"
        title="Failed Connections"
      >
        <div className="table-1-opt">
          <Button type="primary" icon="download" size="large">Download CSV</Button>
        </div>
        <Table
          dataSource={filterData}
          columns={columns}
          pagination={false}
        />
      </Card>
    );
  }
}

export default Tables;
