import React, {useEffect} from 'react';
import PostCard from "../components/content/Card/PostCard";
import {useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import {IPost} from "../interfaces";
import CommentList from "../components/content/List/CommentList";

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

  if (post && typeof post === 'object') {
    return (
      <div className="container">
        <br/>
        {post ? <PostCard post={post} isDetail={true}/> : null}
        <br/>
        <h3 style={{textAlign: 'center'}}>Коментарий</h3>
        <CommentList list={comments}/>
      </div>
    );
  }

  return (<div></div>)
};

export default PostDetailPage;