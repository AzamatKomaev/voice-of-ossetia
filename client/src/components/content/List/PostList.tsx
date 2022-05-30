import React from 'react';
import {IPost} from "../../../interfaces";
import PostCard from "../Card/PostCard";

interface IPostList {
  list: Array<IPost> | boolean | undefined,
}

const PostList = ({list}: IPostList) => {
  return (
    <div className="row">
      {typeof list === 'object'
        ?
        list.map((post, index) => (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <PostCard post={post} isDetail={false}/><br/>
          </div>
        ))
        :
        null
      }
    </div>
  );
};

export default PostList;