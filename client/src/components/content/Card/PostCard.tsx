import React from 'react';
import {IPost} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";
import ImageList from "../List/ImageList";
import UserGroupItem from "../GroupItem/UserGroupItem";
import TimestampGroupItem from "../GroupItem/TimestampGroupItem";
import ContentGroupItem from "../GroupItem/ContentGroupItem";

interface IPostCard {
  post: IPost,
  isDetail: boolean
}

const PostCard = ({post, isDetail}: IPostCard) => {
  return (
    <div className="card">
      {isDetail ?
        <div style={{padding: "15px"}}>
          <ImageList list={post.files}/><br/>
        </div>
      :
        <img className="card-img-top" src={getMediaFullPath(post.files[0].path)} alt="Card image cap"/>
      }
      <ul className="list-group list-group-flush">
        <UserGroupItem user={post.user}/>
        <li className="list-group-item">
          <p>
            Категория: <i>{post.category.name}</i><br/>
            Место действия: <br/><u>{post.location}</u><br/>
            Всего файлов: <i>{post.files.length}</i>
          </p>
        </li>
        <a href={`/posts/${post.id}/`} className="text-dark" style={{textDecoration: "none"}}>
          <ContentGroupItem
            title={post.title}
            description={isDetail ? post.description :  post.description.slice(0, 100) + '...'}
            border={true}
          />
          <TimestampGroupItem created_at={post.created_at} updated_at={post.updated_at}/>
        </a>
      </ul>
    </div>
  );
};

export default PostCard;