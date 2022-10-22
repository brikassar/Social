import React from 'react'
import {connect} from 'react-redux'
import {requestUsers, follow, unfollow} from '../../Redux/usersReducer'
import Users from './Users'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import {compose} from 'redux';
import Preloader from "../Common/Preloader/Preloader"
import {
    selectPageSize,
    superSelectUsers,
    selectTotalUsersCount,
    selectCurrentPage,
    selectIsFetching,
    selectFollowingInProgress
} from '../../Redux/Selectors/userSelectors'
import {UsersType} from "../../types/types";
import {AppStateType} from "../../Redux/reduxStore";


type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage?: any;
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }


    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
        this.props.setCurrentPage(pageNumber);
    }


    render() {

        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}

            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
        </>
    };
};


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    console.log('mapStateToProps Users')

    return {
        users: superSelectUsers(state),
        totalUsersCount: selectTotalUsersCount(state),
        pageSize: selectPageSize(state),
        currentPage: selectCurrentPage(state),
        isFetching: selectIsFetching(state),
        followingInProgress: selectFollowingInProgress(state),
    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        unfollow,
        follow,
        getUsers: requestUsers,


    }),
    withAuthRedirect)
(UsersContainer);


