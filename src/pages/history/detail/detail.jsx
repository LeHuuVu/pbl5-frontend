/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
// import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Table, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { detailOrder } from '../../../api/buyerInterface';
// import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

const DetailOrder = () => {

  const [listOrder, setOrder] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect( () => {
    try {
        detailOrder({ 
            id_order: id 
      }).then((res) => {
        if(res.data.data.length > 0)
        {setOrder(res.data.data);}
      }).catch((error) => console.log(error))
    } catch (e) { console.error(e) }
  })

// define columns
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: '8%',
    },
    {
      key : '0',
      title: 'Sản phẩm',
      dataIndex: 'product',
    },
    {
      key : '1',
      title: 'Đơn giá',
      dataIndex: 'price',
      render: (record) =>(
        <div>{record.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
      )
    },
    {
      key : '2',
      title: 'Số lượng',
      dataIndex: 'amount',
    },
    {
      key : '3',
      title: 'Tổng tiền',
      dataIndex: 'total',
      render: (record) => (
        <div style={{ color: 'red' }}>
          {record.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </div>
      )
    },
  ];


  const data = [];
  const dataForm = [];
  let total = [];
  let final = 0;
  // console.log(listOrder)
  if (listOrder.length > 0) {
    final = 0;
    listOrder.forEach((element,index) => {
      total[index] = element.pivot.amount*element.price;
      final = final + total[index];
      data.push({
        key: index,
        id: element.id,
        product: element.name,
        price: element.price,
        amount: element.pivot.amount,
        total: total[index]
      })
      dataForm.push({
        id: element.id,
        key: index+1,
        product:
          <div className='_1Z2fe1'>
            <div className='_3mceb9'>
              <a title='' href={"/product_detail/" + element.pivot.product_id}>
                <div class="_25vezo" style={{ backgroundImage: "url('" + element.image + "')" }}></div>
              </a>
              <div class="_1WfuBi">
                <a class="_3t5Sij" title={element.name} href={"/product_detail/" + element.pivot.product_id}>
                  {element.name}
                </a>

              </div>
            </div>
          </div>,
        price: element.price,
        amount: element.pivot.amount,
        total: total[index],
      })
    });
  }
  return (
      <div>
        <div>
              <Button onClick={(e)=>navigate('/history')}>Quay lại danh sách đơn hàng</Button>
            </div>
        <div style={{ marginLeft: '15%', fontSize: '35px', marginBottom: '25px', display: 'flex' }}>
          <div className="px-4">
            <Button type="text" href={"/cart"} icon={<ShoppingCartOutlined className="cart" style={{ fontSize: '300%' }} />} />
          </div>
          <span style={{ marginTop: '10px' }}>Chi tiết đơn hàng</span>
        </div>
        <div style={{ margin: '0 15%' }}>
          <Table columns={columns} dataSource={dataForm} />;
        </div>
          <div id='pay' style={{ marginLeft: '60%', float: 'left' }}>
            <scan>Tổng cộng ({listOrder.length} sản phẩm) có tổng giá:
              <scan style={{ color: 'red', fontSize: '25px', marginLeft: '8px' }}>
                <span style={{ margin: '0 10px 0 0' }}>{final.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </scan>
            </scan>
            </div>
    </div>
  );
}

export default DetailOrder;