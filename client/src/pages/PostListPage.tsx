import React, {useEffect} from 'react';
import {useFetch, useQuery} from "../utils/hooks";
import Spinner from "../components/common/Spinner";

const PostListPage = () => {
  const query = useQuery();

  const [posts, postsLoading] = useFetch('api/posts', {
    params: {
      category_id: query.get('category_id')
    }
  })

  useEffect(() => {
    console.log(posts);
  }, [posts])

  if (postsLoading) {
    return (
      <div>
        <Spinner/>
      </div>
    )
  }

  return (
    <div>
      <h1>Here will be a post list page</h1>
      <p>{JSON.stringify(posts)}</p>
    </div>
  );
};

export default PostListPage;