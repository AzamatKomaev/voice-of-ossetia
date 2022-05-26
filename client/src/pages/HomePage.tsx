import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import WelcomeAccordion from "../components/content/Accordion/WelcomeAccordion";
import Spinner from "../components/common/Spinner";
import {useFetch} from "../utils/hooks";
import CategoryList from "../components/content/List/CategoryList";
import {ICategory} from "../interfaces";

const HomePage = () => {
  const auth = useSelector((state: any) => state.auth);
  const [categoriesData, categoriesLoading] = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/api/categories/`, 'GET', {}
  )

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
      <WelcomeAccordion/>
      <br/><br/>
      <div className="card" style={{padding: "30px", border: "5px solid rgba(0,0,0,.125)"}}>
        <h1 style={{textAlign: "center"}}>Категорий</h1>
        <CategoryList list={categoriesData}/>
      </div>
    </div>
  );
};

export default HomePage;