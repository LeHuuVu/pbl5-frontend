/* eslint-disable jsx-a11y/alt-text */
import { Image, Descriptions, Table, Tag, Space, Button, Form, InputNumber, Avatar, Comment, Tooltip } from 'antd';
import './index.css'
import Layout from '../../layouts/Layout'

import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
    DislikeFilled,
    DislikeOutlined,
    LikeFilled,
    LikeOutlined,
} from '@ant-design/icons';

function Product_Detai() {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

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

    const ExampleComment = ({ children }) => (
        <Comment
            actions={actions}
            author={<a>Lê Hữu Vũ</a>}
            avatar={
                <Avatar src="https://joeschmoe.io/api/v1/random" alt="Lê Hữu Vũ" />
            }
            content={
                <p>
                    We supply a series of design principles, practical patterns and high
                    quality design resources (Sketch and Axure), to help people create
                    their product prototypes beautifully and efficiently.
                </p>
            }
            // datetime={
            //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            //         <span>{moment().fromNow()}</span>
            //     </Tooltip>
            // }
        >
            {children}
        </Comment>
    );
    return (
        <Layout>
            <Layout.Main>
                <div >
                    <div style={{ width: '40%', float: 'left', textAlign: 'right' }}>
                        <Image
                            width={'65%'}
                            src="https://hc.com.vn/i/ecommerce/media/GD.005034_FEATURE_96547.jpg"
                        />
                    </div>
                    <div style={{ width: '57%', float: 'left', marginLeft: '20px' }}>
                        <div style={{ width: '75%' }}>
                            <h2>Chi tiết sản phẩm</h2>
                            <table>
                                <tr>
                                    <th colspan="2">NỒI CHIÊN KHÔNG DẦU</th>
                                </tr>
                                <tr>
                                    <th>Mô tả:</th>
                                    <td>
                                        Nồi chiên tích hợp lò sấy và nướng đa năng. Dung tích 14 lít. Thiết
                                        kế vô cùng bắt mắt cùng màu xanh coban sang trọng và hiện đại. Công
                                        suất mạnh mẽ 1700w, hoạt động gia nhiệt trên, gia nhiệt dưới cùng
                                        quạt đối lưu sẽ giúp chín đều thực phẩm, không cần lật thực phẩm
                                        trong quá trình nấu nướng. Có 16 chức năng để lựa chọn, dễ dàng làm
                                        vô số món ăn và món bánh,...bằng NCKD thông minh này. Màn hình cảm
                                        ứng điện tử hiện đại, nắp kính sang trọng giúp dễ dàng quan sát thực
                                        phẩm bên trong.
                                    </td>
                                </tr>
                                <tr>
                                    <th>Giá:</th>
                                    <td>1810000000</td>
                                </tr>
                                <tr>
                                    <th>Số lượng:</th>
                                    <td>
                                        <InputNumber defaultValue={1} size={10} style={{ marginRight: '10px' }} /> 152 sản phẩm có sẵn
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <Form.Item>
                            <Button style={{ marginRight: '10px', marginBottom: '20px' }}>Thêm vào Giỏ hàng</Button>
                            <Button type="primary">Mua</Button>
                        </Form.Item>
                    </div>
                    <div style={{ margin: 'auto 20%', padding: '10px 20px' }}>
                        <h2>Đánh giá</h2>
                        <ExampleComment>
                            <ExampleComment>
                                <ExampleComment></ExampleComment>
                                <ExampleComment></ExampleComment>
                            </ExampleComment>
                            <ExampleComment>
                            </ExampleComment>
                        </ExampleComment>
                    </div>
                </div>

            </Layout.Main>
        </Layout>
    );
}

export default Product_Detai;