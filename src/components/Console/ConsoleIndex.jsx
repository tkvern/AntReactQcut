// export default ConsoleIndex;

import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import reqwest from 'reqwest';

const columns = [{
  title: '邮箱',
  dataIndex: 'username',
  width: '20%',
}, {
  title: '昵称',
  dataIndex: 'nick',
  width: '20%',
}, {
  title: '最后登录时间',
  dataIndex: 'last',
  width: '20%',
}];

const ConsoleIndex = React.createClass({
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
    this.setState({ loading: true });
    reqwest({
      url: 'http://z005.kmtongji.com/api/users',
      method: 'get',
      type: 'json',
      crossOrigin: true,
      withCredentials: true,
    }).then(data => {
      const pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data,
        pagination,
      });
    });
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <MainLayout>
        <Table columns={columns}
          // rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </MainLayout>
    );
  },
});

export default ConsoleIndex;