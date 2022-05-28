import React from 'react';
import {useDispatch} from "react-redux";
import {DELETE_FILE} from "../../../store/fileReducer";

interface IFileCard {
  file: File
}

const FileCard = ({file}: IFileCard) => {
  const dispatch = useDispatch()

  const handleDeleteFileButton = () => {
    dispatch({
      type: DELETE_FILE,
      payload: {
        deletedFile: file
      }
    })
  }

  return (
    <div style={{display: "flex", padding: "10px"}}>
      <b style={{width: "100%", fontSize: "18pt"}}>{file.name}</b>
      <button className="btn btn-danger col-2" onClick={handleDeleteFileButton}>Удалить</button>
    </div>
  );
};

export default FileCard;