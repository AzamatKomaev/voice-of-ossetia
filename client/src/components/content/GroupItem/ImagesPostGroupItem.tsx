import React from 'react';
import {IFile} from "../../../interfaces";
import ImageList from "../List/ImageList";
import {getMediaFullPath} from "../../../api/media";

interface IImagesPostGroupItem {
  postFiles: IFile[],
  isDetail: boolean
}

const ImagesPostGroupItem = ({postFiles, isDetail}: IImagesPostGroupItem) => {
  return (
    <div>
      {isDetail ?
        postFiles.length > 0 &&
          <div style={{padding: "15px"}}>
              <ImageList list={postFiles}/><br/>
          </div>
        :
        postFiles.length > 0 &&
          <img
              style={{border: '3px solid silver'}}
              className="card-img-top"
              src={getMediaFullPath(postFiles[0].path)}
              alt={postFiles[0].path}
          />
      }
    </div>
  );
};

export default ImagesPostGroupItem;