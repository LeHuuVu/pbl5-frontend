// import React, { useState } from 'react';
// import logo from 'E:/Benkyou/Nam_III_KY_II/PBL5/pbl5-frontend/src/logo_app.svg';
// import './index.css';
// import 'antd/dist/antd.css';
// import {
//   Form,
//   Input,
//   InputNumber,
//   Cascader,
//   Select,
//   Row,
//   Col,
//   Checkbox,
//   Button,
//   AutoComplete,
//   Switch
// } from 'antd';
// const { Option } = Select;

// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 10,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 12,
//       offset: 10,
//     },
//   },
// };
// const tailFormBt = {
//   wrapperCol: {
//     xs: {
//       span: 12,
//       offset: 12,
//     },
//     sm: {
//       span: 24,
//       offset: 12,
//     },
//   },
// };

// function Register() {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };

//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select
//         style={{
//           width: 70,
//         }}
//       >
//         <Option value="44">+44</Option>
//         <Option value="64">+64</Option>
//         <Option value="82">+82</Option>
//         <Option value="84">+84</Option>
//         <Option value="86">+86</Option>
//         <Option value="91">+91</Option>
//         <Option value="95">+95</Option>
//       </Select>
//     </Form.Item>
//   );

//   return (
//     <div >
//       <div style={{width:"50%", float:"left", textAlign:"right"}}>
//         <a href="http://localhost:3000/" style={{}}><img src={logo} style={{ height: '100px', width: 'auto' }} /></a>
//       </div>
//       <div style={{width:"50%", float:"right"}}>
//         <Form {...formItemLayout}
//           form={form}
//           name="register"
//           className='div_border'
//           onFinish={onFinish}
//           initialValues={{
//             residence: ['zhejiang', 'hangzhou', 'xihu'],
//             prefix: '86',
//           }}
//           scrollToFirstError
//         >
//           <Form.Item label="Seller" valuePropName="checked">
//             <Switch />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="E-mail"
//             rules={[
//               {
//                 type: 'email',
//                 message: 'The input is not valid E-mail!',
//               },
//               {
//                 required: true,
//                 message: 'Please input your E-mail!',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your password!',
//               },
//             ]}
//             hasFeedback
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             name="confirm"
//             label="Confirm Password"
//             dependencies={['password']}
//             hasFeedback
//             rules={[
//               {
//                 required: true,
//                 message: 'Please confirm your password!',
//               },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }

//                   return Promise.reject(new Error('The two passwords that you entered do not match!'));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             name="nickname"
//             label="Nickname"
//             tooltip="What do you want others to see your name?"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your nickname!',
//                 whitespace: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="phone"
//             label="Phone Number"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your phone number!',
//               },
//             ]}
//           >
//             <Input
//               addonBefore={prefixSelector}
//             // style={{
//             //   width: '50%',
//             // }}
//             />
//           </Form.Item>

//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[
//               {
//                 validator: (_, value) =>
//                   value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
//               },
//             ]}
//             {...tailFormItemLayout}
//           >
//             <Checkbox>
//               I agree to the terms and policies of Multilevel-Association.
//             </Checkbox>
//           </Form.Item>
//           <Form.Item {...tailFormBt}>
//             <Button type="primary" htmlType="submit" >
//               Register
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>

//     // <div>
//     //   <nav style={{ marginLeft: '10%', marginRight: '20%', fontSize: '26px', borderBottom: '2px solid' }}>
//     //     <a href="http://localhost:3000/"><img src={logo} style={{ height: '100px', width: 'auto' }} /></a><b>DUT E-Commerce Platform</b>
//     //     <a href="http://localhost:3000/" rel="noopener noreferrer" style={{ float: 'right', marginTop: '40px',fontSize:'16px'}}>Đã có tài khoản?</a>
//     //     {/* <a href='http://localhost:3000/'><img src='E:\Benkyou\Nam_III_KY_II\PBL5\pbl5-frontend\src\logo_app-removebg-preview.png'/></a> */}
//     //   </nav>
//     //   <div style={{ backgroundColor: "gray" }}>
//     //     <div>
//     //       <div style={{ width: "50%", float: "left", textAlign: "right" }}>
//     //         <img src={logo} style={{ height: '50%', width: 'auto', position: "inherit" }} />
//     //       </div>
//     //       <div style={{ width: "27", float: "left", height: "" }}>
//     //         <div style={{ margin: '50px auto', backgroundColor: "rgb(108, 233, 160)", padding: "50px 50px", borderRadius: '20px', border: '2px solid white' }}>
//     //           <form action="">
//     //             <div>
//     //               <div> <h1>Đăng Ký</h1></div>
//     //             </div>
//     //             <div>
//     //               Seller:
//     //               <label class="switch">
//     //                 <input type="checkbox" />
//     //                 <span class="slider round"></span>
//     //               </label>
//     //             </div><br />
//     //             {/* <div class="custom-control custom-switch">
//     //               <input type="checkbox" class="custom-control-input" id="customSwitch1" checked/>
//     //               <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
//     //             </div> */}
//     //             <div >
//     //               <input style={{ height: 40, borderRadius: '8px', border: '2px solid rgb(173, 175, 174)' }} type="text" name='email' placeholder='Email/Tên đăng nhập' size={50} /><br /><br />
//     //               <input style={{ height: 40, borderRadius: '8px', border: '2px solid rgb(173, 175, 174)' }} type="password" name='password' placeholder='Mật khẩu' size={50} /><br /><br />
//     //               <input style={{ height: 40, borderRadius: '8px', border: '2px solid rgb(173, 175, 174)' }} type="password" name='confirm_password' placeholder='Nhập lại mật khẩu' size={50} /><br /><br />
//     //               <input style={{ height: 40, borderRadius: '8px', border: '2px solid rgb(173, 175, 174)' }} type="text" name='phone' placeholder='Số Điện thoại' size={50} /><br /><br />
//     //               <input style={{ height: 40, borderRadius: '8px', border: '2px solid rgb(173, 175, 174)' }} type="text" name='address' placeholder='Địa Chỉ' size={50} /><br /><br />
//     //               <div>
//     //                 <input type="checkbox" id="vehicle" name="vehicle" value="Boat" />
//     //                 <label for="vehicle"> Tôi đồng ý với các chính sach và điều khoản của Multilevel Association</label><br /><br />
//     //               </div>
//     //               <button style={{ width: 360, backgroundColor: 'rgb(253, 89, 13)', height: 40, borderRadius: '8px', border: '2px solid rgb(243, 95, 36)' }}>Đăng nhập</button>
//     //             </div>
//     //           </form>
//     //           <br />
//     //           <div>
//     //             <a href="http://localhost:3000/" style={{ marginLeft: '250px' }}>Đã có tài khoản?</a>
//     //           </div>
//     //         </div>
//     //       </div>

//     //     </div>
//     //   </div>
//     //   {/* </div> */}
//     // </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import logo from 'E:/Benkyou/Nam_III_KY_II/PBL5/pbl5-frontend/src/logo_app.svg';
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Checkbox,
  Divider,
} from 'antd';

const FormSizeDemo = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="44">+44</Option>
        <Option value="64">+64</Option>
        <Option value="82">+82</Option>
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
        <Option value="91">+91</Option>
        <Option value="95">+95</Option>
      </Select>
    </Form.Item>
  );
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 10,
      },
    },
  };

  return (
    <div>
      <div>
        {/* header */}
      </div>
      <div style={{ width: "50%", float: "left", textAlign: "right" }}>
        <img src={logo} style={{ height: '50%', width: 'auto', position: "inherit" }} />
      </div>
      <div style={{ width: "30%", float: "left" }}>
        <div>

        </div>
        <div style={{ margin: '80px auto', backgroundColor: "rgb(108, 233, 160)", padding: "35px 50px", borderRadius: '20px', border: '2px solid white' }}>
          <div style={{ textAlign: 'center' }}>
            <b style={{ fontSize: "26px" }}>Đăng Ký Tài Khoản</b><br /><br />
          </div>
          <div>
            <Form
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 15,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
            >
              <Form.Item label="Seller" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to see your name?"
                rules={[
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                className='bt_register'
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the terms and policies of Multilevel-Association.
                </Checkbox>
              </Form.Item>
              <Form.Item
                className='bt_register'>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                <Button type="primary" htmlType="exit" style={{marginLeft:'20px'}}>
                  <a href='http://localhost:3000/login'>Cancel</a>
                </Button>
              </Form.Item>
            </Form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default () => <FormSizeDemo />;
