import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postQuizToSever } from '../../../../service/apiServices';
import { toast } from 'react-toastify';


const ManageQuiz = (props) => {
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
            setImage(event.target.files[0])
        }
    }
    const handleSubmitQuiz = async () => {
        let res = await postQuizToSever(name, description, selectedOption, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setSelectedOption(null);
            setImage('')
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container p-2">
            <div className="title mb-4">
                Manage Quizes
            </div>
            <div className="add-new">

                <fieldset className="border p-2 rounded-3">
                    <legend className="w-auto float-none" style={{ fontSize: "16px" }}>Add new Quiz</legend>
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
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}
export default ManageQuiz; 