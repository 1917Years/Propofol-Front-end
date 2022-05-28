import { React } from "react";

import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import profileImage from "../../../assets/img/profile2.PNG";

function SampleT3() {
  return (
    <>
      <div class="w-full bg-white">
        <>
          <div class="mt-20 flex flex-col items-center ">
            <div class="flex w-1/2 gap-5 items-center ">
              <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
              <div class="text-left font-sbtest text-black text-4xl ">
                개발자 곽두팔{" "}
                <a class="text-2xl">
                  {" "}
                  {"("} Full-Stack Developer {")"}{" "}
                </a>
              </div>
            </div>
            <div class="w-1/2 font-test text-lg">
              저는 개발자 곽두팔입니다. 개발을 저의 인생 모토로 삼아 일일 공부를
              목표로 하여 TIL 블로그를 운영하고 있습니다. 사람들에게 더 편리한
              기능을 제공하는 것을 목표로 삼아 세상을 바꾸는 개발자가 되기 위해
              오늘도 달리는 중입니다. :D
            </div>

            <div class="mt-10 w-1/2 flex items-center border-b border-gray-400 pb-12">
              <div
                className="ProfileImage"
                class="w-48 h-48 rounded-full mr-16"
              >
                <img
                  src={profileImage}
                  class="w-48 h-48 rounded-full drop-shadow-md"
                  alt="profile"
                />
              </div>
              <div class="pl-16 border-l border-gray-300 " id="aboutme">
                <div class="font-sbtest text-3xl">About me</div>
                <div class="text-xl font-test text-gray-600 flex flex-col gap-7 mt-8">
                  <div>
                    <a class="mr-3 font-sbtest">연락처</a>010-1234-5678
                  </div>
                  <div>
                    <a class="mr-3 font-sbtest">이메일</a>hiDeveloper@gmail.com
                  </div>
                  <div>
                    <a class="mr-3 font-sbtest">Github</a>{" "}
                    https://github.com/1917Years
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section class="relative">
            <div class="w-1/2 mt-10 mx-auto flex justify-center border-b border-gray-400 pb-12">
              <div>
                <div class="mr-5">
                  <div class="w-full flex items-center gap-5">
                    <div class="text-gray-800 text-4xl font-sbtest text-center">
                      Skills
                    </div>
                  </div>

                  <div class="text-2xl font-test text-gray-500 flex items-center">
                    <div class="flex flex-col gap-5 py-5">
                      <div class="flex gap-3">
                        <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                          Java
                        </a>
                        <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                          Spring
                        </a>
                        <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                          Spring Cloud
                        </a>
                      </div>
                      <div class="flex gap-3">
                        <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                          JavaScript
                        </a>
                        <a class="mr-3 border border-gray-300 rounded-lg px-2 py-1">
                          Spring Data JPA
                        </a>
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

                  <div class="text-lg font-test text-gray-800 opacity-[80%] flex items-center gap-4 py-3 px-3">
                    <div class="ml-6 flex flex-col gap-10 py-3 border-l-2 border-gray-600 px-3 ">
                      <div class="flex gap-1 items-center ">
                        <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                        <div class="mr-2 font-sbtest">2019.01</div>
                        <div class="font-test">전국 공모전 대상 수상</div>
                      </div>
                      <div class="flex gap-1 items-center ">
                        <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                        <div class="mr-2 font-sbtest">2020.03</div>
                        <div class="font-test">
                          웹 프로젝트 공모전 우수상 수상
                        </div>
                      </div>
                      <div class="flex gap-1 items-center ">
                        <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                        <div class="mr-2 font-sbtest">2021.05</div>
                        <div class="font-test">
                          캡스톤 디자인 대회 대상 수상
                        </div>
                      </div>
                      <div class="flex gap-1 items-center ">
                        <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                        <div class="mr-2 font-sbtest">2022.01</div>
                        <div class="font-test">
                          한국 알고리즘 올림피아드 대회 1등
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="relative" id="project">
            <div class="w-1/2 mx-auto px-4 z-30 pt-16 border-b border-gray-400 pb-28">
              <div class="flex justify-center">
                <div class="w-full ">
                  <div class="w-fit flex items-center gap-5">
                    <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
                    <div class="text-gray-800 text-4xl font-btest">Project</div>
                  </div>
                  <div id="project_first">
                    <div class="mt-5 text-3xl font-sbtest text-black">
                      Gitime
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
                        <div class="w-3/4 flex flex-col gap-5 justify-center">
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
                              <a class="mr-3 bg-indigo-100">Spring</a>
                              <a class="mr-3 bg-indigo-100">React</a>
                              <a class="mr-3 bg-indigo-100">MySQL</a>{" "}
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
                        하나의 팀이 구성되면 투두(To-do) 리스트를 통한 진행률
                        관리, 실시간 채팅 및 화상 회의를 통한 커뮤니케이션, 팀
                        내 게시판 보드, API End-Point 생성을 통한 소스코드
                        컴파일, 대시보드를 통한 시각화 등 프로젝트 관리를 위한
                        다양한 기능을 제공하고 있습니다.
                      </div>
                    </div>
                  </div>

                  <div id="project_first">
                    <div class="mt-5 text-3xl font-sbtest text-black">
                      Propofol
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
                        <div class="w-3/4 flex flex-col gap-5 justify-center">
                          <div class="mr-3 font-test text-xl px-1">
                            개발 날짜
                            <a class="ml-3 text-gray-600">2022.03 ~ 2022.06</a>
                          </div>
                          <div class="mr-3 font-test text-xl px-1">
                            맡은 직군
                            <a class="ml-3 text-gray-600">Backend</a>
                          </div>
                          <div class="mr-3 font-test text-xl">
                            <div class="border-b border-gray-400 w-full px-1 pb-2">
                              사용 기술
                            </div>
                            <div class="text-gray-600 mt-3">
                              <a class="mr-3 bg-indigo-100">Spring</a>
                              <a class="mr-3 bg-indigo-100">React</a>
                              <a class="mr-3 bg-indigo-100">
                                Spring Cloud
                              </a>{" "}
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
                        Propofol은 개발자를 지망하는 학생들을 위한 경력 개발
                        도움 웹 서비스입니다. 프로포폴은 학생들이 경력을 쌓고
                        기록하는 것을 용이하게 진행할 수 있도록 TIL 블로그 기능,
                        포트폴리오 생성 기능, 프로젝트 매칭 기능, 프로젝트 관리
                        기능을 제공하고 있습니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="relative" id="workExperience">
            <div class="w-1/2 mx-auto z-30 py-12 border-b border-gray-400 ">
              <div class="w-full flex justify-center">
                <div class="w-full flex flex-col items-center">
                  <div class="w-full flex items-center gap-5">
                    <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
                    <div class="text-gray-800 text-4xl font-btest text-center">
                      Work Experience
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-xl w-full font-test text-gray-600 mt-5 justify-center items-center gap-4 py-3 px-3">
                      {" "}
                      <div class="w-1/4 relative py-2">
                        <div class="text-3xl text-black font-sbtest">
                          ABC System
                        </div>
                        <div class="text-lg font-ltest text-gray-500 mt-2">
                          2018.05 ~ 2022.04
                        </div>
                      </div>
                      <div class="py-2 pl-6 mt-8 border-l-8 border-indigo-100">
                        ABC System은 짱짱 쩔어주는 서비스를 제공하고 개발하는
                        회사입니다. 제가 담당했던 업무는 이렇고 저런 업무이며,
                        현재는 프론트엔드 업무를 총괄하고 있습니다. 이곳에서
                        저는 어떠한 경험을 하였으며, 어떤 스킬을 n년 동안
                        사용하였습니다.
                      </div>
                    </div>
                  </div>

                  <div class="text-xl w-full font-test text-gray-600 mt-5 justify-center items-center gap-4 py-3 px-3">
                    {" "}
                    <div class="w-1/4 relative py-2">
                      <div class="text-3xl text-black font-sbtest">
                        DEF System
                      </div>
                      <div class="text-lg font-ltest text-gray-500 mt-2">
                        2018.05 ~ 2022.04
                      </div>
                    </div>
                    <div class="py-2 pl-6 mt-8 border-l-8 border-indigo-100">
                      DEF System은 매우 멋진 서비스를 제공하고 개발하는
                      회사입니다. 제가 담당했던 업무는 이렇고 저런 업무이며,
                      현재는 백엔드 업무를 총괄하고 있습니다. 이곳에서 저는
                      어떠한 경험을 하였으며, 어떤 스킬을 n년 동안
                      사용하였습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="relative" id="blog">
            <div class="w-1/2 mx-auto px-4 z-30 py-24">
              <div class="w-full flex justify-center font-test">
                <div class="w-full flex flex-col ">
                  <div class="flex items-center gap-5">
                    <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>
                    <div class="text-black text-5xl font-btest">Blog</div>
                  </div>

                  <div class="mt-5 w-full">
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
                          React란? 리액트 기초부터 심화 내용까지 한 번에
                          알아보기
                        </div>
                      </div>
                      <div
                        class="flex justify-center items-center mt-3 gap-6"
                        style={{ maxHeight: "14rem", minWidth: "48rem" }}
                      >
                        <div class="grow">
                          <div class="relative py-2 break-all">
                            리액트는 3가지의 대표적인 특징을 가지고 있다. 1.
                            JSX는 자바스크립트 안에서 HTML 문법을 사용해서
                            view를 구성할 수 있게 도와주는 자바스크립트
                            문법으로, 리액트 개발에 엄청난 도움을 준다. 2.
                            컴포넌트 기반인 React로 개발을 하면 HTML 코드를 부분
                            부분 파일로 담아서 어떤 부분을 수정해야 한다고 하면
                            그 부분의 파일만 수정하면 된다. 3. 리액트는 DOM
                            구조여서 바뀌지 않은 부분과 바뀐 부분을 자동으로
                            감지해서 업데이트한다.
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
                          Spring이란? 스프링 기초부터 심화 내용까지 한 번에
                          알아보기
                        </div>
                      </div>
                      <div
                        class="flex justify-center items-center mt-3 gap-6"
                        style={{ maxHeight: "14rem", minWidth: "48rem" }}
                      >
                        <div class="grow">
                          <div class="relative py-2 break-all">
                            스프링이란? 스프링 프레임워크는 자바 진영의 웹
                            프레임워크이다. 스프링은 제어의 역전, 스프링
                            컨테이너를 이용한 의존관계 주입 등은 다형성을
                            활용하여 역할과 구현을 편리하게 다룰 수 있도록
                            지원한다. 즉, 우리가 앞서 알아본 객체 지향 설계
                            원칙(SOLID)을 지키며 개발할 수 있도록 스프링에서
                            지원한다는 것이다. DI(Dependency Injection)
                            컨테이너는 클라이언트의 코드 변경없이 기능을
                            확장하도록 도와준다.
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
        </>
      </div>
    </>
  );
}

export default SampleT3;
