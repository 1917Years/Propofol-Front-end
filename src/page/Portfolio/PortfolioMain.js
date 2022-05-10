import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

function PortfolioMain() {
  const [skillsAdd, setSkillsAdd] = useState(false);
  const [workAdd, setWorkAdd] = useState(false);
  const [projectAdd, setProjectAdd] = useState(false);

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
                <button class="w-1/6 mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[8rem]">
                  +
                </button>
              </div>
              <div>
                <div class="text-xl mt-4">경력</div>
                <button class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]">
                  +
                </button>
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
                <button class="w-full mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]">
                  +
                </button>
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
