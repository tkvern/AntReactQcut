import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import reqwest from 'reqwest';
import SimpleLayout from '../../layouts/SimpleLayout/SimpleLayout';

let AuthLogOut = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit(e) {
    e.preventDefault();
    this.fetch();
  },

  fetch(params = {}) {
    this.setState({ loading: true });
    reqwest({
      url: 'http://z005.kmtongji.com/api/logout',
      method: 'get',
      data: {
      },
      type: 'json',
    }).then(data => {
      console.log(data);
      if(data.hasOwnProperty('errno')){
        alert('退出成功！')
        localStorage.removeItem('userinfo');
        this.context.router.push('/login');
      }
    });
  },

  render() {
    return (
      <Link to='#' onClick={this.handleSubmit} style={{color: '#ddd'}}>退出登录</Link>
    );
  },
});

export default AuthLogOut;