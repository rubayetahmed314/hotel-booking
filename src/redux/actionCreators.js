/* import axios from 'axios';
import * as actionTypes from './actionTypes';
const baseUrl = 'https://hotel-booking-8c03a-default-rtdb.firebaseio.com/';

export const addComment =
    (photoId, rating, author, comment, token) => dispatch => {
        const newComment = {
            photoId: photoId,
            author: author,
            rating: rating,
            comment: comment,
        };
        newComment.date = new Date().toISOString();

        axios
            .post(baseUrl + 'comments.json?auth=' + token, newComment)
            .then(response => {
                // console.log(response);
                return response.data.name;
            })
            .then(key => dispatch(commentConcat(newComment, key)));
    };

export const commentConcat = (comment, key) => ({
    type: actionTypes.ADD_COMMENT,
    payload: { comment, key },
});

export const commentLoading = () => ({
    type: actionTypes.COMMENT_LOADING,
});

export const loadComments = comments => ({
    type: actionTypes.LOAD_COMMENTS,
    payload: comments,
});

export const fetchComments = () => dispatch => {
    dispatch(commentLoading());

    axios
        .get(baseUrl + 'comments.json')
        .then(response => response.data)
        .then(comments =>
            dispatch(loadComments(comments == null ? [] : comments))
        );
};
 */
