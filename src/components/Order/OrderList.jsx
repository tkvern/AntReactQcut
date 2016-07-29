import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';

const columns = [{
  title: '订单编号',
  dataIndex: 'registered',
  width: '20%',
}, {
  title: '创建时间',
  dataIndex: 'gender',
  sorter: true,
  render: gender => `${gender}`,
  width: '20%',
}, {
  title: '服务人员',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
}, {

}];

const OrderList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  },
  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://api.randomuser.me',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then(data => {
      const pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  },
});

export default OrderList;