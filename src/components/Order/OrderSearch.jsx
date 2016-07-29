import React, { Component, PropTypes } from 'react';
import { Form, Input, Row, Col, Button, DatePicker, Select } from 'antd';
import './OrderSearch.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const OrderSearch = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  onChange(value, dateString) {
    console.log('From: ', value[0], ', to: ', value[1]);
    console.log('From: ', dateString[0], ', to: ', dateString[1]);
  },
  render() {
    return (
      <Form horizontal className="ant-advanced-search-form">
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem
              label="订单编号"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入订单编号" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="创建时间"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <RangePicker format="yyyy/MM/dd" onChange={this.onChange} />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="订单类型"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Select id="select" size="large" placeholder="请选择订单类型" >
                <Option value="jack">剪发</Option>
                <Option value="lucy">染发</Option>
                <Option value="disabled" disabled>光头</Option>
                <Option value="yiminghe">洗头</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button>清除条件</Button>
          </Col>
        </Row>
      </Form>
    );
  },
});

export default OrderSearch;