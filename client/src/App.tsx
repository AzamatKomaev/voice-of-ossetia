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
import {useDispatch} from "react-redux";
import {AuthAPI} from "./api/auth";
import {GET_CURRENT_USER} from "./store/authReducer";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import LogoutPage from "./pages/LogoutPage";
import NotificationListPage from "./pages/NotificationListPage";
import NotificationDetailPage from "./pages/NotificationDetailPage";
import UserDetailPage from "./pages/UserDetailPage";
import ActivationUserPage from "./pages/ActivationUserPage";
import UserSettingsPage from "./pages/UserSettingsPage";

const App = () => {
  const dispatch = useDispatch()

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
  }, [dispatch])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts" element={<PostListPage/>} />
        <Route path="/posts/:postId" element={<PostDetailPage/>} />
        <Route path="/posts/create" element={<PostCreatePage/>} />
        <Route path="/categories/create" element={<CategoryCreatePage/>} />
        <Route path="/auth/login" element={<LoginPage/>} />
        <Route path="/auth/create" element={<RegistrationPage/>} />
        <Route path="/auth/logout" element={<LogoutPage/>} />
        <Route path="/auth/activate/:uuid" element={<ActivationUserPage/>} />
        <Route path="/notifications" element={<NotificationListPage/>} />
        <Route path="/notifications/:notificationId" element={<NotificationDetailPage/>} />
        <Route path="/users/:userId" element={<UserDetailPage/>} />
        <Route path="/users/me/settings" element={<UserSettingsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
