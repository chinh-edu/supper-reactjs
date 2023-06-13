import Select from 'react-select';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { RiImageAddFill, RiQuestionMark } from 'react-icons/ri'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _ from "lodash";

const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];
    const [question, setQuestion] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'answer 2',
                        isCorrect: false
                    },
                ]
            },
            {
                id: uuidv4(),
                description: 'question 2',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'answer 2',
                        isCorrect: false
                    },
                ]
            }
        ]
    );
    const handleAddRemoveQuestion = (type, id) => {
        let questionsClone = _.cloneDeep(question);
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestion([...questionsClone, newQuestion]);
        }
        if (type === "REMOVE") {
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestion(questionsClone);
        };
    };
    const handleQuestionMark = () => {
        toast.warning(`Don't DELETE a question`);
    };
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(question);
        if (type === "ADD") {
            const newAnswes = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswes);
            setQuestion(questionsClone);
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestion(questionsClone);
        }
    };
    console.log(`check list question:`, question);
    return (
        <div className="managequestion-container">
            <h3>Manage Question</h3>
            <div className="select-quiz col-6 mt-3">
                <label>Select Quiz</label>
                <Select options={options} />
            </div>
            <div className='mt-3'>Add question</div>
            {question && question.length > 0 &&
                question.map((item, index) => {
                    return (
                        <div className='main my-3' key={item.id}>
                            <div className='add-question-container'>
                                <div className='add-question-content'
                                    style={{
                                        display: "flex",
                                        gap: "30px",
                                        alignItems: "center"
                                    }}
                                >
                                    <div className="form-floating mb-3 col-6">
                                        <input className="form-control" placeholder="name@example.com" value={item.description} />
                                        <label>Question {index + 1} 's description</label>
                                    </div>
                                    <div className='upload-image'>
                                        <RiImageAddFill
                                            style={{
                                                fontSize: "26px",
                                                marginRight: "5px",
                                                color: "violet",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <input type={'file'} hidden></input>
                                        <span>{item.imageName}</span>
                                    </div>
                                    <div className="add-remove-question-icon ">
                                        <BsFillPatchPlusFill
                                            style={{
                                                fontSize: "32px",
                                                color: "green",
                                                marginRight: "10px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handleAddRemoveQuestion('ADD', '')}
                                        />
                                        {question.length === 1 ?
                                            <RiQuestionMark
                                                style={{
                                                    fontSize: "30px",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => handleQuestionMark()}
                                            />
                                            :
                                            <BsFillPatchMinusFill
                                                style={{
                                                    fontSize: "32px",
                                                    color: "red",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            {item.answers && item.answers.length > 0 &&
                                item.answers.map((answer, index) => {
                                    return (
                                        <div className='add-answers mb-2' style={{ paddingLeft: "20px", display: "flex", flexDirection: "column" }} key={answer.id}>
                                            <div className='add-answer-items'
                                                style={{
                                                    display: "flex",
                                                    gap: "16px",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <input type="checkbox" style={{ transform: "scale(1.5)", cursor: "pointer" }} value={answer.isCorrect} />
                                                <div className="form-floating col-6">
                                                    <input className="form-control" placeholder="name@example.com" value={answer.description} />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="add-answers-icon ">
                                                    <BsFillPatchPlusFill
                                                        style={{
                                                            fontSize: "32px",
                                                            color: "green",
                                                            marginRight: "10px"
                                                        }}
                                                        onClick={() => handleAddRemoveAnswer('ADD', item.id)}
                                                    />
                                                    <BsFillPatchMinusFill
                                                        style={{
                                                            fontSize: "32px",
                                                            color: "red"
                                                        }}
                                                        onClick={() => handleAddRemoveAnswer('REMOVE', item.id, answer.id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })}

        </div>
    )
}
export default Questions;