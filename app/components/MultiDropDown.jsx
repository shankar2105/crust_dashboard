import React, { Component } from "react";
import { Select, Row, Col } from "antd";

const Option = Select.Option;

class MultiDropDown extends Component {
    handleChange(value) {
        this.props.filterAction(this.props.mod, this.props.actionType, value)
    }
    render() {
        const { items, filterAction } = this.props;
        const children = [];
        items.forEach((item, k) => {
            children.push(<Option key={item}>{item}</Option>);
        });

        return (
            <Col className="filters-2-i" span={12}>
                <Col className="filters-2-i-title" span={6}>{this.props.type}</Col>
                <Select
                    className="filters-2-i-select"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(V) => this.handleChange(V)}
                >
                    {children}
                </Select>
            </Col>
        )
    }
}
export default MultiDropDown;
