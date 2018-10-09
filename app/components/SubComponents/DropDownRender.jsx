import React, { Component } from "react";
import {Row, Col, Icon, Menu, Dropdown, Button} from "antd";
import {DropDownItems} from "./DropDownItems"
import { PROTOCOL,NatType,OS } from "../../redux/FilterTypes";
import Action from '../../redux/ActionType';

class DropDown extends Component {
    
    constructor(props){
        super(props);
        this.tabContent=this.props.contents;

    const protocolMenu = (
        <Menu>
            <Menu.Item key="proto1">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_BY_PROTOCOL,PROTOCOL.ANY)}>{PROTOCOL.ANY}</a>
            </Menu.Item>
            <Menu.Item key="proto2">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_BY_PROTOCOL,PROTOCOL.TCP_DIRECT)}>{PROTOCOL.TCP_DIRECT}</a>
            </Menu.Item>
            <Menu.Item key="proto3">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_BY_PROTOCOL,PROTOCOL.UTP_HP)}>{PROTOCOL.UTP_HP}</a>
            </Menu.Item>
        </Menu>
    )           

    const natMenu1 = (
        <Menu>
            <Menu.Item key="nat1_1">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_NAT_TYPE1,NatType.ANY)}>{NatType.ANY}</a>
            </Menu.Item>
            <Menu.Item key="nat1_2">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_NAT_TYPE1,NatType.EDM)}>{NatType.EDM}</a>
            </Menu.Item>
            <Menu.Item key="nat1_3">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_NAT_TYPE1,NatType.EIM)}>{NatType.EIM}</a>
            </Menu.Item>
        </Menu>
    )

    const natMenu2 = (
        <Menu>
            <Menu.Item key="nat2_1">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_NAT_TYPE2,NatType.ANY)}>{NatType.ANY}</a>
            </Menu.Item>
            <Menu.Item key="nat2_2">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_NAT_TYPE2,NatType.EDM)}>{NatType.EDM}</a>
            </Menu.Item>
            <Menu.Item key="nat2_3">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_NAT_TYPE2,NatType.EIM)}>{NatType.EIM}</a>
            </Menu.Item>
        </Menu>
    );
    
    const osMenu1 = (
        <Menu>
            <Menu.Item key="os1_1">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE1,OS.ANY)}>{OS.ANY}</a>
            </Menu.Item>
            <Menu.Item key="os1_2">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE1,OS.OSX)}>{OS.OSX}</a>
            </Menu.Item>
            <Menu.Item key="os1_3">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE1,OS.UNIX)}>{OS.UNIX}</a>
            </Menu.Item>
            <Menu.Item key="os1_4">   
                <a onClick={() =>this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE1,OS.WIN)}>{OS.WIN}</a>
            </Menu.Item>
        </Menu>
    )

    const osMenu2 = (
        <Menu>
            <Menu.Item key="os2_1">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE2,OS.ANY)}>{OS.ANY}</a>
            </Menu.Item>
            <Menu.Item key="os2_2">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE2,OS.OSX)}>{OS.OSX}</a>
            </Menu.Item>
            <Menu.Item key="os2_3">   
                <a onClick={() => this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE2,OS.UNIX)}>{OS.UNIX}</a>
            </Menu.Item>
            <Menu.Item key="os2_4">   
                <a onClick={() =>this.props.filterAction(this.props.mod,Action.FILTER_OS_TYPE2,OS.WIN)}>{OS.WIN}</a>
            </Menu.Item>
        </Menu>
    )
    }
    render(){
      console.log("render being called more than once");
        if (this.tabContent.length===4) {
            return( 
            <div>
            <Row gutter={24} style={{ margin: "24px 8px" }}>
            <DropDownItems  type={this.tabContent[0]} menu1={this.natMenu1}  menu2={this.natMenu2}/>              
            <DropDownItems  type={this.tabContent[1]} menu1={this.protocolMenu}  menu2={""}/>
            </Row>
            
            <Row gutter={24} style={{ margin: "24px 8px" }}>
            <DropDownItems  type={this.tabContent[2]} menu1={this.osMenu1}  menu2={this.osMenu2}/>              
            <DropDownItems  type={this.tabContent[3]} menu1={this.osMenu1}  menu2={this.osMenu1}/>
            </Row>
            </div>
            )          
        } else {
            return( 
                <div>
                <Row gutter={24} style={{ margin: "24px 8px" }}>
                <DropDownItems  type={this.tabContent[0]}/>
                <DropDownItems  type={this.tabContent[1]}/>
                <DropDownItems  type={this.tabContent[2]}/>
                </Row>
                </div>
                )              
        }
      }
}
export default DropDown;
