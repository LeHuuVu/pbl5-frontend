// /* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import 'antd/dist/antd.min.css';
import { login } from '../../api/login';
import 'antd/dist/antd.css';
import './style.css';
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
    <div>
      <div>
        {/* header */}
      </div>
      <div style={{ width: "50%", float: "left", textAlign: "right" }}>
        <img src={logo} style={{ height: '50%', width: 'auto', position: "inherit" }} />
      </div>
      <div style={{ width: "24%", float: "left"}}>
        <div style={{margin:'150px auto',backgroundColor:"rgb(108, 233, 160)", padding:"35px 50px",borderRadius:'20px', border:'2px solid white'}}>
          <b style={{fontSize:"26px"}}>Đăng nhập</b><br /><br />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
              Or <a href="http://localhost:3000/register">Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default () => <LoginForm />;