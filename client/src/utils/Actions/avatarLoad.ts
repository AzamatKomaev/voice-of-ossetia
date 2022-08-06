import {AnyAction, Dispatch} from "redux";
import {addFileAction} from "../../store/avatarLoadReducer";

export const addFile = (avatar: File): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(addFileAction({file: avatar}))
  }
}
