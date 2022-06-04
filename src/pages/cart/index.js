import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import Layout from '../../layouts/Layout'
import { Table, Form, Button, InputNumber, Input, DatePicker, notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { deleteProdFromCart, orderList } from '../../api/cart';
import { payment } from '../../api/buyerInterface';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const dateFormat = 'DD/MM/YYYY';

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
  },
  {
    key : '4',
    title: 'Thao tác',
    dataIndex: 'bt'
  },
];

let s = 0;

const Cart = () => {
  
  const [cookies] = useCookies(["userInfo"]);  

  const navigate = useNavigate();

  if (cookies.userInfo.role == null) { navigate('/login') }

  const userId = cookies.userInfo.id

  const [listOrder, setOrder] = useState([]);
  const [reload, setReload] = useState(false);


  useEffect( () => {
    try { 
    setReload(false)
      orderList({ id_user: userId }).then((res) => {
        setOrder((order) => res.data);
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
  
  const data = [];//dùng để get dữ liệu từ Table
  const dataForm = [];//show dữ liệu trong Table với style

  let tmpData = 0
  let tmpDataForm = 0
  if (listOrder.length > 0) {
    listOrder.forEach(element => {
      element.amount = 1
      data.push({
        key: tmpData++,
        id: element.id,
        product: element.name,
        price: element.price,
        amount: 1,
        total: element.price * 1
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
            </div>0
          </div>,
        price: <>₫{element.price}</>,
        amount:
          <div>
            <InputNumber
              id={'amount_prod' + element.id}
              min={1}
              max={element.amount_remaining}
              defaultValue={1}
              style={{ marginRight: '10px' }}
              onChange={() => {
                data.forEach(e => {
                  if (e.id == element.id) {
                    e.amount = document.getElementById('amount_prod' + element.id).value
                    e.total = e.price * e.amount
                    console.log(data)
                  }
                });
              }}
            />
          </div>,
        total: <div style={{ color: 'red' }}>₫{element.price * element.amount}</div>,
        bt: <Button onClick={(e) => OnDelete(element.id)} style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }} >Xóa</Button>
      })
    });
  }

  let array = []
  for (let index = 0; index < listOrder.length; index++) {
    array[index] = index
  }
  let id_product_FormData = new FormData();
  let amount_order_FormData = new FormData();
  const OnBuy = () => {
    setSelectedRowKeys(array)
    document.getElementById('pay').style.display = 'none'
    data.forEach(element => {
      // console.log(element)
      id_product_FormData.append('id_product[]', element.id)
      amount_order_FormData.append('amount_order[]', element.amount)
      document.getElementById('amount_prod' + element.id).readOnly = true

    });
    console(amount_order_FormData)
    // console.log("...\n")
    // console.log(data)
  }

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

  let deliverytime;
  let deliveryaddress;
  const onFinish = (values) => {
    var dateTime = new Date(values.delivery_time._d);

    deliverytime = dateTime.getDate() + "/" + (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear();

    deliveryaddress = values.delivery_address

    OnPayment()

    // console.log(deliverytime);
    // console.log(deliveryaddress)

  };

  const OnPayment = async () => {
    await payment({
      id_user: userId,
      delivery_address: deliveryaddress,
      delivery_time: deliverytime,
      id_product_FormData,
      amount_order_FormData
    }).then((res) => {
      openNotificationPaymentSuccess(res)
    }).catch((error) => {
      if (error.request.status === 400) {
        notification.error({
          message: 'Xin lỗi!!! Chúng tôi đang gặp phải một số vấn đề!',
          duration: 3,
        })
      }
    })
  }

  const openNotificationPaymentSuccess = (res) => {
    setReload(true)
    notification.success({
      message: "Đã thanh toán thành công!",
      duration: 3,
    })
    navigate('/cart')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        {(listOrder.length > 0) ?
          <div id='pay' style={{ marginLeft: '60%', float: 'left' }}>
            <scan>Thanh toán ({rowSelection.selectedRowKeys.length} sản phẩm):
              <scan style={{ color: 'red', fontSize: '25px', marginLeft: '8px' }}>
                ₫
                {
                  [4].forEach(element => {
                    s = 0;
                    for (let index = 0; index < rowSelection.selectedRowKeys.length; index++) {
                      s += data[rowSelection.selectedRowKeys[index]].total;
                    }
                  })
                }
                <span style={{ margin: '0 10px 0 0' }}>{s}</span>
                VND
              </scan>
            </scan>
            <Button id='buybt' type="primary" htmlType="submit" style={{ marginLeft: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }} onClick={(e) => OnBuy()}>Mua</Button><br />
          </div>
          :
          null
        }

        {(document.getElementById('pay') != null) ?
          (document.getElementById('pay').style.display == 'none') ?
            <div id='delivery' style={{ width: '50%', border: '2px solid #ff8e3c', borderRadius: '25px', padding: '15px', marginLeft: '25%' }}>
              <div style={{ marginBottom: '20px', fontSize: '25px' }}>
                <scan>Thanh toán ({rowSelection.selectedRowKeys.length} sản phẩm):
                  <scan style={{ color: 'red', fontSize: '25px', marginLeft: '8px' }}>
                    ₫
                    {
                      [4].forEach(element => {
                        // console.log(data)
                        s = 0;
                        for (let index = 0; index < rowSelection.selectedRowKeys.length; index++) {
                          s += data[rowSelection.selectedRowKeys[index]].total;
                        }
                      })
                    }
                    <span style={{ margin: '0 10px 0 0' }}>{s}</span>
                    VND
                  </scan>
                </scan>
              </div>
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                >
                  <Input />
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
                >
                  <DatePicker
                    format={dateFormat}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit" style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }}>
                    Thanh toán
                  </Button>
                </Form.Item>
              </Form>
            </div>
            :
            null
          : null
        }
      </div>
    </Layout.Main>
  </Layout>;
}

export default Cart;