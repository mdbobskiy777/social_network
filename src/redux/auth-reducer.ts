import {authAPI, ResultCodes, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./redux-store";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA';
const SET_SUBMIT_ERROR = "auth-reducer/SET_SUBMIT_ERROR"
const GET_CAPTCHA_URL_SUCCESS = "auth-reducer/GET_CAPTCHA_URL_SUCCESS"

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
    submitError: string | null
    captchaURL: string | null
}


type UserDataType = {
    type: typeof SET_USER_DATA
    data: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean | null
        submitError: string | null
    }
}
type SetAuthUserDataActionType = (userId: number | null, email: string | null,
                                  login: string | null, isAuth: boolean | null, submitError: string | null) => UserDataType

type GetCaptchaURILSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    url: string
}

type SetSubmitErrorActionType = {
    type: typeof SET_SUBMIT_ERROR
    text: string
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    submitError: "",
    captchaURL: null
}

export type ActionsTypes = SetSubmitErrorActionType | GetCaptchaURILSuccessActionType | UserDataType

export type ThunkType = ThunkAction<Promise<void>, AppStoreType, undefined, ActionsTypes>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_SUBMIT_ERROR:
            return {
                ...state,
                submitError: action.text
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaURL: action.url
            }
        default:
            return state;
    }
}

const setAuthUserData: SetAuthUserDataActionType = (userId,
                                                    email,
                                                    login,
                                                    isAuth,
                                                    submitError) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth, submitError}
})

const getCaptchaURLSuccess = (url: string): GetCaptchaURILSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    url
})

const setSubmitError = (text: string): SetSubmitErrorActionType => ({type: SET_SUBMIT_ERROR, text})


export const setAuth = (): ThunkType => async (dispatch) => {
    let data = await authAPI.auth()
    if (data.resultCode === ResultCodes.Success) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, email, login, true, ''))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
    let response = await authAPI.login({email, password, rememberMe, captcha})
    if (response.resultCode === 0) {
        dispatch(setAuth());
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
        dispatch(setSubmitError(response.messages[0]))
    }
}

export const getCaptchaURL = () :ThunkType => async dispatch => {
    let response = await securityAPI.getCaptchaURL()
    const captchaURL = response.url
    dispatch(getCaptchaURLSuccess(captchaURL))
}

export const logout = ():ThunkType => async dispatch => {
    let resultCode = await authAPI.logout()
    if (resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, ''));
    }
}
export default authReducer;