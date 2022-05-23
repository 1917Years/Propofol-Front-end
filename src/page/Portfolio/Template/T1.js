import { React, useEffect, useState } from "react";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import { SERVER_URL } from "../../../utils/SRC";

function T1() {
  const style = {
    backgroundImage:
      "url(https://cdn.discordapp.com/attachments/766266146520563785/968491436746088510/martin-jernberg-veMLshzPEq0-unsplash.jpg)",
  };
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [portfolioInfo, setPortfolioInfo] = useState([]);
  const [checkProfile, setCheckProfile] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileType, setProfileType] = useState();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(SERVER_URL + "/ptf-service/api/v1/portfolio/myPortfolio")
        .then((res) => {
          console.log("서버에서 보내준 값");
          console.log(res);
          let tmpCm = {
            email: res.data.email,
            phone: res.data.phoneNumber,
            username: res.data.username,
            content: res.data.portfolio.content,
            github: res.data.portfolio.github,
            job: res.data.portfolio.job,
            awards: res.data.portfolio.awards,
            careers: res.data.portfolio.careers,
            projects: res.data.portfolio.projects,
          };
          console.log("포트폴리오 정보 조회하기~~~");
          console.log(tmpCm);
          setPortfolioInfo(tmpCm);
          setLoadingComplete(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function fetchData2() {
      await axios
        .get(SERVER_URL + "/user-service/api/v1/members/profile")
        .then((res) => {
          console.log("프로필 이미지 조회");
          console.log(res.data.data);
          if (res.data.data.profileType == null) {
            console.log("프로필 없삼");
            setCheckProfile(false);
            setLoadingComplete(true);
          } else {
            console.log("이미 프로필 이미지 있삼");
            setProfileType(res.data.data.profileType);
            setProfileImg(res.data.data.profileBytes);
            console.log(profileType);
            console.log(profileType);
            setCheckProfile(true);
            setLoadingComplete(true);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("오류가 나버림");
        });
    }

    fetchData();
    fetchData2();
  }, []);

  return (
    <div class="w-full">
      {loadingComplete ? (
        <>
          <div
            class="flex flex-col justify-center"
            style={{ minHeight: "48rem" }}
          >
            <div
              class="bg-cover bg-center absolute top-0 w-full h-[58rem] bg-bg6 bg-blend-multiply brightness-[65%] grayscale-[10%] -z-10"
              style={style}
            ></div>
            <div class="w-full flex gap-10 justify-center items-center">
              <div>
                <div
                  className="ProfileImage"
                  class="mx-auto mt-20 w-48 h-48 rounded-full"
                >
                  <img
                    src={
                      checkProfile == false
                        ? profileImage
                        : "data:image/" + profileType + ";base64," + profileImg
                    }
                    class="w-48 h-48 rounded-full drop-shadow-md"
                    alt="profile"
                  />
                </div>
              </div>
              <div>
                <div class="mt-20 text-2xl text-white font-iroBatang">
                  {portfolioInfo.job}
                </div>
                <div class="text-5xl text-white z-20 font-iroBatang text-shadow-white mb-4">
                  개발자 {portfolioInfo.username}
                </div>

                <div
                  className="인사말"
                  class="text-2xl font-iroBatang text-white z-20 opacity-[70%] mb-2"
                >
                  {">"} {portfolioInfo.content}
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
                    <div class="font-timeless opacity-[65%]">
                      {portfolioInfo.phone}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="p-1 mr-3 font-iroBatang opacity-[90%] ">
                      이메일
                    </div>
                    <div class="font-timeless opacity-[65%] ">
                      {portfolioInfo.email}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="p-1 mr-3 font-timeless opacity-[90%] ">
                      Github
                    </div>
                    <div class="font-timeless opacity-[65%] ">
                      {portfolioInfo.github}
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

                <div class="text-2xl h-3/4 font-timeless text-white opacity-70 flex items-center gap-4 py-3 px-3">
                  <div class="flex flex-col gap-5 py-5">
                    <div class="flex gap-3">
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          Java
                        </a>
                      </div>
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          JavaScript
                        </a>
                      </div>
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          Spring
                        </a>
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          Python
                        </a>
                      </div>
                      <div>
                        <a class=" mr-3 border border-white/70 rounded-lg px-2 py-1">
                          TypeScript
                        </a>
                      </div>
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          Android
                        </a>
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          Vue
                        </a>
                      </div>
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          node.js
                        </a>
                      </div>
                      <div>
                        <a class="mr-3 border border-white/70 rounded-lg px-2 py-1">
                          dasdasd
                        </a>
                      </div>
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
                  {portfolioInfo.projects.map((project) => {
                    return (
                      <div
                        class="text-xl font-test bg-gray-200 rounded-xl text-gray-900 mt-20 border-b-2 border-gray-300 px-10 py-16"
                        id="project_first"
                      >
                        <div class="flex justify-center gap-10">
                          <div
                            class="w-full h-full"
                            style={{ minHeight: "16rem" }}
                          >
                            <img
                              src={projectImage}
                              class="w-full h-full drop-shadow-md"
                              style={{ maxHeight: "16rem" }}
                              alt="profile"
                            />
                          </div>
                          <div class="w-5/6 flex flex-col gap-3 px-3 justify-center">
                            <div class="mr-3 font-timelessB text-4xl mb-2">
                              {project.title}
                            </div>
                            <div class="mr-3 font-test text-xl px-1">
                              개발 날짜
                              <a class="ml-3 text-gray-600 text-lg">
                                {project.startTerm} ~ {project.endTerm}
                              </a>
                            </div>
                            <div class="mr-3 font-test text-xl px-1">
                              맡은 직군
                              <a class="ml-3 text-gray-600">{project.job}</a>
                            </div>
                            <div class="mr-3 font-test text-xl">
                              <div class="border-b border-gray-400 w-full px-1 pb-2">
                                사용 기술
                              </div>
                              {
                                <div class="text-gray-600 mt-3">
                                  {project.projectSkills.map((skill) => {
                                    return (
                                      <a class="mr-3 bg-gray-200">
                                        {skill.name}
                                      </a>
                                    );
                                  })}
                                </div>
                              }
                            </div>
                          </div>
                        </div>

                        <div class="text-gray-600 mt-5 font-test text-lg break-all">
                          <div class="border-b border-gray-400 w-full pb-2 mb-2 text-gray-800">
                            프로젝트 설명
                          </div>
                          {project.content}
                        </div>
                      </div>
                    );
                  })}
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
                      {portfolioInfo.awards.map((award) => {
                        return (
                          <div class="flex gap-2 items-center ">
                            <div class="w-5 h-5 rounded-full border border-white/70 bg-white -translate-x-[3.125rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                            <div class="w-10 h-[0.5px] bg-white opacity-[80%] absolute -translate-x-[1.5rem]"></div>
                            <div class="mr-3 font-sbtest">{award.date}</div>
                            <div class="mr-3 font-iroBatang">{award.name}</div>
                          </div>
                        );
                      })}
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
                  {portfolioInfo.careers.map((career) => {
                    return (
                      <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-6 px-8 bg-white rounded-xl shadow-md">
                        <div class="w-1/4 relative border-r border-gray-300 py-2">
                          <div class="text-2xl text-gray-700 font-sbtest">
                            {career.title}
                          </div>
                          <div class="text-lg text-gray-500 mt-2">
                            {career.startTerm} ~ {career.endTerm}
                          </div>
                        </div>
                        <div class="w-3/4 relative py-2">{career.content}</div>
                      </div>
                    );
                  })}
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
                  <div class="flex justify-center items-center mt-5 border-b border-gray-700/50 pb-8">
                    <div class="text-xl text-gray-600">
                      🔗 https://www/propofol/blog/username(임시 주소)
                    </div>
                  </div>
                  <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-3 px-3"></div>
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
                        React란? 리액트 기초부터 심화 내용까지 한 번에 알아보기
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
                          <div class="relative py-2 break-all text-gray-500">
                            지방의회의 조직·권한·의원선거와 지방자치단체의 장의
                            선임방법 기타 지방자치단체의 조직과 운영에 관한
                            사항은 법률로 정한다. 대한민국의 경제질서는 개인과
                            기업의 경제상의 자유와 창의를 존중함을 기본으로
                            한다. 비상계엄하의 군사재판은 군인·군무원의 범죄나
                            군사에 관한 간첩죄의 경우와
                            초병·초소·유독음식물공급·포로에 관한 죄중 법률이
                            정한 경우에 한하여 단심으로 할 수 있다. 다만, 사형을
                            선고한 경우에는 그러하지 아니하다.
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
      ) : null}
    </div>
  );
}

export default T1;
