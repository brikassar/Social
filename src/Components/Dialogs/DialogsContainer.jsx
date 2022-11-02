import {actions} from '../../Redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {compose} from 'redux';
import {selectDialogsPage} from '../../Redux/Selectors/dialogsSelector';
import {selectIsAuth} from "../../Redux/Selectors/authSelector";

let mapStateToProps = (state) => {
    return {
        dialogsPage: selectDialogsPage(state),
        isAuth: selectIsAuth(state),
    };

};



export default compose(connect(mapStateToProps, {sendMessage: actions.sendMessage}), withAuthRedirect)(Dialogs)


