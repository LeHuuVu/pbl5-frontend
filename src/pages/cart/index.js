import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Form, Button } from 'antd';

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
    title: '',
    dataIndex: 'bt'
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    product: `Product ${i}`,
    price: i * 10000,
    amount: `${i + 10}`,
    total: i * 10000 * (i + 10),
    bt: <Button type="primary" htmlType="submit">Delete</Button>
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
      <div>
        <div style={{marginLeft:'15%',fontSize:'35px'}}>
          <img src='https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE=' width={'75px'}/> Giỏ hàng
        </div>
        <div style={{margin:'0 15%'}}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
        </div>
        <div style={{marginLeft:'60%', float:'left'}}>
          <scan>Thanh toán (.. sản phẩm):.......VND</scan>
          <Button type="primary" htmlType="submit" style={{marginLeft:'20px'}}>Mua</Button>
        </div>

      </div>
    )
  }
}

export default Cart;