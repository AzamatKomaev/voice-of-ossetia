import React, {useEffect} from 'react';
import PostCard from "../components/content/Card/PostCard";
import {useParams} from "react-router-dom";
import {useFetch, usePagination} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import CommentList from "../components/content/List/CommentList";
import CommentForm from "../components/content/Form/CommentForm";
import {useDispatch} from "react-redux";
import {addComments} from "../utils/Actions/comments";

const PostDetailPage = () => {
  const {postId} = useParams();
  const dispatch = useDispatch();

  const [post, postStatus, postLoading]: ReturnType<typeof useFetch> = useFetch(
    `api/posts/${postId}/`, 'get', {}
  )
  const [comments, commentsLoading] = usePagination('api/comments', {
    post_id: postId
  })


  useEffect(() => {
    if (comments && comments.length > 0) {
      dispatch(addComments(comments))
    }
  }, [comments, dispatch])

  if (postLoading) {
    return (
      <div>
        <Spinner/>
      </div>
    )
  }

  if (postStatus === 404) {
    return <h1>404 Error</h1>
  }

  return (
    <div className="container">
      <br/>
      {post && <PostCard post={post} isDetail={true}/>}
      <br/><br/>
      <CommentForm post={post}/><br/>
      <CommentList/>
      {commentsLoading &&
          <div>
              <br/><Spinner/><br/>
          </div>
      }
    </div>
  );
};

export default PostDetailPage;