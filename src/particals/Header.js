import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/SRC";
import logo from "../assets/img/logo_tmp.png";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function Header({}) {
  const navigate = useNavigate();
  const [checkCreate, setCheckCreate] = useState(false);
  const [portfolioId, setPortfolioId] = useState("");
  const [userMove, setUserMove] = useState(false);

  useEffect(() => {
    console.log("이친구 왜 실행이 안될까...........?");
    axios
      .get(SERVER_URL + "/ptf-service/api/v1/portfolio/checkPortfolio")
      .then((res) => {
        console.log("기존에 포폴 있는지 조회하기");
        console.log(res);

        if (res.data.data == "no") setCheckCreate(false);
        else {
          setCheckCreate(true);
          setPortfolioId(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userMove]);

  const createTrue = () => {
    navigate("/portfolio/main/" + portfolioId);
    setUserMove(!userMove);
  };

  const createFalse = () => {
    navigate("/portfolio/main");
    setUserMove(!userMove);
  };

  const onMoveMainPage = () => {
    navigate("/");
    setUserMove(!userMove);
  };

  const onMoveBlog = () => {
    navigate("/blog/main/1");
    setUserMove(!userMove);
  };

  const onMoveProject = () => {
    navigate("/pm/main");
    setUserMove(!userMove);
  };

  const onMoveMyPage = () => {
    navigate("/mypage");
    setUserMove(!userMove);
  };

  return (
    <div>
      <div class="w-full h-14 fixed bg-black text-white z-50 font-ltest py-4 px-6">
        <button
          class="relative"
          onClick={onMoveMainPage}
          // onClick={() => {
          //   navigate("/");
          // }}
        >
          메인페이지
        </button>
        <button
          class="relative left-[10%]"
          onClick={onMoveBlog}
          // onClick={() => {
          //   navigate("/blog/main/1");
          // }}
        >
          블로그
        </button>
        <button
          class="relative left-[20%]"
          onClick={checkCreate ? createTrue : createFalse}
        >
          포폴
        </button>
        <button
          class="relative left-[30%]"
          onClick={onMoveProject}
          // onClick={() => {
          //   navigate("/pm/main");
          // }}
        >
          플젝
        </button>
        <button
          class="relative left-[40%]"
          onClick={onMoveMyPage}
          // onClick={() => {
          //   navigate("/mypage");
          // }}
        >
          MYPAGE
        </button>
      </div>
      <div class="h-14"></div>
    </div>
  );
}

export default Header;
