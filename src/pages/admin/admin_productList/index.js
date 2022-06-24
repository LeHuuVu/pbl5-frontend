import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { listProductV2, delProduct } from '../../../api/adminInterface';
import { Space, Table, Button, notification, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StarOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import { render } from '@testing-library/react';

const { confirm } = Modal
const AdminProductList = () => {

    const [listProduct, setListProduct] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    let userID;

    if (localStorage.getItem('remember') === 'local') {
        userID = JSON.parse(localStorage.getItem('user-info')).id;
    } else if (localStorage.getItem('remember') === 'session') {
        if ((sessionStorage.getItem('user-info')) !== null) {
            userID = JSON.parse(sessionStorage.getItem('user-info')).id;
        }
    }

    useEffect(async () => {
        await listProductV2().then((res) => {
            setListProduct((listProduct) => res.data);
        })
            .catch((error) => console.log(error))
    }, [])
    const OnDelete = async (idProduct) => {
        confirm({
            title: 'Xóa sản phẩm',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa sản phẩm này ?',
            okText: 'Chắc chắn',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            centered: true,
            onOk() {
                delProduct({
                    id_product: idProduct,
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

    const openNotificationSuccess = (res) => {
        setReload(true)
        notification.success({
            message: "Đã xóa!",
            duration: 3,
        })
        navigate('/admin_productList')
    }
    function averageRate(list_review) {
        if (list_review !== undefined) {
            if (list_review.length > 0) {
                let res = 0;
                for (let i = 0; i < list_review.length; i++) {
                    res += list_review[i];
                }
                return (res / list_review.length);
            }
        }
        return 0;
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'idproduct',
            key: 'idproduct',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (_, record) => (
                <div className='_1Z2fe1'>
                    <div className='_3mceb9'>
                        <a title='' href={"/product_detail/" + record.idproduct}>
                            <div class="_25vezo" style={{ backgroundImage: "url('" + record.image + "')" }}></div>
                        </a>
                        <div class="_1WfuBi">
                            <a class="_3t5Sij" title={record.product} href={"/product_detail/" + record.idproduct}>
                                {record.product}
                            </a>

                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Đã bán',
            dataIndex: 'amount_sold',
            key: 'amount_sold',
        },
        {
            title: 'Còn lại',
            dataIndex: 'amount_remaining',
            key: 'amount_remaining',
        },
        {
            title: 'Được đánh giá',
            dataIndex: 'average_Rate',
            key: 'average_Rate',
            render: (_, record) => (
                <>{record.average_Rate}<StarOutlined style={{ fontSize: '20px', marginRight: "15px", color: 'yellow' }} /></>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={(e) => OnDelete(record.idproduct)} style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }}>Delete</Button>
                </Space>
            ),
        },
    ];

    const data = [];

    if (listProduct.length > 0) {
        console.log(listProduct)
        listProduct.forEach((element, index) => {
            data.push({
                key: index,
                idproduct: element.product.id,
                product: element.product.name,
                image: element.product.image,
                company: element.company,
                description: element.product.description,
                price: element.product.price,
                amount_sold: element.product.amount_sold,
                amount_remaining: element.product.amount_remaining,
                average_Rate: averageRate(element.star_rating)
            })
        });
    }

    return (
        <div>
            <h2>Danh Sách Sản Phẩm</h2><br />
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default AdminProductList