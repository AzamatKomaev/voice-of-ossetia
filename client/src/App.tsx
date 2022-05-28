import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import {AxiosResponse} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AuthAPI} from "./api/auth";
import {GET_CURRENT_USER} from "./store/authReducer";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import PostCreatePage from "./pages/PostCreatePage";
import {IRootState} from "./store";

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    (async() => {
      const response: AxiosResponse = await AuthAPI.getMe()
      dispatch({
        type: GET_CURRENT_USER,
        payload: {
          response: response
        }
      })
    })()
  }, [])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts" element={<PostListPage/>} />
        <Route path="/auth/login" element={<LoginPage/>} />
        <Route path="/auth/create" element={<RegistrationPage/>} />
        <Route path="/categories/create" element={<CategoryCreatePage/>} />
        <Route path="/posts/create" element={<PostCreatePage/>} />
      </Routes>
    </div>
  );
}

export default App;
