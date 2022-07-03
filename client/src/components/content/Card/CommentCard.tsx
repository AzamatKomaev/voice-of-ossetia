import React, {useRef} from 'react';
import {IComment} from "../../../interfaces";
import UserGroupItem from "../GroupItem/UserGroupItem";
import ContentGroupItem from "../GroupItem/ContentGroupItem";
import TimestampGroupItem from "../GroupItem/TimestampGroupItem";
import ActionButtonsGroupItem from "../GroupItem/ActionButtonsGroupItem";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store";
import Modal from "../../common/Modal";
import {useHttpSender} from "../../../utils/hooks";
import {hideComment} from "../../../utils/Actions/comments";
import {hidePost} from "../../../utils/Actions/posts";

interface ICommentCard {
  comment: IComment
}

const CommentCard = ({comment}: ICommentCard) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: IRootState) => state.auth)
  const httpSender = useHttpSender('comments');

  const deleteComment = async() => {
    const response = await httpSender.delete(comment.id);
    if (response.status === 204) {
      dispatch(hideComment(comment.id))
    } else {
      alert(`${response.status} error!`)
    }
  }

  return (
    <div className="card">
      <Modal
        id={`comment-${comment.id}`}
        title="Удалить"
        content={<p>Вы точно хотите удалить комментарий <br/><b>{comment.description}</b>?</p>}
        buttons={[{
            onClick: deleteComment,
            value: 'Удалить'
        }]}
      />
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
      <ActionButtonsGroupItem
        complaining={{
          onClick: () => {},
          className: "btn btn-primary"
        }}
        hiding={{
          onClick: () => dispatch(hideComment(comment.id)),
          className: "btn btn-secondary"
        }}
        deleting={{
          className: "btn btn-danger",
          "data-bs-target": `#comment-${comment.id}`,
          "data-bs-toggle": "modal"
        }}
        showDeletingButton={
          comment.user_id === auth?.data?.id ||
          auth?.data?.id === comment.post.user_id ||
          auth?.data?.is_superuser
        }
        showHidingButton={true}
      />
    </div>
  );
};

export default CommentCard;