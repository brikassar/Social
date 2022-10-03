import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';

let store = {
  _state: {
    dialogsPage: {
      dialogsData: [
        { id: 1, name: 'Алиса' },
        { id: 1, name: 'Мион' },
        { id: 1, name: 'Елизавета' },
        { id: 1, name: 'Анна' },
        { id: 1, name: 'Филя' },
      ],

      messagesData: [
        { id: 1, message: 'Я счастлива!' },
        { id: 1, message: 'Как ты себя чувствуешь?' },
        { id: 1, message: 'Я Елизавета' },
        { id: 1, message: 'Я Анна' },
        { id: 1, message: 'Я Филя =(' },
      ],

      newMessageBody: '',
    },

    profilePage: {
      postData: [
        { id: 1, message: 'Wow. This is amazing!', likesCount: 228 },
        { id: 2, message: 'What is love?', likesCount: 14 },
        { id: 3, message: 'Елизавета', likesCount: 228 },
        { id: 4, message: 'Филя', likesCount: 228 },
        { id: 5, message: 'Анна', likesCount: 228 },
        { id: 6, message: 'Я охочусь на Филю', likesCount: 228 },
      ],

      newPostText: '',
    },

    sidebar: {},
  },

  _callSubscriber() {
    console.log('Я');
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.side = sidebarReducer(this._state.side);
    this._callSubscriber(this._state);
  },
};

export default store;

window.store = store;
