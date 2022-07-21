import React from 'react';
import {useDispatch} from "react-redux";
import {DELETE_FILE} from "../../../store/fileReducer";
import {getMediaFullPath} from "../../../api/media";

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
      <b style={{width: "100%", fontSize: "13pt"}}>{file.name}</b>
      <br/>
      {!file?.type.includes('image')
        ? <small className="text-danger">Файл не валиден!</small>
        : <small className="text-primary">Файл валиден.</small>
      }
      <button className="default-button" onClick={handleDeleteFileButton}>
        <img width={50} alt="x-button" src={getMediaFullPath('public/x_close_cross_delete_icon_159748.png')}/>
      </button>
    </div>
  );
};

export default FileCard;