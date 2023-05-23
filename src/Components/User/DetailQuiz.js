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
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => ({ questionId: key, data: value }))
                .value()
            console.log(`check data:`, data)
        }
    }
    return (
        <div className="detail-quiz-container">DetailQuiz</div>
    )
}
export default DetailQuiz;