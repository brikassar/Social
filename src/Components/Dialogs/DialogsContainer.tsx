import {actions} from '../../Redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {compose} from 'redux';
import {selectDialogsPage} from '../../Redux/Selectors/dialogsSelector';
import {selectIsAuth} from "../../Redux/Selectors/authSelector";
import {AppStateType} from "../../Redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: selectDialogsPage(state),
        isAuth: selectIsAuth(state),
    };

};



export default compose(connect(mapStateToProps, {sendMessage: actions.sendMessage}), withAuthRedirect)(Dialogs)


