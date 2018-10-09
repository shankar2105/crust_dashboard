import React, { Component } from "react";
import { Icon, Dropdown, Button, Menu, Col } from "antd";

const menu = (
    <Menu>
        <Menu.Item key="1"><Icon type="user" />1st menu item</Menu.Item>
        <Menu.Item key="2"><Icon type="user" />2nd menu item</Menu.Item>
        <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
    </Menu>
);

export class DropDownItems extends Component {
    render() {

        if (this.props.type === "Protocol") {
            return (
                <Col className="dropdown-render-i" span={8}>
                    <Col span={6}>{this.props.type}</Col>
                    <Dropdown overlay={menu} placement="topLeft" >
                        <Button>
                            Any <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Col>
            )
        }
        else {
            return (
                <Col className="dropdown-render-i" span={8}>
                    <Col span={6}>{this.props.type}</Col>
                    <Dropdown overlay={menu} placement="topLeft" >
                        <Button>
                            Any <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="topCenter">
                        <Button>
                            Any <Icon type="down" />
                        </Button>
                    </Dropdown>
                </Col>
            )
        }
    }
}
