/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import SellingProduct from './sellingProduct';
import {Button} from 'antd';
import { listSellingProduct } from '../../../api/sellerInterface';

const SellingProductListForm = () => {
    const [list, setList] = useState([]);

    useEffect(async () => {
        await listSellingProduct().then((res) => {
            setList((list) => res.data);
        }).catch((error) => console.log(error.response.request.response))
    }, [])
    let component;
    if (list !== null) {
        if (list.data !== undefined) {
            component = (
                list.data.map((item) => <SellingProduct item={item}></SellingProduct>)
            )
        }
    }
    else {
        component = (<h1>fail</h1>)
    }
    return (
        <div>
            <div className="latest-articles" style={{ margin: "0px 20%" }}>
                <div style={{ width: '68%' }}>
                    <h3>Sản phẩm đang bán:</h3>
                </div>
                <div style={{float: 'left' }}>
                    <Button type="primary" style={{ marginLeft: '20px',background: "#ff8e3c", borderColor: "#ff8e3c" }}>
                        <a href='/login' style={{ textDecoration: 'none' }}>Thêm sản phẩm mới</a>
                    </Button>
                </div>
            </div>
            <div className="latest-articles" style={{ margin: "0px 15%" }}>
                {component}
            </div>
        </div>
    );
};

export default () => <SellingProductListForm />;
