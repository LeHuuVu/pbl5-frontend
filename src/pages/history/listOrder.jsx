
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button} from 'antd';
// import { ShoppingCartOutlined } from '@ant-design/icons';
import {orderHistory} from '../../api/buyerInterface';



const OrderList = () => {
    const [listOrder, setOrder] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        try {
            let userID
            if(localStorage.getItem('remember') ==='local'){
                userID = JSON.parse(localStorage.getItem('user-info')).id;
            }else if(localStorage.getItem('remember') ==='session'){
              if((sessionStorage.getItem('user-info')) !== null){
                userID = JSON.parse(sessionStorage.getItem('user-info')).id;
              }
            }
            orderHistory({ 
            id_user: userID 
            }).then((res) => {
                // console.log(res);
                if(res.data.length > 0)
                {setOrder(res.data);}
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
          title: 'Địa chỉ giao hàng',
          dataIndex: 'delivery_address',
        },
        {
          key : '1',
          title: 'Thời gian giao hàng',
          dataIndex: 'delivery_time',
        },
        {
          key : '2',
          title: 'Thời gian đặt hàng',
          dataIndex: 'updated_at',
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
        {
          key : '4',
          title: '',
          dataIndex: 'bt',
          render: (record,row) => (
            <Button onClick={(e) => navigate('/detail/'+row.id)} style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }} >xem chi tiết</Button>
          )
        },
    ];

    //table data
    const dataForm = [];
    if (listOrder.length > 0) {
        listOrder.forEach((element,index) => {
          dataForm.push({
            id: element.id,
            key: index+1,
            delivery_address: element.delivery_address,
            delivery_time: element.delivery_time,
            updated_at : element.updated_at,
            total: element.total_price,
          })
        });
      }

    return(
        <div style={{ margin: '0 15%' }}>
            <Table columns={columns} dataSource={dataForm} />;
        </div>
    )
}
export default OrderList;