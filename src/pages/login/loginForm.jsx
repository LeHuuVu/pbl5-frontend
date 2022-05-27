// /* eslint-disable jsx-a11y/anchor-is-valid */

// import React, { useState } from 'react'
// import 'antd/dist/antd.min.css';
// import logo from 'E:/Benkyou/Nam_III_KY_II/PBL5/pbl5-frontend/src/logo_app.svg';
// import "./style.css";
// import { login } from '../../api/login'
// import { Form, Input, Button, Checkbox, notification } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

// function LoginForm() {
//   const [Email, setEmail] = useState({})
//   const [password, setPassword] = useState({})
//   const onEmailChange = (e) => {
//     setEmail(e.target.value)
//   }
//   const onPassChange = (e) => {
//     setPassword(e.target.value)
//   }
//   const onFinish = (values) => {
//     login({
//       email: Email,
//       password: password
//     }).then(() => openNotificationSuccess())
//       .catch((error) => {
//         notification.error({
//           message: 'Incorrect email or password',
//           duration: 3,
//         })
//       })
//   };
//   const openNotificationSuccess = () => {
//     notification.success({
//       message: 'Welcome back!',
//       duration: 3,
//     })
//     console.log('success')
//   }

//   return (
//     <div className='home-login'>
//       <div className='header'>
//         <h1>Welcome!</h1>
//         <h2>Login Pages</h2>
//       </div>
//       <div className='login-boder'>
//       <Form
//         // style={{
//         //   align:'center',
//         // }}
//         name="normal_login"
//         // className="login-form"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//       >
//         {/* <Form.Item {...formItemLayout}> */}
//         <Form.Item
//           name="Email"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your Email!',
//             },
//           ]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Email"
//             onChange={onEmailChange} />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your Password!',
//             },
//           ]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Password"
//             onChange={onPassChange}
//           />
//         </Form.Item>
//         {/* </Form.Item> */}

//         <Form.Item>
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox >Remember me</Checkbox><br />
//           </Form.Item>

//           <a className="login-form-forgot" href="">
//             Forgot password?
//           </a>
//         </Form.Item>

//         <Form.Item className='bt-login-register'>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             Log in
//           </Button><br/><br/>
//           <p>Or <a href="">Register now!</a></p>
//         </Form.Item>
//       </Form>
//       </div>

//     </div>
//     // <div>
//     //   <nav style={{ marginLeft: '10%', marginRight: '20%', fontSize: '26px',borderBottom:'2px solid' }}>
//     //     <a href="http://localhost:3000/"><img src={logo} style={{ height: '100px', width: 'auto' }} /></a><b>DUT E-Commerce Platform</b>
//     //     <a href="http://localhost:3000/register" rel="noopener noreferrer" style={{ float: 'right', marginTop: '25px' }}>Đăng ký</a>
//     //   </nav>
//     //   <div style={{backgroundColor:"gray"}}>
//     //     <div>
//     //       <div style={{ width: "50%", float: "left", textAlign: "right" }}>
//     //         <img src={logo} style={{ height: '50%', width: 'auto', position:"inherit" }} />
//     //       </div>
//     //       <div style={{ width: "27%", float: "left", height:"" }}>
//     //         <div style={{margin:'150px auto',backgroundColor:"rgb(108, 233, 160)", padding:"50px 50px",borderRadius:'20px', border:'2px solid white'}}>
//     //           <form action="">
//     //             <div>
//     //               <div> <h1>Đăng nhập</h1></div>
//     //             </div>
//     //             <div >
//     //               <input style={{height:40 , borderRadius:'8px', border:'2px solid rgb(173, 175, 174)'}} type="text" name='email' placeholder='Email/Tên đăng nhập' size={50}/><br /><br />
//     //               <input style={{height:40, borderRadius:'8px', border:'2px solid rgb(173, 175, 174)'}} type="password" name='password' placeholder='Mật khẩu' size={50} /><br /><br />
//     //               <button style={{width:360, backgroundColor:'rgb(253, 89, 13)',height:40, borderRadius:'8px', border:'2px solid rgb(243, 95, 36)'}}>Đăng nhập</button>
//     //             </div>
//     //           </form>
//     //           <br />
//     //           <div>
//     //             <a href="">Quên mật khẩu</a>
//     //             <a href="http://localhost:3000/register" style={{marginLeft:'160px'}}>Đã có tài khoản?</a>
//     //           </div>
//     //         </div>
//     //       </div>

//     //     </div>
//     //   </div>
//     //   {/* </div> */}
//     // </div>
//   )
// }
// export default LoginForm


import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Form, Input, Button, Checkbox } from 'antd';
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

export default () => <NormalLoginForm />;