import React, { Component } from "react";
import { Radio, Form } from "antd";

const FormItem = Form.Item;

class ButtonGroup extends Component {
  render() {
    return (
      <span style={{float: "right"}}>
        <FormItem>
          <Radio.Group>
            <Radio.Button value="successful"> Successful </Radio.Button>
            <Radio.Button value="failed"> Failed </Radio.Button>
            <Radio.Button value="all"> All </Radio.Button>
          </Radio.Group>
        </FormItem>
      </span>
    );
  }
}

export default ButtonGroup;
