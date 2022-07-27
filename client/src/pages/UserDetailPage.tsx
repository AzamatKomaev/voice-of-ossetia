import {useParams} from "react-router-dom";
import {useFetch, usePagination} from "../utils/hooks";
import Http404Error from "../components/common/Http404Error";
import Spinner from "../components/common/Spinner";
import React from "react";
import PostList from "../components/content/List/PostList";
import UserItem from "../components/user/Item/UserItem";

const UserDetailPage = () => {
  const {userId} = useParams();
  const [userData, userStatusCode, userLoading] = useFetch(`api/users/${userId}`, 'get', {});

  const [posts, postsLoading] = usePagination('api/posts', {
    user_id: userId
  })

  if (userStatusCode === 404) {
    return (<Http404Error/>)
  }

  if (userLoading) {
    return (<Spinner/>)
  }

  return (
    <div className="container-fluid">
      <br/>
      <div className="card">
        <UserItem user={userData} showButtons={true}/>
      </div>
      <br/>
      <h3>Посты</h3>
      <PostList posts={posts}/>
      {postsLoading &&
          <div>
              <br/><Spinner/><br/>
          </div>
      }
    </div>
  );
};

export default UserDetailPage;