import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./App.css";
import MyPage from "./page/Mypage";
import Mainpage from "./page/Mainpage";
import Login from "./page/Login";
import Register from "./page/Register";
import ProjectWriting from "./page/ProjectMatching/ProjectWriting";
import ProjectMain from "./page/ProjectMatching/ProjectMain";
import ProjectMyList from "./page/ProjectMatching/ProjectMyList";
import ProjectMyDetail from "./page/ProjectMatching/ProjectMyDetail";
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
import SampleT1 from "./page/Portfolio/sample/sampleT1";
import SampleT2 from "./page/Portfolio/sample/sampleT2";
import SampleT3 from "./page/Portfolio/sample/sampleT3";
import SampleT4 from "./page/Portfolio/sample/sampleT4";
import Header from "./particals/Header";

import { SERVER_URL } from "./utils/SRC";
import "tailwindcss/tailwind.css";
import KakaoOauth from "./utils/oauth/KakaoOauth";
import {
  setRefreshTokenToCookie,
  setAccessTokenToCookie,
  getRefreshToken,
  getAccessToken,
  removeJWT,
} from "./utils/auth";
import BlogWr2 from "./page/Blog/BlogWr2";
import BlogDetail from "./page/Blog/BlogDetail";
import { deleteUserData } from "./utils/user";
import ProjectMySchedule from "./page/ProjectMatching/ProejctMySchedule";

axios.interceptors.response.use(
  function (response) {
    console.log("안녕?");
    return response;
  },
  async function (error) {
    if (error == null) {
    }
    console.log(error.response);
    if (
      error != null &&
      error != undefined &&
      error.response.data.data == "No Jwt Token"
    ) {
      if (getAccessToken() != "no access_token") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${getAccessToken()}`;
      }
    } else if (
      error.response.data != null &&
      error.response.data.message ==
        "JWT strings must contain exactly 2 period characters. Found: 0"
    ) {
      const originalRequest = error.config;
      originalRequest.headers["Authorization"] = null;
      axios.defaults.headers.common["Authorization"] = null;
      return await axios.request(originalRequest);
    } else if (
      error != null &&
      error != undefined &&
      error.response.data.data == "Please RefreshToken."
    ) {
      try {
        const originalRequest = error.config;
        const Data = await (
          await axios.get(SERVER_URL + "/user-service/auth/refresh", {
            headers: { "refresh-token": getRefreshToken() },
          })
        ).data.data;
        console.log(Data);
        const accessToken = Data.accessToken;
        const refreshToken = Data.refreshToken;
        console.log("access-token = " + accessToken);
        setAccessTokenToCookie(accessToken);
        if (getAccessToken() != "no access_token") {
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${getAccessToken()}`;
          console.log(
            "access-token = " + originalRequest.headers["Authorization"]
          );
          console.log(originalRequest);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${getAccessToken()}`;
        } else {
          removeJWT();
          deleteUserData();
        }
        setRefreshTokenToCookie(refreshToken);
        return await axios.request(originalRequest);
      } catch (error) {
        console.log(error.response);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

function App() {
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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pm/writing" element={<ProjectWriting />} />
          <Route path="/pm/main" element={<ProjectMain />} />
          <Route path="/pm/myschedule" element={<ProjectMySchedule />} />
          <Route path="/pm/myproject/:id" element={<ProjectMyDetail />} />
          <Route path="/pm/mylist" element={<ProjectMyList />} />
          <Route path="/pm/detail/:id" element={<ProjectDetail />} />
          <Route path="/pm/search" element={<ProjectSearch />} />
          <Route path="/blog/main/:page" element={<BlogMain />} />
          <Route path="/blog/search" element={<BlogSearch />} />
          <Route path="/blog/writing" element={<BlogWr2 />} />
          <Route path="/blog/writing_prev" element={<BlogWriting />} />
          <Route path="/blog/Detail/:id" element={<BlogDetail />} />
          <Route path="/oauth2/kakao/login" element={<KakOauth />} />
          <Route path="/portfolio/main" element={<PortfolioMain />} />
          <Route path="/portfolio/main/:id" element={<PortfolioMain />} />
          {/* <Route path="/portfolio/template/t1" element={<T1 />} /> */}
          <Route path="/portfolio/template/t1/:id" element={<T1 />} />
          {/* <Route path="/portfolio/template/t2" element={<T2 />} /> */}
          <Route path="/portfolio/template/t2/:id" element={<T2 />} />
          {/* <Route path="/portfolio/template/t3" element={<T3 />} /> */}
          <Route path="/portfolio/template/t3/:id" element={<T3 />} />
          {/* <Route path="/portfolio/template/t4" element={<T4 />} /> */}
          <Route path="/portfolio/template/t4/:id" element={<T4 />} />
          <Route path="/portfolio/template/samplet1" element={<SampleT1 />} />
          <Route path="/portfolio/template/samplet2" element={<SampleT2 />} />
          <Route path="/portfolio/template/samplet3" element={<SampleT3 />} />
          <Route path="/portfolio/template/samplet4" element={<SampleT4 />} />
          <Route path="/gitime/dashboard" element={<SampleT4 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
