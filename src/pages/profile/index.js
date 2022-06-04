/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import "./index.css";
import ProfileForm from './profileForm';
import 'antd/dist/antd.min.css';
import { useCookies } from "react-cookie";

function Profile() {
  const [cookies] = useCookies(["userInfo"]);  
  
  if(cookies.userInfo.role==null) {window.location.href = '/login'}
  else{
    return (
        <div>
          <ProfileForm />
        </div>
      )
  }
}
export default Profile