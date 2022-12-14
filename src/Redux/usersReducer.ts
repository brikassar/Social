import {updateObjectInArray} from "../Utils/ObjectHelpers"
import {UsersType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./reduxStore"
import {usersAPI} from "../api/usersAPI";
import {Dispatch} from "redux";
import {APIResponseType, ResultCodeEnum} from "../api/api";

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //  Array of users ID
}


type ActionTypes = InferActionsTypes<typeof actions>


const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'my-app/usersReducer/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case 'my-app/usersReducer/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case 'my-app/usersReducer/SET_USERS': {
            return {...state, users: action.users}
        }

        case 'my-app/usersReducer/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }

        case 'my-app/usersReducer/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }

        case 'my-app/usersReducer/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }

        case 'my-app/usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS': {
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
}


export const actions = {
    followSuccess: (userId: number) => ({type: 'my-app/usersReducer/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'my-app/usersReducer/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'my-app/usersReducer/SET_USERS', users} as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'my-app/usersReducer/TOGGLE_IS_FETCHING',
        isFetching,
    } as const),

    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'my-app/usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId,
    } as const),

// setCurrentPage and make it bold
    setCurrentPage: (currentPage: number) => ({
        type: 'my-app/usersReducer/SET_CURRENT_PAGE',
        currentPage,
    } as const),

    setUsersTotalCount: (totalUsersCount: number) => ({
        type: 'my-app/usersReducer/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount,
    } as const)

}



//thunk getUsers when you clicked on number
export const requestUsers = (pageNumber: number, pageSize: number): ThunkType => {
    return async (dispatch) => {

        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(pageNumber));
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersTotalCount(data.totalCount))

    };
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}

//thunk follow-on users page
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    };
};

//thunk unfollow on users page
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    };
};


export default usersReducer;
