import React, {useEffect} from 'react';
import {usePagination, useQuery} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import PostList from "../components/content/List/PostList";
import {callDispatch} from "../utils";
import {useDispatch} from "react-redux";
import {ADD_POSTS} from "../store/postReducer";

const PostListPage = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  const [posts, postsLoading] = usePagination('api/posts', {
    category_id: query.get('category_id')
  })

  useEffect(() => {
    if (posts && posts.length > 0) {
      callDispatch(dispatch, {
        type: ADD_POSTS,
        payload: {
          addedPosts: posts ?? []
        }
      })
    }
  }, [posts])


  return (
    <div className="container">
      <br/>
      <PostList/>
      {postsLoading &&
        <div>
          <br/><Spinner/><br/>
        </div>
      }
    </div>
  );
};

export default PostListPage;