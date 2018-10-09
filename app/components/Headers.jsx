import { Layout, Menu, Icon, DatePicker } from "antd";
import React, { Component } from "react";
import moment from "moment";


const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const { Header } = Layout;
class Headers extends Component {
    state = {
        collapsed: false
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed
        });
      };
    
  render() {
    return (
      <div>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggle}
          />
          <span className="date">
            <RangePicker
              defaultValue={[
                moment("2015/01/01", dateFormat),
                moment("2015/01/01", dateFormat)
              ]}
              format={dateFormat}
            />
          </span>
        </Header>
      </div>
    );
  }
}

export default Headers;
