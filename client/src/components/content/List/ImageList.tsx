import React from 'react';
import {IFile} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";

interface IImageList {
  list: Array<IFile>
}

const ImageList = ({list}: IImageList) => {
  return (
    <div className="row">
      {list.map((file, index) => (
        <div key={index} className="col-12 col-lg-6 col-xl-4">
          <a href={getMediaFullPath(file.path)}>
            <img
              className="card-img-top"
              style={{border: '3px solid silver'}}
              src={getMediaFullPath(file.path)} alt="Card image cap"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageList;