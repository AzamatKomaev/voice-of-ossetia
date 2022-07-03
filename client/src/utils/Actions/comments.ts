import {IComment} from "../../interfaces";
import {AnyAction, Dispatch} from "redux";
import {addCommentsAction, hideCommentAction} from "../../store/commentReducer";

export const addComments = (comments: IComment[]): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(addCommentsAction({addedComments: comments}))
  }
}

export const hideComment = (commentId: number): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(hideCommentAction({hidedCommentId: commentId}))
  }
}
