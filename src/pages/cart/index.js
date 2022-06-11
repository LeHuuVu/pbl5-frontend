/* eslint-disable eqeqeq */
// import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Form, Button, InputNumber, Input, DatePicker, notification, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { deleteProdFromCart, orderList } from '../../api/cart';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import 'moment/locale/vi';
import moment from 'moment';
// import { useCookies } from "react-cookie";

const dateFormat = 'DD/MM/YYYY';

const Cart = () => {
  
  // const [cookies] = useCookies(["userInfo"]);  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigate = useNavigate();
  let userInfo
  if(localStorage.getItem('remember') ==='local'){
    userInfo = JSON.parse(localStorage.getItem('user-info'));
  }else if(localStorage.getItem('remember') ==='session'){
    if((sessionStorage.getItem('user-info')) !== null){
      userInfo = JSON.parse(sessionStorage.getItem('user-info'));
    }
  }
  // if (userInfo === undefined) {
  //   window.location.href = "/login"; 
  // }
  moment.locale('de')
  let date = new Date(Date.now());
  const [deliveryAddress, setAddress] = useState(userInfo.address)
  const [deliveryTime, setTime] = useState(date.setDate(date.getDate() + 5))

  const userId = userInfo.id

  const [listOrder, setOrder] = useState([]);
  const [reload, setReload] = useState(false);


  useEffect( () => {
    try { 
    setReload(false)
      orderList({ 
        id_user: userId 
      }).then((res) => {
        if(res.data.data.length > 0)
        {setOrder(res.data.data);}
      }).catch((error) => console.log(error))
    } catch (e) { console.error(e) }
  }, [reload])

  const OnDelete = async (idProd) => {
    await deleteProdFromCart({ id_user: userId, id_product: idProd }).then((res) => {
      openNotificationSuccess(res)
    }).catch((error) => {
      if (error.request.status === 400) {
        notification.error({
          message: 'Xin lỗi!!! Chúng tôi đang gặp phải một số vấn đề!',
          duration: 3,
        })
      }
    })
  }

  const openNotificationSuccess = (res) => {
    setReload(true)
    notification.success({
      message: "Đã xóa!",
      duration: 3,
    })
    navigate('/cart')
  }
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
        <>₫{record}</>
      )
    },
    {
      key : '2',
      title: 'Số lượng',
      dataIndex: 'amount',
      render: (record, row) => (
        <div>
            <InputNumber
              id={'amount_prod' + row.id}
              min={1}
              max={listOrder[row.key-1].amount_remaining}
              defaultValue={record}
              style={{ marginRight: '10px' }}
              onChange={(e) => {
                handleChange(e, row)
              }
              }
            />
          </div>
      ),
    },
    {
      key : '3',
      title: 'Tổng tiền',
      dataIndex: 'total',
      render: (record) => (
        <div style={{ color: 'red' }}>
          ₫{record}
        </div>
      )
    },
    {
      key : '4',
      title: 'Thao tác',
      dataIndex: 'bt',
      render: (record,row) => (
        <Button onClick={(e) => OnDelete(listOrder[row.key-1].id)} style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }} >Xóa</Button>
      )
    },
  ];

  async function handleChange(e, row){    
    let tmpArray = [...listOrder]
    tmpArray[row.key-1].pivot.amount = e;
    setOrder(tmpArray)
    total[row.key-1] = e*row.price;
  }


  const data = [];
  const dataForm = [];
  let total = [];
  let final = 0;
  console.log(listOrder)
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

  const OnBuy = () => {
    setIsModalVisible(true)
  }

  const OnPayment = async (e) => {
    let time;
    time = moment(deliveryTime).toDate().getFullYear() + "-" + (moment(deliveryTime).toDate().getMonth() + 1) + "-" + moment(deliveryTime).toDate().getDate();
    let formData = new FormData();
    formData.append('id_user', userId)
    formData.append('delivery_address', deliveryAddress)
    formData.append('delivery_time', time)
    data.forEach(element => {
      formData.append('id_product[]', element.id)
      formData.append('amount_order[]', element.amount)
    });
    await axios.post('/v2/order',formData).then((res) => {
      openNotificationPaymentSuccess(res)
    }).catch((error) => {
      console.log(error)
      notification.error({
        message: 'Xin lỗi!!! Chúng tôi đang gặp phải một số vấn đề!',
        duration: 3,
      })
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const openNotificationPaymentSuccess = (res) => {
    setReload(true)
    notification.success({
      message: "Đã thanh toán thành công!",
      duration: 3,
    })
    navigate('/productList')
  }
  return (
      <div>
        <div style={{ marginLeft: '15%', fontSize: '35px', marginBottom: '25px', display: 'flex' }}>
          <div className="px-4">
            <Button type="text" href={"/cart"} icon={<ShoppingCartOutlined className="cart" style={{ fontSize: '300%' }} />} />
          </div>
          <span style={{ marginTop: '10px' }}>Giỏ hàng</span>
        </div>
        <div style={{ margin: '0 15%' }}>
          <Table columns={columns} dataSource={dataForm} />;
        </div>
        {(listOrder.length > 0) ?
          <div id='pay' style={{ marginLeft: '60%', float: 'left' }}>
            <scan>Thanh toán ({listOrder.length} sản phẩm):
              <scan style={{ color: 'red', fontSize: '25px', marginLeft: '8px' }}>
                ₫
                <span style={{ margin: '0 10px 0 0' }}>{final}</span>
                VND
              </scan>
            </scan>
            <Button id='buybt' type="primary" htmlType="submit" style={{ marginLeft: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }} onClick={(e) => OnBuy()}>Mua</Button><br />
          </div>
          :
          null
        }
              <Modal
                title="Xác nhận thanh toán"
                visible={isModalVisible}
                onOk={OnPayment}
                onCancel={handleCancel}
                okText="Thanh toán"
                cancelText="Hủy"
                centered
              >
              <h3>Thanh toán ({listOrder.length} sản phẩm):
                <scan style={{ color: 'red', fontSize: '25px', marginLeft: '8px' }}>
                  ₫
                  <span style={{ margin: '0 10px 0 0' }}>{final}</span>
                  VND
                </scan>
              </h3>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 10,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                <Form.Item
                  label="Địa chỉ giao hàng"
                  name="delivery_address"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ giao hàng!',
                    },
                  ]}
                  onChange = {(e) => {setAddress(e.target.value)}}
                >
                  <Input 
                  defaultValue = {deliveryAddress}/>
                </Form.Item>

                <Form.Item
                  label="Thời gian giao hàng"
                  name="delivery_time"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thời gian giao hàng!',
                    },
                  ]}
                  onChange = {(e) => {setTime(e.target.value)}}
                >
                  <DatePicker
                    format={dateFormat}
                    disabledDate={d => !d || d.isAfter(moment(deliveryTime).add(30, 'days')) || d.isBefore(moment(deliveryTime)) }
                    defaultValue = {moment(deliveryTime)}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                </Form.Item>
              </Form>
            </Modal>
            </div>
  );
}

export default Cart;