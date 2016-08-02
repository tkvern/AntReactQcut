import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Card } from 'antd';
import './SimpleLayout.less';

const SimpleLayout = React.createClass({
  // contextTypes: {
  //   router: React.PropTypes.object.isRequired
  // },
  getInitialState() {
    return {
      collapse: false,
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <div id="alert"></div>
        <div className='ant-col-12 ant-col-offset-6' style={{ padding: '30px' }}>
          <Card title={ this.props.title } 
                bordered={false} 
                style={{ width: '400px', margin: '0px auto' }}>
            { this.props.children }
          </Card>
        </div>
      </div>
    );
  },
});
export default SimpleLayout;
