import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, userImage) => {
    return axios.post(`api/v1/participant`, { email, password, username, role, userImage });
};
const getAllUser = () => {
    return axios.get(`api/v1/participant/all`);
}
export { postCreateNewUser, getAllUser };