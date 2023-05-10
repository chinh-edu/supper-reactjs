export const FEATCH_USER_LOGIN_SUCCESS = 'FEATCH_USER_LOGIN_SUCCESS';

export const doLogin = (res) => {
    return {
        type: FEATCH_USER_LOGIN_SUCCESS,
        payload: res
    }
}