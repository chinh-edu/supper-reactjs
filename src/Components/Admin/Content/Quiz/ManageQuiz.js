import { useEffect, useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postQuizToSever } from '../../../../service/apiServices';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz';
import { tableSocialQuiz } from '../../../../service/apiServices';
import DeleteQuiz from './DeleteQuiz';
import { deleteQuizToServer } from '../../../../service/apiServices'

const ManageQuiz = (props) => {
    const [tableQuiz, setTableQuiz] = useState([]);
    useEffect(() => {
        getQuizToTable();
    }, [])
    const getQuizToTable = async () => {
        let res = await tableSocialQuiz();
        if (res && res.EC === 0) {
            setTableQuiz(res.DT)
        }
    }

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        };
    }
    const handleSubmitQuiz = async () => {
        let res = await postQuizToSever(name, description, selectedOption, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await getQuizToTable();
            setName('');
            setDescription('');
            setSelectedOption(null);
            setImage('');
        } else {
            toast.error(res.EM);
        };
    }


    const [showQuizDeleteUser, setShowQuizDeleteUser] = useState(false);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
    const handleClickDeleteQuiz = async () => {
        setShowQuizDeleteUser(true);
        // let res = await deleteQuizToServer(dataDeleteQuiz.id);
        // console.log(`check res delete:`, res)
    }
    return (
        <div className="quiz-container p-2">

            <div className="title mb-4">
                Manage Quizes
            </div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add new Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="control-group">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label>Name</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="desription"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label>Description</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder={
                                        "Quiz type..."
                                    }
                                />
                            </div>
                            <div className='form-group'>
                                <label className='mb-1'> Upload Image</label>
                                <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)} />
                            </div>
                            <div className='mt-3'>
                                <button className='btn btn-warning' onClick={() => handleSubmitQuiz()}>Save</button>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail">
                <TableQuiz
                    tableQuiz={tableQuiz}
                    handleClickDeleteQuiz={handleClickDeleteQuiz}
                />
                <DeleteQuiz
                    show={showQuizDeleteUser}
                    setShow={setShowQuizDeleteUser}
                />
            </div>
        </div>
    )
}
export default ManageQuiz; 