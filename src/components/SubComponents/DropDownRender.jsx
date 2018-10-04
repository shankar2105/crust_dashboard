import React, { Component } from "react";
import {Row, Col, Icon, Menu, Dropdown, Button} from "antd";
import {DropDownItems} from "./DropDownItems"

class DropDown extends Component {
    tabContent=null;
    constructor(props){
        super(props);
        this.tabContent=this.props.contents;
    }

    render(){
      console.log("render being called more than once");
        if (this.tabContent.length===4) {
            return( 
            <div>
            <Row gutter={24} style={{ margin: "24px 8px" }}>
            <DropDownItems  type={this.tabContent[0]}/>              
            <DropDownItems  type={this.tabContent[1]}/>
            </Row>
            
            <Row gutter={24} style={{ margin: "24px 8px" }}>
            <DropDownItems  type={this.tabContent[2]}/>              
            <DropDownItems  type={this.tabContent[3]}/>
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
