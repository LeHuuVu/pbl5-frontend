/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "../index.css";
import DetailOrder from './detail';
import 'antd/dist/antd.min.css';

function Detail() {
  if(localStorage['user-info']==null && sessionStorage['user-info']==null) {window.location.href = '/login'}
  let role = 1;
  if(localStorage.getItem('remember') ==='local'){
    role = JSON.parse(localStorage.getItem('user-info')).role;
  }else if(localStorage.getItem('remember') ==='session'){
    if((sessionStorage.getItem('user-info')).role !== undefined){
      role = JSON.parse(sessionStorage.getItem('user-info')).role;
    }
  }
  if(role===2) {window.location.href = '/sellingProduct'}
  else{
    return (
        <div>
          <DetailOrder />
        </div>
      )
  }
}
export default Detail