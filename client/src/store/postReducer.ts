import {IPost} from "../interfaces";

export const ADD_POSTS = "ADD_POSTS";
export const HIDE_POST = "HIDE_POST";

interface IPostReducerState {
  values: Array<IPost>,
  nextPage: string | null
}


const defaultState: IPostReducerState = {
  values: [],
  nextPage: null
}

export const postReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        values: [...state.values, ...action.payload.addedPosts],
        nextPage: action.payload.nextPage
      }
    case HIDE_POST:
      return {
        ...state,
        values: state.values.filter((post) => post.id !== action.payload.hidedPost.id)
      }

    default:
      return state;
  }
}
