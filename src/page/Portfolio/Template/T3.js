import { React, useEffect, useState } from "react";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import { SERVER_URL } from "../../../utils/SRC";

function T3() {
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
            // setLoadingComplete(true);
          } else {
            console.log("이미 프로필 이미지 있삼");
            setProfileType(res.data.data.profileType);
            setProfileImg(res.data.data.profileBytes);
            console.log(profileType);
            console.log(profileType);
            setCheckProfile(true);
            // setLoadingComplete(true);
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
    <div class="w-full bg-white">
      {loadingComplete ? (
        <>
          <div class="mt-28 flex flex-col items-center ">
            <div class="flex w-1/2 gap-5 items-center ">
              <div class="w-6 h-6 bg-indigo-300 shadow-md"></div>

              <div class="text-left font-sbtest text-black text-4xl ">
                개발자 {portfolioInfo.username}{" "}
                <a class="text-2xl">
                  {" "}
                  {"("} {portfolioInfo.job} {")"}{" "}
                </a>
              </div>
            </div>
            <div class="w-1/2 font-test">{portfolioInfo.content}</div>
            <div class="mt-10 w-1/2 flex items-center border-b border-gray-400 pb-12">
              <div
                className="ProfileImage"
                class="w-48 h-48 rounded-full mr-16"
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
              <div class="pl-16 border-l border-gray-300 " id="aboutme">
                <div class="font-sbtest text-3xl">About me</div>
                <div class="text-xl font-test text-gray-600 flex flex-col gap-7 mt-8">
                  <div>
                    <a class="mr-3 font-sbtest">연락처</a> {portfolioInfo.phone}
                  </div>
                  <div>
                    <a class="mr-3 font-sbtest">이메일</a> {portfolioInfo.email}
                  </div>
                  <div>
                    <a class="mr-3 font-sbtest">Github</a>{" "}
                    {portfolioInfo.github}
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

                  <div class="text-lg font-test text-gray-800 opacity-[80%] flex items-center gap-4 py-3 px-3">
                    <div class="ml-6 flex flex-col gap-10 py-3 border-l-2 border-gray-600 px-3 ">
                      {portfolioInfo.awards.map((award) => {
                        return (
                          <div class="flex gap-1 items-center ">
                            <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                            <div class="mr-2 font-sbtest">{award.date}</div>
                            <div class="font-test">{award.name}</div>
                          </div>
                        );
                      })}
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
                  {portfolioInfo.projects.map((project) => {
                    return (
                      <div id="project_first">
                        <div class="mt-5 text-3xl font-sbtest text-black">
                          {project.title}
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
                                <a class="ml-3 text-gray-600">
                                  {project.startTerm}~ {project.endTerm}
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
                                        <a class="mr-3 bg-indigo-100">
                                          {skill.name}
                                        </a>
                                      );
                                    })}
                                  </div>
                                }
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
                            {project.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

                  {portfolioInfo.careers.map((career) => {
                    return (
                      <div class="text-xl w-full font-test text-gray-600 mt-5 justify-center items-center gap-4 py-3 px-3">
                        {" "}
                        <div class="w-1/4 relative py-2">
                          <div class="text-3xl text-black font-sbtest">
                            {career.title}
                          </div>
                          <div class="text-lg font-ltest text-gray-500 mt-2">
                            {career.startTerm} ~ {career.endTerm}
                          </div>
                        </div>
                        <div class="py-2 pl-6 mt-8 border-l-8 border-indigo-100">
                          {career.content}
                        </div>
                      </div>
                    );
                  })}
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
                          React란? 리액트 기초부터 심화 내용까지 한 번에
                          알아보기
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
                        <div
                          class="w-[10rem] h-[8.5rem] bg-black"
                          style={{ minWidth: "10rem" }}
                        ></div>
                        <div class="grow">
                          <div class="relative py-2 break-all">
                            법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여
                            심판한다. 이 헌법은 1988년 2월 25일부터 시행한다.
                            다만, 이 헌법을 시행하기 위하여 필요한 법률의
                            제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거
                            기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할
                            수 있다. 국회에서 의결된 법률안은 정부에 이송되어
                            15일 이내에 대통령이 공포한다.
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

export default T3;
