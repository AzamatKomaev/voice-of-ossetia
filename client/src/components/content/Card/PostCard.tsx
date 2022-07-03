import React, {useEffect, useRef} from 'react';
import {IPost} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";
import ImageList from "../List/ImageList";
import UserGroupItem from "../GroupItem/UserGroupItem";
import TimestampGroupItem from "../GroupItem/TimestampGroupItem";
import ContentGroupItem from "../GroupItem/ContentGroupItem";
import ActionButtonsGroupItem from "../GroupItem/ActionButtonsGroupItem";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store";
import Modal from "../../common/Modal";
import {useHttpSender} from "../../../utils/hooks";
import {hidePost} from "../../../utils/Actions/posts";
import MainPostDataGroupItem from "../GroupItem/MainPostDataGroupItem";
import ImagesPostGroupItem from "../GroupItem/ImagesPostGroupItem";

interface IPostCard {
  post: IPost,
  isDetail: boolean
}

const PostCard = ({post, isDetail}: IPostCard) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: IRootState) => state.auth)
  const httpSender = useHttpSender('posts');

  const deletePost = async() => {
    const response = await httpSender.delete(post.id);
    if (response.status === 204) {
      dispatch(hidePost(post.id))
    } else {
      alert(`${response.status} error!`)
    }
  }

  return (
    <div className="card">
      <Modal
        id={`post-${post.id}`}
        title="Удалить"
        content={<p>Вы точно хотите удалить пост <b>{post.title}</b>?</p>}
        buttons={[{
          onClick: deletePost,
          value: 'Удалить'
        }]}
      />
      <ImagesPostGroupItem postFiles={post.files} isDetail={isDetail}/>
      <ul className="list-group list-group-flush">
        <UserGroupItem user={post.user}/>
        <a href={`/posts/${post.id}/`} className="text-dark" style={{textDecoration: "none"}}>
          <MainPostDataGroupItem post={post}/>
          <ContentGroupItem
            title={post.title}
            description={isDetail ? post.description :  post.description.slice(0, 100) + '...'}
            border={true}
          />
          <TimestampGroupItem created_at={post.created_at} updated_at={post.updated_at}/>
        </a>
        <ActionButtonsGroupItem
          complaining={{
            onClick: () => {},
            className: "btn btn-primary"
          }}
          hiding={{
            onClick: () => dispatch(hidePost(post.id)),
            className: "btn btn-secondary"
          }}
          deleting={{
            className: "btn btn-danger",
            "data-bs-target": `#post-${post.id}`,
            "data-bs-toggle": "modal"
          }}
          showDeletingButton={post.user_id === auth?.data?.id || auth?.data?.is_superuser}
          showHidingButton={!isDetail}
        />
      </ul>
    </div>
  );
};

export default PostCard;