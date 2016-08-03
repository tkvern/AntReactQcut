
import React, { Component, PropTypes } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import reqwest from 'reqwest';
import SimpleLayout from '../../layouts/SimpleLayout/SimpleLayout';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let AuthSetPassword = React.createClass({
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

    let params = this.props.form.getFieldsValue(['password']);
    this.fetch(params);
  },

  clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    for (var i in keys) {
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() ;
    }
  },

  fetch(params = {}) {
    // console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://z005.kmtongji.com/api/users/setPassword',
      method: 'post',
      data: {
        ...params,
      },
      type: 'json',
      crossOrigin: true,
      withCredentials: true,
    }).then(data => {
      if(data.hasOwnProperty('errno')){
        this.clearCookie();
        if(data.hasOwnProperty('msg')){
          alert(data['msg']);
        }
        this.context.router.push('/login');
      }
    });
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

      <SimpleLayout title="重置密码">
        <Form horizontal form={this.props.form}>

          <FormItem
            {...formItemLayout}
            label="新的密码"
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
            <Button type="primary" onClick={this.handleSubmit}>重置密码</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>清空</Button>
          </FormItem>
        </Form>
      </SimpleLayout>
    );
  },
});

AuthSetPassword = createForm()(AuthSetPassword);

export default AuthSetPassword;