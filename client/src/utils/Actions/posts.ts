import {AnyAction, Dispatch} from "redux";
import {IPost} from "../../interfaces";
import {addPostsAction, hidePostAction} from "../../store/postReducer";

export const addPosts = (posts: IPost[]): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(addPostsAction({addedPosts: posts}))
  }
}

export const hidePost = (postId: number): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(hidePostAction({hidedPostId: postId}))
  }
}
