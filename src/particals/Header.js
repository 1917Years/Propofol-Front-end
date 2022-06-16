import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/SRC";
import logo from "../assets/img/logo_tmp.png";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { getAccessToken, getRefreshToken, removeJWT } from "../utils/auth";
import See from "../utils/sse";

function Header({ }) {
  const navigate = useNavigate();
  const [portfolioId, setPortfolioId] = useState(null);
  const [userMove, setUserMove] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log("쿠키 나와");
    console.log(getCookie("portfolioId"));
    setPortfolioId(getCookie("portfolioId"));
  }, [userMove]);

  const checkPtf = () => {
    console.log("포폴 아이디 주삼");
    console.log(portfolioId);
    if (portfolioId != null) navigate("/portfolio/main/" + portfolioId);
    else navigate("/portfolio/main");
  };

  useEffect(() => {
    if (getAccessToken() != "no access_token") {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div>
      <div class="w-full px-32 min-w-[80rem] bg-opacity-100 h-16 fixed flex justify-between border-b border-gray-300 shadow-md bg-white text-black z-50 font-test text-lg py-4 px-6">
        <div class="flex items-center w-1/3 justify-between">
          <button
            class="relative font-rumpi text-[1.625rem] font-semibold"
            onClick={() => {
              navigate("/");
              setUserMove(!userMove);
            }}
          >
            Propofol
          </button>
          <button
            class="relative font-ltest"
            onClick={() => {
              navigate("/blog/main/1");
            }}
          >
            블로그
          </button>
          <button class="relative font-ltest" onClick={() => checkPtf()}>
            포트폴리오
          </button>
          <button
            class="relative font-ltest"
            onClick={() => {
              navigate("/pm/main");
            }}
          >
            프로젝트
          </button>
        </div>
        {getAccessToken() != "no access_token" ?
          <div class="flex w-[17%] justify-between">
            <button
              class="relative font-ltest"
              onClick={() => {
                removeJWT();
                setIsLogin(false);
              }}
            >
              LOGOUT
            </button>
            <button
              class="relative font-ltest"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              MYPAGE
            </button>
            <div class="">
              <See />
            </div>
          </div>
          :
          <div class="flex w-[12%] justify-between">
            <button
              class="relative font-ltest"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
            <button
              class="relative font-ltest"
              onClick={() => {
                navigate("/register");
              }}
            >
              회원가입
            </button>

          </div>
        }
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default Header;
