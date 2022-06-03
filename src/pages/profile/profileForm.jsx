import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Input, Button } from 'antd'
// import { EditFilled } from '@ant-design/icons'
// import { ReactReduxContext } from 'react-redux'
import { getProfile, getAvatar } from '../../api/profile'
import { useCookies } from "react-cookie";
import './index.scss'

const ProfileForm = () => {
  const [cookies] = useCookies(["userInfo"]);
  const [editable, setEditable] = useState(false)

  // const { store } = useContext(ReactReduxContext)
  let info = cookies.userInfo
  const [user, setUser] = useState(null)

  useEffect(() => {
    // setUser(store.getState().get('auth').get('user'))
    if (user) {
      const id = user.get('id')
      getProfile(id).then((response) => {
      })
      getAvatar(id).then(() => {
      })
    }
  }, [user])

  const onClick = () => {
    setEditable(true)
  }

  const onCancel = () => {
    setEditable(false)
  }  
  const save = () => {
    setEditable(false)
  }


  return (
    <div style={{ margin: '0 26%' }}>
      {console.log(info)}
      <div className="profile">
        <figure>
          <Avatar src={info.avatar} alt="" 
                  className="profileAvatar" size={256}/>
        </figure>
        <header>
          <h1>Hồ sơ của bạn:</h1>
        </header>
        <main>
          <dl>
            <dt>Tên đầy đủ</dt>
            <dd><Input readOnly={!editable} defaultValue={info.name} 
              rules={[
                {
                    required: true,
                    message: 'Hãy cho chúng tôi biết tên của bạn',
                },
              ]}/>
            </dd>
            <dt>SĐT</dt>
            <dd><Input readOnly={!editable} defaultValue={info.phone}
              rules={[
                  {
                      required: true,
                      message: 'Vui lòng nhập SĐT!',
                  },
                  { 
                      type: 'string', 
                      min: 8, 
                      max: 10, 
                      message: 'Hãy nhập số điện thoại hợp lệ',
                  },
              ]}/>
            </dd>
            <dt>Email</dt>
            <dd><Input readOnly={!editable} defaultValue={info.email}
              rules={[
                {
                    type: 'email',
                    message: 'E-mail không hợp lệ!',
                },
                {
                    required: true,
                    message: 'Vui lòng nhập E-mail của bạn!',
                },
                ]}/>
            </dd>
            <dt>Địa chỉ</dt>
            <dd><Input readOnly={!editable} defaultValue={info.address}
              rules={[
                {
                    required: true,
                    message: 'Vui lòng địa chỉ mặc định',
                },
              ]}/>
            </dd>
            <dd>{ editable ? 
                <div>    
                  <Button ghost={true} size={'large'} style={{backgroundColor: "#ff8e3c", width:"30%", color:"#0d0d0d"}} onClick={save}>Save</Button>
                  <Button danger size={'large'} style={{width:"30%"}} onClick={onCancel} >Cancel</Button>
                </div>
              : <Button ghost={true} size={'large'} style={{backgroundColor: "#ff8e3c", width:"30%", color:"#0d0d0d"}} onClick={onClick} >Edit ProFile</Button> }  
            </dd>
          </dl>
          </main>
      </div>
    </div>
  )
}
export default ProfileForm
