import React from 'react';
import classes from './MyPosts.module.css';
import AddUserPostForm from './MyPostsFormik';
import Post from './Post/Post';

const MyPosts = (props) => {

  console.log('RenderMyPost')

  let posts = [...props.postData]
    .reverse()
    .map((post) => (
      <Post
        key={post.id}
        id={post.id}
        likesCount={post.likesCount}
        postMessage={post.message}
      />
    ));





  return (

    <div className={classes.postBlock}>
      <div className={classes.messagesBlock}>
        <div>Add post:</div>
        <AddUserPostForm addPost={props.addPost} />
      </div>
      {posts}
    </div>
  );
};




export default MyPosts;
