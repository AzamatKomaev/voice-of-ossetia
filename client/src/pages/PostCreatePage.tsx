import React from 'react';
import PostForm from "../components/content/Form/PostForm";
import {useFetch} from "../utils/hooks";
import {useSelector} from "react-redux";
import Spinner from "../components/common/Spinner";
import {IRootState} from "../store";
import Http404Error from "../components/common/Http404Error";

const PostCreatePage = () => {
  const auth = useSelector((state: IRootState) => state.auth);
  const [categories, categoriesStatus, categoriesLoading] = useFetch('api/categories/', 'get', {})

  if (categoriesStatus === 404) {
    return (<Http404Error/>)
  }

  if (auth.loading || categoriesLoading) {
    return (
      <>
        <Spinner/>
      </>
    )
  }

  if (!auth.data.is_active) {
    return (
      <div>
        <br/>
        <h3>Ваш аккаунт не подтвержден. Дождитесь подтверждения</h3>
      </div>
    )
  }

  return (
    <div>
      <br/>
      <PostForm categories={categories}/>
    </div>
  );
};

export default PostCreatePage;