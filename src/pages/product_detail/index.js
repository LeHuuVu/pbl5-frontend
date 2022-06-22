/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Image, Button, Form, InputNumber, Avatar, Comment, Tooltip, Rate, notification, Input } from 'antd';
import './index.css'
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { productDetail2, sendReview } from '../../api/buyerInterface';
import moment from 'moment';
import { addProdToCart } from '../../api/cart';
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//     <List
//         dataSource={comments}
//         header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//         itemLayout="horizontal"
//         renderItem={(props) => <Comment {...props} />}
//     />
// );

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} placeholder='Thêm bình luận . . . . . . . . . . . . . .'/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }}>
                Bình luận
            </Button>
        </Form.Item>
    </>
);

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
function Product_Detail() {
    // if (localStorage['user-info'] == null) { window.location.href = '/login' }  
    // const [cookies] = useCookies(["userInfo"]); 
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [totalRate, setTotalRate] = useState(0);
    const [approve, setApprove] = useState(false);

    const [comment, setComment] = useState([]);
    const [reload, setReload] = useState(false);
    const [star, setStar] = useState(0);

    const handleSubmit = () => {
        if (!comment||!star) {
            notification.error({
                message: 'Hãy điền đầy đủ các mục',
                duration: 1.5,})
            return;
        }
        let userID = null;
        if(localStorage.getItem('remember') ==='local'){
            userID = JSON.parse(localStorage.getItem('user-info')).id;
          }else if(localStorage.getItem('remember') ==='session'){
            if((sessionStorage.getItem('user-info')) !== null){
                userID = JSON.parse(sessionStorage.getItem('user-info')).id;
            }
        }
        sendReview({
            id_product: id,
            id_user: userID,
            star_rating: star,
            comment: comment,
        }).then(()=>{
                notification.success({
                message: 'Cảm ơn ý kiến của quý khách',
                duration: 1.5,
                })
                setStar(0);
                setComment('');
            }
        ).catch((error) => {
            notification.error({
                message: 'Đã xảy ra lỗi, hãy thử lại sau',
                duration: 1.5,})
            console.log(error.response.request.response)
        })
        setReload(true);
    };

    // const handleChange = (e) => {
    //     setComment(e.target.value);
    //     setStar(e.target);
    // };
    const navigate = useNavigate();

    try {
        useEffect(() => {
            try {
                setReload(false);
                let userID = null;
                if(localStorage.getItem('remember') ==='local'){
                    userID = JSON.parse(localStorage.getItem('user-info')).id;
                  }else if(localStorage.getItem('remember') ==='session'){
                    if((sessionStorage.getItem('user-info')) !== null){
                        userID = JSON.parse(sessionStorage.getItem('user-info')).id;
                    }
                }
                productDetail2({ 
                    id_product: id,
                    id_user: userID}).then((res) => {
                    setProduct(res.data);
                    checkReview(res.data);
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

    let userInfo
    let role = 1;
    if (localStorage.getItem('remember') === 'local') {
        userInfo = JSON.parse(localStorage.getItem('user-info'));
        role = userInfo.role;
    } else if (localStorage.getItem('remember') === 'session') {    
        if((sessionStorage.getItem('user-info')) !== undefined){
            userInfo = JSON.parse(sessionStorage.getItem('user-info'));
            role = userInfo.role;
        }
    }
    // console.log(userInfo)
    const OnClick = async () => {
        if (userInfo != null) {
            await addProdToCart({ id_user: userInfo.id, id_product: id }).then((res) => {
                openNotificationSuccess(res);
                navigate("/productList");
            }).catch((error) => {
                if (error.request.status === 400) {
                    notification.error({
                        message: 'Sản phẩm đã có trong Giỏ hàng',
                        duration: 3,
                    })
                }
            })
        }
        else {
            notification.info({
                message: "Hãy đăng nhập để có thể mua mặt hàng này",
                duration: 3,
            })
            navigate("/login");
        }
    }

    const OnBuyClick = async () => {
        if (userInfo != null) {
            await addProdToCart({ id_user: userInfo.id, id_product: id }).then((res) => {
                openNotificationSuccess(res);
            }).catch((error) => {
                console.log(error)
            })
            navigate("/cart");
        }
        else {
            notification.info({
                message: "Hãy đăng nhập để có thể mua mặt hàng này",
                duration: 3,
            })
            navigate("/login");
        }
    }

    const openNotificationSuccess = (res) => {
        notification.success({
            message: "Đã thêm " + product.product.name + " vào Giỏ!",
            duration: 3,
        })
    }

    const checkReview = (data) => {
        console.log(data.review)
        if(userInfo!==null){
            if(data!=null && data.review!== undefined) {
                if(data.review==='approved'){setApprove(true);}
                else if(data.review==='denied') (setApprove(false))
            }
        }
    };
    
    let comments;
    let review;
    let userReview;
    if (product !== null) {
        if(approve){
            userReview = (
            <div>
                <Rate defaultValue={star} style={{marginLeft:'46px'}} onChange={(e)=>{setStar(e)}}/>
                            <Comment
                                // avatar={<Avatar src={userInfo.avatar} alt={userInfo.name} />}
                                content={
                                    <Editor
                                        onChange={(e)=>{setComment(e.target.value);}}
                                        onSubmit={handleSubmit}
                                        // submitting={submitting}
                                        value={comment}
                                    />
                                }
                            />
            </div>
        )}
        if (product.list_review !== undefined) {
            try {
                comments = (
                    product.list_review.map((item) =>
                        <Comment
                            author={
                                <>
                                    <b><a style={{ marginRight: '10px' }}>{item.user_name}</a></b>
                                    <Rate disabled value={item.review.star_rating} readOnly/>
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
                        {product.list_review.length > 0 ?
                            comments
                            :
                            <div>
                                <div style={{ fontSize: '18px', marginTop: '15px', marginLeft: '15%' }}>
                                    <p>Không có đánh giá</p>
                                </div>
                            </div>
                        }
                        {userReview}
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
                            <Image
                                width={'45%'}
                                src={product.product.image}
                            />
                        </div>
                        <div style={{ width: '57%', float: 'left', marginLeft: '20px' }}>
                            <div style={{ width: '75%' }}>
                                <h2>{product.product.name}</h2>
                                <table>
                                    <tr>
                                        <th colspan="2">
                                            <b style={{ marginLeft: '30px' ,marginRight:'30px'}}>| {final}</b>
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
                                        <td>{product.product.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Giá:</th>
                                        <td>{product.product.price}</td>
                                    </tr>
                                    <tr>
                                        <th>Số lượng:</th>
                                        <td>
                                            <InputNumber defaultValue={1} style={{ marginRight: '10px' }} /> {product.product.amount_remaining} sản phẩm có sẵn
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Form.Item>
                                <Button style={{ marginRight: '10px', marginBottom: '20px' }} onClick={(e) => OnClick()}>Thêm vào Giỏ hàng</Button>
                                <Button type="primary" style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }} onClick={(e) => OnBuyClick()}>Mua</Button>
                            </Form.Item>
                        </div>
                    </div>
                );
            }
            catch (e) { console.error(e) }
        }
    }
    if (role === 2) {
        notification.info({
            message: "Hãy đăng nhập tài khoản mua hàng để có thể mua mặt hàng này ",
            duration: 3,
        })
        navigate("/sellingProduct");
    }
    else {
        return (
            <div>
                {content}
                {review}
            </div>
        );
    }
}

export default Product_Detail;