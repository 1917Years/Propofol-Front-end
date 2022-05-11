import { React, useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import { useNavigate, Navigate } from "react-router-dom";

function postRegister(data) {
  console.log("확인");
  console.log(data);
  axios
    .post(SERVER_URL + "/user-service/auth/join", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      //localStorage.setItem("Authorization", JWT); //이런 식으로 JWT 부분에 받은 토큰 넣어주면 될 것 같은데? (post로 요청보낼 때)
      //localStorage.getItem("Authorization"); // 이렇게 하면 받아와질 것 같은데 맞는지는 모름 ㅎㅎ;
      console.log("여기 찍힘?");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      console.log("뭐야 ㅅㅄㅄ");
      console.log(err.request);
    });
}
/*
const postRegister = async ({ data }) => {
  console.log("확인");
  console.log(data);
  await axios
    .post(SERVER_URL + "/user-service/auth/join", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    }) //나중에 경로 /user-service/ 추가하기
    .then((res) => {
      console.log("왜안뜨냐고!!!!!!");
      console.log(res);
    })
    .catch((err) => {
      console.log("시발!!!!!!");
      console.log(err.request);
      console.log(err);
    });
};
*/
function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [pwdCheckInput, setPwdCheckInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneCheckInput, setPhoneCheckInput] = useState("");
  const [phoneCheckValid, setPhoneCheckValid] = useState(false); // 나중에 백이랑 통신 후 추가
  const [devInput, setDevInput] = useState("");
  const [registerData, setRegisterData] = useState(null);
  /*메시지*/
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdCheckMsg, setPwdCheckMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [phoneCheckMsg, setPhoneCheckMsg] = useState("");
  const [deveMsg, setDevMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  /*유효성*/
  const [emailVaild, setEmailVaild] = useState(false);
  const [pwdVaild, setPwdVaild] = useState(false);
  const [pwdCheckVaild, setPwdCheckVaild] = useState(false);
  const [phoneVaild, setPhoneVaild] = useState(false);
  const [devVaild, setDevVaild] = useState(false);

  const onLoginButtonHandler = () => {
    const tmp = {
      email: emailInput,
      password: pwdInput,
      username: nameInput,
      nickname: nickNameInput,
      phoneNumber: phoneInput,
    };
    setData(tmp);
    console.log(tmp);
    postRegister({ tmp });
  };

  const onEmailInputHandler = (e) => {
    const regex = /^[\w.%+\-]+@[\w.\-]+\.[A-Za-z]{2,3}$/; // 이메일 정규식
    if (regex.test(e.target.value)) {
      setEmailInput(e.target.value);
      console.log(emailInput);
    } else {
      setEmailInput("");
    }
  };

  const onNameInputHandler = (e) => {
    setNameInput(e.target.value);
  };

  const onNickNameInputHandler = (e) => {
    setNickNameInput(e.target.value);
  };

  const onEmailCheckHandler = (e) => {
    if (emailInput == "") {
      setEmailMsg("올바르지 않은 이메일 형식입니다. 다시 입력해주세요.");
      setEmailVaild(false);
    } else {
      /*
        if(중복)
          setEmailMsg("이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.");
      */
      setEmailMsg("");
      setEmailVaild(true);
    }
  };

  const onNickNameCheckHandler = (e) => {
    /** 여기에 닉네임 중복 체크 만들어주삼 */
  };
  const onPasswordInputHandler = (e) => {
    setPwdInput(e.target.value);
    if (e.target.value.length > 16) {
      //setPwdInput("");
      setPwdMsg("비밀번호가 너무 깁니다. 16글자 이하로 입력해주세요.");
      setPwdVaild(false);
    } else if (e.target.value.length < 8) {
      //setPwdInput("");
      setPwdMsg("비밀번호가 너무 짧습니다. 8글자 이상으로 입력해주세요.");
      setPwdVaild(false);
    } else {
      const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
      if (regex.test(e.target.value)) {
        // 숫자, 알파벳 조건 만족시
        setPwdMsg("");
        setPwdVaild(true);
      } else {
        // 둘 중 하나 없을 시
        //setPwdInput("");
        setPwdMsg("숫자와 알파벳을 조합한 비밀번호를 입력해주세요.");
        setPwdVaild(false);
      }
    }
  };
  const onPasswordCheckHandler = (e) => {
    setPwdCheckInput(e.target.value);
    if (e.target.value === pwdInput) {
      setPwdCheckMsg("");
      setPwdCheckVaild(true);
    } else {
      // setPwdCheckInput("");
      setPwdCheckMsg("비밀번호가 다릅니다. 다시 한 번 확인해주세요.");
      setPwdCheckVaild(false);
    }
  };
  const onPhoneInputHandler = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneInput(e.target.value);
    } else {
    }
  };
  const onPhoneCheckInputHandler = (e) => {
    const regex = /^[0-9\b -]{0,4}$/;
    if (regex.test(e.target.value)) {
      setPhoneCheckInput(e.target.value);
      //console.log("인증번호 : " + phoneCheckInput);
      /* 일단 임시로 true로 해놓음. 나중에 백이랑 통신 후 인증 성공 시에만 true로 바꾸고, 실패시엔 false로 바꾸기 */
      setPhoneVaild(true);
    }
  };
  const onDevInputHandler = (e) => {
    //console.log(e.target.value);
    setDevInput(e.target.value);
    setDevVaild(true);
  };
  const onRegisterButtonHandler = (e) => {
    let valid = false;
    valid = emailVaild && pwdVaild && pwdCheckVaild && phoneVaild && devVaild;
    if (valid == true) {
      alert("우왕굿");
    } else {
      alert("안돼임마");
    }
  };
  useEffect(() => {
    // 폰넘버에 하이폰 자동으로 넣어주는 코드
    if (phoneInput.length === 10) {
      setPhoneInput(phoneInput.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneInput.length === 13) {
      setPhoneInput(
        phoneInput
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phoneInput]);
  useEffect(() => {
    if (pwdCheckInput === pwdInput) {
      console.log("우잉?.");
      setPwdCheckMsg("");
      setPwdCheckVaild(true);
      console.log(pwdCheckMsg);
    } else if (pwdCheckInput != "") {
      //console.log("비번다르다!!!!!!!!!!!!!!!!!!!!");
      setPwdCheckMsg("비밀번호가 다릅니다. 다시 한 번 확인해주세요.");
      setPwdCheckVaild(false);
    }
    //onPhoneCheckInputHandler(phoneCheckInput);
  }, [pwdInput]);
  return (
    <div class="w-full font-test">
      <div className="Header" class="">
        <div class="mt-10 text-center">
          <h1 class="text-black font-rumpi text-6xl">Propofol</h1>
          <p class="text-2xl opacity-90 font-ltest text-gray-500">
            ( <a class="font-sbtest text-black">Pro</a>file +{" "}
            <a class="font-sbtest text-black">Po</a>rt
            <a class="font-sbtest text-black">fol</a>io )
          </p>
        </div>
      </div>
      <div className="Login" class="flex flex-col gap-6 mt-16">
        <div>
          <div class="flex gap-2 relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
            <input
              class=" py-2 px-3 border rounded-lg bg-gray-50 w-7/10 focus:outline-0 text-lg font-ltest"
              placeholder="이메일"
              type="text"
              onChange={onEmailInputHandler}
            />
            <button
              class="rounded-lg bg-gray-500 text-white flex-grow"
              onClick={onEmailCheckHandler}
            >
              중복 확인
            </button>
          </div>
          <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 text-red-500 font-ltest mt-1 min-w-[20rem]">
            {emailMsg}
          </div>
        </div>
        <div class="flex gap-2 relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <input
            class=" py-2 px-3 border rounded-lg bg-gray-50 w-7/10 focus:outline-0 text-lg font-ltest"
            placeholder="닉네임"
            type="text"
            onChange={onNickNameInputHandler}
          />
          <button
            class="rounded-lg bg-gray-500 text-white flex-grow"
            onClick={onNickNameCheckHandler}
          >
            중복 확인
          </button>
        </div>
        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <input
            class="w-full py-2 px-3 border rounded-lg bg-gray-50 focus:outline-0 text-lg font-ltest"
            placeholder="이름"
            type="text"
            onChange={onNameInputHandler}
          />
        </div>

        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <input
            class="w-full py-2 px-3 border rounded-lg bg-gray-50 focus:outline-0 text-lg font-ltest"
            placeholder="비밀번호"
            type="password"
            onChange={onPasswordInputHandler}
          />
          <div class="text-red-500 font-ltest mt-1">{pwdMsg}</div>
        </div>
        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <input
            class="w-full py-2 px-3 border rounded-lg bg-gray-50 focus:outline-0 text-lg font-ltest"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onPasswordCheckHandler}
          />
          <div class="text-red-500 font-ltest mt-1">{pwdCheckMsg}</div>
        </div>
        <div class="flex gap-2 relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <input
            class="py-2 px-3 border rounded-lg bg-gray-50 w-7/10 focus:outline-0 text-lg font-ltest"
            placeholder="핸드폰 번호"
            type="text"
            onChange={onPhoneInputHandler}
            value={phoneInput}
          />
          <button class="rounded-lg bg-gray-500 text-white flex-grow">
            인증
          </button>
        </div>
        <div class="flex gap-2 relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <input
            class=" py-2 px-3 border rounded-lg bg-gray-50 w-7/10 focus:outline-0 text-lg font-ltest"
            placeholder="인증번호"
            type="text"
            onChange={onPhoneCheckInputHandler}
            value={phoneCheckInput}
          />
          <button class="rounded-lg bg-gray-500 text-white flex-grow">
            확인
          </button>
        </div>

        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 flex items-center justify-center gap-3 mt-2">
          <input
            type="checkbox"
            class="rounded-sm appearance-none w-5 h-5 border border-gray-300 checked:border-transparent checked:back
        form-tick min-w-[1em] min-h-[1em]
        "
          />
          <div class="text-center text-gray-400 2xl:text-baselg font-ltest min-w-[18em] xl:text-base">
            이용약관 및 개인정보 처리방침에 동의합니다.
          </div>
        </div>
        <button
          class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 rounded-lg bg-black text-white py-3 mt-3 text-2xl font-sbtest min-w-[20rem]"
          onClick={() => {
            const t = {
              email: emailInput,
              password: pwdInput,
              username: nameInput,
              nickname: nickNameInput,
              phoneNumber: phoneInput,
            };
            console.log(t);
            postRegister(t);
            //onLoginButtonHandler();
            //onRegisterButtonHandler();
            /*
            const data1 = {
              email: emailInput,
              password: pwdInput,
              phone: phoneInput,
              dev: devInput,
            };
            console.log(data1);
            */
          }}
        >
          계정 만들기
        </button>
        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 mt-1 mb-5 border-t pt-5 border-gray-400 flex justify-center gap-2 text-gray-500 font-ltest text-center min-w-[20rem]">
          <div>이미 계정이 있다면? </div>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인{">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
