import React, { useState } from 'react';
import AddUserPostForm from './ProfileStatusForm';



const ProfileStatusHook = (props) => {

    let [editMode, setEditMode] = useState(false);



    // on Double Click show textarea
    const activateEditMode = () => {
       props.isOwner && setEditMode(true)
    }

    // when unfocused hide a textarea
    const deactivateEditMode = () => {
       props.isOwner && setEditMode(false)
    }



    console.log('Status render')
    return (
        <div>
            {!editMode &&

                <div> <b>Status:</b>
                    <span onDoubleClick={activateEditMode}> {props.profileStatus || 'MeowStatus'} </span>
                </div>
            }

            {editMode &&
                <div  >
                    <AddUserPostForm onBlur={deactivateEditMode} profileStatus={props.profileStatus} updateProfileStatus={props.updateProfileStatus} deactivateEditMode={deactivateEditMode} />
                </div>
            }
        </div >
    )
}


export default ProfileStatusHook;










