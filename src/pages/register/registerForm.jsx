/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import logo from '../../logo_app.png';
import { useNavigate } from "react-router-dom";
import { register } from '../../api/login';
import {
    Form,
    Input,
    Button,
    Select,
    Switch,
    Checkbox,
    Upload,
    notification
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [componentSize, setComponentSize] = useState('default');
    const [seller, setSeller] = useState(false);
    const [role, setRole] = useState(1);
    const onFinish = async (values) => {
        await register({
            name: values.name,
            email: values.email,
            phone: values.phone,
            role: role,
            address: values.address,
            password: values.password,
        }).then(res => openNotificationSuccess(res))
            .catch((error) => {
                if (error.request.status === 400) {
                    notification.error({
                        message: 'Email này đã được đăng ký!',
                        duration: 3,
                    })
                }
            })
    };
    const openNotificationSuccess = (res) => {
        notification.success({
            message: 'Chào mừng đến với E-Commerce!',
            duration: 3,
        })
        localStorage.setItem("user-info", JSON.stringify(res.data));
        //retrieve data 
        // JSON.parse(localStorage.getItem('user-info'))
        navigate("/productList");
    }
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const onChange = (checked) => {
        setSeller(checked)
    };

    useEffect(() => {
        try {
            if (seller === true) { setRole(2) }
            if (seller === false) { setRole(1) }
        } catch (e) { console.error(e) }
    }, [seller])

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

    
    //-----use for upload image
    const [fileList, setFileList] = useState([
    //     {
    //         uid: '-1',
    //         name: 'image.png',
    //         status: 'done',
    //         url: '',
            
    //     },
    ]);

    const onChangeImg = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);

                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    //-------------------------------end

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
                            onFinish={onFinish}
                        >
                            <Form.Item label="Người bán:" valuePropName="checked">
                                <Switch checkedChildren="Người bán" unCheckedChildren="Người mua" onChange={onChange} />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Họ và tên:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy cho chúng tôi biết tên của bạn',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Ảnh đại diện" name="photos">
                                {/* <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                                </Upload> */}
                                <ImgCrop rotate>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChangeImg}
                                        onPreview={onPreview}
                                    >
                                        {fileList.length < 1 && '+ Tải lên'}
                                    </Upload>                                    
                                    {/* {fileList.length == 1 && console.log(fileList[0])} */}
                                    {/* {fileList.length == 1 && console.log(fileList[0].name)} */}
                                </ImgCrop>
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
                                    {
                                        type: 'string',
                                        min: 8,
                                        message: 'Hãy đặt mật khẩu có nhiều hơn 8 kí tự',
                                    },
                                    {
                                        type: 'string',
                                        max: 24,
                                        message: 'Hãy đặt mật khẩu có ít hơn 24 kí tự',
                                    }
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
                                    {
                                        type: 'string',
                                        min: 8,
                                        max: 10,
                                        message: 'Hãy nhập số điện thoại hợp lệ',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Địa chỉ mặc định:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng địa chỉ mặc định',
                                    },
                                ]}
                            >
                                <Input />
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
                                    <a href='/login' style={{ textDecoration: 'none' }}>Hủy</a>
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
