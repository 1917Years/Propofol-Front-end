import React, { useEffect, useState } from "react";
import "animate.css";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-scroll";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import {
  setRefreshTokenToCookie,
  getRefreshToken,
  refreshJWT,
  getAccessToken,
} from "../utils/auth.js";
import { setCookie } from "../utils/cookie";

function Mainpage(props) {
  const navigate = useNavigate();
  const [userMove, setUserMove] = useState(false);

  const style = {
    backgroundImage:
      "url(https://cdn.discordapp.com/attachments/766266146520563785/980038822052102184/whiteboard_-_1658_Original.mp4)",
  };

  useEffect(() => {
    console.log("이친구 왜 실행이 안될까...........?");
    if (getAccessToken != "no access_token") {
      axios
        .get(SERVER_URL + "/ptf-service/api/v1/portfolio/checkPortfolio")
        .then((res) => {
          console.log("기존에 포폴 있는지 조회하기");
          console.log(res);

          if (res.data.data != "no") {
            setCookie("portfolioId", res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userMove]);

  return (
    <div class="text-gray-800 antialiased z-1">
      <main>
        <div class="pt-20 bg-black w-[100%] h-[100vh]" style={{ minHeight: "54rem" }}>
          <div
            class=""
            style={style}
          ></div>
          <video
            autoPlay
            muted
            loop
            width="120%"
            playsInline
            class="bg-cover bg-center absolute top-0 bg-bg6 xl:bg-cover bg-blend-multiply min-h-[66.5rem] min-w-[110rem] blur-[5px] brightness-[.75] grayscale-[10%]"
            src="https://cdn.discordapp.com/attachments/766266146520563785/980038822052102184/whiteboard_-_1658_Original.mp4"
            type="video/mp4"
          ></video>
          <div class="flex items-center h-full relative mx-auto ">
            <div class="self-start z-20 animate__animated animate__fadeIn absolute flex lg:gap-[145%] md:gap-[130%] gap-[15px] 3xl:left-1/4 2xl:left-[20%] xl:left-[17%] md:left-[10%] left-[5%]">
              <div>
                <div class="text-white font-ttest flex md:flex-col flex-row">
                  <Link to="TIL" spy={true} smooth={true}>
                    <button class="hover:animate-pulse p-3 w-12 h-12 md:pt-4 lg:w-20 lg:h-20 shadow-lg rounded-full bg-none border border-white text-center align-middle lg:pt-4 lg:text-3xl md:w-16 md:h-16 md:text-2xl">
                      1
                    </button>
                  </Link>
                  <div class="mt-4 ml-2 md:ml-[0px] md:mt-3 text-center lg:text-base md:text-sm">
                    TIL 블로그
                  </div>
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
                  <div class="mt-4 ml-2 md:ml-[0px] md:mt-3 text-center lg:text-base md:text-sm">
                    포트폴리오
                  </div>
                </div>
                <div class="absolute lg:ml-36 lg:bottom-20 md:ml-20 md:bottom-20 border-t border-white opacity-50 md:w-full"></div>
              </div>

              <div class="text-white font-ttest flex md:flex-col flex-row">
                <Link to="Project" spy={true} smooth={true}>
                  <button class="hover:animate-pulse p-3 w-12 h-12 md:pt-4 lg:w-20 lg:h-20 shadow-lg rounded-full bg-none border border-white text-center align-middle lg:pt-4 lg:text-3xl md:w-16 md:h-16 md:text-2xl">
                    3
                  </button>
                </Link>
                <div class="mt-4 ml-2 md:ml-[0px] md:mt-3 text-center text-sm">
                  프로젝트 매칭
                </div>
              </div>
            </div>
            <div class="mt-20 flex flex-col items-start w-[50%] w-full ml-auto mr-auto text-center border-white">
              <div class="mb-10 flex flex-col gap-2">
                <h1 class="text-white font-rumpi text-8xl text-shadow">
                  Propofol
                </h1>
                <p class="animate__animated animate__fadeIn text-2xl text-white opacity-90 font-ltest">
                  ( <a class="font-sbtest">Pro</a>file +{" "}
                  <a class="font-sbtest">Po</a>rt<a class="font-sbtest">fol</a>
                  io )
                </p>
              </div>
              <p class="text-left animate__animated animate__fadeIn pt-5 font-ltest text-xl flex flex-col gap-2 text-gray-300">
                <p>
                  힘든 일일 학습, 지겨운 포트폴리오 작성, 번거로운 프로젝트
                  매칭.
                </p>
                <p>이젠 더 이상 고민하지 마세요.</p>
                <p>프로포폴과 함께라면, 편하게 해결할 수 있어요.</p>
              </p>
            </div>
            <button
              class="bg-white w-12 z-40 text-black font-test"
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
                    }
                  });
              }}
            >
              버튼11111
            </button>
          </div>
        </div>

        <section class="relative bg-white" id="TIL">
          <div class="container mx-auto h-[100vh] flex items-center px-4 z-30 py-32 ">
            <div class="flex justify-evenly items-center w-full">
              <div class="w-full md:w-[30%] px-4">
                <div class="">
                  <img
                    alt="..."
                    src="https://cdn.discordapp.com/attachments/766266146520563785/980066390369267712/windows-v94mlgvsza4-unsplash.jpg"
                    class="w-[90%] min-w-0 h-[90%] align-middle rounded-lg shadow-xl drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150"
                  />
                </div>
              </div>
              <div class="w-full flex flex-col items-start w-full md:w-[30%] px-4">
                <h3 class="z-40 font-test text-6xl mb-2 font-semibold leading-normal">
                  TIL 블로그
                </h3>
                <p class="font-test text-xl font-light leading-relaxed mt-4 text-gray-700">
                  오늘의 공부, 프로포폴이 책임질게요!

                </p>
                <p class="font-test text-xl font-light leading-relaxed mt-1 text-gray-700">
                  개발자를 위한 일일학습 특화 블로그 TIL은
                </p>
                <p class="font-test text-xl font-light leading-relaxed mt-1 mb-4 text-gray-700">
                  여러 기능들로 일일학습을 더 쉽게 만들어줄 거에요.
                </p>

                <div class="flex flex-col gap-2 font-ltest text-gray-500 text-lg">
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-gray-600"></div>
                    본인의 학습 기록을 점검할 수 있는 스트릭 기능 제공</div>
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-gray-600"></div>
                    바로 결과를 확인할 수 있는 코드 컴파일 기능 제공</div>
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-gray-600"></div>
                    원하는 분야만 찾아보고 분류할 수 있는 태그 기능 제공</div>
                </div>
                <button
                  class="font-sbtest w-1/2 mt-10 text-xl bg-indigo-100 rounded-lg px-4 py-4"

                >
                  학습하러 가기
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="relative py-32 bg-bg4" id="Portfolio">
          <div
            class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px", transform: "translateZ(0px)" }}
          >
          </div>
          <div class="container mx-auto px-4">
            <div class="items-center flex flex-wrap">
              <div class="mx-auto w-full md:w-full px-4">
                <div class="">
                  <h3 class="font-test text-6xl font-semibold">
                    포트폴리오
                  </h3>
                  <p class="font-ltest mt-2 text-xl leading-relaxed text-gray-600">
                    "아이스크림 같지?"
                  </p>

                </div>
              </div>
              <div class="relative min-h-[40rem] w-full">
                <div class="absolute right-[0rem] z-[30]  md:w-1/2">
                  <img
                    class="rounded-lg shadow-lg w-fit"
                    src="https://media.discordapp.net/attachments/973534197849415713/980084940517539850/1.png?width=294&height=668"
                  />
                </div>
                <div class="absolute left-[60rem] top-[10rem] z-[40] md:w-1/3 ">
                  <img
                    class="max-w-full rounded-lg shadow-lg"
                    src="https://media.discordapp.net/attachments/973534197849415713/980084939598995456/2.png?width=252&height=669"
                  />
                </div>
                <div class="absolute left-[70rem] top-[5rem] md:w-1/2">
                  <img
                    class="max-w-full rounded-lg shadow-lg"
                    src="https://media.discordapp.net/attachments/973534197849415713/980084939892617237/3.png?width=301&height=670"
                  />
                </div>
                <div class="absolute left-[60.5rem] bottom-[8rem] md:w-1/3">
                  <img
                    class="max-w-full rounded-lg shadow-lg"
                    src="https://media.discordapp.net/attachments/973534197849415713/980084940161028206/4.png?width=554&height=669"
                  />
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
    </div>
  );
}

export default Mainpage;
