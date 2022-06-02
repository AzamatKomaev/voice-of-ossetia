import React from 'react';
import {IComment} from "../../../interfaces";
import PostCard from "../Card/PostCard";
import CommentCard from "../Card/CommentCard";

interface ICommentList {
  list: Array<IComment> | boolean | undefined
}

const CommentList = ({list}: ICommentList) => {
  return (
    <div>
      {typeof list === 'object'
        ?
        list.map((comment, index) => (
          <div key={index}>
            <CommentCard comment={comment}/><br/>
          </div>
        ))
        :
        null
      }
    </div>
  );
};

export default CommentList;