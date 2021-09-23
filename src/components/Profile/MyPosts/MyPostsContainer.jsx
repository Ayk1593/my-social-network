import React, {Component} from 'react';
import {addPost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import Dialogs from "../../Dialogs/Dialogs";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             dispatch(updateNewPostTextCreator(text));
//         },
//         addPost: () => {
//             dispatch(addPostCreator());
//         }
//     }
// }

const MyPostsContainer = connect(mapStateToProps, {
    addPost
})(MyPosts);

export default MyPostsContainer;