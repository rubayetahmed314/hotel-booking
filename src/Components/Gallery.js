import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import PhotoDetail from './PhotoDetail';
// import Room from './Room';
// import Loading from './Loading';
import axios from 'axios';
import { CardColumns, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

import { connect } from 'react-redux';

import { authCheck } from '../redux/authActionCreators';

// let roomArray = [];
const baseUrl = 'https://hotel-booking-8c03a-default-rtdb.firebaseio.com/';

const mapStateToProps = state => {
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

class Gallery extends Component {
    state = {
        selectedPhoto: null,
        modalOpen: false,
        category: {},
        roomDictionary: {},
    };

    importAll(r) {
        return r.keys().map(r);
    }

    onPhotoSelect = photo => {
        if (photo.isAvailable) {
            this.setState({
                selectedPhoto: photo,
                modalOpen: !this.state.modalOpen,
            });
        }
    };

    toggleModal = updateDictionaryAlso => {
        if (updateDictionaryAlso) {
            this.updateDictionary(true);
        } else {
            this.setState({
                modalOpen: !this.state.modalOpen,
            });
        }
    };

    updateDictionary = updateModalAlso => {
        let currentCategory = {};

        axios
            .get(
                baseUrl +
                    'categories.json?orderBy="name"&equalTo="' +
                    this.props.category +
                    '"'
            )
            .then(response => response.data)
            .then(categories => {
                // console.log('Category:', categories);
                for (let category in categories) {
                    currentCategory = {
                        ...categories[category],
                        key: category,
                    };
                }
                // console.log('Category Dict:', currentCategory);

                let roomDict = {};
                axios
                    .get(
                        baseUrl +
                            'rooms.json?orderBy="categoryName"&equalTo="' +
                            this.props.category +
                            '"'
                    )
                    .then(response => response.data)
                    .then(rooms => {
                        // console.log(rooms);
                        for (let room in rooms) {
                            roomDict = {
                                ...roomDict,
                                [rooms[room].id]: {
                                    ...rooms[room],
                                    key: room,
                                },
                            };
                        }
                        // console.log('Room Dict:', roomDict);

                        if (updateModalAlso) {
                            this.setState({
                                category: currentCategory,
                                roomDictionary: roomDict,
                                modalOpen: !this.state.modalOpen,
                            });
                        } else {
                            this.setState({
                                category: currentCategory,
                                roomDictionary: roomDict,
                            });
                        }
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    leaveRoom = (room, category) => {
        axios
            .patch(
                baseUrl +
                    'rooms/' +
                    room.key +
                    '.json?auth=' +
                    this.props.token,
                { bookedBy: 'none', isAvailable: true }
            )
            .then(response => {
                // console.log('Room Update:', response);

                axios
                    .patch(
                        baseUrl +
                            'categories/' +
                            category.key +
                            '.json?auth=' +
                            this.props.token,
                        {
                            roomsLeft: category.roomsLeft + 1,
                        }
                    )
                    .then(response => {
                        // console.log('Category Update:', response);
                        this.updateDictionary(false);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        // this.props.authCheck();
        // console.log('In Gallery: Component Mount ->', this.props.userId);

        this.updateDictionary(false);
    }

    componentDidUpdate() {
        // console.log(this.state);
        // console.log('Component Did Update:', roomArray);
        /* roomArray.forEach(room => {
            axios
                .post(baseUrl + 'rooms.json', room)
                .then(response => {
                    console.log('Room Response:', response);
                    return response.data.name;
                })
                .catch(error => console.log('Error:', error));
        }); */
    }

    render() {
        // console.log(`./images/${this.props.category}/`);
        // let path = `./images/${this.props.category}/`;
        // console.log(typeof path);
        // console.log('In Render:', this.props);

        if (this.props.location.state.fromHeader) {
            // console.log('I am from Header');
            this.props.location.state.fromHeader = false;
            this.updateDictionary(false);
        } else {
            // console.log('I am From Categories');
        }

        document.title = 'Gallery';
        let listOfImages = [];

        switch (this.props.category) {
            case 'toptier':
                listOfImages = this.importAll(
                    require.context(
                        `./images/toptier`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                );
                break;
            case 'midtier':
                listOfImages = this.importAll(
                    require.context(
                        `./images/midtier`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                );
                break;
            case 'lowtier':
                listOfImages = this.importAll(
                    require.context(
                        `./images/lowtier`,
                        false,
                        /\.(png|jpe?g|svg)$/
                    )
                );
                break;
            default:
                break;
        }

        // console.log(listOfImages);
        // roomArray = [];

        const rooms = listOfImages.map((photo, index) => {
            // console.log(typeof photo.default);

            let roomId = photo.default.split('/')[3].split('.')[1];
            let roomNumber = photo.default.split('/')[3].split('.')[0];
            let room = this.state.roomDictionary[roomId];
            // let category = this.state.categoryDictionary[this.props.category];
            // console.log(category);

            /* if (category) {
                roomArray.push(
                    new Room(
                        roomId,
                        roomNumber,
                        category.id,
                        category.name,
                        'Some short description here...',
                        true,
                        'none'
                    )
                );
            } */

            return (
                <PhotoItem
                    fromCategory={false}
                    userId={this.props.userId}
                    src={photo.default}
                    key={roomId}
                    name={roomNumber}
                    object={room}
                    PhotoSelect={() =>
                        this.onPhotoSelect({
                            ...this.state.roomDictionary[roomId],
                            categoryObj: this.state.category,
                            src: photo.default,
                        })
                    }
                    leaveRoom={() => this.leaveRoom(room, this.state.category)}
                />
            );
        });

        let roomDetail = null;
        if (this.state.selectedPhoto != null) {
            roomDetail = (
                <PhotoDetail
                    photo={this.state.selectedPhoto}
                    closeModal={() => this.toggleModal(true)}
                />
            );
        }
        return (
            <div className='container-fluid'>
                <h1
                    className='text-center mb-4'
                    style={{ textTransform: 'uppercase' }}
                >
                    Category:{' '}
                    <strong className='stylish'>{this.props.category}</strong>
                </h1>
                <div className='row'>
                    <CardColumns>{rooms}</CardColumns>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>{roomDetail}</ModalBody>
                        <ModalFooter>
                            <Button
                                color='secondary'
                                onClick={() => this.toggleModal(false)}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Gallery));
