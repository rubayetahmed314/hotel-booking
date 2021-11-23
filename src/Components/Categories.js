import React, { Component } from 'react';
import { CardColumns } from 'reactstrap';
import PhotoItem from './PhotoItem';
// import Category from './Category';
import axios from 'axios';
// import UploadImage from './UploadImage';
// import ReactDOM from 'react-dom';

// let categoryArray = [];
const baseUrl = 'https://hotel-booking-8c03a-default-rtdb.firebaseio.com/';

class Categories extends Component {
    constructor(props) {
        super(props);
        // console.log('From Categories:', this.props);
        this.state = {
            dictionary: {},
        };
    }
    importAll(r) {
        return r.keys().map(r);
    }

    onPhotoSelect(category) {
        this.props.history.push(`/photos/${category}`, { fromHeader: false });

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    componentDidMount() {
        // let finalObject = { ...categoryArray };
        // console.log('Final Object:', finalObject);

        /* categoryArray.forEach(category => {
            axios
                .post(
                    baseUrl + 'categories.json',
                    category
                )
                .then(response => {
                    console.log('Response:', response);
                    return response.data.name;
                })
                .catch(error => console.log('Error:', error));
        }); */

        let dict = {};
        axios
            .get(baseUrl + 'categories.json')
            .then(response => response.data)
            .then(categories => {
                // console.log(categories);
                for (let category in categories) {
                    dict = {
                        ...dict,
                        [categories[category].id]: {
                            ...categories[category],
                            key: category,
                        },
                    };
                }
                // console.log('Dict:', dict);
                this.setState({
                    dictionary: dict,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        const listOfImages = this.importAll(
            require.context('./images/categories/', false, /\.(png|jpe?g|svg)$/)
        );

        // console.log(listOfImages);
        // categoryArray = [];
        const categories = listOfImages.map((photo, index) => {
            // console.log(typeof photo.default);
            let categoryId = photo.default.split('/')[3].split('.')[1];
            let categoryName = photo.default.split('/')[3].split('.')[0];
            // console.log(categoryName, categoryId);

            /* categoryArray.push(
                new Category(categoryId, categoryName, index + 1, 9)
            ); */

            return (
                <PhotoItem
                    fromCategory={true}
                    src={photo.default}
                    key={categoryId}
                    name={categoryName}
                    object={this.state.dictionary[categoryId]}
                    PhotoSelect={() => this.onPhotoSelect(categoryName)}
                />
            );
        });

        return (
            <div>
                <h1 className='text-center stylish mb-4'>Categories</h1>
                <CardColumns>{categories}</CardColumns>
            </div>
        );
    }
}

export default Categories;
