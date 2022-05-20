import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts" element={<PostListPage/>} />
        <Route path="/auth/login" element={<LoginPage/>} />
        <Route path="/auth/create" element={<RegistrationPage/>} />
      </Routes>
    </div>
  );
}

export default App;
