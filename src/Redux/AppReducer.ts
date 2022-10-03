import {getAuthUsersData} from './authReducer';

const INITIALIZED_SUCCESS = 'my-app/AppReducer/INITIALIZED_SUCCESS';

export type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false,
};

const AppReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            };
        }

        default:
            return state;
    }
};

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUsersData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
};

export default AppReducer;
