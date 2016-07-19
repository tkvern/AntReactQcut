import React, { Component, PropTypes } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import OrderList from './OrderList';

const OrderIndex = React.createClass({
  render(){
    return (
      <MainLayout>
        <OrderList />
      </MainLayout>
    );
  },
});


export default OrderIndex;
