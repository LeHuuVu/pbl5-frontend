import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import ProductSearch from './product_search';


const SearchProduct = () => {
    // console.log(localStorage.getItem('data-search'))
    if (localStorage.getItem('data-search') === "undefined") {
        return (
            <h2>Không có dữ liệu</h2>
        )
    }
    else {
        let component;
        let data_search = JSON.parse(localStorage.getItem('data-search'))
        // console.log(data_search)
        if (data_search !== null) {
            if (data_search !== undefined) {
                console.log(data_search)

                component = (
                    data_search.map((item) => <ProductSearch item={item}></ProductSearch>)
                )
            }
        }
        return (
            <div style={{ margin: "0px 14% 0 19%" }}>
                <h2>Kết quả tìm kiếm</h2><br/>
                {component}
            </div>
        )
    }
}

export default SearchProduct