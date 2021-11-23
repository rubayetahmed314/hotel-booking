import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    // isLoading: true,
    // comments: [],
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /* case actionTypes.LOAD_COMMENTS:
            // console.log(action.payload);
            return {
                ...state,
                isLoading: false,
                comments: action.payload,
            };

        case actionTypes.COMMENT_LOADING:
            return {
                ...state,
                isLoading: true,
                comments: [],
            };

        case actionTypes.ADD_COMMENT:
            let comment = action.payload.comment;
            let key = action.payload.key;
            console.log(comment);
            return {
                ...state,
                comments: { ...state.comments, [key]: comment },
            }; */

        //Auth Cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                authFailedMsg: null,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                authFailedMsg: null,
                token: null,
                userId: null,
            };
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
                authFailedMsg: null,
            };
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            };
        default:
            return state;
    }
};
