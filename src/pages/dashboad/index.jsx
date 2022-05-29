import React from "react";
import logo from '../../logo_app.svg';
import "./index.css";
import {} from 'react-bootstrap'
function Dashboard() {
    return (
        <div>
            <div style={{ marginLeft: '10%', marginRight: '10%', borderBottom: '2px solid' }}>
                <div >
                    <a href="http://localhost:3000/home" style={{ width: 'auto', height: '100px', fontSize: '24px' }}>
                        <img src={logo} style={{ height: '100px', width: 'auto' }} />DUT E-Commerce Platform
                    </a>
                    {/* <img src="E:\Benkyou\Nam_III_KY_II\PBL5\pbl5-frontend\src\logo_app_rvbg.png" alt="aa" />DUT E-Commerce Platform */}
                    <input style={{marginLeft:'150px', padding:'4px',borderRadius:'8px', border:'2px solid rgb(173, 175, 174)'}} type="text" placeholder="Bạn cần gì?" size={60}/>
                    <button type="button" style={{marginTop:'30px'}}><svg height="19" viewBox="0 0 19 19" width="19" class="shopee-svg-icon"><g fill-rule="evenodd" stroke="none" stroke-width="1"><g transform="translate(-1016 -32)"><g><g transform="translate(405 21)"><g transform="translate(611 11)"><path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></path><path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></path></g></g></g></g></g></svg>
                    </button>
                    <a href="http://localhost:3000/cart"><img src='https://www.pngkit.com/png/full/231-2317569_download-shopping-cart-outline.png'
                            width={"60px"}
                            style={{ display: 'inline-block', marginRight: '16px',float:'right' ,marginRight:"60px" ,marginTop:'35px'}}/>
                    </a>
                </div>
            </div>
            <div>
                {/* Show list sản phẩm ở đây */}
            </div>
            {/* <div className="container">
                <div className="kul4\+s">
                    <div>Account</div>
                    <div className="rhmIbk">
                        <div><a href=""><img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" className="bfikuD"/>Tài khoản của tôi</a></div>   
                        <div><a href=""><img src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078" className="bfikuD"/>Đơn hàng</a></div>                     
                    </div>
                </div>
                <div className="xMDeox">

                </div>
            </div> */}
        </div>
    );
}
export default Dashboard