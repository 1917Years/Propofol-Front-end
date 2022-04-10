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

import "tailwindcss/tailwind.css";

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [testStr, setTestStr] = useState("");

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }

  // 첫 번째 렌더링을 마친 후 실행
  useEffect(() => {
    axios({
      url: "/home",
      method: "GET",
    }).then((res) => {
      callback(res.data);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Mainpage />} />
        </Routes>
        <Routes>
          <Route path="/login" exact={true} element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" exact={true} element={<Register />} />
        </Routes>

        <Routes>
          <Route path="/pm/main" exact={true} element={<ProjectMain />} />
        </Routes>
        <Routes>
          <Route path="/pm/detail" exact={true} element={<ProjectDetail />} />
        </Routes>
        <Routes>
          <Route path="/pm/search" exact={true} element={<ProjectSearch />} />
        </Routes>

        <Routes>
          <Route path="/blog/main" exact={true} element={<BlogMain />} />
        </Routes>
        <Routes>
          <Route path="/blog/search" exact={true} element={<BlogSearch />} />
        </Routes>
        <Routes>
          <Route path="/blog/writing" exact={true} element={<BlogWriting />} />
        </Routes>

        <Routes>
          <Route
            path="/portfolio/main"
            exact={true}
            element={<PortfolioMain />}
          />
        </Routes>
      </BrowserRouter>
      <div className="App">
        <header className="App-header">{testStr}</header>
      </div>
    </>
  );
}

export default App;
