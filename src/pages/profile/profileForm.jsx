import React, { useState, useEffect, useContext } from 'react'
import { Avatar } from 'antd'
import { EditFilled } from '@ant-design/icons'
// import { ReactReduxContext } from 'react-redux'
import { getProfile, getAvatar } from '../../api/profile'
import './index.scss'

const ProfileForm = () => {
  const [avatarUser, setAvatarUser] = useState('')
  const [nameUser, setNameUser] = useState('')
  const [chatWorkIdUser, setChatWorkIdUser] = useState('')
  const [emailUser, setEmailUser] = useState('')

  // const { store } = useContext(ReactReduxContext)

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

  return (
    <div style={{ margin: '0 26%' }}>
      <div class="profile">
        <figure>
          <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/279228757_3155566138105769_5967045552796148415_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a2NIO-0c_4IAX9hWRED&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8VuoV64t4vCuBe4UnCUB-IaKlUoNoSVT0cBClsajmmhg&oe=62999B16" alt="" />
        </figure>
        <header>
          <h1>Vũ</h1>
        </header>
        <main>
          <dl>
            <dt>Tên đầy đủ</dt>
            <dd>Lê Hữu Vũ</dd>
            <dt>SĐT</dt>
            <dd>0964xxx732</dd>
            <dt>Email</dt>
            <dd>lehuuvupro123@gmail.com</dd>
            <dt>Địa chỉ</dt>
            <dd>TT Ái Nghĩa, Đại Lộc, Quảng Nam</dd>
            <dd><a href="">Edit ProFile</a></dd>
          </dl>
          </main>
      </div>
    </div>
  )
}
export default ProfileForm
