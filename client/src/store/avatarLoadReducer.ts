const ADD_FILE = "ADD_FILE";

interface IAvatarLoadReducerState {
  file: File | null
}

const defaultState: IAvatarLoadReducerState = {
  file: null
}

export const avatarLoadReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_FILE:
      return {...state, file: action.payload.file};
    default:
      return state;
  }
}

export const addFileAction = (payload: {file: File}) => ({type: ADD_FILE, payload})
