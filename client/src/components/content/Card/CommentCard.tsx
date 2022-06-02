import React, {useEffect} from 'react';
import {IComment} from "../../../interfaces";
import {getReadableDateFormat} from "../../../utils";

interface ICommentCard {
  comment: IComment
}

const CommentCard = ({comment}: ICommentCard) => {
  useEffect(() => {
    console.log(comment)
  }, [])

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{comment.user.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {comment.user.first_name && comment.user.last_name
            ? comment.user.first_name + ' ' + comment.user.last_name
            : 'Имя и фамилия не указаны'
          }
        </h6>
        <div className="row" style={{display: "flex"}}>
          <p className="col-xl-10 col-lg-9  card-text">{comment.description}</p>
          <small className="col-xl-2 col-lg-3 text-muted" style={{marginLeft: 'auto'}}>Создано: <br/>
            <i>{getReadableDateFormat(comment.created_at)}</i>, <br/>
            Обновлено: <br/>
            <i>{getReadableDateFormat(comment.updated_at)}</i>
          </small>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;