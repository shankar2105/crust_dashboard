import React, { Component } from "react";
import { Tag, Row } from "antd";

const { CheckableTag } = Tag;

class TagButton extends Component {
    state = { checked: true };

    handleChange = (checked) => {
        this.setState({ checked });
        this.props.filterAction(this.props.mod, this.props.actionType, checked)
    }

    render() {
        const { name } = this.props
        return (
            <CheckableTag  {...this.props} checked={this.state.checked} onChange={this.handleChange}>{name}</CheckableTag>
        )
    }
}
export default TagButton;
