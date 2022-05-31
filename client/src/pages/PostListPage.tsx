import React, {useEffect} from 'react';
import {useFetch, useQuery} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import PostList from "../components/content/List/PostList";

const PostListPage = () => {
  const query = useQuery();

  const [posts, postsLoading] = useFetch('api/posts', {
    params: {
      category_id: query.get('category_id')
    }
  })

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
      <PostList list={posts}/>
    </div>
  );
};

export default PostListPage;