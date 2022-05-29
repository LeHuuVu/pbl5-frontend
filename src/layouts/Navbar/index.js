/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { Menu, Dropdown, Avatar, Input, Space, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './style.scss';
import logo from '../../logo_app.png';

export default function Navbar() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  let user = localStorage.getItem('user-info');
  const handleLogout = async () => {
    try {
      console.log('logout')
      // const response = await logout()
      localStorage.clear();
      console.log(localStorage.getItem('user-info'))
      // if (response.request.status === 200) {
      //   window.location = '/'
      // }
      window.location.href = '/dashboard';
    } catch (error) {
      if (error.request.status === 400) {
        console.log(error)
      }
    }
  }
  const userInformation = (
    <Menu className="border-2 rounded-2xl py-2 top-3 absolute transform -translate-x-1/2 left-1/2" style={{width:200,float:'right',margin:30}}>  
      <Menu.Item key="0">
        <a href="/profile">
          <a style={{color: "black"}}>Profile</a>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
          <a onClick={handleLogout}>Logout</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="flex justify-between items-center border-2 navbar select-none">
      <div className="flex"  style={{float:'left'}}>
        <div className="w-20 ml-16">
          <a href="/dashboard" >
              <img src={logo} alt="logo" className="logo"/>
          </a>
        </div>
      </div>
      <div className="flex items-center searchNavbar" style={{float:'left' }}>
          <div className="px-8" >
          <Space direction="vertical">
            <Search style={{width: 500, height: 20}} placeholder="input search text" onSearch={onSearch} enterButton />
          </Space>
          </div>
      </div>
      <div className="flex px-16 items-center">
        <div className="px-4">
          <Dropdown overlay={userInformation} trigger={['click']}>
            <div className="px-2 border-4 border-white user-icon-container py-1 cursor-pointer avatarNavbar">
              <Avatar className="text-xl user-icon" style={{float:'right', width:'40px',height:'40px'}}/>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="flex px-16 items-center cartNavbar" style={{float:'right'}}>
        <div className="px-4">
        <Button type="text" href={"/cart"} icon={<ShoppingCartOutlined className="cart" style={{ fontSize: '200%'}}/>} />
        </div>
      </div>
    </div>
  )
}
