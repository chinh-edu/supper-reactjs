import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../service/apiServices";
import { useEffect } from "react";
import _ from 'lodash';
import './DetailQuiz.scss'

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
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
                    <div className="q-body-request">
                        Look at the picture and listen to the sentences. Choose the sentence that best describes the picture:
                    </div>
                    <div className="q-body-img">
                        <img src="https://www.anhngumshoa.com/uploads/images/resize/550x550/test/11.jpg" />
                    </div>
                </div>
                <div className="q-content">
                    <div className="number-question">Question 1</div>
                    <div className="answer-select">
                        <label>
                            <input type="radio" name="" value="" />
                            <strong>A</strong>
                        </label>
                        <label>
                            <input type="radio" name="" value="" />
                            <strong>B</strong>
                        </label>
                        <label>
                            <input type="radio" name="" value="" />
                            <strong>C</strong>
                        </label>
                    </div>
                </div>
                <div className="q-footer">
                    <button type="button">BACK</button>
                    <button type="button">NEXT</button>
                </div>
            </div>
            <div className="detail-quiz-content__right">
                RIGHT CONTENT
            </div>
        </div>
    )
}
export default DetailQuiz;