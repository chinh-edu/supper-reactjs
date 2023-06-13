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

// const getAllUsers = () => {
//     return axios.get('api/v1/participant/all');
// };

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUsers = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } });
};
const getUserWithPaginateUsers = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 5000 })
}
const postRegistar = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username })
}
const getQuizByUser = () => {
    return axios.get(`/api/v1/quiz-by-participant`);
}
const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}
const postQuizToSever = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
}
const tableSocialQuiz = () => {
    return axios.get(`api/v1/quiz/all`);
}
// const deleteQuizToServer = (id) => {
//     return axios.delete(`api/v1/quiz/${id}`)
// }
export { postCreateNewUser, putUpdateUser, deleteUsers, getUserWithPaginateUsers, postLogin, postRegistar, getQuizByUser, getDataQuiz, postSubmitQuiz, postQuizToSever, tableSocialQuiz } 