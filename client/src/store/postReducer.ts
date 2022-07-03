import {IPost} from "../interfaces";

export const ADD_POSTS = "ADD_POSTS";
export const HIDE_POST = "HIDE_POST";

interface IPostReducerState {
  values: Array<IPost>
}

const defaultState: IPostReducerState = {
  values: []
}

export const postReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        values: [...state.values, ...action.payload.addedPosts],
      }
    case HIDE_POST:
      return {
        ...state,
        values: state.values.filter((post) => post.id !== action.payload.hidedPostId)
      }
    default:
      return state;
  }
}

export const addPostsAction = (payload: {addedPosts: IPost[]}) => ({type: ADD_POSTS, payload})
export const hidePostAction = (payload: {hidedPostId: number}) => ({type: HIDE_POST, payload})
