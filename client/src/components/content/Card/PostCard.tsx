import React, {useRef} from 'react';
import {IPost} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";
import ImageList from "../List/ImageList";
import UserGroupItem from "../GroupItem/UserGroupItem";
import TimestampGroupItem from "../GroupItem/TimestampGroupItem";
import ContentGroupItem from "../GroupItem/ContentGroupItem";
import ActionButtonsGroupItem from "../GroupItem/ActionButtonsGroupItem";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store";
import {callDispatch} from "../../../utils";
import {HIDE_POST} from "../../../store/postReducer";
import Modal from "../../common/Modal";
import {HttpSender} from "../../../api/api-client";

interface IPostCard {
  post: IPost,
  isDetail: boolean
}

const PostCard = ({post, isDetail}: IPostCard) => {
  const dispatch = useDispatch()
  const auth = useSelector((state: IRootState) => state.auth)
  const httpSender = useRef<HttpSender>(new HttpSender('posts'));

  const handleHidingPostButton = () => {
    callDispatch(dispatch, {
      type: HIDE_POST,
      payload: {
        hidedPost: post
      }
    })
  }

  const handleDeletingPostButton = async() => {
    const response = await httpSender.current.delete(post.id);
    if (response.status === 204) {
      callDispatch(dispatch, {
        type: HIDE_POST,
        payload: {
          hidedPost: post
        }
      })
    }
    else alert(`${response.status} error!`)
  }

  return (
    <div className="card">
      {isDetail ?
        post.files.length > 0 &&
          <div style={{padding: "15px"}}>
            <ImageList list={post.files}/><br/>
          </div>
      :
        post.files.length > 0 &&
        <img
            style={{border: '3px solid silver'}}
            className="card-img-top"
            src={getMediaFullPath(post.files[0].path)}
            alt="Card image cap"
        />
      }
      <Modal
        id={`post-${post.id}`}
        title="Удалить"
        content={<p>Вы точно хотите удалить пост <b>{post.title}</b>?</p>}
        buttons={[
          {
            onClick: handleDeletingPostButton,
            value: 'Удалить'
          }
        ]}
      />
      <ul className="list-group list-group-flush">
        <UserGroupItem user={post.user}/>
        <a href={`/posts/${post.id}/`} className="text-dark" style={{textDecoration: "none"}}>
          <li className="list-group-item">
            <p>
              Категория: <i>{post.category.name}</i><br/>
              Место действия: <br/><u>{post.location}</u><br/>
              Всего файлов: <i>{post.files.length}</i>
            </p>
          </li>
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
            onClick: handleHidingPostButton,
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