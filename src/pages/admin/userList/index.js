import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { getAllUser, delUser } from '../../../api/adminInterface';
import { Space, Table, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';


const UserList = () => {

    const [listUser, setUser] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    let userID;

    if (localStorage.getItem('remember') === 'local') {
        userID = JSON.parse(localStorage.getItem('user-info')).id;
    } else if (localStorage.getItem('remember') === 'session') {
        if ((sessionStorage.getItem('user-info')) !== null) {
            userID = JSON.parse(sessionStorage.getItem('user-info')).id;
        }
    }

    useEffect(() => {
        try {
            setReload(false)
            getAllUser({
                id_user: userID
            }).then((res) => {
                if (res.data.length > 0) { setUser(res.data); }
            }).catch((error) => console.log(error))
        } catch (e) { console.error(e) }
    }, [reload])

    const OnDelete = async (idUserdelete) => {
        await delUser({ id_user: userID, id_user_delete: idUserdelete }).then((res) => {
            openNotificationSuccess(res)
        }).catch((error) => {
            if (error.request.status === 400) {
                notification.error({
                    message: 'Xin lỗi!!! Chúng tôi đang gặp phải một số vấn đề!',
                    duration: 3,
                })
            }
        })
    }

    const openNotificationSuccess = (res) => {
        setReload(true)
        notification.success({
            message: "Đã xóa!",
            duration: 3,
        })
        navigate('/userList')
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'iduser',
            key: 'iduser',
        },
        {
            title: 'Tên user',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={(e) => OnDelete(record.iduser)} style={{ background: "#ff8e3c", borderColor: "#ff8e3c" }}>Delete</Button>
                </Space>
            ),
        },
    ];

    const data = [];
    console.log(listUser)

    if (listUser.length > 0) {
        listUser.forEach((element, index) => {
            data.push({
                key: index,
                iduser: element.id,
                username: element.name,
                email: element.email,
                phone: element.phone,
                address: element.address
            })
        });
    }

    return (
        <div>
            <h2>Danh Sách User</h2><br />
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default UserList