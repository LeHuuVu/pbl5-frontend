/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import SellingProduct from './sellingProduct';
import { Button } from 'antd';
import { listSellingProduct } from '../../../api/sellerInterface';

const SellingProductListForm = () => {
    const [list, setList] = useState([]);

    let id
    if(localStorage.getItem('remember') ==='local'){
        id = JSON.parse(localStorage.getItem('user-info')).id;
      }else if(localStorage.getItem('remember') ==='session'){
        if((sessionStorage.getItem('user-info')) !== null){
            id = JSON.parse(sessionStorage.getItem('user-info')).id;
        }
    }
    useEffect(async () => {
        await listSellingProduct({ id_user: id }).then((res) => {
            setList((list) => res.data);
        }).catch((error) => console.log(error.response.request.response))
    }, [])
    console.log(list.length);
    let component;
    if (list !== null) {
        if (list !== undefined) {
            component = (
                list.map((item) => <SellingProduct item={item}></SellingProduct>)
            )
        }
    }
    return (
        <div>
            <div className="latest-articles" style={{ margin: "0px 20%" }}>
                <div style={{ width: '68%' }}>
                    <h3>Sản phẩm đang bán:</h3>
                </div>
                <div style={{ float: 'left' }}>
                    <Button type="primary" style={{ marginLeft: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }}>
                        <a href='/addProduct' style={{ textDecoration: 'none' }}>Thêm sản phẩm mới</a>
                    </Button>
                </div>
            </div>
            <div className="latest-articles" style={{ margin: "0px 15%" }}>
                {(list.length>0) ?
                    component
                    :
                    <>
                        <div style={{ width: '35%' }}>
                        </div>
                        <div style={{ float: 'left', fontSize: '30px', marginTop: '25px' }}>
                            <p><b>Không có sản phẩm nào</b></p>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default () => <SellingProductListForm />;
