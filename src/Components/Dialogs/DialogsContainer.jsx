// import React from 'react';
import { sendMessage } from '../../Redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { selectIsAuth } from '../../Redux/Selectors/authSelector';
import { selectDialogsPage } from '../../Redux/Selectors/dialogsSelector';

let mapStateToProps = (state) => {
  return {
    dialogsPage: selectDialogsPage(state),
    isAuth: selectIsAuth(state),
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: (newMessageBody) => {
//       dispatch(sendMessage(newMessageBody));
//     },
//   };
// };


export default compose(connect(mapStateToProps, { sendMessage }), withAuthRedirect)(Dialogs)


