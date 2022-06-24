/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Image, Button, Form, InputNumber, Avatar, Comment, Tooltip, Rate, notification, Input, message, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import './index.css'
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
    DislikeFilled,
    DislikeOutlined,
    LikeFilled,
    LikeOutlined,
} from '@ant-design/icons';
import { sellingproductDetail } from '../../../api/sellerInterface';
import axios from '../../../api/axios';
import moment from 'moment';
import { delSellingProd } from '../../../api/sellerInterface';
import { useNavigate } from "react-router-dom";

const { confirm } = Modal

function averageRate(list_review) {
    if (list_review !== undefined) {
        if (list_review.length > 0) {
            let res = 0;
            for (let i = 0; i < list_review.length; i++) {
                res += list_review[i].review.star_rating;
            }
            return (res / list_review.length);
        }
    }
    return 0;
}
function Product_Detai() {
    if(localStorage.getItem('remember') ==='local'){
        if (localStorage['user-info'] == null) { window.location.href = '/login' }
      }else if(localStorage.getItem('remember') ==='session'){
        if (sessionStorage['user-info'] == null) { window.location.href = '/login' }
    } else { window.location.href = '/login' }
    if (localStorage['user-info'] == null) { window.location.href = '/login' }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };
    const { id } = useParams();
    const [name, setName] = useState('');
    const [img, setImg] = useState();
    const [description, setDes] = useState('');
    const [price, setPrice] = useState(0);
    const [amount_remaining, setAmount] = useState(0);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [product, setProduct] = useState([]);
    const [totalRate, setTotalRate] = useState(0);
    const [editable, setEditable] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    const { TextArea } = Input;

    const navigate = useNavigate();

    try {
        useEffect(() => {
            try {
                setReload(false);
                sellingproductDetail({ id_product: id }).then((res) => {
                    setName(res.data.product.name);
                    setDes(res.data.product.description);
                    setPrice(res.data.product.price);
                    setAmount(res.data.product.amount_remaining);
                    setProduct((product) => res.data);
                }).catch((error) => console.log(error.response.request.response))
            } catch (e) { console.error(e) }
        }, [reload])
    }
    catch (e) { console.error(e) }
    useEffect(() => {
        try {
            setTotalRate(averageRate(product.list_review))
        } catch (e) { console.error(e) }
    }, [product])

    // const OnUpdate = async () => {
    //     await updateProduct({ id_product: id, name: '', shop: '', amount: 0, description: '' }).then((res) => {
    //         // openNotificationSuccess(res)
    //     }).catch((error) => {
    //         if (error.request.status === 400) {
    //             notification.error({
    //                 message: 'Lỗi',
    //                 duration: 3,
    //             })
    //         }
    //     })
    // }


    const onClick = () => {
        setEditable(true)
    }

    const onCancel = () => {
        setEditable(false)
    }

    //update product info
    const save = async () => {
        let userID = null;
        if(localStorage.getItem('remember') ==='local'){
            userID = JSON.parse(localStorage.getItem('user-info')).id;
          }else if(localStorage.getItem('remember') ==='session'){
            if((sessionStorage.getItem('user-info')) !== null){
                userID = JSON.parse(sessionStorage.getItem('user-info')).id;
            }
        }
        const formData = new FormData()
        formData.append('id_user', userID)
        formData.append('id_product', id)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        if(img !== undefined){
            formData.append('image', img.originFileObj)
        }
        // formData.append('avatar', img.originFileObj)
        formData.append('amount_remaining', amount_remaining)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        await axios.post('/v1/editProduct',formData).then(res => openUpdateNotificationSuccess(res))
            .catch((error) => {
                console.log(error)
                notification.error({
                    message: 'Đã xảy ra lỗi, vui lòng thử lại sau ít phút',
                    duration: 3,
                })
            })
        setReload(true)
        setEditable(false)
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
            Thay đổi ảnh minh họa
          </div>
        </div>
    );
    const OnDelete = () => {
        let userID = null;
        if(localStorage.getItem('remember') ==='local'){
            userID = JSON.parse(localStorage.getItem('user-info')).id;
          }else if(localStorage.getItem('remember') ==='session'){
            if((sessionStorage.getItem('user-info')) !== null){
                userID = JSON.parse(sessionStorage.getItem('user-info')).id;
            }
        }
        confirm({
          title: 'Xóa sản phẩm',
          icon: <ExclamationCircleOutlined />,
          content: 'Bạn có chắc chắn muốn xóa sản phẩm này ?',
          okText: 'Chắc chắn',
          okType: 'danger',
          cancelText: 'Hủy bỏ',
          centered: true,
          onOk() {
            delSellingProd({ 
                id_product: id, 
                id_user: userID
            }).then((res) => {
            openNotificationSuccess(res)
            }).catch((error) => {
            if (error.request.status === 400) {
                notification.error({
                    message: 'Đã xảy ra lỗi, vui lòng thử lại sau',
                    duration: 3,
                })
            }
            })
          },
          onCancel() {
            notification.error({
                message: 'Đã hủy bỏ quá trình',
                duration: 2,
            })
          },
        })
    }
    //update pronounce
    const openUpdateNotificationSuccess = (res) => {
        notification.success({
            message: "Đã cập nhật " + product.product.name,
            duration: 3,
        })
    }

    const openNotificationSuccess = (res) => {
        notification.success({
            message: "Đã xóa " + product.product.name,
            duration: 3,
        })
        navigate("/sellingProduct");
    }

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };


    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(
                    action === 'disliked' ? DislikeFilled : DislikeOutlined
                )}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    let comments;
    let review;
    if (product !== null) {
        if (product.list_review !== undefined) {
            try {
                comments = (
                    product.list_review.map((item) =>
                        <Comment
                            actions={actions}
                            author={
                                <>
                                    <b><a style={{ marginRight: '10px' }}>{item.user_name}</a></b>
                                    <Rate disabled value={item.review.star_rating} />
                                </>
                            }
                            avatar={
                                <Avatar src={item.user_avatar} alt={item.user_name} />
                            }
                            content={
                                <p>
                                    {item.review.comment}
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment(item.review.updated_at).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(item.review.updated_at).fromNow()}</span>
                                </Tooltip>
                            }
                        >
                        </Comment>)
                )
                review = (
                    <div style={{ margin: 'auto 20%', padding: '10px 20px' }}>
                        <h2>Đánh giá</h2>
                        {comments}
                    </div>
                )
            }
            catch (e) { console.error(e) }
        }
    }
    let content;
    if (product !== null) {
        if (product.product !== undefined) {
            try {
                let final = totalRate;
                if (final === 0) { final = 'Chưa có đánh giá' }
                content = (
                    <div>
                        <div style={{ width: '40%', float: 'left', textAlign: 'right' }}>
                        
                        {editable ?             
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
                            :
                            <Image
                                width={'45%'}
                                src={product.product.image}
                            /> 
                        }
                        </div>
                        <div style={{ width: '57%', float: 'left', marginLeft: '20px' }}>
                            <div style={{ width: '75%' }}>
                                {editable ?
                                    <Input readOnly={!editable} defaultValue={product.product.name} size='large' onChange = {(e)=> setName(e.target.value)}/>
                                    :
                                    <h2>{product.product.name}</h2>
                                }
                                <table>
                                    <tr>
                                        <th colspan="2">
                                            <b style={{ marginLeft: '30px' }}>| {final}</b>
                                            <Rate allowHalf disabled value={totalRate} />
                                            <b>| {product.product.amount_sold} đã bán</b>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Shop:</th>
                                            <td>{product.company_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Mô tả:</th>
                                        {editable ?
                                            <td><TextArea rows={7} readOnly={!editable} defaultValue={product.product.description} size='large' onChange={(e)=> setDes(e.target.value)}/></td>
                                            :
                                            <td>{product.product.description}</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Giá:</th>
                                        {editable ?
                                            <td><InputNumber readOnly={!editable} defaultValue={product.product.price} step = {1000} min={1000} onChange={(e)=> setPrice(e)}/></td>
                                            :
                                            <td>{product.product.price}</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Số lượng<br /> hiện có:</th>
                                        <td>                                        
                                        {editable ?
                                            <div>
                                                <InputNumber defaultValue={product.product.amount_remaining} style={{ marginRight: '10px' }} min={1} onChange={(e)=> setAmount(e)}/>
                                            </div>
                                            :
                                            <td>{product.product.amount_remaining} sản phẩm</td>
                                        }
                                            
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Form.Item>
                                {editable ?
                                    <div>
                                        <Button ghost={true} style={{ marginRight: '10px', marginBottom: '20px', backgroundColor: "#ff8e3c", width: "30%", color: "#0d0d0d" }} onClick={save}>Lưu thay đổi</Button>
                                        <Button danger style={{ width: "30%" }} onClick={onCancel} >Hủy bỏ</Button>
                                    </div>
                                    : <><Button type="primary" style={{ marginRight: '10px', marginBottom: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }} onClick={(e) => onClick()}>Cập nhật</Button>
                                        <Button type="primary" style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }} onClick={(e) => OnDelete()}>Xóa sản phẩm</Button></>
                                }


                            </Form.Item>
                        </div>
                    </div>
                );
            }
            catch (e) { console.error(e) }
        }
    }
    return (
        <div>
            {content}
            {review}
        </div>
    );
}

export default Product_Detai;