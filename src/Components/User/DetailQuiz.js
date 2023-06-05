import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiServices";
import { useEffect } from "react";
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [question, setQuestion] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModelResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState(0)

    const handleBack = () => {
        if (index - 1 < 0) return;

        setIndex(index - 1)
    };
    const handleNext = () => {
        if (question && question.length > index + 1)
            setIndex(index + 1)
    };
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(question);
        let questionName = dataQuizClone.find(item => +item.questionId === +questionId); //convers chuỗi string qua dạng number
        if (questionName && questionName.answers) {
            questionName.answers = questionName.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            });
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = questionName;
            setQuestion(dataQuizClone);
        }
    }
    useEffect(() => {
        fetchQuestion()
    }, [quizId]);
    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false // add isSelected = false
                        answers.push(item.answers);
                    })
                    return (
                        { questionId: key, answers, questionDescription, image }
                    )
                })
                .value()
            setQuestion(data)
        }
    }
    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (question && question.length > 0) {
            question.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = [];
                item.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            //submit API
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT?.countCorrect,
                    countTotal: res.DT?.countTotal,
                    quizData: res.DT?.quizData
                })
                setIsShowModelResult(true);
            } else {
                alert(`Some thing wrong:... `)
            }
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="detail-quiz-content__left">
                <div className="q-title">
                    <h4>Quiz {quizId}: {location.state.dataToDetailQuiz}</h4>
                </div>
                <div className="q-body">
                    <div className="q-body-part">
                        <div className="q-body-part__child"><span>Part 1</span></div>
                        <div className="q-body-part__child"><span>Part 1</span></div>
                        <div className="q-body-part__child"><span>Part 1</span></div>
                        <div className="q-body-part__child"><span>Part 1</span></div>
                        <div className="q-body-part__child"><span>Part 1</span></div>
                    </div>
                </div>
                <div className="q-content">
                    <Question
                        handleCheckBox={handleCheckBox}
                        question={question && question.length > 0 ? question[index] : []}
                        index={index}
                    />
                </div>
                <div className="q-footer">
                    <button type="button" onClick={() => handleBack()}>BACK</button>
                    <button type="button" onClick={() => handleNext()}>NEXT</button>
                    <button type="button" onClick={() => handleFinishQuiz()}>FINISH</button>
                </div>
            </div>
            <div className="detail-quiz-content__right">
                RIGHT CONTENT
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModelResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz;