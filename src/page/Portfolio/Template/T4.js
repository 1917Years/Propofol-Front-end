import { React, useState } from "react";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";

function T4() {
  return (
    <div class="w-full bg-bg7">
      <div class="pt-14 bg-bg7"></div>
      <div class="bg-white w-5/6 mx-auto flex">
        <div class="basis-1/2">
          <div class="flex flex-col w-1/2 mt-28 items-center mx-auto">
            <div class="font-sbtest text-black text-4xl text-center">
              신유진
            </div>
            <div class="font-test">Frontend Developer</div>
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
            <div class="font-sbtest text-3xl">About me</div>
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
            <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div> 하이
          </div>
        </div>
        <div class="basis-1/2">오른쪽</div>
      </div>
      <div class="flex flex-col items-center bg-bg7">
        <div class="mt-10 w-1/2 flex items-center border-b border-gray-400 pb-12">
          <div class="pl-16 border-l border-gray-300 " id="aboutme">
            <div class="text-xl font-test text-gray-600 flex flex-col gap-7 mt-8"></div>
          </div>
        </div>
      </div>

      <section class="relative bg-bg7">
        <div class="w-1/2 mt-10 mx-auto flex justify-center border-b border-gray-400 pb-12">
          <div>
            <div class="mr-20">
              <div class="w-full flex items-center gap-5">
                <div class="text-gray-800 text-4xl font-sbtest text-center">
                  Skills
                </div>
              </div>

              <div class="text-2xl font-test text-gray-500 mt-8 flex items-center">
                <div class="flex flex-col gap-10 py-5">
                  <div class="flex gap-3">
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        Java
                      </a>
                    </div>
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        JavaScript
                      </a>
                    </div>
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        Spring
                      </a>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        Python
                      </a>
                    </div>
                    <div>
                      <a class=" mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        TypeScript
                      </a>
                    </div>
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        Android
                      </a>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        Vue
                      </a>
                    </div>
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        node.js
                      </a>
                    </div>
                    <div>
                      <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                        dasdasd
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="flex flex-col items-center">
              <div class="w-full flex items-center ml-16 gap-5">
                <div class="text-gray-800 text-4xl font-sbtest border-b border-white/50 text-shadow-white">
                  Award
                </div>
              </div>

              <div class="text-lg font-test text-gray-800 opacity-[80%] mt-5 flex items-center gap-4 py-3 px-3">
                <div class="ml-6 flex flex-col gap-10 py-3 border-l-2 border-gray-600 px-3 ">
                  <div class="flex gap-1 items-center ">
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
            </div>
          </div>
        </div>
      </section>

      <section class="relative bg-bg8" id="project">
        <div class="w-1/2 mx-auto px-4 z-30 pt-16 border-b border-gray-400 pb-28">
          <div class="flex justify-center">
            <div class="w-full ">
              <div class="w-fit flex items-center gap-5">
                <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
                <div class="text-gray-800 text-5xl font-btest">Project</div>
              </div>
              <div id="project_first">
                <div class="mt-20 text-4xl font-sbtest text-black">
                  1. Gitime
                </div>
                <div class="text-xl font-test text-gray-900 border border-gray-300 mt-3 px-5 rounded-lg py-12">
                  <div class="flex justify-center gap-5">
                    <div
                      class="w-full h-full flex items-center"
                      style={{ minHeight: "14rem" }}
                    >
                      <img
                        src={projectImage}
                        class="w-full h-full drop-shadow-md"
                        style={{ maxHeight: "14rem" }}
                        alt="profile"
                      />
                    </div>
                    <div class="w-3/4 flex flex-col gap-5 px-3 justify-center">
                      <div class="mr-3 font-test text-xl px-1">
                        개발 날짜
                        <a class="ml-3 text-gray-600">2021.09 ~ 2021.12</a>
                      </div>
                      <div class="mr-3 font-test text-xl px-1">
                        맡은 직군
                        <a class="ml-3 text-gray-600">FrontEnd</a>
                      </div>
                      <div class="mr-3 font-test text-xl">
                        <div class="border-b border-gray-400 w-full px-1 pb-2">
                          사용 기술
                        </div>
                        <div class="text-gray-600 mt-3">
                          <a class="mr-3 bg-indigo-100">JavaScrpit</a>
                          <a class="mr-3 bg-indigo-100">React</a>
                          <a class="mr-3 bg-indigo-100">asdasdas</a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-gray-600 font-test text-lg break-all">
                    <div class="flex items-center gap-2 mt-10 mb-3">
                      <div class="w-2 h-2 rounded-full bg-gray-600"></div>
                      <div class="w-full text-gray-800 font-sbtest">
                        프로젝트 설명
                      </div>
                    </div>
                    Gitime는 기존의 깃허브 시스템과 연동하여
                    대시보드(Dashboard)를 제공하는 새로운 팀 협업 웹
                    서비스입니다. Gitime에서는 깃허브의 Collaborator를 통해
                    하나의 팀이 구성되면 투두(To-do) 리스트를 통한 진행률 관리,
                    실시간 채팅 및 화상 회의를 통한 커뮤니케이션, 팀 내 게시판
                    보드, API End-Point 생성을 통한 소스코드 컴파일, 대시보드를
                    통한 시각화 등 프로젝트 관리를 위한 다양한 기능을 제공하고
                    있습니다.
                  </div>
                </div>
              </div>
              <div id="project_first">
                <div class="mt-20 text-4xl font-sbtest text-black">
                  2. Propofol
                </div>
                <div class="text-xl font-test text-gray-900 border border-gray-300 mt-3 px-5 rounded-lg py-12">
                  <div class="flex justify-center gap-5">
                    <div
                      class="w-full h-full flex items-center"
                      style={{ minHeight: "14rem" }}
                    >
                      <img
                        src={projectImage2}
                        class="w-full h-full drop-shadow-md"
                        style={{ maxHeight: "14rem" }}
                        alt="profile"
                      />
                    </div>
                    <div class="w-3/4 flex flex-col gap-5 px-3 justify-center">
                      <div class="mr-3 font-test text-xl px-1">
                        개발 날짜
                        <a class="ml-3 text-gray-600">2022.03 ~ 2022.06</a>
                      </div>
                      <div class="mr-3 font-test text-xl px-1">
                        맡은 직군
                        <a class="ml-3 text-gray-600">FrontEnd</a>
                      </div>
                      <div class="mr-3 font-test text-xl">
                        <div class="border-b border-gray-400 w-full px-1 pb-2">
                          사용 기술
                        </div>
                        <div class="text-gray-600 mt-3">
                          <a class="mr-3 bg-indigo-100">JavaScrpit</a>
                          <a class="mr-3 bg-indigo-100">React</a>
                          <a class="mr-3 bg-indigo-100">asdasdas</a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-gray-600 font-test text-lg break-all">
                    <div class="flex items-center gap-2 mt-10 mb-3">
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
          </div>
        </div>
      </section>
      <section class="relative bg-bg8" id="workExperience">
        <div class="w-1/2 mx-auto z-30 py-24 border-b border-gray-400 ">
          <div class="w-full flex justify-center">
            <div class="w-full flex flex-col items-center">
              <div class="w-full flex items-center gap-5">
                <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
                <div class="text-gray-800 text-5xl font-btest text-center">
                  Work Experience
                </div>
              </div>

              <div class="text-xl w-full font-test text-gray-600 mt-20 justify-center items-center gap-4 py-3 px-3">
                <div class="text-3xl text-black font-sbtest">
                  1. ABC System(가칭)
                </div>
                <div class="text-lg font-ltest text-gray-500 mt-2">
                  2018.05 ~ 2022.04
                </div>
                <div class="py-2 pl-6 mt-8 border-l-8 border-indigo-100">
                  ABC System은 ~~~한 서비스를 제공하고 개발하는 회사입니다. 제가
                  담당했던 업무는 이렇고 저런 업무이며, 현재는 ㅇㅇㅇ 업무를
                  총괄하고 있습니다. 이곳에서 저는 어떠한 경험을 하였으며, 어떤
                  스킬을 n년 동안 사용하였습니다.
                </div>
              </div>

              <div class="text-xl w-full font-test text-gray-600 mt-20 justify-center items-center gap-4 py-3 px-3">
                <div class="text-3xl text-black font-sbtest">
                  2. DEF System(가칭)
                </div>
                <div class="text-lg font-ltest text-gray-500 mt-2">
                  2018.05 ~ 2022.04
                </div>
                <div class="py-2 pl-6 mt-8 border-l-8 border-indigo-100">
                  DEF System은 ~~~한 서비스를 제공하고 개발하는 회사입니다. 제가
                  담당했던 업무는 이렇고 저런 업무이며, 현재는 ㅇㅇㅇ 업무를
                  총괄하고 있습니다. 이곳에서 저는 어떠한 경험을 하였으며, 어떤
                  스킬을 n년 동안 사용하였습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="relative bg-bg8" id="blog">
        <div class="w-1/2 mx-auto px-4 z-30 py-24">
          <div class="w-full flex justify-center font-test">
            <div class="w-full flex flex-col ">
              <div class="flex items-center gap-5">
                <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
                <div class="text-black text-5xl font-btest">Blog</div>
              </div>

              <div class="flex items-center mt-8">
                <div class="text-xl text-gray-700">
                  🔗 https://www/propofol/blog/username(임시 주소)
                </div>
              </div>
              <div class="mt-10 w-full">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-gray-800"></div>
                  <div class="text-2xl font-sbtest text-gray-700">
                    추천수 상위글
                  </div>
                </div>

                <div
                  class="mt-8 mx-2 relative py-4 px-6 border border-indigo-200 rounded-md bg-white"
                  style={{ minHeight: "12rem" }}
                >
                  <div class="flex items-center text-2xl text-gray-700 font-sbtest">
                    <div class="">1.</div>
                    <div class="">
                      React란? 리액트 기초부터 심화 내용까지 한 번에 알아보기
                    </div>
                  </div>
                  <div
                    class="flex justify-center items-center mt-3 gap-6"
                    style={{ maxHeight: "14rem", minWidth: "48rem" }}
                  >
                    <div
                      class="w-[10rem] h-[8.5rem] bg-black"
                      style={{ minWidth: "10rem" }}
                    ></div>
                    <div class="grow">
                      <div class="relative py-2 break-all">
                        지방의회의 조직·권한·의원선거와 지방자치단체의 장의
                        선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은
                        법률로 정한다. 대한민국의 경제질서는 개인과 기업의
                        경제상의 자유와 창의를 존중함을 기본으로 한다.
                        비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한
                        간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한
                        죄중 법률이 정한 경우에 한하여 단심으로 할 수 있다.
                        다만, 사형을 선고한 경우에는 그러하지 아니하다.
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                    <div>2022.05.07 </div>
                    <div>추천수 99999</div>
                  </div>
                </div>
                <div
                  class="mt-8 mx-2 relative py-4 px-6 border border-indigo-200 rounded-md bg-white"
                  style={{ minHeight: "12rem" }}
                >
                  <div class="flex items-center text-2xl text-gray-700 font-sbtest">
                    <div class="">2.</div>
                    <div class="">
                      Spring이란? 스프링 기초부터 심화 내용까지 한 번에 알아보기
                    </div>
                  </div>
                  <div
                    class="flex justify-center items-center mt-3 gap-6"
                    style={{ maxHeight: "14rem", minWidth: "48rem" }}
                  >
                    <div
                      class="w-[10rem] h-[8.5rem] bg-black"
                      style={{ minWidth: "10rem" }}
                    ></div>
                    <div class="grow">
                      <div class="relative py-2 break-all">
                        법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여
                        심판한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만,
                        이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이
                        헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에
                        관한 준비는 이 헌법시행 전에 할 수 있다. 국회에서 의결된
                        법률안은 정부에 이송되어 15일 이내에 대통령이 공포한다.
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                    <div>2022.05.07 </div>
                    <div>추천수 99999</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default T4;
