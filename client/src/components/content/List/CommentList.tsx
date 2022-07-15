import React from 'react';
import CommentCard from "../Card/CommentCard";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";


const CommentList = () => {
  const comments = useSelector((state: IRootState) => state.comment.values)

  return (
    <div>
      {comments.length > 0 &&
        <div>
          <h2>Обсуждения</h2>
          <b>Всего: {comments.length}</b>
          {comments.map((comment, index) => (
            <div key={index}>
              <CommentCard comment={comment}/><br/>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default CommentList;