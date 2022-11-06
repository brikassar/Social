import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import AddMessageForm from './AddMesageForm';
import {InitialStateType} from "../../Redux/dialogsReducer";

interface PropsType {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void,
    id: number
}

const Dialogs: React.FC<PropsType> = (props) => {

  console.log('DialogsReturn')

  let state = props.dialogsPage;


  let dialogsElements = state.dialogsData.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));

  let messagesElements = state.messagesData.map((message) => (
    <Message key={message.id} message={message.message} id={message.id} />
  ));


   console.log('renderMessage')
  return (

    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        {messagesElements}
        <div>
          <AddMessageForm sendMessage={props.sendMessage} />
        </div>
      </div>
    </div>
  );
};




export default Dialogs;
