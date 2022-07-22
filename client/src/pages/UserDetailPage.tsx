import {useParams} from "react-router-dom";
import {useFetch, usePagination} from "../utils/hooks";
import Http404Error from "../components/common/Http404Error";
import Spinner from "../components/common/Spinner";
import UserCard from "../components/user/Card/UserCard";
import React from "react";
import PostList from "../components/content/List/PostList";

const UserDetailPage = () => {
  const {userId} = useParams();
  const [userData, userStatusCode, userLoading] = useFetch(`api/users/${userId}`, {});

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
      <UserCard user={userData}/>
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