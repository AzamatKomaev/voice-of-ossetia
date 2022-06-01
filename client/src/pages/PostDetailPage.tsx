import React, {useEffect} from 'react';
import PostCard from "../components/content/Card/PostCard";
import {useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import {IPost} from "../interfaces";

const PostDetailPage = () => {
  const {postId} = useParams();
  const [post, postLoading]: Array<IPost | undefined | boolean> = useFetch(`api/posts/${postId}/`, {})
  const [comments, commentsLoading]: Array<IPost | undefined | boolean> = useFetch(`api/comments/`, {
    params: {
      post_id: postId
    }
  })

  if (postLoading) {
    return <div><Spinner/></div>
  }

  if (post && typeof post !== 'boolean') {
    return (
      <div className="container">
        <br/>
        {post ? <PostCard post={post} isDetail={true}/> : null}
      </div>
    );
  }

  return (<div></div>)
};

export default PostDetailPage;