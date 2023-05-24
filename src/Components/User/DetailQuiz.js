import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiServices";
import { useEffect } from "react";
import _ from 'lodash';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    useEffect(() => {
        fetchQuestion()
    }, [quizId]);
    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);
        console.log(`check res quizData:`, res);
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
            console.log(`check data:`, data);
        }
    }
    return (
        <div className="detail-quiz-container">DetailQuiz</div>
    )
}
export default DetailQuiz;