import React from "react";
import "animate.css";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from 'react-scroll';
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import { setRefreshTokenToCookie, getRefreshToken, refreshJWT, getAccessToken } from "../utils/auth.js"
import Cookies from "universal-cookie";

function Mainpage(props) {
  const navigate = useNavigate();
  const style = {
    backgroundImage:
      "url(https://cdn.discordapp.com/attachments/766266146520563785/967860864743002112/cherrydeck-rMILC1PIwM0-unsplash.jpg)",
  };
  return (
    <div class="text-gray-800 antialiased z-1">
      <main>
        <div class="absolute w-[75%] h-full left-[12.5%] xl:border-l xl:border-r border-white opacity-50 z-10"></div>
        <div class="pt-20 bg-black" style={{ minHeight: "54rem" }}>
          <div
            class="bg-cover bg-center absolute top-0 w-full h-[58rem] bg-bg6 bg-blend-multiply blur-[5px] brightness-[.80] grayscale-[10%]  "
            style={style}
          >
          </div>
          <div class="relative mx-auto flex flex-col">
            <div class="z-20 animate__animated animate__fadeIn absolute flex lg:gap-[145%] md:gap-[130%] gap-[15px] 3xl:left-1/4 2xl:left-[20%] xl:left-[17%] md:left-[10%] left-[5%]">
              <div>
                <div class=" text-white font-ttest flex md:flex-col flex-row ">
                  <Link to="TIL" spy={true} smooth={true}>
                    <button class="hover:animate-pulse p-3 w-12 h-12 md:pt-4 lg:w-20 lg:h-20 shadow-lg rounded-full bg-none border border-white text-center align-middle lg:pt-4 lg:text-3xl md:w-16 md:h-16 md:text-2xl">
                      1
                    </button>
                  </Link>
                  <div class="mt-4 ml-2 md:ml-[0px] md:mt-3 text-center lg:text-base md:text-sm">TIL 블로그</div>
                </div>
                <div class="absolute lg:ml-36 lg:bottom-20 md:ml-20 md:bottom-20 border-t border-white opacity-50 md:w-full"></div>
              </div>
              <div>
                <div class="text-white font-ttest flex md:flex-col flex-row">
                  <Link to="Portfolio" spy={true} smooth={true}>
                    <button class="hover:animate-pulse p-3 w-12 h-12 md:pt-4 lg:w-20 lg:h-20 shadow-lg rounded-full bg-none border border-white text-center align-middle lg:pt-4 lg:text-3xl md:w-16 md:h-16 md:text-2xl">
                      2
                    </button>
                  </Link>
                  <div class="mt-4 ml-2 md:ml-[0px] md:mt-3 text-center lg:text-base md:text-sm">포트폴리오</div>
                </div>
                <div class="absolute lg:ml-36 lg:bottom-20 md:ml-20 md:bottom-20 border-t border-white opacity-50 md:w-full"></div>
              </div>

              <div class="text-white font-ttest flex md:flex-col flex-row">
                <Link to="Project" spy={true} smooth={true}>
                  <button class="hover:animate-pulse p-3 w-12 h-12 md:pt-4 lg:w-20 lg:h-20 shadow-lg rounded-full bg-none border border-white text-center align-middle lg:pt-4 lg:text-3xl md:w-16 md:h-16 md:text-2xl">
                    3
                  </button>
                </Link>
                <div class="mt-4 ml-2 md:ml-[0px] md:mt-3 text-center text-sm">프로젝트 매칭</div>
              </div>
            </div>
            <div class="w-full mt-20 pt-20 ml-auto mr-auto text-center border-white">
              <div class="mb-10">
                <h1 class="mt-10 text-white font-rumpi text-6xl text-shadow">
                  Propofol
                </h1>
                <p class="animate__animated animate__fadeIn text-2xl text-white opacity-90 font-ltest">
                  ( <a class="font-sbtest">Pro</a>file +{" "}
                  <a class="font-sbtest">Po</a>rt<a class="font-sbtest">fol</a>io )
                </p>
              </div>
              <p class="animate__animated animate__fadeIn pt-10 font-ltest text-lg text-gray-300">
                <p>
                  힘든 일일 학습, 지겨운 포트폴리오 작성, 번거로운 프로젝트
                  매칭.
                </p>
                <p>이젠 더 이상 고민하지 마세요.</p>
                <p>프로포폴과 함께라면, 편하게 해결할 수 있어요.</p>
              </p>
            </div>
            <div class="self-center relative transform text-2xl font-test text-white z-40 mt-12 animate__animated animate__backInUp ">
              <button
                class="z-40 w-44 border border-white px-10 py-3 rounded-xl bg-none hover:bg-gray-100/10 hover:text-white mt-12 drop-shadow-lg"
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </button>
              <div class="font-ltest text-lg text-center my-2">or</div>
              <button
                class="z-40 w-44 border border-white px-10 py-3 rounded-xl bg-none hover:bg-gray-100/10 hover:text-white drop-shadow-lg"
                onClick={() => {
                  navigate('/register');
                }}
              >
                회원가입
              </button>
              <button
                class="bg-white z-40 text-black font-test"
                onClick={() => {
                  axios
                    .get(SERVER_URL + "/user-service/api/v1/members")
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      if (err.response) {
                        console.log(err.response);
                        console.log(getAccessToken());
                        console.log(getRefreshToken());
                        /*
                                                console.log(err.response.data.data);
                                                if (err.response.data.data == "Please RefreshToken.") {
                                                  refreshJWT();
                                                }
                        */
                      }
                    });
                }}
              >
                버튼11111
              </button>
            </div>
          </div>
        </div>

        <section class="relative bg-white" id="TIL">
          <div class="absolute w-[75%] h-full left-[12.5%] xl:border-l xl:border-r border-gray-300 z-40"></div>
          <div class="container mx-auto px-4 z-30 py-32 ">
            <div class="flex flex-wrap items-center">
              <div class="w-full md:w-1/4 px-4 mr-auto ml-auto">
                <div class="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300"></div>

                <h3 class="z-40 font-test text-3xl mb-2 font-semibold leading-normal">
                  TIL 블로그
                </h3>
                <p class="font-test text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  솰랴솰랴
                </p>
                <p class="font-test text-lg font-light leading-relaxed mt-0 mb-8 text-gray-700">
                  솰랴솰랴
                </p>
              </div>
              <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div class="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-lg rounded-lg bg-bg3">
                  <img
                    alt="..."
                    src="https://media.discordapp.net/attachments/874660081160044625/889471029276213268/work-731198_960_720.png"
                    class="w-full align-middle rounded-t-lg"
                  />
                  <blockquote class="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      class="absolute left-0 w-full block"
                      style={{ height: "95px", top: "-94px" }}
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        class="text-bg3 fill-current"
                      ></polygon>
                    </svg>
                    <h4 class="font-test text-xl font-bold text-white">
                      이번 프로젝트 어떡하지...🤯
                    </h4>
                    <p class="text-md font-ltest font-light mt-2 text-white">
                      막막했던 팀프로젝트, 이제는 Gitime와 함께하세요. <br></br>
                      사장님께는 사랑받는 사원으로, 교수님께는 칭찬받는
                      학생으로! <br></br>
                      더욱 편리하게 프로젝트를 관리할 수 있어요.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="relative py-32 bg-bg4" id="Portfolio">
          <div
            class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px", transform: "translateZ(0px)" }}
          >
            <svg
              class="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                class="text-bg4 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <div class="container mx-auto px-4">
            <div class="items-center flex flex-wrap">
              <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  class="max-w-full rounded-lg shadow-lg"
                  src="https://media.discordapp.net/attachments/874660081160044625/897738904692740166/teamwork-3213924_960_720.png"
                />
              </div>
              <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div class="md:pr-12">
                  <div class="bg-bg1 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                    <i class="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 class="font-test text-3xl font-semibold">
                    한 눈에 볼 수 있는 우리 팀의 진행 상황.
                  </h3>
                  <p class="font-test mt-4 text-lg leading-relaxed text-gray-600">
                    "이 팀원 지금 뭐 하고 있는 거지..." <br></br>
                    "우리 팀 지금 해야 되는 일이 뭐야?" <br></br>더 이상의
                    방황은 그만! 프로젝트별로 일정을 한 눈에 관리할 수 있어요.
                  </p>
                  <ul class="list-none mt-6">
                    <li class="py-2">
                      <div class="flex items-center">
                        <div>
                          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-bg1 mr-3">
                            <i class="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 class="font-ltest text-gray-600">
                            To-Do List와 연동된 세션별 진행률 제공
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li class="py-2">
                      <div class="flex items-center">
                        <div>
                          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-bg1 mr-3">
                            <i class="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 class="font-ltest text-gray-600">
                            팀장, 팀원 공동으로 쓸 수 있는 게시판 제공
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li class="py-2">
                      <div class="flex items-center">
                        <div>
                          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-bg1 mr-3">
                            <i class="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 class="font-ltest text-gray-600">
                            실시간으로 소통할 수 있는 실시간 채팅, 화상 회의
                            제공
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="text-gray-600 body-font bg-bg4">
          <div class="container px-5 py-14 mx-auto"></div>
        </section>
        <section class="pb-20 relative block bg-gray-900" id="Project">
          <div
            class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px", transform: "translateZ(0px)" }}
          >
            <svg
              class="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                class="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div class="flex flex-wrap text-center justify-center">
              <div class="w-full lg:w-6/12 px-4">
                <h2 class="mt-20 font-test text-4xl font-semibold text-white">
                  바로 확인할 수 있는 컴파일.
                </h2>
                <p class="font-test text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  깃허브에서 코드 다운로드 받고, 다시 돌려보고... 환경 세팅부터
                  너무 어렵다고요? <br></br>
                  이제 Gitime에서 컴파일 결과까지 바로 확인하세요!
                </p>
                <div class="mb-5 mt-5 w-full md:w-1/2 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    class="max-w-full rounded-lg shadow-lg"
                    src="https://media.discordapp.net/attachments/874660081160044625/897750026103701506/1_F3bsPmG3CR2r8X_XWCsJ2w.gif"
                  ></img>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap mt-12 justify-center">
              <div class="w-full lg:w-3/12 px-4 text-center">
                <div class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-gray-300 inline-flex items-center justify-center">
                  <i class="fas fa-medal text-xl"></i>
                </div>
                <h6 class="font-test text-xl mt-5 font-semibold text-white">
                  소통과 관리의 통합
                </h6>
                <p class="font-ltest mt-2 mb-4 text-gray-500">
                  귀찮게 개발 환경을 각 로컬마다 구축하지 마세요.
                </p>
              </div>
              <div class="w-full lg:w-3/12 px-4 text-center">
                <div class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i class="fas fa-poll text-xl"></i>
                </div>
                <h5 class="font-test text-xl mt-5 font-semibold text-white">
                  적은 메모리 샤용량
                </h5>
                <p class="font-ltest mt-2 mb-4 text-gray-500">
                  사용자 수가 많고 팀이 많아도 걱정하지 마세요. <br />
                  도커를 이용해 자원 할당량을 최소화 시켰어요.
                </p>
              </div>
              <div class="w-full lg:w-3/12 px-4 text-center">
                <div class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i class="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 class="font-test text-xl mt-5 font-semibold text-white">
                  유료? 아니 무료예요.
                </h5>
                <p class="font-ltest mt-2 mb-4 text-gray-500">
                  어디가서 돈 내고 사용하지 마세요. <br />
                  저희는 무료예요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  );
}

export default Mainpage;
