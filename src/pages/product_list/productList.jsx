import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
// import logo from '../../logo_app.svg';
import {
    Form,
    Input,
    Button,
    Select,
    Switch,
    Checkbox,
    Divider,
} from 'antd';

const ProductList = () => {
    return (
        <div class="latest-articles" style={{ margin: "0px 15%" }}>
            {/* for (i=0; i<lengths(list anh)/4; i++){
                    <div class="latest-articles-wrapper">
                    for (j=i; j<i+4;j++){
                        <div class="article">
                        <img src="(Ảnh sản phẩm)" alt="" />
                        <p class="article-meta">
                            <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                            <span class="data text-muted">(Số lượng)</span>
                        </p>
                        <a href="http://localhost:3000/product_detail"><h4 class="title">Tên sản phẩm</h4></a>
                        <p>Mô tả</p>
                        <p>Tên shop</p>
                        .....
                    </div>
                    }
                </div>
            }                 
            */} 
            <div class="latest-articles-wrapper">
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">August 24, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Develop Marketing</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">July 13, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Resources Your Blog</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">April 18, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Know Your Audience</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">August 24, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Develop Marketing</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>

            </div>
            <div class="latest-articles-wrapper">
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">August 24, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Develop Marketing</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">July 13, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Resources Your Blog</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">April 18, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Know Your Audience</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">August 24, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Develop Marketing</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
            </div>
            <div class="latest-articles-wrapper">
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">August 24, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Develop Marketing</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">July 13, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Resources Your Blog</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
                <div class="article">
                    <img src="https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg" alt="" />
                    <p class="article-meta">
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png" alt="" />
                        <span class="data text-muted">April 18, 2021</span>
                    </p>
                    <a href="http://localhost:3000/product_detail"><h4 class="title">Know Your Audience</h4></a>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
            </div>
        </div>
    );
};

export default () => <ProductList />;
