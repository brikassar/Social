import {getAuthUsersData} from './authReducer';
import {InferActionsTypes} from "./reduxStore";

export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>

let initialState = {
    initialized: false,
};

const AppReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'my-app/AppReducer/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess: () => ({type: 'my-app/AppReducer/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUsersData());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default AppReducer;
