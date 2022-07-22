import React, {useEffect} from 'react';
import {IPost} from "../../../interfaces";
import PostCard from "../Card/PostCard";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store";
import {addPosts, clearPosts} from "../../../utils/Actions/posts";

interface IPostList {
  posts: IPost[]
}

const PostList = ({posts}: IPostList) => {
  const dispatch = useDispatch()
  const postsValues = useSelector((state: IRootState) => state.post.values)

  useEffect(() => {
    if (posts && posts.length > 0) {
      dispatch(addPosts(posts));
    }

    return () => {
      dispatch(clearPosts())
    }
  }, [posts, dispatch])

  return (
    <div className="row">
      {postsValues.length > 0 &&
        postsValues.map((post: IPost, index: number) => (
          <div key={index} className="col-md-6 col-lg-4 col-xl-3">
            <PostCard post={post} isDetail={false}/><br/>
          </div>
        ))
      }
    </div>
  );
};

export default PostList;