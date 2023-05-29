import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../service/apiServices";
import { useEffect } from "react";
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from "./Question";
import { useState } from "react";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [question, setQuestion] = useState([]);
    const [index, setIndex] = useState(0);
    const handleBack = () => {
        if (index - 1 < 0) return;

        setIndex(index - 1)
    };
    const handleNext = () => {
        if (question && question.length > index + 1)
            setIndex(index + 1)
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
                        answers.push(item.answers);
                    })
                    return (
                        { questionId: key, answers, questionDescription, image }
                    )
                })
                .value()
            console.log(`check data:`, data)
            setQuestion(data)
        }
    }
    console.log(`check question:`, question)
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
                        question={question && question.length > 0 ? question[index] : []}
                        index={index}
                    />
                </div>
                <div className="q-footer">
                    <button type="button" onClick={() => handleBack()}>BACK</button>
                    <button type="button" onClick={() => handleNext()}>NEXT</button>
                </div>
            </div>
            <div className="detail-quiz-content__right">
                RIGHT CONTENT
            </div>
        </div>
    )
}
export default DetailQuiz;