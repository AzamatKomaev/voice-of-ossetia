import React from 'react';
import PostForm from "../components/content/Form/PostForm";
import {useFetch} from "../utils/hooks";
import {useSelector} from "react-redux";
import Spinner from "../components/common/Spinner";

const PostCreatePage = () => {
  const auth = useSelector((state: any) => state.auth);
  const [categories, categoriesLoading] = useFetch('api/categories/', {})

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