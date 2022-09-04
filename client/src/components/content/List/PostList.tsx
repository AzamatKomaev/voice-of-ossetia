import React, {useEffect} from 'react';
import {IPost} from "../../../interfaces";
import PostCard from "../Card/PostCard";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store";
import {clearPosts} from "../../../utils/Actions/posts";

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state: IRootState) => state.post.values)

  useEffect(() => {
    return () => {
      dispatch(clearPosts())
    }
  }, [dispatch])

  return (
    <div className="row">
      {posts.length > 0 &&
        posts.map((post: IPost, index: number) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <PostCard post={post} isDetail={false}/><br/>
          </div>
        ))
      }
    </div>
  );
};

export default PostList;