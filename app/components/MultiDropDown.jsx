import React, { Component } from "react";
import { Select, Row, Col, Spin } from "antd";
// import debounce from 'lodash/debounce';
import PromiseWorker from 'promise-worker';

const worker = new Worker('../redux/dispatcher/worker.js');
const promiseWorker = new PromiseWorker(worker);

const Option = Select.Option;

class MultiDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            data: [],
            value: [],
            fetching: false,
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        console.log('before data change', nextState);
        if (nextState.fetching) {
            console.log('before data change', nextState);
            promiseWorker.postMessage({
                type: 'FILTER_NAME',
                payload: {
                    data: nextState.items,
                    search: nextState.value
                }
            }).then((res) => {    console.log("res",res)
                this.setState({
                    data: res,
                    fetching: false
                });
            })
        }
        return true;
    }

    fetchUser = (value) => {
        this.setState({
            fetching: true,
            data: [],
            value: value
        });

    }


    handleChange(value) {
        this.props.filterAction(this.props.mod, this.props.actionType, value)
        this.setState({
            data: [],
        });
    }
    render() {
        const { fetching, data } = this.state;

        return (
            <Col className="filters-2-i" span={12}>
                <Col className="filters-2-i-title" span={6}>{this.props.type}</Col>
                <Select
                    className="filters-2-i-select"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={(value) => this.fetchUser(value)}
                    onChange={(item) => this.handleChange(item)}
                >
                    {data.map(d => <Option key={d}>{d}</Option>)}
                </Select>
            </Col>
        )
    }
}
export default MultiDropDown;
