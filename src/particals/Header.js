import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/SRC";
import logo from "../assets/img/logo_tmp.png";
import { useNavigate, Navigate } from "react-router-dom";

function Header({ }) {
  const navigate = useNavigate();
  return (
    <div>
      <div class="w-full h-14 fixed bg-black text-white z-50 font-ltest py-4 px-6">
        <button
          class="relative"
          onClick={() => {
            navigate("/");
          }}
        >
          메인페이지
        </button>
        <button
          class="relative left-[10%]"
          onClick={() => {
            navigate("/blog/main");
          }}
        >
          블로그
        </button>
        <button
          class="relative left-[20%]"
          onClick={() => {
            navigate("/portfolio/main");
          }}
        >
          포폴
        </button>
        <button
          class="relative left-[30%]"
          onClick={() => {
            navigate("/pm/main");
          }}
        >
          플젝
        </button>
        <button
          class="relative left-[40%]"
          onClick={() => {
            navigate("/mypage");
          }}
        >
          MYPAGE
        </button>
      </div>
      <div class="h-14"></div>
    </div>
  );
}

export default Header;
