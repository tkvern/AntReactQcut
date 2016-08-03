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

  componentWillMount() {
    var userId = this.getCookie('_id');
    if(!userId){
      this.context.router.push('/login');
    }
  },

  getCookie(name) {  
    var nameEQ = name + "=";  
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {  
      var c = ca[i];
      while (c.charAt(0)==' ') {         
        c = c.substring(1,c.length);     
      }  
      if (c.indexOf(nameEQ) == 0) {
        return unescape(c.substring(nameEQ.length,c.length));
      }  
    }  
    return false;  
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
