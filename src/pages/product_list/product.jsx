import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Product = (item) => (
    <div class="latest-articles-wrapper">
        <a href="/product_detail">
            <Card
                hoverable
                style={{ width: 240 , float:'left'}}
                cover={<img alt="mainImage" src={item.item.image} />}
                href="/product_detail"
            >
                {console.log(item)}
                <Meta title={item.item.name} description={item.item.price+" VND"} />
            </Card>
        </a>
    </div>

);

export default Product;