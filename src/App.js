import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Mainpage from "./page/Mainpage";
import Login from "./page/Login";
import Register from "./page/Register";
import ProjectMain from "./page/ProjectMatching/ProjectMain";
import ProjectDetail from "./page/ProjectMatching/ProjectDetail";
import ProjectSearch from "./page/ProjectMatching/ProjectSearch";
import BlogMain from "./page/Blog/BlogMain";
import BlogSearch from "./page/Blog/BlogSearch";
import BlogWriting from "./page/Blog/BlogWriting";
import PortfolioMain from "./page/Portfolio/PortfolioMain";
import Header from "./particals/Header";
import { SERVER_URL } from "./utils/SRC";
import { createRoot } from 'react-dom/client';

//import header from "./particals/header.js";

import "tailwindcss/tailwind.css";

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [testStr, setTestStr] = useState("");

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
  /*
  useEffect(() => {
    axios({
      url: SERVER_URL + "/api/v1/health-check",
      method: "GET",
    }).then((res) => {
      console.log(res.data);
      callback(res.data);
    }).catch((err) => {
      console.log("왜안돼");
      if (err.response) {
      }
    });
  }, []);
*/
  const Main = (props) => {
    return <Mainpage {...props}></Mainpage>;
  };

  const Hd = (props) => {
    return
    <Header
      props={props}
    />;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/"
            exact={true}
            element={<Main />}
          />
          <Route path="/login" exact={true} element={<Login />} />
          <Route path="/register" exact={true} element={<Register />} />
          <Route path="/pm/main" exact={true} element={<ProjectMain />} />
          <Route path="/pm/detail" exact={true} element={<ProjectDetail />} />
          <Route path="/pm/search" exact={true} element={<ProjectSearch />} />
          <Route path="/blog/main" exact={true} element={<BlogMain />} />
          <Route path="/blog/search" exact={true} element={<BlogSearch />} />
          <Route path="/blog/writing" exact={true} element={<BlogWriting />} />
          <Route
            path="/portfolio/main"
            exact={true}
            element={<PortfolioMain />}
          />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
