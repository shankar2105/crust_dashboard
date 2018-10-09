import React, { Component } from "react";
import { Radio, Form } from "antd";

import Action from '../redux/ActionType';

const FormItem = Form.Item;

class ButtonGroup extends Component {

  render() {
    return (
      <span className="btn-group">
        <FormItem>
          <Radio.Group>
            <Radio.Button value="successful" onClick={() => this.props.changeFilter(Action.FILTER_SUCCESS)}> Successful </Radio.Button>
            <Radio.Button value="failed" onClick={() => this.props.changeFilter(Action.FILTER_FAILURE)}> Failed </Radio.Button>
            <Radio.Button value="all" onClick={() => this.props.changeFilter(Action.FILTER_NONE)}> All </Radio.Button>
          </Radio.Group>
        </FormItem>
      </span>
    );
  }
}

export default ButtonGroup;
