/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { Menu, Dropdown, Avatar, Input, Space, Button } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import './style.scss';
// import { useCookies} from "react-cookie"
import logo from '../../logo_app.png';

export default function Navbar() {
  // const [cookies, removeCookie] = useCookies(["userInfo"]); 
  // let info = JSON.parse(localStorage.getItem('user-info'));
  let info;
  if (localStorage.getItem('remember') === 'local') {
    info = JSON.parse(localStorage.getItem('user-info'));
  } else if (localStorage.getItem('remember') === 'session') {
    info = JSON.parse(sessionStorage.getItem('user-info'));
  }
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  // let user = localStorage.getItem('user-info');
  let role;
  if (info !== undefined) {
    if (info !== null) {
      role = info.role
    }
  }
  // if (typeof localStorage['user-info'] != "undefined") {
  //   if (JSON.parse(localStorage['user-info']).role === 2) {
  //     role = 2
  //   }
  //   if (JSON.parse(localStorage['user-info']).role === 0) {
  //     role = 0
  //   }
  // }

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      role = 3;
      // removeCookie('userInfo');
      window.location.href = '/login';
    } catch (error) {
      console.log(error)
    }
  }
  const userInformation = (
    <Menu className=" menuNavbar">
      <Menu.Item key="0">
        <a href="/profile">
          <a>Profile</a>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={handleLogout}>Logout</a>
      </Menu.Item>
    </Menu>
  )
  let checkLogin
  if (info !== undefined && info !== null) {
    checkLogin = (
      <div>
        <div>
          <Dropdown overlay={userInformation} trigger={['click']}>
            <div className="avatarNavbar">
              <Avatar src={info.avatar} className="" style={{ float: 'right', width: '40px', height: '40px' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    )
  }
  else {
    checkLogin = (
      <div>
        <a href="/Register" style={{ padding: 10 }}> Đăng ký</a>
        |
        <a href="/login" style={{ padding: 10 }}>Đăng nhập</a>
      </div>
    )
  }

  return (
    <div className="navbar">
      <div >
        <div>
          {role === 0 ?
            <a href="/admin">
              <MenuOutlined style={{ fontSize: '30px', marginRight:"15px"}} />
            </a>
            : null
          }
          <a href={role !== 2 ? "/productList" : "/sellingProduct"}>
            <img src={logo} alt="logo" className="logo_nav" />
          </a>
        </div>
      </div>
      <div className="searchNavbar">
        <div>
          <Search style={{ width: 500 }} placeholder="Bạn cần gì?" onSearch={onSearch} enterButton />
        </div>
      </div>
      <div className="cartNavbar">
        <Space direction="horizontal">
          {(role === 1)
            ?
            <>
              <div style={{ marginRight: '25px' }}>
                <Button type="text" href={"/cart"} icon={<ShoppingCartOutlined style={{ fontSize: '200%' }} />} />
              </div>
            </>
            :
            null
          }
          {checkLogin}
        </Space>
      </div>
    </div>
  )
}
