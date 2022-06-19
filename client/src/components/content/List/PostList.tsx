import React from 'react';
import {IPost} from "../../../interfaces";
import PostCard from "../Card/PostCard";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";

const PostList = () => {
  const posts = useSelector((state: IRootState) => state.post.values)

  return (
    <div className="row">
      {posts.length > 0 &&
        posts.map((post: IPost, index: number) => (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <PostCard post={post} isDetail={false}/><br/>
          </div>
        ))
      }
    </div>
  );
};

export default PostList;