/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.css";
import 'antd/dist/antd.min.css';
import Layout from '../../../layouts/Layout'
import { Button } from 'antd';
import AllProduct from '../allProduct';
import UserList from '../userList';

function MenuAdmin() {

    const ViewUser = () => {
        //
    }

    const ViewProduct = () => {
        //
    }

    return (
        <Layout>
            <Layout.Main>
                <div style={{ margin: '0 35%' }}>
                    <Button
                        type="primary"
                        style={{ marginRight: '10px', marginBottom: '20px', background: "#ff8e3c", borderColor: "#ff8e3c" }}
                        size={'large'}
                        onClick={(e) => ViewUser()}
                    >
                        Xem thông tin User
                    </Button>
                    <Button
                        type="primary"
                        style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }}
                        size={'large'}
                        onClick={(e) => ViewProduct()}
                    >
                        Xem thông tất cả sản phẩm
                    </Button>
                </div>
            </Layout.Main>
        </Layout>
    )
}
export default MenuAdmin