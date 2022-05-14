import { React, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { setRefreshTokenToCookie, getRefreshToken } from "../utils/auth.js"

const cookies = new Cookies();

/*
export function setRefreshTokenToCookie(refresh_token) { //나중에 로그아웃 시 쿠키 삭제하는 코드 추가!!
  cookies.set('refresh_token', refresh_token, { sameSite: 'strict' });
}
*/

function Login(props) {
  const postLogin = async ({
    data,
    setSync,
    setLoginError,
  }) => {
    await axios
      .post(SERVER_URL + "/user-service/auth/login", data) //나중에 경로 /user-service/ 추가하기
      .then((res) => {
        console.log(res);
        setLoginError(false);
        if (res.data.data.accessToken != null) {
          const at = res.data.data.accessToken;
          axios.defaults.headers.common['Authorization'] = `Bearer ${at}`;
          console.log(res.data.data.refreshToken);
          setRefreshTokenToCookie(res.data.data.refreshToken);
          console.log("refresh Token : ");
          console.log(getRefreshToken());
          moveToMain(at);
          console.log(at);
        }
      })
      .catch((err) => {
        console.log("실패.");
        setLoginError(true);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  function moveToMain(at) {
    axios
      .get(SERVER_URL + "/user-service/api/v1/members", at)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

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
        <div class="mt-10 flex justify-center ">
          <button
            class="w-[20%] z-10"
            onClick={() => {
              window.location.href =
                "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=678d756d0781894fae5a6e2baebfd493&redirect_uri=http://localhost:3000/oauth2/kakao/login";
            }}>
            <img
              src="https://cdn.discordapp.com/attachments/874658668434583655/968415948904210472/kakao_login_medium_wide.png"
              class="w-full align-middle rounded-t-lg"
            ></img>
          </button>

        </div>
      </div>
    </div>);
}

export default Login;
