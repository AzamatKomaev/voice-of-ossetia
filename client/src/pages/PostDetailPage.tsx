import React, {useEffect} from 'react';
import PostCard from "../components/content/Card/PostCard";
import {useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import CommentList from "../components/content/List/CommentList";
import CommentForm from "../components/content/Form/CommentForm";
import {useDispatch} from "react-redux";
import {ADD_COMMENTS} from "../store/commentReducer";
import {callDispatch} from "../utils";

const PostDetailPage = () => {
  const {postId} = useParams();
  const dispatch = useDispatch();

  const [post, postStatus, postLoading]: ReturnType<typeof useFetch> = useFetch(`api/posts/${postId}/`, {})
  const [comments, commentsStatus, commentsLoading]: ReturnType<typeof useFetch> = useFetch(`api/comments/`, {
    params: {
      post_id: postId
    }
  })

  useEffect(() => {
    callDispatch(dispatch, {
      type: ADD_COMMENTS,
      payload: {
        addedComments: comments ?? []
      }
    })
  }, [comments])

  if (postLoading || commentsLoading) {
    return (
      <div>
        <Spinner/>
      </div>
    )
  }

  if (postStatus === 404 || !post) {
    return (
      <div>
        <h1>404 Error</h1>
      </div>
    )
  }
  return (
    <div className="container">
      <br/>
      {post && <PostCard post={post} isDetail={true}/>}
      <br/><br/>
      <CommentForm post={post}/><br/>
      <CommentList/>
    </div>
  );
};

export default PostDetailPage;