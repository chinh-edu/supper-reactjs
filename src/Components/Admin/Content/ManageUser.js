import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import './ManageUser.scss'
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from '../../../service/apiServices';

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreatUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [listUser, setListUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})

    useEffect(() => {
        fetchListUsers();
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }
    const handleClickBtnView = (user) => {
        console.log(`chwkc user:`, dataView)
        setShowModalViewUser(true)
        setDataView(user)
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="user-button">
                    <button type="button" className="btn btn-primary" onClick={() => setShowModalCreatUser(true)}>Click Add User</button>
                </div>
                <div className="user-table">
                    <TableUser listUser={listUser} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnView={handleClickBtnView} />
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreatUser}
                fetchListUsers={fetchListUsers}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUsers={fetchListUsers}
            />
            <ModalViewUser
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                dataView={dataView}
            />
        </div>
    )
}
export default ManageUser;