import axios from '../utils/axiosCustomize.js';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
};

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
};

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
};

const deleteUsers = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } });
};
const getUserWithPaginateUsers = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 5000 })
};
const postRegistar = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username })
};
const getQuizByUser = () => {
    return axios.get(`/api/v1/quiz-by-participant`);
};
const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};
const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
};
const postQuizToSever = (name, description, difficulty, quizImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
};
const tableSocialQuiz = () => {
    return axios.get(`api/v1/quiz/all`);
};
// const deleteQuizToServer = (id) => {
//     return axios.delete(`api/v1/quiz/${id}`)
// }
const postCreateQuestionForQuiz = (quiz_id, description, questionImage) => {
    return axios.post(`api/v1/question`, {
        quiz_id, description, questionImage
    });
};
const postCreateAnswerForQuiz = (description, correct_answer, question_id) => {
    return axios.post(`api/v1/answer`, {
        description, correct_answer, question_id
    });
};
const postAssignQuizToUser = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`, {
        quizId, userId
    });
};
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
export {
    postCreateNewUser, putUpdateUser, deleteUsers, getUserWithPaginateUsers, postLogin,
    postRegistar, getQuizByUser, getDataQuiz, postSubmitQuiz, postQuizToSever, tableSocialQuiz,
    postCreateQuestionForQuiz, postCreateAnswerForQuiz, getAllUsers, postAssignQuizToUser, getQuizWithQA
} 