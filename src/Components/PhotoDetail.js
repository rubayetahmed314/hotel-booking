import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import CommentForm from './CommentForm';
import ColoredHR from './ColoredHR';

const PhotoDetail = props => {
    // console.log(props);
    return (
        <div>
            <Card style={{ marginTop: '10px' }}>
                <CardImg
                    top
                    src={props.photo.src}
                    alt={`Room No. ${props.photo.roomNumber}`}
                />
                <CardBody style={{ textAlign: 'left' }}>
                    <CardTitle
                        className='my-0 py-0'
                        style={{ textTransform: 'uppercase', fontSize: '24px' }}
                    >
                        Room No.{' '}
                        <strong className='stylish'>
                            {props.photo.roomNumber}
                        </strong>
                    </CardTitle>
                    <ColoredHR color='green' />
                    <strong>Short Description:</strong>
                    <p>{props.photo.shortDescription}</p>
                    <ColoredHR color='green' />
                    <CommentForm
                        room={props.photo}
                        closeModal={props.closeModal}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default withRouter(PhotoDetail);
