import {usersAPI} from '../api/api'
import {updateObjectInArray} from "../Utils/ObjectHelpers"
import {UsersType} from "../types/types";
import {AppStateType} from "./reduxStore";
import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


const UNFOLLOW = 'my-app/usersReducer/UNFOLLOW'
const FOLLOW = 'my-app/usersReducer/FOLLOW'
const SET_USERS = 'my-app/usersReducer/SET-USERS'
const SET_TOTAL_USERS_COUNT = 'my-app/usersReducer/SET_TOTAL_USERS_COUNT'
const SET_CURRENT_PAGE = 'my-app/usersReducer/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'my-app/usersReducer/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-app/usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //  Array of users ID
}

type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            };
        }
        default:
            return state
    }
};



type ActionTypes =
    FollowSuccessActionType
    | UnfollowSuccessActionType
    | SetUsersActionType
    | ToggleIsFetchingActionType
    |
    ToggleIsFetchingInProgressActionType
    | SetCurrentPageActionType
    | SetUsersTotalCountActionType

type FollowSuccessActionType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})
type UnfollowSuccessActionType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})
type SetUsersActionType = { type: typeof SET_USERS, users: Array<UsersType> }
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users})

type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});

type ToggleIsFetchingInProgressActionType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleIsFetchingInProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});

// setCurrentPage and make it bold
type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

type SetUsersTotalCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, count: number }
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
});


type getStateType = () => AppStateType;
type dispatchType = Dispatch<ActionTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


//thunk getUsers when you clicked on number
export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState: getStateType) => {

        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))

    };
};

const _followUnfollowFlow = async (dispatch: dispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) =>
    FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const resultCode = await apiMethod(userId)
    if (resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
};


//thunk unfollow on users page
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    };
};

//thunk follow on users page
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    };
};

export default usersReducer;
