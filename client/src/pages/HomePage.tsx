import React from 'react';
import {useSelector} from "react-redux";
import WelcomeAccordion from "../components/content/Accordion/WelcomeAccordion";
import Spinner from "../components/common/Spinner";
import {useFetch} from "../utils/hooks";
import CategoryList from "../components/content/List/CategoryList";
import {IRootState} from "../store";
import Http404Error from "../components/common/Http404Error";

const HomePage = () => {
  const auth = useSelector((state: IRootState) => state.auth);
  const [categories, categoriesStatus, categoriesLoading]: ReturnType<typeof useFetch> = useFetch('api/categories/',  {})

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

  return (
    <div className="container">
      <br/>
      {document.body.clientWidth > 1400 && <WelcomeAccordion/>}

      <div className="card" style={{padding: "30px"}}>
        <CategoryList list={categories}/>
      </div>
    </div>
  );
};

export default HomePage;