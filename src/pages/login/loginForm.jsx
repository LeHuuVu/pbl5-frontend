import React,{useState} from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Form, Input, Button, Checkbox,notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logo from '../../logo_app.png';
import {login} from '../../api/login';

function LoginForm() {
  const navigate = useNavigate();
  const onFinish = () => {
    login({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
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
    navigate("/product_detail");
  }
  return (
    <div>
      <title>E-Commerce Đăng nhập hoặc Đăng ký</title>
      <div>
        
      </div>
      <div style={{ width: "50%", float: "left", textAlign: "right" }}>
        {/*E-Commerce Website  */}
        <img src={logo} style={{height: '50%',width:'auto',margin:'10% auto'}} />
      </div>
      <div style={{ width: "25%", float: "left"}}>
        <div style={{margin:'18% auto',backgroundColor:"rgb(81 251 152)", padding:"35px 50px",borderRadius:'20px', border:'2px solid white'}}>
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
                  message: 'Vui lòng nhập Email/Tên đăng nhập!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email/Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu của bạn!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Quên mật khẩu?
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng nhập
              </Button>
              Hoặc <a href="http://localhost:3000/register">Đăng ký ngay!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default () => <LoginForm />;