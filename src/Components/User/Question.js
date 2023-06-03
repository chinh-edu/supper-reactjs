import _ from 'lodash'
import { useState } from 'react';

const Question = (props) => {
    const { question, index, handleCheckBox } = props;

    if (_.isEmpty(question)) {
        return (<></>)
    }
    const handleHandleCheckBox = (event, aId, qId) => {
        handleCheckBox(aId, qId);
    }

    return (
        <>
            {question.image ?
                <div className="q-body-img">
                    <img src={`data:image/jpeg;base64,${question.image}`} />
                </div>
                :
                <div className="q-body-img"></div>
            }
            <div className="number-question">Question {index + 1}: {question.questionDescription}?</div>
            <div className="answer-select">
                {
                    question.answers && question.answers.length > 0 &&
                    question.answers.map((item) => {
                        return (
                            <div class="form-check" key={item.id}>
                                <input
                                    class="form-check-input"
                                    onChange={(event) => handleHandleCheckBox(event, item.id, question.questionId)}
                                    checked={item.isSelected}
                                    type="checkbox"
                                />
                                <label class="form-check-label">
                                    {item.description}
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