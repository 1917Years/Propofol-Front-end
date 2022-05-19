import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import profileImage from "../../assets/img/profile.jpg";


let tmpSkillList = [];
let tmpWorkList = [];
let tmpPrjSkillsList = [];
let tmpPrjList = [];

function PortfolioMain() {
  const [skillsAdd, setSkillsAdd] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [workNameInput, setWorkNameInput] = useState("");
  const [workDetailInput, setWorkDetailInput] = useState("");
  const [workAdd, setWorkAdd] = useState(false);
  const [prjName, setPrjName] = useState("");
  const [prjImg, setPrjImg] = useState(null);
  const [prjDevStart, setPrjDevStart] = useState("");
  const [prjDevEnd, setPrjDevEnd] = useState("");
  const [prjDev, setPrjDev] = useState("");
  const [prjSkillsList, setPrjSkillsList] = useState([]);
  const [prjSkillInput, setPrjSkillInput] = useState("");
  const [prjSkillsAdd, setPrjSkillsAdd] = useState(false);
  const [prjDetailInput, setPrjDetailInput] = useState("");
  const [projectAdd, setProjectAdd] = useState(false);

  const [userInfo, setUserInfo] = useState([]);
  const [checkProfile, setCheckProfile] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileType, setProfileType] = useState();


  const onWorkInputHandler = () => {
    let tmpWork = { name: workNameInput, detail: workDetailInput };
    tmpWorkList.push(tmpWork);
    console.log(tmpWork);
    setWorkAdd(false);
  };

  const onSkillInputHandler = (event) => {
    let tmpSkill = skillInput;
    tmpSkillList.push(tmpSkill);
    console.log(tmpSkill);
    setSkillsAdd(false);
  };

  const onPrjSkillInputHandler = (event) => {
    tmpPrjSkillsList.push(prjSkillInput);
    setPrjSkillsList(tmpPrjSkillsList);
    console.log(tmpPrjSkillsList);
    setPrjSkillsAdd(false);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onSkillInputHandler(event);
    }
  };

  const onProfileButtonHandler = (e) => {
    const myInput = document.getElementById("input-file");
    myInput.click();
  };

  const onProfileInputHandler = (e) => {
    const formData = new FormData();
    formData.append('profile', e.target.files[0]);
    // console.log(e.target.files[0]);

    axios
      .post(SERVER_URL + "/user-service/api/v1/members/profile", formData)
      .then((res) => {
        console.log("프로필 이미지 확인ㅇㅇㅇ");
        console.log(res.data.data);
        setProfileType(res.data.data.profileType);
        setProfileImg(res.data.data.profileBytes);
        console.log(profileType)
        console.log(profileImg);
      })
      .catch((err) => {
        console.log(err);
        console.log("뭐야 ㅅㅄㅄ");
        console.log(err.request);
      });

    console.log("여기 찍힘???");


  }

  useEffect(() => {
    axios
      .get(SERVER_URL + "/user-service/api/v1/members")
      .then((res) => {
        console.log("여기 찍힘?");
        let tmpCm = {
          email: res.data.data.email,
          phone: res.data.data.phoneNumber,
          username: res.data.data.username
        }
        setUserInfo(tmpCm);
      })
      .catch((err) => {
        console.log(err);
        console.log("뭐야 ㅅㅄㅄ");
      });

    axios
      .get(SERVER_URL + "/user-service/api/v1/members/profile")
      .then((res) => {
        console.log("프로필 이미지 조회");
        console.log(res.data.data);
        if (res.data.data.profileType == null) {
          console.log("프로필 없삼");
          setCheckProfile(false);
        }
        else {
          console.log("이미 프로필 이미지 있삼");
          setProfileType(res.data.data.profileType);
          setProfileImg(res.data.data.profileBytes);
          console.log(profileType);
          console.log(profileType);
          setCheckProfile(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("오류가 나버림");
      });

  }, []);

  return (
    <div class="bg-white font-test">
      <div class="w-1/2 mt-10 mx-auto">
        <section class="lg:flex gap-5 items-center">
          <div class="grow font-sbtest text-5xl">포트폴리오</div>
          <button class="px-5 py-2 bg-black rounded-xl text-white text-xl">
            템플릿 변경
          </button>
          <button class="px-5 py-2 bg-black rounded-xl text-white text-xl">
            생성하기
          </button>
        </section>
        <section class="mt-16">
          <div class="border-b pb-10 border-gray-300">
            <div class="text-2xl">사용자 정보</div>
            <div class="w-[95%] mx-auto mt-4 px-5">
              <div>
                <div class="text-xl mt-4">프로필 이미지</div>
                <button
                  className="ProfileImage"
                  class="mx-auto mt-4 w-36 h-36 rounded-full"
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
                    src={checkProfile == false ? profileImage : "data:image/" + profileType + ";base64," + profileImg}
                    class="w-36 h-36 rounded-full drop-shadow-md"
                    alt="profile"
                  />
                </button>
              </div>
              <div>
                <div class="text-xl mt-4">이름</div>
                <input
                  class="w-[40%] mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-200 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  placeholder={userInfo.username}
                  type="text"
                  disabled
                />
              </div>
              <div class="w-[40%]">
                <div class="text-xl mt-4">핸드폰 번호</div>
                <input
                  class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-200 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  placeholder={userInfo.phone}
                  type="text"
                  disabled
                />
              </div>
              <div class="w-[40%]">
                <div class="text-xl mt-4">이메일</div>
                <input
                  class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-200 focus:outline-0 text-lg font-ltest min-w-[20rem] "
                  placeholder={userInfo.email}
                  type="text"
                  disabled
                />
              </div>

              <div>
                <div class="text-xl mt-4">직무</div>
                <input
                  class="w-[40%] mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  placeholder="간단한 직무명을 입력해주세요."
                  type="text"
                />
              </div>

              <div>
                <div class="text-xl mt-4">깃허브 주소</div>
                <input
                  class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  placeholder="https://github.com/userId"
                  type="text"
                />
              </div>

              <div>
                <div class="text-xl mt-4">한줄소개</div>
                <div class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 text-lg font-ltest min-w-[20rem] ">

                  <textarea
                    class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 min-h-[10rem] "
                    placeholder="자기소개를 입력해주세요."

                  />

                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="mt-10">
          <div class="border-b pb-10 border-gray-300">
            <div class="text-2xl">기술 및 이력 정보</div>
            <div class="w-[95%] mx-auto mt-4 px-5">
              <div>
                <div class="text-xl mt-4">사용 기술</div>
                <div class="flex items-center gap-5">
                  {tmpSkillList.map((item) => {
                    return (
                      <div class="w-1/6 mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 text-lg font-ltest min-w-[8rem]">
                        {item}
                      </div>
                    );
                  })}
                  {skillsAdd ? (
                    <div>
                      <input
                        class="w-1/6 mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-white focus:outline-0 text-lg font-ltest min-w-[8rem]"
                        placeholder="내 스킬정보(til에서 만들어짐)"
                        onKeyPress={(e) => onKeyPress(e)}
                        onChange={(e) => setSkillInput(e.currentTarget.value)}
                      />
                    </div>
                  ) : (
                    <button
                      class="w-1/6 mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[8rem]"
                      onClick={() => {
                        setSkillsAdd(true);
                      }}
                    >
                      +
                    </button>
                  )}
                </div>
                <button class="w-[20rem] xl:w-[15%] mt-2 py-2 px-4 bg-black text-white text-lg font-ltest rounded-xl min-w-[5rem]">
                  추가하기
                </button>
              </div>
              <div>
                <div class="text-xl mt-4">경력</div>
                {tmpWorkList.map((item) => {
                  return (
                    <div class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 text-lg font-ltest min-w-[20rem] ">
                      <div class="w-full border-b border-gray-300 pt-1 pb-2 bg-gray-50 font-test text-gray-800">
                        {item.name}
                      </div>
                      <div class="w-full mt-5 bg-gray-50 pb-3 min-h-[10rem] font-ltest text-gray-500">
                        {item.detail}
                      </div>
                    </div>
                  );
                })}
                {workAdd ? (
                  <div class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-white text-lg font-ltest min-w-[20rem] ">
                    <input
                      class="w-full focus:outline-0 border-b border-gray-300 pt-1 pb-2 bg-inherit"
                      placeholder="경력명"
                      onChange={(e) => setWorkNameInput(e.currentTarget.value)}
                    />
                    <textarea
                      class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 border-b border-gray-300  min-h-[10rem] "
                      placeholder="설명"
                      onChange={(e) =>
                        setWorkDetailInput(e.currentTarget.value)
                      }
                    />
                    <div class="font-ltest text-lg text-gray-400 border-b border-gray-300 pb-4">
                      경력 기간
                      <div class="mt-4 flex justify-between items-center text-base text-center text-gray-500 ">
                        <div
                          class="border border-gray-300 rounded-md text-md w-[45%] py-2 px-3 focus:outline-0"
                        >
                          <input
                            class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                            placeholder="시작 일자"

                          />
                        </div>
                        <div>~</div>
                        <div
                          class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                        >
                          <input
                            class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                            placeholder="종료 일자"

                          />
                        </div>
                      </div>
                    </div>
                    <div class="w-full flex justify-end">
                      <button
                        class="w-[15%] ml-full py-1 px-4 bg-inherit text-gray-500 text-lg font-test rounded-xl min-w-[5rem]"
                        onClick={onWorkInputHandler}
                      >
                        추가하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                    onClick={() => {
                      setWorkAdd(true);
                    }}
                  >
                    +
                  </button>
                )}
              </div>
              <div class="text-xl mt-4">수상 이력</div>
              <div class="xl:flex justify-between w-full">
                <div class="w-[30%]">
                  <input
                    class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[10rem]"
                    placeholder="수상 일자"
                    type="text"
                  />
                </div>
                <div class="w-[50%]">
                  <input
                    class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                    placeholder="수상한 상 이름"
                    type="text"
                  />
                </div>
                <button class="w-[20rem] xl:w-[15%] mt-2 py-2 px-4 bg-black text-white text-lg font-ltest rounded-xl min-w-[5rem]">
                  추가하기
                </button>
              </div>
              <div>
                <div class="text-xl mt-4">참여한 프로젝트</div>
                {tmpPrjList.map((item) => {
                  return (
                    <div class="text-xl font-test bg-gray-50/50 rounded-xl text-gray-900 mt-2 border border-gray-300 px-10 pt-8 pb-4">
                      <div
                        class="w-full border-b border-gray-300 pb-2 font-test text-2xl mb-2 bg-inherit text-gray-700 focus:outline-0"
                      >
                        {item.name}
                      </div>
                      <div class="flex justify-center gap-5 mt-5">
                        <div class="flex flex-col items-center">
                          <img
                            class="w-60rem h-60rem border border-gray-300"
                            src={item.img}
                            style={{ minHeight: "17rem", minWidth: "26rem", maxHeight: "17rem", maxWidth: "26rem" }}
                          />
                        </div>
                        <div class="w-full flex flex-col gap-4 px-3 justify-center">
                          <div class="mr-3 font-test text-xl px-1">
                            개발 날짜
                            <div class="mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                              <div
                                class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                              >
                                {item.start}
                              </div>
                              <div>~</div>
                              <div
                                class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                              >
                                {item.end}
                              </div>
                            </div>
                          </div>
                          <div class="flex gap-6 font-test text-lg items-center">
                            <div class="font-test text-xl pl-1 pr-3 border-r border-gray-300 ">
                              맡은 직군
                            </div>
                            <div
                              class="text-gray-600 w-1/2"
                            >
                              {item.dev}
                            </div>
                          </div>

                          <div class="mr-3 font-test text-xl">
                            <div class="border-b border-gray-400 w-full px-1 pb-2">
                              사용 기술
                            </div>
                            <div class="grid grid-cols-3 text-gray-600 text-base mt-3 gap-3">
                              {item.skills.map((skill) => {
                                return (
                                  <div class="w-full rounded-lg bg-gray-50 border border-gray-300 px-2 text-center py-1 ">
                                    {skill}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="text-gray-600 mt-5 font-test text-lg break-all border-b border-gray-300">
                        <div class="border-b border-gray-300 w-full pb-2 mb-2 text-gray-700">
                          프로젝트 설명
                        </div>
                        <div
                          class="w-full bg-inherit min-h-[10rem] "
                        >
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {projectAdd ? (
                  <div class="text-xl mt-5 font-test bg-white rounded-xl text-gray-900 mt-2 border border-gray-300 px-10 pt-8 pb-4">
                    <input
                      class="w-full border-b border-gray-300 pb-2 font-test text-2xl mb-2 bg-inherit text-gray-700 focus:outline-0"
                      placeholder="프로젝트명 입력"
                      onChange={(e) => { setPrjName(e.target.value); }}
                    />
                    <div class="flex justify-center gap-5 mt-5">


                      {prjImg ?
                        (<div class="flex flex-col items-center">
                          <img
                            class="w-60rem h-60rem border border-gray-300"
                            src={prjImg}
                            style={{ minHeight: "17rem", minWidth: "26rem", maxHeight: "17rem", maxWidth: "26rem" }}
                          />
                          <label for="input-prjimg" class="w-full flex justify-end">
                            <div
                              class="mt-3 w-1/4 py-1 text-base text-white bg-gray-500 rounded-xl text-center focus:outline-0 flex flex-col justify-center cursor-pointer"
                            >
                              <div>사진 수정</div>
                            </div>
                          </label>
                        </div>) :
                        (<div>
                          <label for="input-prjimg" class="">
                            <div
                              class="w-full h-full text-lg text-gray-500 rounded-xl border border-dashed border-gray-300 text-center focus:outline-0 flex flex-col justify-center cursor-pointer"
                              style={{ minHeight: "18rem", minWidth: "26rem", maxHeight: "18rem", maxWidth: "26rem" }}
                            >
                              <div>+</div>프로젝트 대표 이미지 추가
                            </div>
                          </label>
                        </div>)}
                      <input
                        type="file"
                        accept="image/*"
                        id="input-prjimg"
                        class="w-0 h-0"
                        onChange={(e) => {
                          console.log(e.target.value);
                          if (e.target.value.length > 0) {
                            let imgTarget = (e.target.files)[0];
                            let fileReader = new FileReader();
                            fileReader.readAsDataURL(imgTarget);
                            fileReader.onload = function (evt) {
                              /* file을 꺼내서 State로 지정 */
                              setPrjImg(evt.target.result);
                            }
                          }
                        }}
                      />

                      <div class="w-full flex flex-col gap-4 px-3 justify-center">
                        <div class="mr-3 font-test text-xl px-1">
                          개발 날짜
                          <div class="mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                            <input
                              class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                              onChange={(e) => { setPrjDevStart(e.target.value); }}
                            />
                            <div>~</div>
                            <input
                              class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                              onChange={(e) => { setPrjDevEnd(e.target.value); }}
                            />
                          </div>
                        </div>
                        <div class="flex gap-6 font-test text-lg items-center">
                          <div class="font-test text-xl pl-1 pr-3 border-r border-gray-300 ">
                            맡은 직군
                          </div>
                          <input
                            class="text-gray-600 w-1/2 focus:outline-0"
                            placeholder="입력"
                            onChange={(e) => { setPrjDev(e.target.value); }}
                          />
                        </div>
                        <div class="mr-3 font-test text-xl">
                          <div class="border-b border-gray-400 w-full px-1 pb-2">
                            사용 기술
                          </div>
                          <div class="grid grid-cols-3 text-gray-600 text-base mt-3 gap-3">
                            {prjSkillsList.map((item) => {
                              return (
                                <div class="w-full rounded-lg bg-gray-50 border border-gray-300 px-2 text-center py-1 ">
                                  {item}
                                </div>
                              );
                            })}
                            {prjSkillsAdd ? (
                              <input
                                class="w-full rounded-lg border border-gray-300 px-2 text-center py-1 focus:outline-0"
                                placeholder="입력"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    onPrjSkillInputHandler(e);
                                  }
                                }}
                                onChange={(e) => {
                                  setPrjSkillInput(e.target.value);
                                }}
                              />
                            ) : (
                              <button
                                class="w-full rounded-lg border border-dashed border-gray-300 p-1"
                                onClick={() => {
                                  setPrjSkillsAdd(true);
                                }}
                              >
                                +
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-gray-600 mt-5 font-test text-lg break-all border-b border-gray-300">
                      <div class="border-b border-gray-300 w-full pb-2 mb-2 text-gray-700">
                        프로젝트 설명
                      </div>
                      <textarea
                        class="w-full focus:outline-0 resize-none bg-inherit min-h-[10rem] "
                        placeholder="설명"
                        onChange={(e) => {
                          setPrjDetailInput(e.target.value);
                        }}
                      />
                    </div>
                    <div class="w-full flex justify-end">
                      <button class="w-[15%] ml-full py-1 mt-1 px-4 bg-inherit text-gray-800 text-lg font-test rounded-xl min-w-[5rem]"
                        onClick={() => {
                          const data = {
                            name: prjName,
                            start: prjDevStart,
                            end: prjDevEnd,
                            skills: prjSkillsList,
                            detail: prjDetailInput,
                            img: prjImg,
                          };
                          tmpPrjList.push(data);
                          setProjectAdd(false);
                          setPrjName("");
                          setPrjDevStart("");
                          setPrjDevEnd("");
                          setPrjSkillsList([]);
                          setPrjDetailInput("");
                          setPrjImg(null);
                          console.log(data);
                        }}
                      >
                        추가하기
                      </button>
                    </div>
                  </div>) : (<button
                    class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                    onClick={() => {
                      setProjectAdd(true);
                    }}
                  >
                    +
                  </button>)}

              </div>
              <div>
                <div class="text-xl mt-4">블로그</div>
                <div class="w-full mt-2 pt-3 pb-6 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]">
                  <div class="w-full border-b border-gray-300 pb-1 text-gray-500">
                    블로그 주소.com
                  </div>
                  <div>
                    <div class="w-full border-b border-gray-300 pb-1 mb-3 mt-8 text-gray-500">
                      추천수 상위글
                    </div>
                    <div class="w-full flex px-5 items-center gap-5 text-gray-500 text-md">
                      <div class="w-3 h-3 rounded-full bg-gray-500"></div>
                      <div class="grow">글 제목</div>
                      <div>추천수 : 123</div>
                      <div>2022.05.10</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
}

export default PortfolioMain;
