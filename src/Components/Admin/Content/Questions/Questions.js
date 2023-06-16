import Select from 'react-select';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { RiImageAddFill, RiQuestionMark } from 'react-icons/ri'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { tableSocialQuiz, postCreateQuestionForQuiz, postCreateAnswerForQuiz } from '../../../../service/apiServices';

const Questions = () => {
    const [zoomed, setZoomed] = useState(false);
    const [dataImage, setDataImage] = useState({
        imgUrl: '',
        title: ''
    });
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setLizQuiz] = useState([]);
    useEffect(() => {
        getQuizToTable();
    }, [])
    const getQuizToTable = async () => {
        let res = await tableSocialQuiz();
        if (res && res.EC === 0) {
            let newListQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            });
            setLizQuiz(newListQuiz);
        }
    }
    // console.log(`check selectedQuiz:`, selectedQuiz)
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            },
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
        ]
    );
    const handleAddRemoveQuestion = (type, id) => {
        let questionsClone = _.cloneDeep(questions);
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
            setQuestions([...questionsClone, newQuestion]);
        }
        if (type === "REMOVE") {
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        };
    };
    const handleQuestionMark = () => {
        toast.warning(`Don't DELETE a question`);
    };
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswes = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].answers.push(newAnswes);
                setQuestions(questionsClone);
            }
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            if (index > -1) {
                setQuestions(questionsClone);
            }
        }
    };
    const handleOnChangeQuestion = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'QUESTION') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            };
        };
    };
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }
    const handleOnChangeAnswer = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            let answerIndex = questionsClone[index].answers.findIndex(item => item.id === answerId);
            if (type === 'INPUT' && answerIndex > -1) {
                questionsClone[index].answers[answerIndex].description = value;
                setQuestions(questionsClone);
            }
            if (type === "CHECKBOX" && answerIndex > -1) {
                questionsClone[index].answers[answerIndex].isCorrect = value;
                setQuestions(questionsClone);
            }
        }
    };
    const handleShowImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImage({
                imgUrl: URL.createObjectURL(questions[index].imageFile),
                title: questions[index].imageName
            });
            setZoomed(true);
        }
    };
    const handleSubmitQuestionForQuiz = async () => {
        console.log(`check question: `, questions);

        await Promise.all(questions.map(async (question) => {
            const contentsQuestion = await postCreateQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            await Promise.all(question.answers.map(async (answer) => {
                let a = await postCreateAnswerForQuiz(answer.description, answer.isCorrect, contentsQuestion.DT.id);
                console.log(`check a:`, a);
            }))

            console.log(`check contents:`, contentsQuestion);
        }));

    };
    return (
        <div className="managequestion-container">
            <h3>Manage Question</h3>
            <div className="select-quiz col-6 mt-3">
                <label>Select Quiz</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz} />
            </div>
            <div className='mt-3'>Add question</div>
            {questions && questions.length > 0 &&
                questions.map((item, index) => {
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
                                        <input
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={item.description}
                                            onChange={(event) => handleOnChangeQuestion('QUESTION', item.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} 's description</label>
                                    </div>
                                    <div className='upload-image' style={{ display: 'flex', justifyContent: 'center' }}>
                                        <label htmlFor={`${item.id}`}>
                                            <RiImageAddFill
                                                style={{
                                                    fontSize: "26px",
                                                    marginRight: "5px",
                                                    color: "violet",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </label>
                                        <input
                                            type={'file'}
                                            hidden
                                            id={`${item.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(item.id, event)}
                                        ></input>
                                        <span>{item.imageFile ? <div onClick={() => handleShowImage(item.id)}>{item.imageName}</div> : `0 file uploaded`}</span>
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
                                        {questions.length === 1 ?
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
                                                <input
                                                    type="checkbox"
                                                    style={{ transform: "scale(1.5)", cursor: "pointer" }}
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleOnChangeAnswer('CHECKBOX', item.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating col-6">
                                                    <input
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleOnChangeAnswer('INPUT', item.id, answer.id, event.target.value)}
                                                    />
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
            {
                questions && questions.length > 0 &&
                <div>
                    <button
                        className='btn btn-warning'
                        onClick={() => handleSubmitQuestionForQuiz()}
                    >Save question</button>
                </div>
            }
            {zoomed &&
                <Lightbox
                    image={dataImage.imgUrl}
                    title={dataImage.title}
                    onClose={() => setZoomed(false)}
                />
            }

        </div>
    )
}
export default Questions;