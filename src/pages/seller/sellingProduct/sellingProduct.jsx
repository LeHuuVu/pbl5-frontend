import React from 'react';
import { Card, Rate } from 'antd';

const { Meta } = Card;

function averageRate(list_review) {
    if (list_review !== undefined) {
        if (list_review.length > 0) {
            let res = 0;
            for (let i = 0; i < list_review.length; i++) {
                res += list_review[i];
            }
            return (res / list_review.length);
        }
    }
    return 0;
}

const SellingProduct = (item) => (
    <div class="latest-articles-wrapper">
        <a href={"/sellingProductDetail/"+item.item.id}>
            <Card
                hoverable
                style={{ width: 240 , float:'left'}}
                cover={<img alt="mainImage" src={item.item.image} />}
                href="/sellingProductDetail"
            >
                <Rate allowHalf disabled defaultValue={averageRate(item.item.star_rating)} />
                <Meta title={item.item.name} description={item.item.price+" VND"} />
            </Card>
        </a>
    </div>

);

export default SellingProduct;