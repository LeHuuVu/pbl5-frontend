/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import Product from './product';
import {listProduct} from '../../api/buyerInterface';

const ProductListForm = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
            listProduct().then((res) => {
                setList((list)=>res.data);
            }).catch((error) => console.log(error.response.request.response))
    }, [])
    let component;
    if (list !== null){
        if(list.data !== undefined){
            component = (
                list.data.map((item) => <Product item={item}></Product>)
            )   
        }
      }
    else{
        component =(<h1>fail</h1>)
    }
    return (
        <div className="latest-articles" style={{ margin: "0px 15%" }}>
            {component}
        </div>
    );
};

export default () => <ProductListForm />;
