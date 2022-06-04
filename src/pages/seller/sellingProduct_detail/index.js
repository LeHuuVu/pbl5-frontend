/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Image, Button, Form, InputNumber, Avatar, Comment, Tooltip, Rate, notification, Input } from 'antd';
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
import { updateProduct } from '../../../api/sellerInterface';
import moment from 'moment';
import { delSellingProd } from '../../../api/sellerInterface';
import { useNavigate } from "react-router-dom";

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
    if (localStorage['user-info'] == null) { window.location.href = '/login' }

    const { id } = useParams();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [product, setProduct] = useState([]);
    const [totalRate, setTotalRate] = useState(0);
    const [editable, setEditable] = useState(false)

    const { TextArea } = Input;

    const navigate = useNavigate();

    try {
        useEffect(async () => {
            try {
                await sellingproductDetail({ id_product: id }).then((res) => {
                    setProduct((product) => res.data);
                }).catch((error) => console.log(error.response.request.response))
            } catch (e) { console.error(e) }
        }, [])
    }
    catch (e) { console.error(e) }
    useEffect(() => {
        try {
            setTotalRate(averageRate(product.list_review))
        } catch (e) { console.error(e) }
    }, [product])

    const OnUpdate = async () => {
        await updateProduct({ id_product: id, name: '', shop: '', amount: 0, description: '' }).then((res) => {
            // openNotificationSuccess(res)
        }).catch((error) => {
            if (error.request.status === 400) {
                notification.error({
                    message: 'Lỗi',
                    duration: 3,
                })
            }
        })
    }


    const onClick = () => {
        setEditable(true)
    }

    const onCancel = () => {
        setEditable(false)
    }
    const save = () => {
        setEditable(false)
    }


    const OnDelete = async () => {
        await delSellingProd({ id_product: id }).then((res) => {
            openNotificationSuccess(res)
        }).catch((error) => {
            if (error.request.status === 400) {
                notification.error({
                    message: 'Lỗi',
                    duration: 3,
                })
            }
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
                            <Image
                                width={'45%'}
                                src={product.product.image}
                            />
                        </div>
                        <div style={{ width: '57%', float: 'left', marginLeft: '20px' }}>
                            <div style={{ width: '75%' }}>
                                {editable ?
                                    <Input readOnly={!editable} defaultValue={product.product.name} size='large' />
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
                                        {editable ?
                                            <td><Input readOnly={!editable} defaultValue={product.company_name} /></td>
                                            :
                                            <td>{product.company_name}</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Mô tả:</th>
                                        {editable ?
                                            <td><TextArea rows={7} readOnly={!editable} defaultValue={product.product.description} size='large'/></td>
                                            :
                                            <td>{product.product.description}</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Giá:</th>
                                        {editable ?
                                            <td><Input readOnly={!editable} defaultValue={product.product.price} /></td>
                                            :
                                            <td>{product.product.price}</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>Số lượng<br /> hiện có:</th>
                                        <td>
                                            <InputNumber defaultValue={product.product.amount_remaining} style={{ marginRight: '10px' }} /> sản phẩm
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Form.Item>
                                {editable ?
                                    <div>
                                        <Button ghost={true} style={{ marginRight: '10px', marginBottom: '20px', backgroundColor: "#ff8e3c", width: "30%", color: "#0d0d0d" }} onClick={save}>Save</Button>
                                        <Button danger style={{ width: "30%" }} onClick={onCancel} >Cancel</Button>
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