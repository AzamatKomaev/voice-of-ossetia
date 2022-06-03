export const ADD_FILES = 'ADD_FILES';
export const DELETE_FILE = 'DELETE_FILE';

interface IFileReducerState {
  values: Array<File | null>
}

interface IFileReducerAction {
  type: string,
  payload: {
    addedFiles?: Array<File>,
    deletedFile?: File
  }
}

const defaultState: IFileReducerState = {
  values: []
}

export const fileReducer = (state = defaultState, action: IFileReducerAction) => {
  switch (action.type) {
    case ADD_FILES:
      if (action.payload.addedFiles) {
        return {...state, values: [...state.values, ...action.payload.addedFiles]}
      }
      return state;
    case DELETE_FILE:
      return {
        ...state,
        values: state.values.filter(file => file !== action.payload.deletedFile)
      }
    default:
      return state
  }
}