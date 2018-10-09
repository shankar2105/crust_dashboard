import React, { Component } from "react";
import { Icon, Dropdown, Button, Menu, Col } from "antd";

export class DropDownItems extends Component {
    render() {
        const {type,menu1,menu2,selected1,selected2}=this.props;
        if (this.props.type === "Protocol") {
            return (
                <Col className="gutter-row" span={8}>
                    <Col span={4}>{type}</Col>
                    <Dropdown overlay={menu1} trigger={['click']}>
                        <Button style={{ marginLeft: 8 }}>
                            {selected1} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Col>
            )
        }
        else {
            return (
                <Col className="gutter-row" span={8}>
                    <Col span={4}>{type}</Col>
                    <Dropdown overlay={menu1} trigger={['click']}>
                        <Button style={{ marginLeft: 8 }}>
                        {selected1} <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Dropdown overlay={menu2} trigger={['click']}>
                        <Button style={{ marginLeft: 8 }}>
                        {selected2} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Col>
            )
        }
    }
}
