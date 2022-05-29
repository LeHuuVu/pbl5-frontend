import React,{useState} from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Form, Input, Button, Checkbox,notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logo from '../../logo_app.svg';
import login from '../../pages/login';

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