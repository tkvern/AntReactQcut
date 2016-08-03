
import React, { Component, PropTypes } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import reqwest from 'reqwest';
import SimpleLayout from '../../layouts/SimpleLayout/SimpleLayout';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let AuthSignUp = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    // console.log('收到表单值：', this.props.form.getFieldsValue());
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
    });

    let params = this.props.form.getFieldsValue(['username', 'password', 'nick']);
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
    // console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://z005.kmtongji.com/api/register',
      method: 'post',
      data: {
        ...params,
      },
      type: 'json',
      crossOrigin: true,
      withCredentials: true,
    }).then(data => {
      if(data.hasOwnProperty('user')){
        var obj = data['user'];
        for (var prop in obj) {
          if(!obj.hasOwnProperty(prop)) continue;
          
          this.setCookie(prop, obj[prop], 36000);
        }
        alert('注册成功！');
        this.context.router.push('/');
      } else {
        if(data.hasOwnProperty('message')){
          alert(data['message']);
        }
      }
    });
  },

  emailExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      let params = this.props.form.getFieldsValue(['username']);
      // console.log('请求参数：', params);
      reqwest({
        url: 'http://z005.kmtongji.com/api/register',
        method: 'post',
        data: {
          ...params,
        },
        type: 'json',
      }).then(data => {
        if(data.hasOwnProperty('name') && data['name'] == 'UserExistsError'){
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      });
    }
  },

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      // validateFields(['rePasswd'], { force: true });
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nickProps = getFieldProps('nick', {
      rules: [
        { required: true, min: 5, message: '昵称至少为 5 个字符' },
      ],
    });
    const emailProps = getFieldProps('username', {
      validate: [{
        rules: [
          { 
            required: true, 
            message: '邮箱不能为空' 
          },
          {
            validator: this.emailExists
          },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { 
            type: 'email', 
            message: '请输入正确的邮箱地址' 
          },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });
    const passwdProps = getFieldProps('password', {
      rules: [
        { 
          required: true, 
          min: 6, 
          whitespace: true, 
          message: '请填写正确的密码，最少6位' 
        },
        { 
          validator: this.checkPass 
        },
      ],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [
        {
          required: true,
          min: 6,
          whitespace: true,
          message: '请再次输入密码',
        }, 
        {
          validator: this.checkPass2,
        }
      ],
    });
    const formItemLayout = {
      labelCol: { style:{ textAlign: 'left' }},
    };
    return (

      <SimpleLayout title="注册账号">
        <Form horizontal form={this.props.form}>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            <Input 
              {...emailProps} 
              type="email"
              autoFocus="true"
              placeholder="请输入邮箱" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="昵称"
            hasFeedback
          >
            <Input 
              {...nickProps}
              autoComplete="off"
              placeholder="请输入昵称" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            <Input 
              {...passwdProps} 
              type="password" 
              autoComplete="off"
              placeholder="请输入密码"
              onContextMenu={noop} 
              onPaste={noop} 
              onCopy={noop} 
              onCut={noop}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
            <Input 
              {...rePasswdProps} 
              type="password" 
              autoComplete="off" 
              placeholder="两次输入密码保持一致"
              onContextMenu={noop} 
              onPaste={noop} 
              onCopy={noop} 
              onCut={noop}
            />
          </FormItem>

          <FormItem wrapperCol={{ span: 13, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>立即注册</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
      </SimpleLayout>
    );
  },
});

AuthSignUp = createForm()(AuthSignUp);

export default AuthSignUp;