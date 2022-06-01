import React from 'react';
import { Card, Rate } from 'antd';

const { Meta } = Card;

const SellingProduct = (item) => (
    <div class="latest-articles-wrapper">
        <a href={"/sellingProductDetail/"+item.item.id}>
            <Card
                hoverable
                style={{ width: 240 , float:'left'}}
                cover={<img alt="mainImage" src={item.item.image} />}
                href="/product_detail"
            >
                <Rate allowHalf disabled defaultValue={2.5} />
                <Meta title={item.item.name} description={item.item.price+" VND"} />
            </Card>
        </a>
    </div>

);

export default SellingProduct;