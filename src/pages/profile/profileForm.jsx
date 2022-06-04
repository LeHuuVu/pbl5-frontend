import React,{useState} from 'react'
import { Avatar, Button } from 'antd'
// import { EditFilled } from '@ant-design/icons'
// import { ReactReduxContext } from 'react-redux'
import { useCookies } from "react-cookie";
import './index.scss'
import Edit from './editProfile';

const ProfileForm = () => {
  const [cookies] = useCookies(["userInfo"]);
  const [mode, setMode] = useState(false);

  // const { store } = useContext(ReactReduxContext)
  let info = cookies.userInfo
  const changeMode = () => {
    setMode(false)
  }
  
  let profile;
  if(mode === false){
    profile = (
      <div style={{ margin: '0 26%' }}>
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
              <dd>{info.name}</dd>
              <dt>SĐT</dt>
              <dd>{info.phone}</dd>
              <dt>Email</dt>
              <dd>{info.email}</dd>
              <dt>Địa chỉ</dt>
              <dd>{info.address}</dd>
              <dd><div>
                  <Button ghost={true} size={'large'} 
                    style={{backgroundColor: "#ff8e3c", width:"30%", color:"#0d0d0d"}} 
                    onClick={()=>{setMode(2)}}>Chỉnh sửa</Button>
                  <Button href="/productList" danger size={'large'} 
                    style={{width:"30%"}}>Thoát</Button> 
                  </div> 
              </dd>
            </dl>
            </main>
        </div>
      </div>
    )
  } else {
    profile = (<Edit changeMode={changeMode}/>)
  }


  return (
    <div>     
      {profile}
    </div>
  )
}
export default ProfileForm
