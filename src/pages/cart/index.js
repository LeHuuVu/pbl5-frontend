import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import Layout from '../../layouts/Layout'
import { Table, Form, Button, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

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

let s=0;

const data = [];//dùng để get dữ liệu từ Table
for (let i = 0; i < 26; i++) {
  data.push({
    key: i,
    product: `Cáp sạc nhanh iPhone Tự Ngắt Điện Khi Đầy Pin Thông Minh Sạc Nhanh 2.4A Baseus C-shaped Light ${i}`,
    price: i * 10000,
    amount: i + 10,
    total: i * 10000 * (i + 10)
  });
}

const dataForm = [];//show dữ liệu trong Table với style
for (let i = 0; i < 26; i++) {
  dataForm.push({
    key: i,
    product:
      <div className='_1Z2fe1'>
        <div className='_3mceb9'>
          <a title='' href=''>
            <div class="_25vezo" style={{ backgroundImage: "url('https://hc.com.vn/i/ecommerce/media/GD.005034_FEATURE_96547.jpg')" }}></div>
          </a>
          <div class="_1WfuBi">
            <a class="_3t5Sij" title="Cáp sạc nhanh iPhone Tự Ngắt Điện Khi Đầy Pin Thông Minh Sạc Nhanh 2.4A Baseus C-shaped Light" href="">
              Cáp sạc nhanh iPhone Tự Ngắt Điện Khi Đầy Pin Thông Minh Sạc Nhanh 2.4A Baseus C-shaped Light {i}
            </a>

          </div>
        </div>
      </div>,
    price: <>₫{i * 10000}</>,
    amount: <><InputNumber defaultValue={i + 10} size={10} style={{ marginRight: '10px' }} /></>,
    total: <div style={{ color: 'red' }}>₫{i * 10000 * (i + 10)}</div>,
    bt: <Button type="primary" htmlType="submit" style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }}>Xóa</Button>
  });
}

class Cart extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    if(localStorage['user-info']==null) {window.location.href = '/login'}

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <Layout>
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
                <scan style={{ color: 'red', fontSize: '25px' ,marginLeft:'8px'}}>
                  ₫
                  {[4].forEach(element => {
                    s=0;
                    for (let index = 0; index < rowSelection.selectedRowKeys.length; index++) {
                      s+=data[rowSelection.selectedRowKeys[index]].total;
                    }
                  })}
                  <span style={{margin:'0 10px 0 0'}}>{s}</span>
                  VND
                </scan>
              </scan>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }} >Mua</Button>
            </div>

          </div>
        </Layout.Main>
      </Layout>

    )
  }
}

export default Cart;