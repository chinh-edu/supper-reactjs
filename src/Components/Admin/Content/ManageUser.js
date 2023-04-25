import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { useState } from "react";
import TableUser from "./TableUser";
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreatUser] = useState(false)

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
                    <TableUser />
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreatUser}
            />
        </div>
    )
}
export default ManageUser;