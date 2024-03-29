import React, {Component, Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainerWithHooks = React.lazy(() => import('./components/Profile/ProfileContainerWithHooks'));

class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='box'>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                            <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                            {/*<Route exact path='/profile' render={ withSuspense(ProfileContainerWithHooks)}/>*/}
                            {/*<Route path='/profile/:userId' render={ withSuspense(ProfileContainerWithHooks) }/>*/}
                            <Route path='/profile/:userId?' render={withSuspense(ProfileContainerWithHooks)}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/users' render={() => <UsersContainer pageTitle={"Самураи"}/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);

const SamuraiJSApp = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp;

