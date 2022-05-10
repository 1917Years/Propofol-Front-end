import { React, useState } from "react";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";

function T4() {
  return (
    <div class="w-full bg-gradient-to-b from-bg7 to-bg8">
      <div class="pt-14 bg-bg7"></div>
      <div class="bg-white w-5/6 mx-auto flex">
        <div class="basis-1/2">
          <div class="flex flex-col w-1/2 mt-14 items-center mx-auto">
            <div class="font-sbtest text-black text-4xl text-center">
              신유진
            </div>
            <div class="font-timeless font-semibold">Frontend Developer</div>
            <div className="ProfileImage" class="mt-10 w-60 h-60 rounded-full">
              <img
                src={profileImage}
                class="w-60 h-60 rounded-full drop-shadow-lg"
                alt="profile"
              />
            </div>
          </div>

          <div class="mt-10 mx-auto w-1/2 h-0.5 bg-black"></div>
          <div class="mt-5 mx-auto w-1/2">
            <div className="aboutMe">
              <div class="font-timelessB text-3xl">ABOUT ME</div>
              <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
              <div>
                <a class="mr-3 font-sbtest">연락처</a> 010-1234-5678
              </div>
              <div>
                <a class="mr-3 font-sbtest">이메일</a> email1234@email.com
              </div>
              <div>
                <a class="mr-3 font-sbtest">Github</a>{" "}
                https://github.com/1917Years
              </div>
              <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div> 안녕하세요.
              저는 개발자 신유진입니다. 개발을 저의 인생 모토로 삼아 일일 공부를
              목표로 하여 TIL 블로그를 운영하고 있습니다. 사람들에게 더 편리한
              UI를 제공하는 것을 목표로 삼아 멋진 디자인을 만드는 프론트엔드
              디자이너가 되기 위해 오늘도 달리는 중입니다. :D
            </div>
            <div class="mb-5 mt-10 mx-auto h-0.5 bg-black"></div>
            <div className="skills">
              <div class="font-timelessB text-3xl">SKILLS</div>
              <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9  shadow-md"></div>
                <div class="ml-4 font-iroBatang text-xl">Java</div>
              </div>
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9  shadow-md"></div>
                <div class="ml-4 font-iroBatang text-xl">JavaScript</div>
              </div>
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9  shadow-md"></div>
                <div class="ml-4 font-iroBatang text-xl">Spring</div>
              </div>
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9  shadow-md"></div>
                <div class="ml-4 font-iroBatang text-xl">Python</div>
              </div>
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9  shadow-md"></div>
                <div class="ml-4 font-iroBatang text-xl">Android</div>
              </div>
            </div>
            <div class="mb-5 mt-10 mx-auto h-0.5 bg-black"></div>
            <div className="award">
              <div class="font-timelessB text-3xl">AWARD</div>
              <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
              <div class="ml-2 flex flex-col gap-10 py-3 border-l-2 border-gray-600 px-3 ">
                <div class="flex gap-1 items-center">
                  <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                  <div class="mr-2 font-sbtest">2019.01</div>
                  <div class="font-test">전국 공모전 대상 수상</div>
                </div>
                <div class="flex gap-1 items-center">
                  <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.10)]"></div>
                  <div class="mr-2 font-sbtest">2020.03</div>
                  <div class="font-test">웹 프로젝트 공모전 우수상 수상</div>
                </div>
                <div class="flex gap-1 items-center">
                  <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                  <div class="mr-2 font-sbtest">2021.05</div>
                  <div class="font-test">AAA 대회 대상 수상</div>
                </div>
                <div class="flex gap-1 items-center">
                  <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.10)]"></div>
                  <div class="mr-2 font-sbtest">2022.01</div>
                  <div class="font-test">BBB 대회 대상 수상</div>
                </div>
              </div>
            </div>
            <div class="mb-5 mt-10 mx-auto h-0.5 bg-black"></div>
            <div className="workExperience" class="mb-10">
              <div class="font-timelessB text-3xl">WORK EXPERIENCE</div>
              <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
              <div class="ml-2 flex flex-col gap-10 py-3 border-l-2 border-gray-600 px-3">
                <div className="workExperience1">
                  <div class="flex items-center">
                    <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                    <div class="font-sbtest text-xl">ABC System(가칭)</div>
                  </div>
                  <div class="font-ltest ml-4 text-gray-500">
                    2018.05 ~ 2022.04
                  </div>
                  <div class="ml-4 font-test mt-4">
                    - xxx 서비스 개발 및 yyy 업무 총괄
                  </div>
                  <div class="ml-4 font-test">- zzz 스킬 n년 사용</div>
                </div>
                <div className="workExperience2">
                  <div class="flex items-center">
                    <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                    <div class="font-sbtest text-xl">DEF System(가칭)</div>
                  </div>
                  <div class="font-ltest ml-4 text-gray-500">
                    2018.05 ~ 2022.04
                  </div>
                  <div class="ml-4 font-test mt-4">
                    - ooo 팀의 개발 팀장으로 활동
                  </div>
                  <div class="ml-4 font-test">- n년간의 테크리더 진행</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-1/2">
          <div className="project" class="w-3/4">
            <div class="mt-10 mx-auto h-0.5 bg-black"></div>
            <div class="mt-4 font-timelessB text-3xl">PROJECT</div>
            <div class="mt-4 mb-5 mx-auto h-0.25 bg-black"></div>

            <div className="project1">
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9 shadow-md"></div>
                <div class="ml-3 font-btest text-2xl align-middle">Gitime</div>
              </div>
              <div class="font-test text-gray-900 px-5">
                <div
                  class="mt-2 mb-4 w-full h-full flex items-center"
                  style={{ minHeight: "14rem" }}
                >
                  <img
                    src={projectImage}
                    class="w-full h-full drop-shadow-md"
                    style={{ maxHeight: "14rem" }}
                    alt="profile"
                  />
                </div>
                <div>
                  <a class="mr-3 font-sbtest">개발 날짜</a> 2021.09 ~ 2021.12
                </div>
                <div>
                  <a class="mr-3 font-sbtest">맡은 직군</a> FrontEnd
                </div>
                <div>
                  <a class="mr-3 font-sbtest">사용 기술</a> JavaScript, React
                </div>

                <div class="text-gray-600 font-test break-all mt-4">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 rounded-full bg-gray-600"></div>
                    <div class="w-full text-gray-800 font-sbtest">
                      프로젝트 설명
                    </div>
                  </div>
                  Gitime는 기존의 깃허브 시스템과 연동하여 대시보드(Dashboard)를
                  제공하는 새로운 팀 협업 웹 서비스입니다. Gitime에서는 깃허브의
                  Collaborator를 통해 하나의 팀이 구성되면 투두(To-do) 리스트를
                  통한 진행률 관리, 실시간 채팅 및 화상 회의를 통한
                  커뮤니케이션, 팀 내 게시판 보드, API End-Point 생성을 통한
                  소스코드 컴파일, 대시보드를 통한 시각화 등 프로젝트 관리를
                  위한 다양한 기능을 제공하고 있습니다.
                </div>
              </div>
            </div>

            <div className="project2" class="mt-10">
              <div class="flex gap-1 items-center">
                <div class="w-3 h-3 bg-bg9 shadow-md"></div>
                <div class="ml-3 font-btest text-2xl align-middle">
                  Propofol
                </div>
              </div>
              <div class="mt-3 font-test text-gray-900 px-5">
                <div
                  class="mb-3 w-full h-full flex items-center"
                  style={{ minHeight: "14rem" }}
                >
                  <img
                    src={projectImage2}
                    class="w-full h-full drop-shadow-md"
                    style={{ maxHeight: "14rem" }}
                    alt="profile"
                  />
                </div>
                <div>
                  <a class="mr-3 font-sbtest">개발 날짜</a> 2022.03 ~ 2022.06
                </div>
                <div>
                  <a class="mr-3 font-sbtest">맡은 직군</a> FrontEnd
                </div>
                <div>
                  <a class="mr-3 font-sbtest">사용 기술</a> JavaScript, React
                </div>

                <div class="text-gray-600 font-test break-all mt-4">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 rounded-full bg-gray-600"></div>
                    <div class="w-full text-gray-800 font-sbtest">
                      프로젝트 설명
                    </div>
                  </div>
                  Propofol은 개발자를 지망하는 학생들을 위한 경력 개발 도움 웹
                  서비스입니다. 프로포폴은 학생들이 경력을 쌓고 기록하는 것을
                  용이하게 진행할 수 있도록 TIL 블로그 기능, 포트폴리오 생성
                  기능, 프로젝트 매칭 기능, 프로젝트 관리 기능을 제공하고
                  있습니다.
                </div>
              </div>
            </div>
          </div>
          <div className="blog" class="w-3/4 mt-10 mb-10">
            <div class="mt-10 mx-auto h-0.5 bg-black"></div>
            <div class="mt-4 font-timelessB text-3xl">BLOG</div>
            <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
            <div class="font-ltest text-lg">
              🔗 https://www/propofol/blog/username(임시 주소)
            </div>
            <div class="flex items-center gap-2 mb-1 mt-4">
              <div class="w-2 h-2 rounded-full bg-gray-600"></div>
              <div class="text-lg w-full text-gray-800 font-sbtest">
                추천수 상위글
              </div>
            </div>
            <div
              class="mt-6 w-full relative py-4 px-6 border-2 border-gray-300 rounded-md shadow-lg bg-white"
              style={{ minHeight: "12rem" }}
            >
              <div class="flex items-center">
                <div class="text-xl text-gray-700 font-sbtest text-center">
                  React란? 리액트 기초부터 심화 내용까지 한 번에 알아보기
                </div>
              </div>
              <div
                class="flex justify-center items-center mt-3 gap-6"
                style={{ maxHeight: "14rem", minWidth: "12rem" }}
              >
                <div
                  class="w-[10rem] h-[8.5rem] bg-black"
                  style={{ minWidth: "10rem" }}
                ></div>
                <div class="font-ltest">
                  지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법
                  기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.
                  대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를
                  존중함을 기본으로 한다...(더보기)
                </div>
              </div>
              <div class="mt-1 flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                <div>2022.05.07 </div>
                <div>추천수 99999</div>
              </div>
            </div>
            <div
              class="mt-6 w-full relative py-4 px-6 border-2 border-gray-300 rounded-md shadow-lg bg-white"
              style={{ minHeight: "12rem" }}
            >
              <div class="flex items-center">
                <div class="text-xl text-gray-700 font-sbtest text-center">
                  Spring이란? 스프링 기초부터 심화까지 한 번에 알아보기
                </div>
              </div>
              <div
                class="flex justify-center items-center mt-3 gap-6"
                style={{ maxHeight: "14rem", minWidth: "12rem" }}
              >
                <div
                  class="w-[10rem] h-[8.5rem] bg-black"
                  style={{ minWidth: "10rem" }}
                ></div>
                <div class="">
                  <div class="font-ltest relative py-2 break-all">
                    법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여
                    심판한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이
                    헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에
                    의한 대통령 및 국회의원의 선거...(더보기)
                  </div>
                </div>
              </div>
              <div class="mt-1 flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                <div>2022.05.07 </div>
                <div>추천수 99999</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-14 bg-bg8"></div>
    </div>
  );
}

export default T4;
