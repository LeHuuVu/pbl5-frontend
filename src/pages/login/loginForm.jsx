/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Form, Input, Button, Checkbox,notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import logo from '../../logo_app.png';
import {login} from '../../api/login';

function LoginForm() {
  // const [cookies, setCookie] = useCookies(["userInfo"]);  
  // const navigate = useNavigate();
  // const [maxAge, setAge] = useState(86400);
  const [remember, setRemember] = useState(true);
  const onFinish = async (values) => {
    await login({
      email: values.email,
      password: values.password,
    }).then(res => openNotificationSuccess(res))
      .catch((error) => {
        console.log(error)
        if (error.request.status === 400) { 
          notification.error({
              message: 'Sai email hoặc mật khẩu',
              duration: 3,
            })
        }
      })
  };
  const openNotificationSuccess = (res) => {
    if(remember){
      localStorage.setItem("user-info", JSON.stringify(res.data));
      localStorage.setItem("remember", 'local');
    }    
    else{
      sessionStorage.setItem("user-info", JSON.stringify(res.data));
      localStorage.setItem("remember", 'session');
    }
    // localStorage.setItem("age", maxAge);
    // setCookie("userInfo", JSON.stringify(res.data),
    // {
    //   path: "/",
    //   maxAge: maxAge,
    // });
    notification.success({
      message: 'Chào mừng bạn quay lại, '+res.data.name+"!",
      duration: 3,
    })
    //retrieve data 
    // JSON.parse(localStorage.getItem('user-info'))
    if(res.data.role===0){window.location.href= "/admin";}
    else if(res.data.role===2){window.location.href= "/sellingProduct";}
    else if(res.data.role!==2){window.location.href= "/productList";}
    // if(cookies.userInfo.role!==2){navigate("/productList");}
  }
  const onRemember = (e) => {
    if(e.target.checked){
      // setAge(90*86400)
      setRemember(true);
    }
    else{
      // setAge(86400)
      setRemember(false);
    }
      
  };
  return (
    <div>
      <title>!Ponzi Đăng nhập hoặc Đăng ký</title>
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
              name="email"
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
                <Checkbox onChange={onRemember}>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Quên mật khẩu?
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Đăng nhập
              </Button>
              Hoặc <a href="/register">Đăng ký ngay!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default () => <LoginForm />;