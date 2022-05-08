/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import 'antd/dist/antd.min.css';
import "./style.css";
import { login } from '../../api/login'
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({})
  const [password, setPassword] = useState({})
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPassChange = (e) => {
    setPassword(e.target.value)
  }
  const onFinish = () => {
    login({
      email: email,
      password: password,
    }).then(res => openNotificationSuccess(res))
      .catch((error) => {
        // console.log(error)
        if (error.request.status === 400) { 
          notification.error({
              message: 'Incorrect email or password',
              duration: 3,
            })
        }
      })
  };
  const openNotificationSuccess = (res) => {
    notification.success({
      message: 'Welcome back!',
      duration: 3,
    })
    localStorage['id'] =res.data.id;
    localStorage['email'] = res.data.email;
    localStorage['name'] = res.data.name;
    localStorage['phone'] = res.data.phone;
    localStorage['role'] = res.data.role;
    navigate("/viewproduct_detail");
  }
  return (
    <div className='home-login'>
      <div className='header'>
        <h1>Welcome!</h1>
        <h2>Login Pages</h2>
      </div>
      <div className='login-boder'>
      <Form
        // style={{
        //   align:'center',
        // }}
        name="normal_login"
        // className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {/* <Form.Item {...formItemLayout}> */}
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
        {/* </Form.Item> */}

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox >Remember me</Checkbox><br />
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item className='bt-login-register'>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button><br/><br/>
          <p>Or <a href="">Register now!</a></p>
        </Form.Item>
      </Form>
      </div>
      
    </div>
  )
}
export default LoginForm