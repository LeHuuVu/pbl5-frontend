/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
// import { useCookies } from "react-cookie";
import axios from '../../../api/axios';
import {
    Form,
    Input,
    Button,
    Checkbox,
    Upload,
    notification,
    message,
    InputNumber
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Company } from '../../../api/sellerInterface';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

const RegisterForm = () => {
    // const [cookies, setCookie] = useCookies(["userInfo"]);
    const { TextArea } = Input;
    const [loading, setLoading] = useState(false);
    const [isImg, setISImg] = useState(true);
    const [img, setImg] = useState();

    const onFinish = async (values) => {
        let id
        let company_id
        if(localStorage.getItem('remember') ==='local'){
            id = JSON.parse(localStorage.getItem('user-info')).id;
          }else if(localStorage.getItem('remember') ==='session'){
            if((sessionStorage.getItem('user-info')) !== null){
                id = JSON.parse(sessionStorage.getItem('user-info')).id;
            }
        }
        await Company({
            id_user: id,
          }).then(res => company_id=res.data.id)
            .catch((error) => {
              console.log(error)
              if (error.request.status === 400) { 
                notification.error({
                    message: 'Sai email hoặc mật khẩu',
                    duration: 3,
                  })
              }
            })
        const formData = new FormData()
        formData.append('id_user', id)
        formData.append('id_company', company_id)
        formData.append('name', values.product_name)
        formData.append('image', img.originFileObj)
        formData.append('description', values.description)
        formData.append('price', values.price)
        formData.append('amount_remaining', values.amount)
        formData.append('amount_sold', 0)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        axios.post('/v1/createNewProduct',formData).then(res => openNotificationSuccess(res))
            .catch((error) => {
                console.log(error)
                if (error.request.status === 400) {
                    notification.error({
                        message: 'sản phẩm này đã được đăng ký!',
                        duration: 3,
                    })
                }
            })
    };
    const openNotificationSuccess = (res) => {
        notification.success({
            message: 'Đăng ký sản phẩm thành công',
            duration: 3,
        })
       window.location.href= "/sellingProduct";
    }

    const onChangeImg = (response) => {
        try{
            if (response.file.status !== 'uploading') {
                setLoading(true)
            }
            if (response.file.status === 'done') {
                setImg(response.file);
            } else if (response.file.status === 'error') {
                message.error(`${response.file.name} 
                                file upload failed.`);
            }
            setLoading(false)
        }catch(e){console.log(e)}
    };
    const removeImg = () => {
        try{
            setImg(undefined);
        }catch(e){console.log(e)}
    };

    const onPreview = async (file) => {
        if(isImg){
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
        }
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg'|| file.type === 'image/svg'|| file.type === 'image/gif');
      
        if (!isJpgOrPng) {
          message.error('Bạn chỉ có thể tải lên file có định dạng JPG/PNG/JPG/SVG!');
        }
      
        const isLt2M = (file.size / 1024 / 1024 < 2);
      
        if (!isLt2M) {
          message.error('Ảnh có dung lượng quá lớn!');
        }
        setISImg(isJpgOrPng && isLt2M);
        return isJpgOrPng && isLt2M;
      };
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Tải lên
          </div>
        </div>
      );
    //-------------------------------end

    return (
        <div>
            <div style={{ width: "100%", float: "center" }}>
                <div>

                </div>
                <div style={{backgroundColor: "rgb(81 251 152)", padding: "35px 10px", borderRadius: '20px', border: '2px solid white' }}>
                    <div style={{ textAlign: 'center' }}>
                        <b style={{ fontSize: "26px" }}>Đăng Ký Sản phẩm mới</b><br /><br />
                    </div>
                    <div>
                        <Form
                            labelCol={{
                                span: 9,
                            }}
                            wrapperCol={{
                                span: 11,
                            }}
                            layout="horizontal"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="product_name"
                                label="Tên sản phẩm:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy cho chúng tôi biết tên sản phẩm của bản',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Ảnh minh họa" name="product_photo">
                                <ImgCrop rotate>
                                    <Upload
                                        customRequest={dummyRequest}
                                        listType="picture-card"
                                        onChange={(response)=>onChangeImg(response)}
                                        accept=".png,.jpeg,.jpg,.gif,.svg"
                                        beforeUpload={beforeUpload}
                                        onPreview={onPreview}
                                        maxCount={1}
                                        onRemove={removeImg}
                                    >
                                        {uploadButton}
                                    </Upload>
                                    {/* <input type="file" onChange={(e)=>{console.log(e.target.files[0])}} /> */}
                                </ImgCrop>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Mô tả sản phẩm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy mô tả sản phẩm của bạn',
                                    },
                                ]}
                            >
                                <TextArea autoSize/>
                            </Form.Item>

                            <Form.Item
                                name="price"
                                label="Giá của sản phẩm"
                                defaultValue={1000}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy định giá sản phẩm của bạn!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <InputNumber min={1000} defaultValue={1000} step={1000} />
                            </Form.Item>
                            <Form.Item
                                name="amount"
                                label="số lượng có trong kho"
                                defaultValue={10}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy cho chúng tôi biết số lượng sản phẩm của bạn!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <InputNumber min={1} defaultValue={10} />
                            </Form.Item>
                            
                            <Form.Item
                                style={{marginLeft:"30%"}}
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
                                    Tôi đồng ý với các chính sách và điều khoản của Multilevel-Association dành cho đăng ký sản phẩm mới.
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                style={{marginLeft:"40%"}}
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
