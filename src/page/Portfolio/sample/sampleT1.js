import { React } from "react";

import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import profileImage from "../../../assets/img/profile2.PNG";

export function SampleT1() {
  const style = {
    backgroundImage:
      "url(https://cdn.discordapp.com/attachments/766266146520563785/968491436746088510/martin-jernberg-veMLshzPEq0-unsplash.jpg)",
  };

  return (
    <div class="w-full">
      <>
        <div
          class="flex flex-col justify-center"
          style={{ minHeight: "48rem" }}
        >
          <div
            class="bg-cover bg-center absolute top-0 w-full h-[58rem] bg-bg6 bg-blend-multiply brightness-[65%] grayscale-[10%] -z-10"
            style={style}
          ></div>
          <div class="w-full mx-auto flex gap-10 justify-center items-center">
            <div>
              <div
                className="ProfileImage"
                class="mx-auto mt-20 w-48 h-48 rounded-full"
              >
                <img
                  src={profileImage}
                  class="w-48 h-48 rounded-full drop-shadow-md"
                  alt="profile"
                />
              </div>
            </div>
            <div>
              <div class="mt-20 text-2xl text-white font-iroBatang">
                Full-Stack Developer
              </div>

              <div class="text-5xl text-white z-20 font-iroBatang text-shadow-white mb-4">
                개발자 곽두팔
              </div>
              <div
                className="인사말"
                class="text-2xl font-iroBatang text-white z-20 opacity-[70%] mb-2"
              >
                안녕하세요, 저는 개발자 곽두팔입니다.
              </div>
            </div>
          </div>
          <div class="w-[60%] mx-auto mt-20 flex justify-center">
            <div class="px-16 ">
              <div class="w-full flex items-center gap-5">
                <div class="text-white opacity-[90%] text-4xl font-timeless text-center border-b border-white/50">
                  About me
                </div>
              </div>
              <div class="text-xl text-white flex flex-col gap-5 mt-6">
                <div class="flex items-center">
                  <div class="p-1 mr-3 font-iroBatang opacity-[90%] ">
                    연락처
                  </div>
                  <div class="font-timeless opacity-[65%]">010-1234-5678</div>
                </div>
                <div class="flex items-center">
                  <div class="p-1 mr-3 font-iroBatang opacity-[90%] ">
                    이메일
                  </div>
                  <div class="font-timeless opacity-[65%] ">
                    hiDeveloper@gmail.com
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="p-1 mr-3 font-timeless opacity-[90%] ">
                    Github
                  </div>
                  <div class="font-timeless opacity-[65%] ">
                    https://github.com/1917Years
                  </div>
                </div>
              </div>
            </div>
            <div class="px-16">
              <div class="w-full flex items-center gap-5">
                <div class="text-white text-4xl opacity-[90%] font-timeless text-center text-shadow-sm border-b border-white/50">
                  Skills
                </div>
              </div>
              <div class="text-2xl h-3/4 font-timeless text-white opacity-70 flex items-center gap-2 py-3 px-3">
                <div class="flex flex-col gap-5 py-5">
                  <div class="flex gap-3">
                    <a class="border border-white/70 rounded-lg px-2 py-1">
                      Java
                    </a>
                    <a class="border border-white/70 rounded-lg px-2 py-1">
                      Spring
                    </a>
                    <a class="border border-white/70 rounded-lg px-2 py-1">
                      Spring Data JPA
                    </a>
                  </div>
                  <div class="flex gap-3">
                    <a class="border border-white/70 rounded-lg px-2 py-1">
                      Spring Cloud
                    </a>
                    <a class="border border-white/70 rounded-lg px-2 py-1">
                      JavaScript
                    </a>
                    <a class="border border-white/70 rounded-lg px-2 py-1">
                      Python
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="relative bg-gray-600" id="project">
          <div class="w-[63%] mx-auto px-4 z-30 pt-16 pb-32">
            <div class="flex justify-center">
              <div class="w-full px-24 ">
                <div class="w-full flex items-center justify-center gap-5">
                  <div class="text-white text-5xl font-timelessB border-b border-white/50 opacity-[95%] text-center">
                    Project
                  </div>
                </div>
                <div
                  class="text-xl font-test bg-gray-200 rounded-xl text-gray-900 mt-20 border-b-2 border-gray-300 px-10 py-16"
                  id="project_first"
                >
                  <div class="flex justify-center gap-10">
                    <div class="w-full h-full" style={{ minHeight: "16rem" }}>
                      <img
                        src={projectImage}
                        class="w-full h-full drop-shadow-md"
                        style={{ maxHeight: "16rem" }}
                        alt="profile"
                      />
                    </div>
                    <div class="w-5/6 flex flex-col gap-3 px-3 justify-center">
                      <div class="mr-3 font-timelessB text-4xl mb-2">
                        Gitime
                      </div>
                      <div class="mr-3 font-test text-xl px-1">
                        개발 날짜
                        <a class="ml-3 text-gray-600 text-lg">
                          2021.09 ~ 2021.12
                        </a>
                      </div>
                      <div class="mr-3 font-test text-xl px-1">
                        맡은 직군
                        <a class="ml-3 text-gray-600">Frontend</a>
                      </div>
                      <div class="mr-3 font-test text-xl">
                        <div class="border-b border-gray-400 w-full px-1 pb-2">
                          사용 기술
                        </div>
                        <div class="text-gray-600 mt-3">
                          <a class="mr-3 bg-gray-200">Spring</a>
                          <a class="mr-3 bg-gray-200">React</a>
                          <a class="mr-3 bg-gray-200">MySQL</a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-gray-600 mt-5 font-test text-lg break-all">
                    <div class="border-b border-gray-400 w-full pb-2 mb-2 text-gray-800">
                      프로젝트 설명
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

                <div
                  class="text-xl font-test bg-gray-200 rounded-xl text-gray-900 mt-20 border-b-2 border-gray-300 px-10 py-16"
                  id="project_first"
                >
                  <div class="flex justify-center gap-10">
                    <div class="w-full h-full" style={{ minHeight: "16rem" }}>
                      <img
                        src={projectImage2}
                        class="w-full h-full drop-shadow-md"
                        style={{ maxHeight: "16rem" }}
                        alt="profile"
                      />
                    </div>
                    <div class="w-5/6 flex flex-col gap-3 px-3 justify-center">
                      <div class="mr-3 font-timelessB text-4xl mb-2">
                        Propofol
                      </div>
                      <div class="mr-3 font-test text-xl px-1">
                        개발 날짜
                        <a class="ml-3 text-gray-600 text-lg">
                          2022.03 ~ 2022.06
                        </a>
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
                          <a class="mr-3 bg-gray-200">Spring</a>
                          <a class="mr-3 bg-gray-200">React</a>
                          <a class="mr-3 bg-gray-200">Spring Cloud</a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-gray-600 mt-5 font-test text-lg break-all">
                    <div class="border-b border-gray-400 w-full pb-2 mb-2 text-gray-800">
                      프로젝트 설명
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
        </section>

        <section class="relative bg-gray-800" id="award">
          <div class="w-[60%] mx-auto px-4 z-30 py-24">
            <div class="flex justify-center">
              <div class="px-20 flex flex-col items-center">
                <div class="w-full flex items-center justify-center gap-5">
                  <div class="text-gray-100 text-5xl font-timelessB text-center border-b border-white/50 text-shadow-white">
                    Award
                  </div>
                </div>

                <div class="text-xl font-test text-gray-100 opacity-[80%] mt-10 flex items-center gap-4 py-3 px-3">
                  <div class="w-[0.5px] h-full opacity-[0%] relative bg-white z-40"></div>
                  <div class="ml-6 flex flex-col gap-20 py-5 border-l border-white px-10 ">
                    <div class="flex gap-2 items-center ">
                      <div class="w-5 h-5 rounded-full border border-white/70 bg-white -translate-x-[3.125rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                      <div class="w-10 h-[0.5px] bg-white opacity-[80%] absolute -translate-x-[1.5rem]"></div>
                      <div class="mr-3 font-sbtest">2019.01</div>
                      <div class="mr-3 font-iroBatang">
                        {" "}
                        웹 프로젝트 공모전 우수상 수상
                      </div>
                    </div>

                    <div class="flex gap-2 items-center ">
                      <div class="w-5 h-5 rounded-full border border-white/70 bg-white -translate-x-[3.125rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                      <div class="w-10 h-[0.5px] bg-white opacity-[80%] absolute -translate-x-[1.5rem]"></div>
                      <div class="mr-3 font-sbtest">2020.03</div>
                      <div class="mr-3 font-iroBatang">
                        전국 공모전 대상 수상
                      </div>
                    </div>

                    <div class="flex gap-2 items-center ">
                      <div class="w-5 h-5 rounded-full border border-white/70 bg-white -translate-x-[3.125rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                      <div class="w-10 h-[0.5px] bg-white opacity-[80%] absolute -translate-x-[1.5rem]"></div>
                      <div class="mr-3 font-sbtest">2021.05</div>
                      <div class="mr-3 font-iroBatang">
                        캡스톤 디자인 대회 대상 수상
                      </div>
                    </div>

                    <div class="flex gap-2 items-center ">
                      <div class="w-5 h-5 rounded-full border border-white/70 bg-white -translate-x-[3.125rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                      <div class="w-10 h-[0.5px] bg-white opacity-[80%] absolute -translate-x-[1.5rem]"></div>
                      <div class="mr-3 font-sbtest">2022.01</div>
                      <div class="mr-3 font-iroBatang">
                        한국 알고리즘 올림피아드 대회 1등
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="relative bg-gray-500" id="workExperience">
          <div class="w-[60%] mx-auto px-4 z-30 pt-24 pb-32">
            <div class="w-full flex justify-center">
              <div class="w-full px-20 flex flex-col items-center">
                <div class="text-white text-5xl font-timelessB text-center border-b border-white mb-10">
                  Work Experience
                </div>
                <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-6 px-8 bg-white rounded-xl shadow-md">
                  <div class="w-1/4 relative border-r border-gray-300 py-2">
                    <div class="text-2xl text-gray-700 font-sbtest">
                      ABC System
                    </div>
                    <div class="text-lg text-gray-500 mt-2">
                      2018.05 ~ 2022.04
                    </div>
                  </div>
                  <div class="w-3/4 relative py-2">
                    ABC System은 짱짱 쩔어주는 서비스를 제공하고 개발하는
                    회사입니다. 제가 담당했던 업무는 이렇고 저런 업무이며,
                    현재는 프론트엔드 업무를 총괄하고 있습니다. 이곳에서 저는
                    어떠한 경험을 하였으며, 어떤 스킬을 n년 동안 사용하였습니다.
                  </div>
                </div>

                <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-6 px-8 bg-white rounded-xl shadow-md">
                  <div class="w-1/4 relative border-r border-gray-300 py-2">
                    <div class="text-2xl text-gray-700 font-sbtest">
                      DEF System
                    </div>
                    <div class="text-lg text-gray-500 mt-2">
                      2018.05 ~ 2022.04
                    </div>
                  </div>
                  <div class="w-3/4 relative py-2">
                    DEF System은 매우 멋진 서비스를 제공하고 개발하는
                    회사입니다. 제가 담당했던 업무는 이렇고 저런 업무이며,
                    현재는 백엔드 업무를 총괄하고 있습니다. 이곳에서 저는 어떠한
                    경험을 하였으며, 어떤 스킬을 n년 동안 사용하였습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="relative bg-gray-200" id="blog">
          <div class="w-[60%] mx-auto px-4 z-30 py-24">
            <div class="w-full flex justify-center font-test">
              <div class="w-full px-20 flex flex-col items-center">
                <div class="text-gray-900 text-5xl font-timelessB text-center">
                  Blog
                </div>
                <div class="text-xl w-full h-3/4 font-test text-gray-600  flex justify-center items-center gap-4 py-3 px-3"></div>
                <div class="mt-8 w-full">
                  <div class="flex items-center gap-3">
                    <div class="w-5 h-5 bg-gray-500"></div>
                    <div class="text-2xl font-iroBatang font-semibold text-gray-600">
                      추천수 상위글
                    </div>
                  </div>
                  <div
                    class="mt-6 w-full relative py-4 px-6 rounded-md shadow-md bg-white"
                    style={{ minHeight: "12rem" }}
                  >
                    <div class="text-2xl text-gray-700 font-sbtest text-left">
                      Spring의 기초와 원리를 알아보자!
                    </div>

                    <div
                      class="flex justify-center items-center mt-3 gap-6"
                      style={{ maxHeight: "14rem", minWidth: "48rem" }}
                    >
                      <div class="grow">
                        <div class="relative py-2 break-all text-gray-500">
                          스프링이란? 스프링 프레임워크는 자바 진영의 웹
                          프레임워크이다. 스프링은 제어의 역전, 스프링
                          컨테이너를 이용한 의존관계 주입 등은 다형성을 활용하여
                          역할과 구현을 편리하게 다룰 수 있도록 지원한다. 즉,
                          우리가 앞서 알아본 객체 지향 설계 원칙(SOLID)을 지키며
                          개발할 수 있도록 스프링에서 지원한다는 것이다.
                          DI(Dependency Injection) 컨테이너는 클라이언트의 코드
                          변경없이 기능을 확장하도록 도와준다.
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
  );
}

export default SampleT1;
