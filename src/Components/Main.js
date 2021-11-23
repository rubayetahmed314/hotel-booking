import React, { Component } from 'react';
import Header from './Header/Header';
import ScrollToTopButton from './ScrollToTopButton';
import Gallery from './Gallery';
import Categories from './Categories';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { authCheck } from '../redux/authActionCreators';

const mapStateToProps = state => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    };
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.props.authCheck();
    }
    /* componentDidMount() {
        this.props.authCheck();
    } */

    render() {
        let loginRoute,
            middleRoutes,
            logoutRoute = null;
        // let header = null;
        if (this.props.token === null) {
            loginRoute = <Route path='/login' exact component={Auth} />;
        } else {
            // console.log('ELSE!');
            loginRoute = (
                <Switch>
                    <Redirect from='/login' to='/' exact />
                </Switch>
            );
        }

        middleRoutes = (
            <Switch>
                <Route
                    path='/photos/toptier'
                    exact
                    render={() => <Gallery category='toptier'></Gallery>}
                />
                <Route
                    path='/photos/midtier'
                    exact
                    render={() => <Gallery category='midtier'></Gallery>}
                />
                <Route
                    path='/photos/lowtier'
                    exact
                    render={() => <Gallery category='lowtier'></Gallery>}
                />
                <Route path='/' exact component={Categories} />
            </Switch>
        );

        logoutRoute = <Route path='/logout' exact component={Logout} />;
        // header = <Route path='/' component={Header} />;

        return (
            <div>
                <Header />
                {/* {header} */}
                <div className='container-fluid px-md-4'>
                    {loginRoute}
                    {middleRoutes}
                    {logoutRoute}
                </div>
                <ScrollToTopButton />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
