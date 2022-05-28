import React from 'react';
import {useSelector} from "react-redux";
import Spinner from "../components/common/Spinner";
import CategoryForm from "../components/content/Form/CategoryForm";
import {IRootState} from "../store";

const CategoryCreatePage = () => {
  const auth = useSelector((state: IRootState) => state.auth);

  if (auth.loading) {
    return (
      <>
        <Spinner/>
      </>
    )
  }

  return (
    <div>
      <CategoryForm/>
    </div>
  );
};

export default CategoryCreatePage;