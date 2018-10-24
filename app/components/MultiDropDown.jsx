import React, { Component } from "react";
import { Select, Row } from "antd";

const Option = Select.Option;

class MultiDropDown extends Component {
    handleChange(value) {
        this.props.filterAction(this.props.mod, this.props.actionType, value)      
    }
    render() {
        const { items, filterAction } = this.props;
        const children = [];
        items.forEach((item,k) => { 
            children.push(<Option key={item}>{item}</Option>);            
        }); 

        {
        }
        return (
            <Row>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(V) => this.handleChange(V)}
                >
                    {children}
                </Select>
            </Row>
        )
    }
}
export default MultiDropDown;
