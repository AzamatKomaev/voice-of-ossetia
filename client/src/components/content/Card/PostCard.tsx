import React from 'react';
import {IPost} from "../../../interfaces";
import {getMediaFullPath} from "../../../api/media";
import {getReadableDateFormat} from "../../../utils";
import ImageList from "../List/ImageList";

interface IPostCard {
  post: IPost,
  isDetail: boolean
}

const PostCard = ({post, isDetail}: IPostCard) => {
  return (
    <div className="card">
      <a href={`/posts/${post.id}/`} className="text-dark" style={{textDecoration: "none"}}>
        {isDetail ?
          <div style={{padding: "15px"}}><ImageList list={post.files}/><br/></div>
        :
          <img className="card-img-top" src={getMediaFullPath(post.files[0].path)} alt="Card image cap"/>
        }
        <hr className="line-highlight"/>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p>Добавлено пользователем <a href={`/users/${post.user.id}`}>{post.user.name}</a></p>
            <p>
              Категория: <i>{post.category.name}</i><br/>
              Место действия: <br/><u>{post.location}</u><br/>
              Всего файлов: <i>{post.files.length}</i>
            </p>
          </li>
          <li className="list-group-item">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{isDetail ? post.description :  post.description.slice(0, 100) + '...'}</p>
          </li>
          <div className="card-body">
            <small className="text-muted">Создано: <br/>
              {getReadableDateFormat(post.created_at)}, <br/>
              Последний раз обновлено: <br/>
              {getReadableDateFormat(post.updated_at)}
            </small>
          </div>
        </ul>
      </a>
    </div>
  );
};

export default PostCard;