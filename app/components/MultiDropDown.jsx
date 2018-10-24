import React, { Component } from "react";
import { Select, Row } from "antd";

const Option = Select.Option;

class MultiDropDown extends Component {
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        const { items } = this.props;
        const children = [];
        items.forEach((item,k) => { 
            children.push(<Option key={`publicId-${k}`}>{item}</Option>);            
        }); 

        {
        }
        return (
            <Row>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={this.handleChange()}
                >
                    {children}
                </Select>
            </Row>
        )
    }
}
export default MultiDropDown;
