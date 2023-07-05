import { useState, useEffect } from 'react';
import Select from 'react-select';
import { tableSocialQuiz, getAllUsers, postAssignQuizToUser } from '../../../../service/apiServices';
import { toast } from 'react-toastify';

const AssignToUsers = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setLizQuiz] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState({});
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let res = await tableSocialQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            });
            setLizQuiz(newQuiz);
        }
    }
    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUsers = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            });
            setListUser(newUsers);
        }
    }
    const handleClickAssign = async () => {
        let res = await postAssignQuizToUser(selectedQuiz.value, selectedUsers.value);
        if (res && res.EC === 0) {
            setListUser('');
            setLizQuiz('');
            toast.success(res.EM);
        }
    }
    return (
        <div className='row'>
            <div className="select-quiz col-6 mt-3">
                <label>Select Quiz</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz} />
            </div>
            <div className="select-user col-6 mt-3">
                <label>Select User</label>
                <Select
                    defaultValue={selectedUsers}
                    onChange={setSelectedUsers}
                    options={listUser} />
            </div>
            <div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleClickAssign()}
                >Assign</button>
            </div>
        </div>
    )
}
export default AssignToUsers;