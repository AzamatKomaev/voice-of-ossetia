import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import WelcomeAccordion from "../components/content/Accordion/WelcomeAccordion";
import Spinner from "../components/common/Spinner";

const HomePage = () => {
  const auth = useSelector((state: any) => state.auth);

  if (auth.loading) {
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

    </div>
  );
};

export default HomePage;