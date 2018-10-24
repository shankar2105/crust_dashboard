import React, { Component } from "react";
import { Tag, Row } from "antd";

const { CheckableTag } = Tag;

class TagButton extends Component {
    state = { checked: true };

    handleChange = (checked) => {
        this.setState({ checked });
    }

    render() {
        return (
            <div>
                <CheckableTag  {...this.props} checked={this.state.checked} onChange={this.handleChange}>
                    {"Button"}
                </CheckableTag>
            </div>
        )
    }
}
export default TagButton;
