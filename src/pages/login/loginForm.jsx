/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import 'antd/dist/antd.min.css';
import "./style.css";
import { login } from '../../api/login'
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginForm() {
  const [Email, setEmail] = useState({ })
  const [password, setPassword] = useState({ })
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }  
  const onPassChange = (e) => {
    setPassword(e.target.value)
  }
  const onFinish = (values) => {
    login({
      email: Email,
      password: password
    }).then(() => openNotificationSuccess())
      .catch((error) => {
        notification.error({
          message: 'Incorrect email or password',
          duration: 3,
        })
      })
  };
  const openNotificationSuccess = () => {
    notification.success({
      message: 'Welcome back!',
      duration: 3,
    })
    console.log('success')
  }

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email" 
            onChange={onEmailChange} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={onPassChange}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginForm