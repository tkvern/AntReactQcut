import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Menu, Breadcrumb, Icon } from 'antd';
import AuthLogOut from '../../components/Auth/AuthLogOut';
import './MainLayout.less';
const SubMenu = Menu.SubMenu;

const MainLayout = React.createClass({
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

  getSelectIndex() {
    return this.context.router.isActive('/') ? 'laptop' :
      this.context.router.isActive('/order') ? 'order' : '';
  },

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },
  render() {
    let UserInfo;
    if(this.getCookie('username')){
      UserInfo = (
        <div>
          <li>{ this.getCookie('username') }</li>
          <li>|</li>
          <li>
            <Link to='/setpassword' style={{color: '#ddd'}}>修改密码</Link>
          </li>
          <li>|</li>
          <li><AuthLogOut /></li>
        </div>
      )
    } else {
      UserInfo = (
        <div>
          <li> 未登录 </li>
          <li>|</li>
          <li><AuthLogOut /></li>
        </div>
      )
    }
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <div className="ant-layout-ceiling">
          <div className="ant-layout-wrapper">
            <ul className="right">
              { UserInfo }
            </ul>
          </div>
        </div>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={[this.getSelectIndex()]}>
            <Menu.Item key="laptop">
              <Link to="/">
                <Icon type="laptop" /><span className="nav-text">控制台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to="/order">
                <Icon type="book" /><span className="nav-text">订单管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="user">
              <Icon type="user" /><span className="nav-text">员工管理</span>
            </Menu.Item>
            <Menu.Item key="notification">
              <Icon type="notification" /><span className="nav-text">服务管理</span>
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" /><span className="nav-text">店铺设置</span>
            </Menu.Item>
          </Menu>
          <div className="ant-aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
          </div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>应用列表</Breadcrumb.Item>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div style={{ minHeight: 220 }}>
                
                { this.props.children }
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
          基于 Ant Design © 2016 
          </div>
        </div>
      </div>
    );
  },
});
export default MainLayout;
