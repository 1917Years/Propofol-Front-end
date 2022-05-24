import { React, useEffect, useState } from "react";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import { SERVER_URL } from "../../../utils/SRC";
function T4() {
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
<<<<<<< HEAD
=======
            // setLoadingComplete(true);
>>>>>>> e869d3a759be3248575250e70da54012442468e4
          } else {
            console.log("이미 프로필 이미지 있삼");
            setProfileType(res.data.data.profileType);
            setProfileImg(res.data.data.profileBytes);
            console.log(profileType);
            console.log(profileType);
            setCheckProfile(true);
<<<<<<< HEAD
=======
            // setLoadingComplete(true);
>>>>>>> e869d3a759be3248575250e70da54012442468e4
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
    <div class="w-full bg-gradient-to-b from-bg7 to-bg8">
      {loadingComplete ? (
        <>
          <div class="pt-14 bg-bg7"></div>
          <div class="bg-white w-5/6 mx-auto flex">
            <div class="basis-1/2">
              <div class="flex flex-col w-1/2 mt-14 items-center mx-auto">
                <div class="font-sbtest text-black text-4xl text-center">
                  {portfolioInfo.username}
                </div>
                <div class="font-timeless font-semibold">
                  {portfolioInfo.job}
                </div>
                <div
                  className="ProfileImage"
                  class="mt-10 w-48 h-48 rounded-full"
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

              <div class="mt-10 mx-auto w-1/2 h-0.5 bg-black"></div>
              <div class="mt-5 mx-auto w-1/2">
                <div className="aboutMe">
                  <div class="font-timelessB text-3xl">ABOUT ME</div>
                  <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
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
                  <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>{" "}
                  {portfolioInfo.content}
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
                <div class="mb-5 mt-10 mx-auto h-0.5 bg-black"></div>
                <div className="workExperience" class="mb-10">
                  <div class="font-timelessB text-3xl">WORK EXPERIENCE</div>
                  <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
                  <div class="ml-2 flex flex-col gap-10 py-3 border-l-2 border-gray-600 px-3">
                    {portfolioInfo.careers.map((career) => {
                      return (
                        <div className="workExperience1">
                          <div class="flex items-center">
                            <div class="w-4 h-4 rounded-full border border-gray-600/70 bg-gray-600 -translate-x-[1.3rem] drop-shadow-[0_0px_8px_rgba(255,255,255,0.30)]"></div>
                            <div class="font-sbtest text-xl">
                              {career.title}
                            </div>
                          </div>
                          <div class="font-ltest ml-4 text-gray-500">
                            {career.startTerm} ~ {career.endTerm}
                          </div>
                          <div class="ml-4 font-test mt-4">
                            {"- "} {career.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div class="basis-1/2">
              <div className="project" class="w-3/4">
                <div class="mt-10 mx-auto h-0.5 bg-black"></div>
                <div class="mt-4 font-timelessB text-3xl">PROJECT</div>
                <div class="mt-4 mb-5 mx-auto h-0.25 bg-black"></div>
                {portfolioInfo.projects.map((project) => {
                  return (
                    <div className="project1 mb-5">
                      <div class="flex gap-1 items-center">
                        <div class="w-3 h-3 bg-bg9 shadow-md"></div>
                        <div class="ml-3 font-btest text-2xl align-middle">
                          {project.title}
                        </div>
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
                          <a class="mr-3 font-sbtest">개발 날짜</a>{" "}
                          {project.startTerm} ~{project.endTerm}
                        </div>
                        <div>
                          <a class="mr-3 font-sbtest">맡은 직군</a>{" "}
                          {project.job}
                        </div>
                        <div>
                          <a class="mr-3 font-sbtest">사용 기술</a>

                          {
                            <div class="flex gap-2">
                              {project.projectSkills.map((skill) => {
                                return <a class="">{skill.name}</a>;
                              })}
                            </div>
                          }
                        </div>

                        <div class="text-gray-600 font-test break-all mt-4">
                          <div class="flex items-center gap-2 mb-1">
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
                      지방의회의 조직·권한·의원선거와 지방자치단체의 장의
                      선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은
                      법률로 정한다. 대한민국의 경제질서는 개인과 기업의
                      경제상의 자유와 창의를 존중함을 기본으로 한다...(더보기)
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
                        심판한다. 이 헌법은 1988년 2월 25일부터 시행한다. 다만,
                        이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이
                        헌법에 의한 대통령 및 국회의원의 선거...(더보기)
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
        </>
      ) : null}
    </div>
  );
}

export default T4;
