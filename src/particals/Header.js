import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, removeJWT } from "../utils/auth";
import Sse from "../utils/sse";
import { getUserDataToken, deleteUserData } from "../utils/user";

function Header({}) {
  const navigate = useNavigate();
  const [userMove, setUserMove] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const checkPtf = () => {
    if (getUserDataToken() != null) {
      let memberId = getUserDataToken().id;
      if (memberId != null) navigate("/portfolio/main/" + memberId);
      else navigate("/portfolio/main");
    }
  };

  useEffect(() => {
    if (getAccessToken() != "no access_token") {
      setIsLogin(true);
    } else {
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
        {getAccessToken() != "no access_token" ? (
          <div class="flex w-[17%] justify-between">
            <button
              class="relative font-ltest"
              onClick={() => {
                removeJWT();
                deleteUserData();
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
              <Sse />
            </div>
          </div>
        ) : (
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
        )}
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default Header;
