/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import Product from './product';
import { listProductv2 } from '../../api/buyerInterface';

const ProductListForm = () => {
    const [list, setList] = useState([]);

    useEffect(async () => {
        await listProductv2().then((res) => {
            setList((list) => res.data);
        }).catch((error) => console.log(error.response.request.response))
    }, [])
    let component;
    if (list !== null) {
        if (list !== undefined) {
            component = (
                list.map((item) => <Product item={item}></Product>)
            )
        }
    }
    else {
        component = (<h1>fail</h1>)
    }
    return (
        // <div className="latest-articles" style={{ margin: "0px 15%" }}>
        <div style={{ margin: "0px 14% 0 19%" }}>
            {component}
        </div>
    );
};

export default () => <ProductListForm />;
