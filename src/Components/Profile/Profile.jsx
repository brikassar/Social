import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = React.memo((props) => {


    return (
        <main className={classes.main}>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={!props.router.params.userId}
                profile={props.profile}
                profileStatus={props.profileStatus}
                updateProfileStatus={props.updateProfileStatus}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </main>
    );
});

export default Profile;
