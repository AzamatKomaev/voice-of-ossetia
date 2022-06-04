import React, {useEffect} from 'react';
import {useFetch, useQuery} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import PostList from "../components/content/List/PostList";
import {callDispatch} from "../utils";
import {useDispatch} from "react-redux";
import {ADD_POSTS} from "../store/postReducer";

const PostListPage = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  const [posts, postsStatus, postsLoading]: ReturnType<typeof useFetch> = useFetch('api/posts', {
    params: {
      category_id: query.get('category_id')
    }
  })

  useEffect(() => {
    callDispatch(dispatch, {
      type: ADD_POSTS,
      payload: {
        addedPosts: posts ?? []
      }
    })
  }, [posts])

  if (postsLoading) {
    return (
      <div>
        <Spinner/>
      </div>
    )
  }

  return (
    <div className="container">
      <br/>
      <PostList/>
    </div>
  );
};

export default PostListPage;