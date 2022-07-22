import {IPost} from "../interfaces";

const ADD_POSTS = "ADD_POSTS";
const HIDE_POST = "HIDE_POST";
export const CLEAR_POSTS = "CLEAR_POSTS"

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
    case CLEAR_POSTS:
      return {
        ...state, values: []
      }
    default:
      return state;
  }
}

export const addPostsAction = (payload: {addedPosts: IPost[]}) => ({type: ADD_POSTS, payload})
export const hidePostAction = (payload: {hidedPostId: number}) => ({type: HIDE_POST, payload})
export const clearPostsAction = () => ({type: CLEAR_POSTS})
