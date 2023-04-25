import { useEffect, useState } from "react";
import { getAllUsers } from '../../../service/apiServices';

const TableUser = () => {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        fetchListUsers();
    }, [])

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    return (
        <table className="table table-hover table-bordered">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td className="btn-container" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                    <button className="btn btn-success">View</button>
                                    <button className="btn btn-warning">Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                {listUser && listUser.length === 0 &&
                    <tr>
                        <td colSpan={'5'}>No List User</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default TableUser