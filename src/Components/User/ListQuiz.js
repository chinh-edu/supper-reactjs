import { useState } from "react";
import { getQuizByUser } from '../../service/apiServices'
import { useEffect } from "react";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";


const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, []);
    const getQuizData = async () => {
        const data = await getQuizByUser();
        console.log(`check data:`, data)
        if (data && data.EC === 0) {
            setArrQuiz(data.DT);
        }
    };
    const navigate = useNavigate();

    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div className="card" style={{ width: "18rem", marginTop: "100px" }} key={quiz.id}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary" onClick={() => navigate((`/quiz/${quiz.id}`), { state: { dataToDetailQuiz: quiz.description } })}>Start Now</button>
                            </div>
                        </div>
                    )
                })
            }

            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    You don't have any quiz now...
                </div>
            }
        </div>
    )
}
export default ListQuiz;