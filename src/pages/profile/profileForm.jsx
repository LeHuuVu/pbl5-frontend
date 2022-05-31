import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Input, Button } from 'antd'
import { EditFilled } from '@ant-design/icons'
// import { ReactReduxContext } from 'react-redux'
import { getProfile, getAvatar } from '../../api/profile'
import './index.scss'

const ProfileForm = () => {
  const [avatarUser, setAvatarUser] = useState('')
  const [nameUser, setNameUser] = useState('')
  const [chatWorkIdUser, setChatWorkIdUser] = useState('')
  const [emailUser, setEmailUser] = useState('')
  const [editable, setEditable] = useState(false)

  // const { store } = useContext(ReactReduxContext)
  let info = JSON.parse(localStorage.getItem('user-info'));
  const [user, setUser] = useState(null)

  useEffect(() => {
    // setUser(store.getState().get('auth').get('user'))
    if (user) {
      const id = user.get('id')
      getProfile(id).then((response) => {
        setNameUser(response.data.name)
        setChatWorkIdUser(response.data.chatwork_id)
        setEmailUser(response.data.email)
      })
      getAvatar(id).then(() => {
        const link = `api/avatar/${id}`
        setAvatarUser(link)
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
            <dd><Input readOnly={!editable} value={info.name}/></dd>
            <dt>SĐT</dt>
            <dd><Input readOnly={!editable} value={info.phone}/></dd>
            <dt>Email</dt>
            <dd><Input readOnly={!editable} value={info.email}/></dd>
            <dt>Địa chỉ</dt>
            <dd><Input readOnly={!editable} value={info.address}/></dd>
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
