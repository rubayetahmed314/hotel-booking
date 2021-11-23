import React from 'react';
import dateFormat from 'dateformat';
import Loading from './Loading';
// import ColoredHR from './ColoredHR';

const LoadComments = props => {
    if (props.commentIsLoading) {
        return <Loading />;
    } else {
        return props.comments.length === 0 ? (
            <div>No comments on this photo yet. Be the first to comment!</div>
        ) : (
            props.comments.map(comment => {
                return (
                    <div
                        key={comment.id}
                        style={{
                            border: '2px solid grey',
                            borderRadius: '5px',
                        }}
                        className='my-3 py-1 px-2'
                    >
                        {/* <ColoredHR color='#0e0918' /> */}
                        <h5>
                            <strong>{comment.author}</strong> says:
                        </h5>
                        <p>{comment.comment}</p>
                        <p>Rating: {comment.rating}</p>
                        <p className='mb-0'>
                            {dateFormat(
                                comment.date,
                                'dddd, mmmm dS, yyyy, h:MM TT'
                            )}
                        </p>
                        {/* <ColoredHR color='#0e0918' /> */}
                    </div>
                );
            })
        );
    }
};

export default LoadComments;
