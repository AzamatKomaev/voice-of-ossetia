import React from 'react';
import {usePagination, useQuery} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import PostList from "../components/content/List/PostList";

const PostListPage = () => {
  const query = useQuery();
  const [posts, postsLoading] = usePagination('api/posts', {
    category_id: query.get('category_id')
  })

  return (
    <div className="container">
      <br/>
      <PostList posts={posts}/>
      {postsLoading &&
        <div>
          <br/><Spinner/><br/>
        </div>
      }
    </div>
  );
};

export default PostListPage;