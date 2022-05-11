import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

let tmpSkillList = [];
let tmpWorkList = [];
let tmpPrjSkillsList = [];

function PortfolioMain() {
  const [skillsAdd, setSkillsAdd] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [workNameInput, setWorkNameInput] = useState("");
  const [workDetailInput, setWorkDetailInput] = useState("");
  const [workAdd, setWorkAdd] = useState(false);
  const [prjSkillsNumberList, setPrjSkillsNumberList] = useState([]);
  const [prjSkillsList, setPrjSkillsList] = useState([]);
  const [prjSkillInput, setPrjSkillInput] = useState("");
  const [prjSkillsAdd, setPrjSkillsAdd] = useState(false);
  const [projectAdd, setProjectAdd] = useState(false);

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

  return (
    <div class="bg-white font-test">
      <div class="w-1/2 mt-10 mx-auto">
        <section class="flex gap-5 items-center">
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
                <div class="text-xl mt-4">이름</div>
                <input
                  class="w-[40%] mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  placeholder="이름"
                  type="text"
                />
              </div>
              <div>
                <div class="text-xl mt-4">깃허브 주소</div>
                <input
                  class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  placeholder="깃허브 주소"
                  type="text"
                />
              </div>
              <div class="flex justify-between w-full">
                <div class="w-[40%]">
                  <div class="text-xl mt-4">핸드폰 번호</div>
                  <input
                    class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                    placeholder="핸드폰 번호"
                    type="text"
                  />
                </div>
                <div class="w-[40%]">
                  <div class="text-xl mt-4">이메일</div>
                  <input
                    class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem] "
                    placeholder="이메일"
                    type="text"
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
                        placeholder="입력"
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
              <div class="flex justify-between w-full">
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
                <button class="w-[15%] mt-2 py-2 px-4 bg-black text-white text-lg font-ltest rounded-xl min-w-[5rem]">
                  추가하기
                </button>
              </div>
              <div>
                <div class="text-xl mt-4">참여한 프로젝트</div>
                <button
                  class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                  onClick={() => {
                    setProjectAdd(true);
                  }}
                >
                  +
                </button>
                <div class="text-xl font-test bg-white rounded-xl text-gray-900 mt-20 border border-gray-300 px-10 pt-8 pb-4">
                  <input
                    class="w-full border-b border-gray-300 pb-2 font-test text-2xl mb-2 bg-inherit text-gray-700 focus:outline-0"
                    placeholder="프로젝트명 입력"
                  />
                  <div class="flex justify-center gap-10 mt-5">
                    <input
                      type="file"
                      accept="image/*"
                      id="input-prjimg"
                      class="w-0 h-0"
                    />
                    <label for="input-prjimg" class="">
                      <div
                        class="w-full h-full"
                        style={{ minHeight: "18rem", minWidth: "18rem" }}
                      >
                        <button
                          class="w-full h-full text-lg text-gray-500 rounded-xl border border-dashed border-gray-300 text-center focus:outline-0"
                          style={{ minHeight: "18rem" }}
                        >
                          <div>+</div>프로젝트 대표 사진 추가
                        </button>
                      </div>
                    </label>
                    <div class="w-3/4 flex flex-col gap-4 px-3 justify-center">
                      <div class="mr-3 font-test text-xl px-1">
                        개발 날짜
                        <div class="mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                          <input class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0" />
                          <div>~</div>
                          <input class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0" />
                        </div>
                      </div>
                      <div class="flex gap-6 font-test text-lg items-center">
                        <div class="font-test text-xl pl-1 pr-3 border-r border-gray-300 ">
                          맡은 직군
                        </div>
                        <input
                          class="text-gray-600 w-1/2 focus:outline-0"
                          placeholder="입력"
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
                    />
                  </div>
                  <div class="w-full flex justify-end">
                    <button class="w-[15%] ml-full py-1 mt-1 px-4 bg-inherit text-gray-800 text-lg font-test rounded-xl min-w-[5rem]">
                      추가하기
                    </button>
                  </div>
                </div>
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
      </div>
    </div>
  );
}

export default PortfolioMain;
