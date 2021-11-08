import React, {Component, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]
        )

    const activateEditMode = () => {
        if (props.profile.userId === props.userId) {
            setEditMode(true);
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
            <div className={s.status}>
                { !editMode &&
                <div className={s.profile_status}>
                    <span onDoubleClick={activateEditMode}> {props.status || "-----"}</span>
                </div>}
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                           value={status}/>
                </div>}
            </div>
        )
}

export default ProfileStatusWithHooks;