const SEND_MESSAGE = 'my-app/dialogsReducer/SEND-MESSAGE'

type DialogsType = {
  id: number,
  name: string
}

type MessageType = {
  id: number,
  message: string
}

let initialState = {
  dialogsData: [
    { id: 1, name: 'Полина <3' },
    { id: 2, name: 'Мион' },
    { id: 3, name: 'Елизавета' },
    { id: 4, name: 'Анна' },
    { id: 5, name: 'Филя' },
  ] as Array<DialogsType>,

  messagesData: [
    { id: 1, message: 'Я счастлива!' },
    { id: 2, message: 'Как ты себя чувствуешь?' },
    { id: 3, message: 'Я Елизавета' },
    { id: 4, message: 'Я Анна' },
    { id: 5, message: 'Я Филя =(' },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: 6, message: action.newMessageBody },

        ],
      };
    }
    default:
      return state;
  }
};

type SendMessageActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
  messageId: number
}


export const sendMessage = (newMessageBody: string, messageId: number): SendMessageActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
  messageId,
});

export default dialogsReducer;
