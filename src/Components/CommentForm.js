import React, { Component } from 'react';
import { Form, Button, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { authCheck } from '../redux/authActionCreators';

const mapStateToProps = state => {
    // console.log('Token:', state.token);
    return {
        token: state.token,
        userId: state.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    };
};

const baseUrl = 'https://hotel-booking-8c03a-default-rtdb.firebaseio.com/';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobileNo: '',
            nameError: false,
            mobileNoError: false,
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        /* this.props.addComment(
            this.props.photoId,
            this.state.rating,
            this.state.author,
            this.state.comment,
            this.props.token
        ); */

        /* console.log('Before Update:', this.state);
        console.log(
            'Error:',
            !/^(\+?88)?01[0-9]{9}$/.test(this.state.mobileNo)
        ); */

        this.setState({
            nameError:
                !/^[A-Za-z][A-Za-z0-9 ]+/.test(this.state.name) ||
                this.state.name.length > 50,
            mobileNoError: !/^(\+?88)?01[0-9]{9}$/.test(this.state.mobileNo),
        });

        setTimeout(() => {
            if (!(this.state.nameError || this.state.mobileNoError)) {
                axios
                    .patch(
                        baseUrl +
                            'rooms/' +
                            this.props.room.key +
                            '.json?auth=' +
                            this.props.token,
                        { bookedBy: this.props.userId, isAvailable: false }
                    )
                    .then(response => {
                        // console.log(response);

                        this.setState({
                            name: '',
                            mobileNo: '',
                            nameError: false,
                            mobileNoError: false,
                        });

                        axios
                            .patch(
                                baseUrl +
                                    'categories/' +
                                    this.props.room.categoryObj.key +
                                    '.json?auth=' +
                                    this.props.token,
                                {
                                    roomsLeft:
                                        this.props.room.categoryObj.roomsLeft -
                                        1,
                                }
                            )
                            .then(response => {
                                // console.log(response);
                                this.props.closeModal();
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
            }
        }, 500);

        event.preventDefault();
    };

    componentDidMount() {
        // this.props.authCheck();
        // console.log(this.props);
    }

    componentDidUpdate() {
        // console.log('AFTER Update:', this.state);
    }

    render() {
        // console.log('In Comment Form props:', this.props);
        let button = null;
        button = (
            <Button type='submit' className='btn btn-info'>
                Book Room
            </Button>
        );

        let nameAlert = null,
            mobileNoAlert = null;
        if (this.state.nameError) {
            nameAlert = (
                <div className='text-danger mb-n3'>
                    <strong>Provide a Valid Name</strong>
                </div>
            );
        }
        if (this.state.mobileNoError) {
            mobileNoAlert = (
                <div className='text-danger mb-n3'>
                    <strong>Provide a Valid Mobile No.</strong>
                </div>
            );
        }

        let form = (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    type='text'
                    name='name'
                    value={this.state.name}
                    placeholder='Your Name'
                    onChange={this.handleInputChange}
                    required
                />
                {nameAlert}
                <br />
                <Input
                    type='text'
                    name='mobileNo'
                    value={this.state.mobileNo}
                    placeholder='11 Digit Mobile Number'
                    onChange={this.handleInputChange}
                    required
                />
                {mobileNoAlert}
                <br />
                {button}
            </Form>
        );

        let alert = (
            <Alert color='danger'>
                <strong>You MUST Login first to book this room</strong>
            </Alert>
        );
        return <div>{this.props.token == null ? alert : form}</div>;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CommentForm));
