import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import defaultUserPhoto from '../../../assets/images/defaultUserPhoto.jpg';
import ProfileStatusHook from './ProfileStatus/ProfileStatusHook';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileInfoForm from "./ProfileInfoForm";

const ProfileInfo = ({profile, profileStatus, updateProfileStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) ;
        savePhoto(e.target.files[0])
    }

    return (
        <div className={classes.profileInfo}>
            <div className={classes.descriptionBlock}>
                {/*Avatar*/}
                <img src={profile.photos.large != null ? profile.photos.large : defaultUserPhoto}
                     alt='noPhoto'/>
                {/*changeAvatarButton*/}
                {isOwner && <input className={classes.updateProfileButtonActive} type={'file'} accept='image/*'
                                   onChange={onMainPhotoSelected}/>}
                {/*Status*/}
                <ProfileStatusHook isOwner={isOwner} profileStatus={profileStatus}
                                   updateProfileStatus={updateProfileStatus}/>
                {/*Other Information*/}
                {editMode
                    ? <ProfileInfoForm setEditMode={setEditMode} saveProfile={saveProfile} profile={profile}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
            </div>
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (

        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div><b>Full Name</b>: {profile.fullName} </div>

            <div><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'} </div>

            {profile.lookingForAJob &&
            <div><b>My professional skills</b>: {profile.lookingForAJobDescription} </div>}

            <div><b>About me</b>: {profile.aboutMe} </div>

            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact  key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>)
}


export const Contact = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}


export default ProfileInfo;
