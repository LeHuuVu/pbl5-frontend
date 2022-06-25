
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Form, Button, InputNumber, Input, DatePicker, notification, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const OrderList = () => {

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
          render: (record) =>(
            <>₫{record}</>
          )
        },
        {
          key : '2',
          title: 'Thời gian đặt hàng',
          dataIndex: 'updated_at',
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

    //table data

    

    return(
        <div style={{ margin: '0 15%' }}>
            <Table columns={columns} dataSource={dataForm} />;
        </div>
    )
}
export default OrderList;