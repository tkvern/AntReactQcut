import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Form, Input, Button, Checkbox } from 'antd';
import reqwest from 'reqwest';
import SimpleLayout from '../../layouts/SimpleLayout/SimpleLayout';
const FormItem = Form.Item;

let AuthLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
    let params = this.props.form.getFieldsValue(['username', 'password']);
    this.fetch(params);
  },

  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://z005.kmtongji.com/api/login',
      method: 'post',
      data: {
        ...params,
      },
      type: 'json',
    }).then(data => {
      console.log(data);
      if(data.hasOwnProperty('user')){
        alert('登录成功！')
        localStorage.setItem('userinfo', JSON.stringify(data));
        this.context.router.push('/');
      }
    }).fail(function (err, msg) {
      alert(JSON.parse(err.response).err.message);
    });
  },

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { style:{ textAlign: 'left' }}
    };
    return (
      <SimpleLayout title="用户登录" >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="账户"
            {...formItemLayout}
          >
            <Input placeholder="请输入账户名"
              {...getFieldProps('username')}
            />
          </FormItem>
          <FormItem
            label="密码"
            {...formItemLayout}
          >
            <Input type="password" placeholder="请输入密码"
              {...getFieldProps('password')}
            />
          </FormItem>
          <FormItem >
            <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
            <Link to="/signup" style={{float: 'right'}}>
              注册账号？
            </Link>
          </FormItem>
          <Button type="primary" htmlType="submit" size="large">登录</Button>
        </Form>
      </SimpleLayout>
    );
  },
});

AuthLogin = Form.create()(AuthLogin);

export default AuthLogin;