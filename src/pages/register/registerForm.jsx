import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import logo from '../../logo_app.png';
import {
    Form,
    Input,
    Button,
    Select,
    Switch,
    Checkbox,
    Divider,
} from 'antd';

const RegisterForm = () => {
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

    return (
        <div>
            <div>
                {/* header */}
            </div>
            <div style={{ width: "50%", float: "left", textAlign: "right" }}>
                <img src={logo} style={{ height: '50%', width: 'auto', margin: '20% auto' }} />
            </div>
            <div style={{ width: "30%", float: "left" }}>
                <div>

                </div>
                <div style={{ margin: '80px auto', backgroundColor: "rgb(81 251 152)", padding: "35px 10px", borderRadius: '20px', border: '2px solid white' }}>
                    <div style={{ textAlign: 'center' }}>
                        <b style={{ fontSize: "26px" }}>Đăng Ký Tài Khoản</b><br /><br />
                    </div>
                    <div>
                        <Form
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            layout="horizontal"
                            initialValues={{
                                size: componentSize,
                            }}
                            onValuesChange={onFormLayoutChange}
                            size={componentSize}
                        >
                            <Form.Item label="Người bán:" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'E-mail không hợp lệ!',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập E-mail của bạn!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu của bạn!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Nhập lại mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập lại mật khẩu!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="Số ĐT"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập SĐT!',
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
                                            value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các chính sách và điều khoản của chúng tôi!')),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    Tôi đồng ý với các chính sách và điều khoản của Multilevel-Association.
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                className='bt_register'>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                                <Button type="primary" htmlType="exit" style={{ marginLeft: '20px' }}>
                                    <a href='http://localhost:3000/login'>Hủy</a>
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default () => <RegisterForm />;
