import { Image, Descriptions, Table, Tag, Space, Button, Form } from 'antd';
import './index.css'

// const columns = [
//     {
//         title: '',
//         dataIndex: 'imgProduct',
//     },
//     {
//         title: '',
//         dataIndex: 'infoProduct',
//     },
// ];

// const data = [];
// for (let i = 0; i < 1; i++) {
//     data.push({
//         key: i,
//         imgProduct: <img
//             width={400}
//             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
//             style={{ display: 'inline-block', marginRight: '16px' }}
//         />,
//         infoProduct: <Descriptions title="Product Detail" layout="horizontal" >
//             <Descriptions.Item label="Product Name">Nồi chiên không dầu</Descriptions.Item><br /><br />
//             <Descriptions.Item label="Price">1810000000</Descriptions.Item><br /><br />
//             <Descriptions.Item label="Description">NỒI CHIÊN KHÔNG DẦU ĐA NĂNG
//                 Nồi chiên tích hợp lò sấy và nướng đa năng
//                 Dung tích 14 lít.
//                 Thiết kế vô cùng bắt mắt cùng màu xanh coban sang trọng và hiện đại
//                 Công suất mạnh mẽ 1700w, hoạt động gia nhiệt trên, gia nhiệt dưới cùng quạt đối lưu sẽ giúp chín đều thực phẩm, không cần lật thực phẩm trong quá trình nấu nướng
//                 Có 16 chức năng để lựa chọn, dễ dàng làm vô số món ăn và món bánh,...bằng NCKD thông minh này
//                 Màn hình cảm ứng điện tử hiện đại, nắp kính sang trọng giúp dễ dàng quan sát thực phẩm bên trong
//             </Descriptions.Item><br /><br />
//             <Descriptions.Item label="Amount_remaining" span={2}>152</Descriptions.Item><br /><br />
//         </Descriptions>,
//         // delProduct: <Form.Item>
//         // {/*  <Form.Item {...formTailLayout}> */}
//         //                 <Button type="primary">
//         //                     Delete
//         //                 </Button>
//         //             </Form.Item>
//     });
// }

function ViewProduct_Detai() {
    return (
        <div >
            <div style={{width:"50%", float:"left", textAlign:"right"}}>
                <img
                    width={600}
                    src="https://hc.com.vn/i/ecommerce/media/GD.005034_FEATURE_96547.jpg"
                    style={{ display: 'inline-block', marginRight: '16px' }}
                />
            </div>

            <div style={{width:"50%", float:"right"}}>
                {/* <Form> */}
                    <Descriptions title="Product Detail" layout="horizontal" >
                        <Descriptions.Item label="Product Name">Nồi chiên không dầu</Descriptions.Item><br /><br />
                        <Descriptions.Item label="Price">1810000000</Descriptions.Item><br /><br />
                        <Descriptions.Item label="Description">NỒI CHIÊN KHÔNG DẦU ĐA NĂNG
                            Nồi chiên tích hợp lò sấy và nướng đa năng
                            Dung tích 14 lít.
                            Thiết kế vô cùng bắt mắt cùng màu xanh coban sang trọng và hiện đại
                            Công suất mạnh mẽ 1700w, hoạt động gia nhiệt trên, gia nhiệt dưới cùng quạt đối lưu sẽ giúp chín đều thực phẩm, không cần lật thực phẩm trong quá trình nấu nướng
                            Có 16 chức năng để lựa chọn, dễ dàng làm vô số món ăn và món bánh,...bằng NCKD thông minh này
                            Màn hình cảm ứng điện tử hiện đại, nắp kính sang trọng giúp dễ dàng quan sát thực phẩm bên trong
                        </Descriptions.Item><br /><br />
                        <Descriptions.Item label="Amount_remaining" span={2}>152</Descriptions.Item><br /><br />
                    </Descriptions>
                    <Form.Item>
                        <Button>Add to Cart</Button>
                        <Button type="primary" >
                            Buy
                        </Button>
                    </Form.Item>
                {/* </Form> */}
            </div>
            {/* <Form>
                <img
                    width={400}
                    src="https://hc.com.vn/i/ecommerce/media/GD.005034_FEATURE_96547.jpg"
                    style={{ display: 'inline-block', marginRight: '16px' }}
                />
                <Descriptions title="Product Detail" layout="horizontal" >
                    <Descriptions.Item label="Product Name">Nồi chiên không dầu</Descriptions.Item><br /><br />
                    <Descriptions.Item label="Price">1810000000</Descriptions.Item><br /><br />
                    <Descriptions.Item label="Description">NỒI CHIÊN KHÔNG DẦU ĐA NĂNG
                        Nồi chiên tích hợp lò sấy và nướng đa năng
                        Dung tích 14 lít.
                        Thiết kế vô cùng bắt mắt cùng màu xanh coban sang trọng và hiện đại
                        Công suất mạnh mẽ 1700w, hoạt động gia nhiệt trên, gia nhiệt dưới cùng quạt đối lưu sẽ giúp chín đều thực phẩm, không cần lật thực phẩm trong quá trình nấu nướng
                        Có 16 chức năng để lựa chọn, dễ dàng làm vô số món ăn và món bánh,...bằng NCKD thông minh này
                        Màn hình cảm ứng điện tử hiện đại, nắp kính sang trọng giúp dễ dàng quan sát thực phẩm bên trong
                    </Descriptions.Item><br /><br />
                    <Descriptions.Item label="Amount_remaining" span={2}>152</Descriptions.Item><br /><br />
                </Descriptions>
                <Form.Item>
                    <Button>Add to Cart</Button>
                    <Button type="primary" >
                        Buy
                    </Button>
                </Form.Item>
            </Form> */}
        </div>
    );
}

export default ViewProduct_Detai;