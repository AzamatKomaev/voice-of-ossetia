import {IComment} from "../interfaces";

export const ADD_COMMENTS = "ADD_COMMENTS";
export const HIDE_COMMENT = "HIDE_COMMENT";

interface ICommentReducerState {
  values: Array<IComment>
}

const defaultState: ICommentReducerState = {
  values: []
}

export const commentReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_COMMENTS:
      return {
        ...state,
        values: [...state.values, ...action.payload.addedComments]
      }
    case HIDE_COMMENT:
      return {
        ...state,
        values: state.values.filter((comment) => comment.id !== action.payload.hidedComment.id)
      }
    default:
      return state;
  }
}