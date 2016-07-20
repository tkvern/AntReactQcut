import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Menu, Breadcrumb, Icon } from 'antd';
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
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <div className="ant-layout-ceiling">
          <div className="ant-layout-wrapper">
            <ul className="right">
              <li>user@example.com</li>
              <li>|</li>
              <li>退出登录</li>
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
          基于 Ant Design © 2016 智泽东裕科技有限公司
          </div>
        </div>
      </div>
    );
  },
});
export default MainLayout;
