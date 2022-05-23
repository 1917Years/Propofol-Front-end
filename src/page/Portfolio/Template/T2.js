import { React, useEffect, useState } from "react";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import { SERVER_URL } from "../../../utils/SRC";

//갬성버전
function T2() {
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
          <div class="absolute w-full h-[80%] top-[10%] xl:border-t xl:border-t border-gray-200 mix-blend-multiply z-40"></div>
          <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-gray-200 mix-blend-multiply z-40"></div>
          <div
            class="flex justify-center bg-blue-200"
            style={{ minHeight: "35rem" }}
          >
            <div class="mt-50 w-3/4 pt-10">
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
              <div class="mt-10 text-3xl text-gray-900 z-20 font-btest text-center">
                <div class="text-2xl text-ltest">{portfolioInfo.job}</div>
                <div class="text-4xl">개발자 {portfolioInfo.username}</div>
                <div>{portfolioInfo.content}</div>
              </div>
            </div>
          </div>

          <section class="relative bg-white py-10" id="aboutme">
            <div class="absolute w-full h-[80%] top-[10%] xl:border-b xl:border-t xl:border-t border-blue-100 mix-blend-multiply z-40"></div>
            <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-blue-100 z-40"></div>
            <div class="w-[60%] mx-auto px-4 z-30 py-16 ">
              <div class="flex justify-center">
                <div class="w-1/2 px-10">
                  <div class="w-full flex items-center gap-5">
                    <div class="w-12 h-12 shadow-md rounded-full bg-blue-300"></div>
                    <div class="text-gray-600 text-4xl font-btest text-center ">
                      About me
                    </div>
                  </div>
                  <div class="text-xl font-test text-gray-600 flex flex-col gap-5 mt-10">
                    <div>
                      <a class="bg-blue-100 p-1 mr-3 font-sbtest">연락처</a>{" "}
                      {portfolioInfo.phone}
                    </div>
                    <div>
                      <a class="bg-blue-100 p-1 mr-3 font-sbtest">이메일</a>{" "}
                      {portfolioInfo.email}
                    </div>
                    <div>
                      <a class="bg-blue-100 p-1 mr-3 font-sbtest">Github</a>{" "}
                      {portfolioInfo.github}
                    </div>
                  </div>
                </div>
                <div class="w-1/2 px-10">
                  <div class="w-full flex items-center gap-5">
                    <div class="w-12 h-12 shadow-md rounded-full bg-blue-300"></div>
                    <div class="text-gray-600 text-4xl font-btest text-center ">
                      Skills
                    </div>
                  </div>

                  <div class="text-lg h-3/4 font-test text-gray-600 flex items-center gap-4 py-3">
                    <div class="flex flex-col gap-5 py-7">
                      <div class="flex gap-3">
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">Java</a>
                        </div>
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">
                            JavaScript
                          </a>
                        </div>
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">Spring</a>
                        </div>
                      </div>
                      <div class="flex gap-3">
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">Python</a>
                        </div>
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">
                            TypeScript
                          </a>
                        </div>
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">
                            Android
                          </a>
                        </div>
                      </div>
                      <div class="flex gap-3">
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">Vue</a>
                        </div>
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">
                            node.js
                          </a>
                        </div>
                        <div>
                          <a class="bg-blue-100 p-1 mr-3 font-sbtest">
                            dasdasd
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="relative bg-gray-100" id="project">
            <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-gray-300 z-40"></div>
            <div class="w-[60%] mx-auto px-4 z-30 py-16 ">
              <div class="flex justify-center">
                <div class="w-full px-24 ">
                  <div class="w-full flex items-center justify-center gap-5">
                    <div class="text-black text-5xl font-btest text-center bg-blue-100 p-1">
                      Project
                    </div>
                  </div>
                  {portfolioInfo.projects.map((project) => {
                    return (
                      <div
                        class="text-xl font-test  text-gray-900 mt-10 border-t-2 border-gray-300 px-6 py-12"
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
                              style={{ maxHeight: "1620rem" }}
                              alt="profile"
                            />
                          </div>
                          <div class="w-5/6 flex flex-col gap-3 px-3 justify-center">
                            <div class="mr-3 text-4xl mb-2">
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
                        <div class="text-gray-600 font-test text-lg break-all">
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

          <section class="relative bg-white" id="award">
            <div class="absolute w-full h-[85%] top-[7.5%] xl:border-b xl:border-t xl:border-t border-indigo-100 mix-blend-multiply z-40"></div>
            <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-indigo-100 z-40"></div>
            <div class="w-[60%] mx-auto px-4 z-30 py-24">
              <div class="flex justify-center">
                <div class="w-3/4 px-20 flex flex-col items-center">
                  <div class="w-full flex items-center justify-center gap-5">
                    <div class="text-gray-900 text-5xl font-btest text-center border-b-2 border-indigo-300">
                      Award
                    </div>
                  </div>

                  <div class="text-xl h-3/4 font-test text-gray-600 mt-10 flex items-center gap-4 py-3 px-3">
                    <div class="w-4 h-full rounded-md relative bg-gradient-to-b from-indigo-300 to-blue-200 z-40"></div>
                    <div class="ml-6 flex flex-col gap-20 py-5">
                      {portfolioInfo.awards.map((award) => {
                        return (
                          <div class="flex gap-2 items-center ">
                            <div class="w-3 h-3 mr-3 rounded-full bg-indigo-300"></div>
                            <div class="mr-3 font-sbtest">{award.date}</div>
                            <div class="mr-3 font-test">{award.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="relative bg-indigo-100" id="workExperience">
            <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-indigo-200 z-40"></div>
            <div class="w-[60%] mx-auto px-4 z-30 py-24">
              <div class="w-full flex justify-center">
                <div class="w-full px-20 flex flex-col items-center">
                  <div class="w-full flex items-center justify-center gap-5">
                    <div class="text-gray-900 text-5xl font-btest text-center bg-indigo-200">
                      Work Experience
                    </div>
                  </div>

                  {portfolioInfo.careers.map((career) => {
                    return (
                      <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-3 px-3">
                        <div class="w-1/4 relative py-2 border-r border-gray-500">
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
          <section class="relative bg-yellow-50" id="blog">
            <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-[#f1e7d0] z-40"></div>
            <div class="w-[60%] mx-auto px-4 z-30 py-24">
              <div class="w-full flex justify-center font-test">
                <div class="w-full px-20 flex flex-col items-center">
                  <div class="text-gray-900 text-5xl font-btest text-center bg-[#ffeeb2] p-1">
                    Blog
                  </div>
                  <div class="flex justify-center items-center mt-5">
                    <div class="text-xl text-gray-600">
                      🔗 https://www/propofol/blog/username(임시 주소)
                    </div>
                  </div>
                  <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-3 px-3"></div>
                  <div class="mt-8 w-full">
                    <div class="text-2xl font-sbtest text-gray-700 border-b-2 border-gray-400 pb-1">
                      추천수 상위글
                    </div>
                    <div
                      class="mt-6 w-full relative py-4 px-6 border-2 border-gray-300 rounded-md shadow-lg bg-white"
                      style={{ minHeight: "12rem" }}
                    >
                      <div class="flex items-center">
                        <div class="w-3 h-3 mr-3 bg-gray-400"></div>
                        <div class="text-2xl text-gray-700 font-sbtest text-center">
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
                      class="mt-6 w-full relative py-4 px-6 border-2 border-gray-300 rounded-md shadow-lg bg-white"
                      style={{ minHeight: "12rem" }}
                    >
                      <div class="flex items-center">
                        <div class="w-3 h-3 mr-3 bg-gray-400"></div>
                        <div class="text-2xl text-gray-700 font-sbtest text-center">
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

export default T2;
