import ModalCreateUser from "./ModalCreateUser";
import { getAllUser } from "../../../service/apiServices";
import { useEffect } from "react";
import { useState } from "react";

export default function ManageUser() {
    const [dataUsers, setDataUsers] = useState([]);
    useEffect(() => {
        tableAllUser();
    }, [])
    const tableAllUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setDataUsers(res.DT);
        }
    };
    return (

        <div className="manage-user-container">
            <div className="title">
                <h3>Manage User</h3>
            </div>
            <div className="users-content">
                <ModalCreateUser
                    tableAllUser={tableAllUser}
                />
                <div className="table-user mt-3">
                    <table className="table table-success table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Customize</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUsers && dataUsers.length > 0 &&
                                dataUsers.map((itemDataUser) => {
                                    return (
                                        <tr key={itemDataUser.id}>
                                            <th scope="row">{itemDataUser.id}</th>
                                            <td>{itemDataUser.username}</td>
                                            <td>{itemDataUser.email}</td>
                                            <td>{itemDataUser.role}</td>
                                            <td style={{ display: "flex", gap: "10px" }}>
                                                <button className="btn btn-info">View</button>
                                                <button className="btn btn-warning">Update</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}