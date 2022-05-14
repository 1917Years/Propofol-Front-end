import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Mainpage from "./page/Mainpage";
import Login from "./page/Login";
import Register from "./page/Register";
import ProjectAdd from "./page/ProjectMatching/ProjectAdd";
import ProjectMain from "./page/ProjectMatching/ProjectMain";
import ProjectList from "./page/ProjectMatching/ProjectList";
import ProjectDetail from "./page/ProjectMatching/ProjectDetail";
import ProjectSearch from "./page/ProjectMatching/ProjectSearch";
import BlogMain from "./page/Blog/BlogMain";
import BlogSearch from "./page/Blog/BlogSearch";
import BlogWriting from "./page/Blog/BlogWriting";
import PortfolioMain from "./page/Portfolio/PortfolioMain";
import T1 from "./page/Portfolio/Template/T1";
import T2 from "./page/Portfolio/Template/T2";
import T3 from "./page/Portfolio/Template/T3";
import T4 from "./page/Portfolio/Template/T4";
import T5 from "./page/Portfolio/Template/T5";
import Header from "./particals/Header";
import { SERVER_URL } from "./utils/SRC";
import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import KakaoOauth from "./utils/oauth/KakaoOauth";
import { setRefreshTokenToCookie, getRefreshToken, refreshJWT, removeJWT } from "./utils/auth";
import BlogWr2 from "./page/Blog/BlogWr2";

axios.interceptors.request.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.data.data == "Please RefreshToken.") {
      try {
        const originalRequest = error.config;
        refreshJWT();
        return await axios.request(originalRequest);
        /*
        const data = await client.get('auth/refreshtoken')
        if (data) {
          const { accessToken, refreshToken } = data.data
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
          originalRequest.headers['accessToken'] = accessToken;
          originalRequest.headers['refreshToken'] = refreshToken;
          return await client.request(originalRequest);
          
        }
        */
      } catch (error) {
        removeJWT();
        /*
        localStorage.removeItem('user');
        console.log(error);
        */
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

function App() {
  //const cors = require('cors');
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
        url: SERVER_URL + "/test",
        method: "GET",
      }).then((res) => {
        console.log(res.data);
        callback(res.data);
      }).catch((err) => {
        //console.log("왜안돼");
        if (err.response) {
        }
      });
    }, []);
  */
  const Main = (props) => {
    return <Mainpage {...props}></Mainpage>;
  };

  const KakOauth = (props) => {
    return <KakaoOauth {...props}></KakaoOauth>;
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pm/add" element={<ProjectAdd />} />
          <Route path="/pm/main" element={<ProjectMain />} />
          <Route path="/pm/list" element={<ProjectList />} />
          <Route path="/pm/detail" element={<ProjectDetail />} />
          <Route path="/pm/search" element={<ProjectSearch />} />
          <Route path="/blog/main" element={<BlogMain />} />
          <Route path="/blog/search" element={<BlogSearch />} />
          <Route path="/blog/writing" element={<BlogWr2 />} />
          <Route path="/blog/writing_prev" element={<BlogWriting />} />
          <Route path="/oauth2/kakao/login" element={<KakOauth />} />
          <Route path="/portfolio/main" element={<PortfolioMain />} />
          <Route path="/portfolio/template/t1" element={<T1 />} />
          <Route path="/portfolio/template/t2" element={<T2 />} />
          <Route path="/portfolio/template/t3" element={<T3 />} />
          <Route path="/portfolio/template/t4" element={<T4 />} />
          <Route path="/portfolio/template/t5" element={<T5 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
//app.use(cors());
export default App;
