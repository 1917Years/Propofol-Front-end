import { React, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import { useNavigate, Navigate } from "react-router-dom";

const postLogin = async ({
  data,
  setSync,
  setLoginError,
}) => {
  await axios
    .post(SERVER_URL + "/api/v1/login", data) //나중에 경로 /user-service/ 추가하기
    .then((res) => {
      /*
      setCookie("token", "Bearer " + res.data.accessToken, {
        path: "/",
        expires: 0,
      });
      */
      setLoginError(false);
      console.log("제대로 보냄!!");
    })
    .catch((err) => {
      setLoginError(true);
      if (err.response) {
        console.log(err.response.data); // => the response payload 오 굿굿
      }
    });
};

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sync, setSync] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
    console.log(email);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
    console.log(password);
  };
  return (
    <div class="w-full font-test">
      <div className="Header" class="pt-10">
        <div class="mt-20 text-center">
          <h1 class="text-black font-rumpi text-6xl">
            Propofol
          </h1>
          <p class="text-2xl opacity-90 font-ltest text-gray-500">
            ( <a class="font-sbtest text-black ">Pro</a>file +{" "}
            <a class="font-sbtest text-black ">Po</a>rt<a class="font-sbtest text-black">fol</a>io )
          </p>
        </div>
      </div>
      <div className="Login" class="flex flex-col gap-8 mt-16 ">
        <input
          class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 py-3 px-3 border rounded-lg bg-gray-50 focus:outline-0 text-xl font-ltest min-w-[20rem]"
          placeholder="아이디"
          onChange={onEmailHandler}
          type="text" />
        <input
          class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 py-3 px-3 border rounded-lg bg-gray-50 focus:outline-0 text-xl font-ltest min-w-[20rem]"
          placeholder="비밀번호"
          onChange={onPasswordHandler}
          type="password" />
        <button
          class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 rounded-lg bg-black text-white py-3 text-2xl font-sbtest min-w-[20rem]"
          onClick={() => {
            const data = {
              email: email,
              password: password,
            };
            if (email.length === 0) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
            if (password.length === 0) {
              setPwdError(true);
            } else {
              setPwdError(false);
            }
            postLogin({ data, setSync, setLoginError });
          }}
        >
          Login
        </button>
        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 mt-1 border-b pb-5 border-gray-400 flex justify-center gap-2 text-gray-500 font-ltest text-center min-w-[20rem]">
          <div>아직 계정이 없다면? </div>
          <button
            onClick={() => {
              navigate('/register');
            }}>회원가입{">"}
          </button>
        </div>
      </div>
      <div className="SocialLogin" class="">
        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 mt-10 text-gray-500 font-ltest text-center text-lg min-w-[20rem]">
          <h1>혹은</h1>
          <p>SNS 계정으로 로그인하기</p>
        </div>
        <div class="flex">
          <button>

          </button>

        </div>
      </div>
    </div>);
}

export default Login;
