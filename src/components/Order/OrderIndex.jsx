import React, { Component, PropTypes } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import OrderList from './OrderList';
import OrderSearch from './OrderSearch';

const OrderIndex = React.createClass({
  render(){
    return (
      <MainLayout>
        <OrderSearch />
        <br />
        <OrderList />
      </MainLayout>
    );
  },
});


export default OrderIndex;
