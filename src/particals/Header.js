import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/SRC";
import logo from "../assets/img/logo_tmp.png";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import See from "../utils/sse";

function Header({ }) {
  const navigate = useNavigate();
  const [checkCreate, setCheckCreate] = useState(false);
  const [portfolioId, setPortfolioId] = useState("");
  const [userMove, setUserMove] = useState(false);
  /*
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
 */
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
      <div class="w-full h-14 min-w-[60rem] fixed flex justify-between bg-black text-white z-50 font-ltest py-4 px-6">
        <div class="flex w-1/3 justify-between">
          <button
            class="font-rumpi text-2xl text-gray-200"
            onClick={onMoveMainPage}
          // onClick={() => {
          //   navigate("/");
          // }}
          >
            Propofol
          </button>
          <button
            class=""
            onClick={onMoveBlog}
          // onClick={() => {
          //   navigate("/blog/main/1");
          // }}
          >
            블로그
          </button>
          <button
            class=""
            onClick={checkCreate ? createTrue : createFalse}
          >
            포트폴리오
          </button>
          <button
            class=""
            onClick={onMoveProject}
          // onClick={() => {
          //   navigate("/pm/main");
          // }}
          >
            프로젝트
          </button>
        </div>
        <div class="flex w-[8%] justify-between">
          <button
            class=""
            onClick={onMoveMyPage}
          // onClick={() => {
          //   navigate("/mypage");
          // }}
          >
            MYPAGE
          </button>
          <div class="">
            <See />
          </div>
        </div>
      </div>
      <div class="h-14"></div>
    </div>
  );
}

export default Header;
