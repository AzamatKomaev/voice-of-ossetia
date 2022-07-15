import {useParams} from "react-router-dom";
import {useFetch, usePagination, useQuery} from "../utils/hooks";
import Http404Error from "../components/common/Http404Error";
import Spinner from "../components/common/Spinner";
import UserCard from "../components/user/Card/UserCard";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {addPosts} from "../utils/Actions/posts";
import PostList from "../components/content/List/PostList";

const UserDetailPage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const [userData, userStatusCode, userLoading] = useFetch(`api/users/${userId}`, {});

  const [posts, postsLoading] = usePagination('api/posts', {
    user_id: userId
  })

  useEffect(() => {
    if (posts && posts.length > 0) {
      dispatch(addPosts(posts));
    }
  }, [posts])

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
      <PostList/>
      {postsLoading &&
          <div>
              <br/><Spinner/><br/>
          </div>
      }
    </div>
  );
};

export default UserDetailPage;