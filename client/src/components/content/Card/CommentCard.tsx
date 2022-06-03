import React from 'react';
import {IComment} from "../../../interfaces";
import UserGroupItem from "../GroupItem/UserGroupItem";
import ContentGroupItem from "../GroupItem/ContentGroupItem";
import TimestampGroupItem from "../GroupItem/TimestampGroupItem";

interface ICommentCard {
  comment: IComment
}

const CommentCard = ({comment}: ICommentCard) => {

  return (
    <div className="card">
      <UserGroupItem user={comment.user}/>

      <div className="d-none d-sm-flex">
        <div id="content-item-sm-more" className="col-xl-10 col-lg-9 col-md-8 col-sm-6 col-5">
          <ContentGroupItem title={null} description={comment.description} border={false}/>
        </div>
        <div id="timestamp-item-sm-more" className="d-none d-sm-block col-xl-2 col-lg-3 col-md-4 col-sm-6 col-7">
            <TimestampGroupItem created_at={comment.created_at} updated_at={comment.updated_at}/>
        </div>
      </div>

      <div className="d-sm-none">
        <div id="content-item-sm-less">
          <ContentGroupItem title={null} description={comment.description} border={true}/>
        </div>
        <div id="timestamp-item-sm-less">
          <TimestampGroupItem created_at={comment.created_at} updated_at={comment.updated_at}/>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;