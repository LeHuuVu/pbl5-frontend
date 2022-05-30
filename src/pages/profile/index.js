/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import "./index.css";
import ProfileForm from './profileForm';
import 'antd/dist/antd.min.css';
import Layout from '../../layouts/Layout'

function Profile() {
  
  if(localStorage['user-info']==null) {window.location.href = '/login'}
  else{
    return (      
    <Layout>
      <Layout.Main>
        <div>
          <ProfileForm />
        </div>  
      </Layout.Main>
    </Layout>
      )
  }
}
export default Profile