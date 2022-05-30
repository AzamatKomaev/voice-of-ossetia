import React from 'react';
import {IFile} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";

interface IImageList {
  list: Array<IFile>
}

const ImageList = ({list}: IImageList) => {
  return (
    <div className="row">
      {list.map(file => (
        <div className="col-12 col-xl-4">
          <img className="card-img-top" src={getMediaFullPath(file.path)} alt="Card image cap"/>
        </div>
      ))}
    </div>
  );
};

export default ImageList;