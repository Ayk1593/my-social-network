import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import s from './Dialogs.module.css';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

    let state = props.store.getState().dialogsPage;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator() )
    }

    let onNewMessageChange = (body) => {
        let action = updateNewMessageBodyCreator(body);
        props.store.dispatch(action)
    }

    return (<Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                     dialogsPage={state}/>)
}

export default DialogsContainer;