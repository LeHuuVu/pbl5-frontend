import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import Layout from '../../layouts/Layout'
import { Table, Form, Button, InputNumber,notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { deleteProdFromCart, orderList } from '../../api/cart';
import {useNavigate} from 'react-router-dom'


const columns = [
  {
    title: 'Sản phẩm',
    dataIndex: 'product',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
  },
  {
    title: 'Thao tác',
    dataIndex: 'bt'
  },
];

let s = 0;

const Cart = () => {

  if (localStorage['user-info'] == null) { window.location.href = '/login' }

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('user-info')).id

  const [listorder, setOrder] = useState([]);
  const [reload, setReload] = useState(false);

  try {
    useEffect(async () => {
      try { 
      setReload(false)
        await orderList({ id_user: userId }).then((res) => {
          setOrder((order) => res.data);
        }).catch((error) => console.log(error.response.request.response))
      } catch (e) { console.error(e) }
    }, [reload])
  }
  catch (e) { console.error(e) }

  const OnDelete = async (idProd) => {
    await deleteProdFromCart({ id_user: userId, id_product: idProd }).then((res) => {
      openNotificationSuccess(res)
    }).catch((error) => {
      if (error.request.status === 400) {
        notification.error({
          message: 'Sorry!!! We are having some problems while processing!',
          duration: 3,
        })
      }
    })
  }

  const openNotificationSuccess = (res) => {   
    setReload(true)
    notification.success({
      message: "Đã xóa!" ,
      duration: 3,
    })
    navigate('/cart')
  }

  const data = [];//dùng để get dữ liệu từ Table
  const dataForm = [];//show dữ liệu trong Table với style

  let tmpData = 0
  let tmpDataForm = 0
  listorder.forEach(element => {
    console.log(element)
    data.push({
      key: tmpData++,
      product: element.name,
      price: element.price,
      amount: 1,
      total: element.price
    })
    dataForm.push({
      key: tmpDataForm++,
      product:
        <div className='_1Z2fe1'>
          <div className='_3mceb9'>
            <a title='' href=''>
              <div class="_25vezo" style={{ backgroundImage: "url('" + element.image + "')" }}></div>
            </a>
            <div class="_1WfuBi">
              <a class="_3t5Sij" title={element.name} href={"/product_detail/" + element.pivot.product_id}>
                {element.name}
              </a>

            </div>
          </div>
        </div>,
      price: <>₫{element.price}</>,
      amount: <><InputNumber defaultValue={1} style={{ marginRight: '10px' }} /></>,
      total: <div style={{ color: 'red' }}>₫{element.price * 1}</div>,
      bt: <Button onClick={(e) => OnDelete(element.id)} style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }} >Xóa</Button>
    })
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return <Layout>
    <Layout.Main>
      <div>
        <div style={{ marginLeft: '15%', fontSize: '35px', marginBottom: '25px', display: 'flex' }}>
          <div className="px-4">
            <Button type="text" href={"/cart"} icon={<ShoppingCartOutlined className="cart" style={{ fontSize: '300%' }} />} />
          </div>
          <span style={{ marginTop: '10px' }}>Giỏ hàng</span>
        </div>
        <div style={{ margin: '0 15%' }}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={dataForm} />;
        </div>
        <div style={{ marginLeft: '60%', float: 'left' }}>
          <scan>Thanh toán ({rowSelection.selectedRowKeys.length} sản phẩm):
            <scan style={{ color: 'red', fontSize: '25px', marginLeft: '8px' }}>
              ₫
              {[4].forEach(element => {
                s = 0;
                for (let index = 0; index < rowSelection.selectedRowKeys.length; index++) {
                  s += data[rowSelection.selectedRowKeys[index]].total;
                }
              })}
              <span style={{ margin: '0 10px 0 0' }}>{s}</span>
              VND
            </scan>
          </scan>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }} >Mua</Button>
        </div>

      </div>
    </Layout.Main>
  </Layout>;
}

export default Cart;