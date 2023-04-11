import { React, useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import profileImage from "../assets/img/profile.jpg";

function MyPage() {
  const [userInfo, setUserInfo] = useState([]);
  const [checkProfile, setCheckProfile] = useState(false);
  /*입력*/
  const [nickNameInput, setNickNameInput] = useState("");
  const [pwdInput, setPwdInput] = useState("");
  const [pwdCheckInput, setPwdCheckInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneCheckInput, setPhoneCheckInput] = useState("");
  /*메시지*/
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdCheckMsg, setPwdCheckMsg] = useState("");
  /*유효성*/
  const [nickNameVaild, setNickNameVaild] = useState(false);
  const [pwdVaild, setPwdVaild] = useState(false);
  const [pwdCheckVaild, setPwdCheckVaild] = useState(false);
  const [phoneVaild, setPhoneVaild] = useState(false);

  const [profileImg, setProfileImg] = useState();
  const [profileType, setProfileType] = useState();

  const onNickNameInputHandler = (e) => {
    setNickNameInput(e.target.value);
  };

  const onNickNameCheckHandler = (e) => {
    if (nickNameInput == "") {
      setNickNameMsg("닉네임을 입력해주세요.");
    } else {
      postNickName({ nickname: nickNameInput });
    }
  };

  const onPasswordInputHandler = (e) => {
    setPwdInput(e.target.value);
    if (e.target.value.length > 16) {
      setPwdMsg("비밀번호가 너무 깁니다. 16글자 이하로 입력해주세요.");
      setPwdVaild(false);
    } else if (e.target.value.length < 8) {
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
      setPhoneVaild(true);
    }
  };

  const onProfileButtonHandler = (e) => {
    const myInput = document.getElementById("input-file");
    myInput.click();
  };

  const onProfileInputHandler = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);

    axios
      .post(SERVER_URL + "/user-service/api/v1/members/profile", formData)
      .then((res) => {
        console.log("프로필 이미지 확인");
        console.log(res.data.data);
        setProfileType(res.data.data.profileType);
        setProfileImg(res.data.data.profileBytes);
        console.log(profileType);
        console.log(profileImg);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.request);
      });
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "/user-service/api/v1/members")
      .then((res) => {
        let tmpCm = {
          email: res.data.data.email,
          nickname: res.data.data.nickname,
          phone: res.data.data.phoneNumber,
          username: res.data.data.username,
        };
        setUserInfo(tmpCm);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(SERVER_URL + "/user-service/api/v1/members/profile")
      .then((res) => {
        console.log("프로필 이미지 조회");
        console.log(res.data.data);
        if (res.data.data.profileType == null) {
          console.log("프로필 없삼");
          setCheckProfile(false);
        } else {
          console.log("이미 프로필 이미지 있삼");
          setProfileType(res.data.data.profileType);
          setProfileImg(res.data.data.profileString);
          console.log(res.data.data.profileType);
          console.log(res.data.data.profileString);
          setCheckProfile(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("오류가 나버림");
      });
  }, []);

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

  function updateInfo(data) {
    console.log("확인");
    console.log(data);
    axios
      .post(
        SERVER_URL + "/user-service/api/v1/members/update",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.request);
      });
  }

  function postNickName(data) {
    console.log(data);
    console.log(JSON.stringify(data));
    axios
      .post(SERVER_URL + "/user-service/auth/nickname", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.result);
        setNickNameVaild(true);
        setNickNameMsg("사용 가능한 닉네임입니다.");
      })
      .catch((err) => {
        console.log(err.request);
        setNickNameVaild(false);
        setNickNameMsg(
          "이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요."
        );
      });
  }

  return (
    <div class="w-full font-test">
      <div className="myPage" class="flex flex-col gap-6 mt-4">
        <button
          className="ProfileImage"
          class="mx-auto mt-10 w-36 h-36 rounded-full"
          onClick={onProfileButtonHandler}
        >
          <input
            type="file"
            accept="image/*"
            id="input-file"
            class="hidden"
            onChange={onProfileInputHandler}
          />

          <img
            src={
              checkProfile == false
                ? profileImage
                : "data:image/" + profileType + ";base64," + profileImg
            }
            class="w-36 h-36 rounded-full drop-shadow-md"
            alt="profile"
          />
        </button>
        <div>
          <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
            <div class="text-gray-500 w-full py-2 px-3 border rounded-lg bg-gray-200 focus:outline-0 text-lg font-ltest">
              {userInfo.email}
            </div>
          </div>
        </div>
        <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
          <div class="text-gray-500 w-full py-2 px-3 border rounded-lg bg-gray-200 focus:outline-0 text-lg font-ltest">
            {userInfo.username}
          </div>
        </div>
        <div>
          <div class="flex gap-2 relative inset-x-1/2 transform -translate-x-1/2 w-1/5 min-w-[20rem]">
            <input
              class=" py-2 px-3 border rounded-lg bg-gray-50 w-7/10 focus:outline-0 text-lg font-ltest"
              placeholder={userInfo.nickname}
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
          <div class="relative inset-x-1/2 transform -translate-x-1/2 w-1/5 text-red-500 font-ltest mt-1 min-w-[20rem]">
            {nickNameMsg}
          </div>
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
            placeholder={userInfo.phone}
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

        <button
          class="mb-10 relative inset-x-1/2 transform -translate-x-1/2 w-1/5 rounded-lg bg-black text-white py-3 mt-3 text-2xl font-sbtest min-w-[20rem]"
          onClick={() => {
            const t = {
              nickname: nickNameInput,
              password: pwdInput,
              phoneNumber: phoneInput,
            };
            console.log(t);
            updateInfo(t);
          }}
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
}

export default MyPage;
