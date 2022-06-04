import React, { useState } from 'react'
import { Avatar, Input, Button, Form, notification, Upload, message} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useCookies } from "react-cookie";
import './index.scss'
import axios from '../../api/axios';
import ImgCrop from 'antd-img-crop';

const ProfileForm = (props) => {
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const setMode = () => {
    props.changeMode()
  }

  // const { store } = useContext(ReactReduxContext)
  let info = cookies.userInfo
  const save = (values) => {
    if((values.name!==info.name)&&(values.phone!==info.phone)&&(values.address!==info.address)&&(img !== undefined)){
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('phone', values.phone)
        formData.append('avatar', img.originFileObj)
        formData.append('address', values.address)
        axios.post('/v1/editProfile',formData).then(res => openNotificationSuccess(res))
            .catch((error) => {
                console.log(error)
                if (error.request.status === 400) {
                    notification.error({
                        message: 'Đã xuất hiện Lỗi!',
                        duration: 3,
                    })
                }
            })
    }
    else(openNotification())
  }
    const openNotificationSuccess = (res) => {
        notification.success({
            message: 'Thay đổi thành công!',
            duration: 3,
        })
        setCookie("userInfo", JSON.stringify(res.data),
        {
        path: "/",
        });
        setMode()
    }
    const openNotification = () => {
        setMode()
    }
    //image handle
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
    const beforeUpload = (file) => {
        const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg'|| file.type === 'image/svg'|| file.type === 'image/gif');
      
        if (!isJpgOrPng) {
          message.error('Bạn chỉ có thể tải lên file có định dạng JPG/PNG/JPG/SVG!');
        }
      
        const isLt2M = (file.size / 1024 / 1024 < 2);
      
        if (!isLt2M) {
          message.error('Ảnh có dung lượng quá lớn!');
        }
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
            Thay đổi avatar
          </div>
        </div>
    );

//layouts
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div style={{ margin: '0 26%' }}>
      <div className="profile">
        <figure>
            <div style={{flex: "Inline"}}>
                <Avatar src={info.avatar} alt="" 
                    className="profileAvatar" size={256}/>
                <ImgCrop rotate>
                    <Upload
                        customRequest={dummyRequest}
                        listType="picture-card"
                        onChange={(response)=>onChangeImg(response)}
                        accept=".png,.jpeg,.jpg,.gif,.svg"
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        onRemove={removeImg}
                    >
                        {uploadButton}
                    </Upload>
                </ImgCrop>
            </div>

        </figure>
        <main>
        <Form {...formItemLayout} style={{width: '550px'}} onFinish={save}>
          <Form.Item 
            label="Tên đầy đủ"
            rules={[
              {
                  required: true,
                  message: 'Hãy cho chúng tôi biết tên của bạn',
              },
            ]}>
            <Input defaultValue={info.name}/>
          </Form.Item>

          <Form.Item
            label="SĐT"
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
            ]}>
            <Input defaultValue={info.phone}/>
          </Form.Item>

          <Form.Item 
            label = "Email"
            readOnly = "true"
            >
            <Input defaultValue={info.email}/>
          </Form.Item>

          <Form.Item
            label = "Địa chỉ"
            rules={[
              {
                  required: true,
                  message: 'Vui lòng địa chỉ mặc định',
              },
            ]}>
            <Input defaultValue={info.address}/>
          </Form.Item>  
          <Form.Item {...tailFormItemLayout}>
            <div>    
                <Button type="primary" htmlType="submit" ghost={true} size={'large'} 
                style={{backgroundColor: "#ff8e3c", width:"30%", color:"#0d0d0d"}}>Lưu</Button>
                <Button danger size={'large'} 
                style={{width:"30%"}} 
                onClick={()=>{setMode()}} >Hủy</Button>
            </div>
          </Form.Item>
            
          </Form>
          </main>
      </div>
    </div>
  )
}
export default ProfileForm
