import {useParams} from "react-router-dom";
import {useFetch, usePagination} from "../utils/hooks";
import Http404Error from "../components/common/Http404Error";
import Spinner from "../components/common/Spinner";
import React, {useEffect} from "react";
import PostList from "../components/content/List/PostList";
import UserItem from "../components/user/Item/UserItem";
import {addPosts} from "../utils/Actions/posts";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../store";

const UserDetailPage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const [userData, userStatusCode, userLoading] = useFetch(`api/users/${userId}`, 'get', {});
  const [posts, postsLoading] = usePagination('api/posts', {
    user_id: userId
  })

  useEffect(() => {
    if (posts && posts.length > 0) {
      dispatch(addPosts(posts));
    }
  }, [posts, dispatch])

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