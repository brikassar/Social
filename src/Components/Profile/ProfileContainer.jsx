import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Profile from './Profile'
import {
    getUserProfile,
    getProfileStatus,
    updateProfileStatus,
    savePhoto, saveProfile,
} from '../../Redux/profileReducer';
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {compose} from 'redux';
import {selectProfile, selectProfileStatus} from '../../Redux/Selectors/profileSelector';
import {selectIsAuth} from '../../Redux/Selectors/authSelector';


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />

        );

    };

    return ComponentWithRouterProp;
};

class ProfileContainer extends PureComponent {


    refreshProfile() {
        let userId = this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
        }

        this.props.getUserProfile(userId);

        this.props.getProfileStatus(userId);

    }


    componentDidMount() {
        this.refreshProfile()
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('ComponentDidUpdate')

        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.refreshProfile();

        }

    };


    render() {
        console.log('renderProfileContainer')

        return <Profile {...this.props}
            />

    };

};


let mapStateToProps = (state) => ({
    profile: selectProfile(state),
    profileStatus: selectProfileStatus(state),
    authorizedUserId: state.auth.userId,
    isAuth: selectIsAuth(state),
});


export default compose(
    connect(mapStateToProps, {getUserProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


