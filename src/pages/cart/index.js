import { Table, Space, Input } from 'antd';
import { AudioOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './index.css';
import React, { useState, useEffect } from 'react';
import {
    Form,
    Button,
} from 'antd';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const cart = (
    <ShoppingCartOutlined style={{ fontSize: '64px', color: '#08c' }} theme="outlined" />
);

// const formTailLayout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 8, offset: 4 },
// };

const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Total',
        dataIndex: 'total',
    },
    {
        title: '',
        dataIndex: 'delProduct',
    },
];

const data = [];
for (let i = 0; i < 15; i++) {
    data.push({
        key: i,
        product: `Product ${i}`,
        price: i * 15000,
        amount: i * 5,
        total: i * 15000 * i * 5,
        delProduct: <Form.Item>
        {/*  <Form.Item {...formTailLayout}> */}
                        <Button type="primary">
                            Delete
                        </Button>
                    </Form.Item>
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
            <div className='home'>
                <Space direction="vertical">

                    <div style={{ fontSize: '30px', color: 'blue' }}>
                        <img src='https://www.pngkit.com/png/full/231-2317569_download-shopping-cart-outline.png'
                            width={"70px"}
                            style={{ display: 'inline-block', marginRight: '16px' }}
                        />
                        Cart

                        <Search
                            // style={{display:'inline-block'}}
                            // display='inline-block'
                            className='search'
                            placeholder="Search"
                            enterButton
                            size="large"
                            suffix={suffix}
                            onSearch
                        /><br />
                    </div>
                </Space>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                <div className="space-align-container" >
                    <div className="space-align-block" id='space'>
                        <Space align="center" >
                            Payment({rowSelection.amount} Product selected):
                            <span className="mock-block">.....VND</span>
                            <Button type="primary">Payment</Button>
                        </Space>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;