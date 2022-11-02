import './App.css';
import React, {lazy, Suspense} from 'react';
import Nav from './Components/Nav/Nav';
import { HashRouter, Route, Routes} from 'react-router-dom';
import HeaderContainer from './Components/Header/HeaderContainer';
import {connect, Provider} from 'react-redux';
import { initializeApp } from './Redux/AppReducer';
import Preloader from './Components/Common/Preloader/Preloader';
import store from "./Redux/reduxStore";
import {compose} from "redux";
// import UsersContainer from './Components/Users/UsersContainer'; I saved it to compare with Lazy import


const DialogsContainer = lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./Components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('./Components/Users/UsersContainer'));
const LoginContainer = lazy(() => import('./Components/Login/LoginContainer'));
const News = lazy(() => import('./Components/News/News'));




class App extends React.Component {
  catchAllUnhandledErrors = () => {
    alert('Some error occurred');

  }


  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader />;
    // if (this.props.router.location.pathname === '/')
    //   return <Navigate to='/login' />;

    return (
      <div>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Nav />

          <div className='app-wrapper-content'>

            <Suspense fallback={<div>Preloader</div>}>
            <Routes>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/profile/' element={<ProfileContainer />} />
              <Route path='/news/' element={<News />} />
              <Route path='/users' element={<UsersContainer pageTitle={'Genshin'}/>} />
              <Route path='/login' element={<LoginContainer />} />
              <Route path='/' element={<LoginContainer />} />
              <Route path='*' element={<div>404 NOT FOUND</div>} />
            </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(

 connect(mapStateToProps, { initializeApp })) (App);

const MainApp = () => {
return (
  <HashRouter >
  <Provider store={store}>
    <AppContainer/>
  </Provider>
</HashRouter>
)
}

export default MainApp;