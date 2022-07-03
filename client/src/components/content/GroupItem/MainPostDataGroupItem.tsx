import React from 'react';
import {IPost} from "../../../interfaces";

const MainPostDataGroupItem = ({post}: {post: IPost}) => {
  return (
    <li className="list-group-item">
      <p>
        Категория: <i>{post.category.name}</i><br/>
        Место действия: <br/><u>{post.location}</u><br/>
        Всего файлов: <i>{post.files.length}</i>
      </p>
    </li>
  );
};

export default MainPostDataGroupItem;