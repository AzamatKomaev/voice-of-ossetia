import React, {useEffect, useState} from 'react';
import CommentCard from "../Card/CommentCard";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";
import {IComment} from "../../../interfaces";


const CommentList = () => {
  const comments = useSelector((state: IRootState) => state.comment.values)

  return (
    <div>
      <b>Всего: {comments.length}</b>
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index}>
            <CommentCard comment={comment}/><br/>
          </div>
        ))
      }
    </div>
  );
};

export default CommentList;