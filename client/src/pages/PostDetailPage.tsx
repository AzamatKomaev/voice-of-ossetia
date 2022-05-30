import React, {useEffect} from 'react';
import PostCard from "../components/content/Card/PostCard";
import {useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Spinner from "../components/common/Spinner";

const PostDetailPage = () => {
  const {postId} = useParams();
  const [post, postLoading] = useFetch(`api/posts/${postId}/`, {})

  if (postLoading) {
    return <div><Spinner/></div>
  }

  if (post && typeof post === 'object') {
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