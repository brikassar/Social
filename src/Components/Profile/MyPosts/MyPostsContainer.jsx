import { connect } from 'react-redux';
import {actions} from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText,
  };
};



const MyPostsContainer = connect(mapStateToProps, { addPost: actions.addPost })(MyPosts);

export default MyPostsContainer;
