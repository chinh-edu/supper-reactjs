import _ from 'lodash'

const Question = (props) => {
    const { question, index } = props;
    if (_.isEmpty(question)) {
        return (<></>)
    }

    return (
        <>
            {question.image &&
                <div className="q-body-img">
                    <img src={`data:image/jpeg;base64,${question.image}`} />
                </div>
            }
            <div className="number-question">Question {index + 1}: {question.questionDescription}?</div>
            <div className="answer-select">
                {
                    question.answers && question.answers.length > 0 &&
                    question.answers.map((item, index) => {
                        return (
                            <div class="form-check" key={item.id}>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    {item.id} - {item.description}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;