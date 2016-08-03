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

  setCookie(name, value, seconds) {  
    seconds = seconds || 0;
    var expires = "";  
    if (seconds != 0 ) {
      var date = new Date();  
      date.setTime(date.getTime()+(seconds*1000));  
      expires = "; expires="+date.toGMTString();  
    }  
    document.cookie = name+"="+escape(value)+expires+"; path=/";
  },

  fetch(params = {}) {
    console.log('请求参数：', params); 
    reqwest({
      url: 'http://z005.kmtongji.com/api/login',
      method: 'post',
      data: {
        ...params,
      },
      type: 'json',      
      crossOrigin: true,
      withCredentials: true,
    }).then(data => {
      console.debug();
      if(data.hasOwnProperty('user')){
        var obj = data['user'];
        for (var prop in obj) {
          if(!obj.hasOwnProperty(prop)) continue;
          this.setCookie(prop, obj[prop], 36000);
        }
        alert('登录成功！');
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