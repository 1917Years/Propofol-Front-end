import { React, useEffect, useState, useRef } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import { SERVER_URL } from "../../../utils/SRC";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function T3() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [portfolioInfo, setPortfolioInfo] = useState([]);
  const [checkProfile, setCheckProfile] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileType, setProfileType] = useState();
  const navigate = useNavigate();

  const id = useParams().id;

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          SERVER_URL +
            "/ptf-service/api/v1/portfolio/memberPortfolio?memberId=" +
            id
        )
        .then((res) => {
          console.log("서버에서 보내준 값");
          console.log(res);
          let tmpCm = {
            // 만약 멤버 id 보내주면
            // id: res.data.data.id,
            email: res.data.data.email,
            phone: res.data.data.phoneNumber,
            username: res.data.data.username,
            content: res.data.data.portfolio.content,
            github: res.data.data.portfolio.github,
            job: res.data.data.portfolio.job,
            skills: res.data.data.portfolio.skills,
            awards: res.data.data.portfolio.awards,
            careers: res.data.data.portfolio.careers,
            projects: res.data.data.portfolio.projects,
            template: res.data.data.portfolio.template,
            boards: res.data.data.portfolio.boards,
          };
          console.log("포트폴리오 정보 조회하기~~~");
          console.log(tmpCm);

          // let tmpSkills = [];
          // for (let i = 0; i < tmpCm.skills.length; i += 3)
          //   tmpSkills.push(tmpCm.skills.slice(i, i + 3));

          // console.log(tmpSkills);
          // tmpCm.skills = [...tmpSkills];

          // console.log(tmpCm);
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
            setProfileImg(res.data.data.profileString);
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

  const downloadPdfDocument = () => {
    const input = document.getElementById("testId");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const downloadFileName = "myPortfolio";

      var imgWidth = 210;
      var pageHeight = 297;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;

      console.log("로그 찍히나...?");
      console.log(canvas.height);
      console.log(canvas.width);
      console.log(imgWidth);
      console.log(imgHeight);

      var heightLeft = imgHeight;
      var position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <>
      <div class="w-full bg-white" id="testId">
        {loadingComplete ? (
          <>
            <div class="mt-4 flex flex-col items-center ">
              <div
                class="w-1/2 flex font-test border-b border-gray-400 py-4 mb-4"
                data-html2canvas-ignore="true"
              >
                <div class="py-2 text-xl">
                  {portfolioInfo.username}님의 포트폴리오예요 😚 :
                </div>
                {/* 만약 id 받아오면 추가해주기! */}
                {/* {portfolioInfo.id == id ? <button
                  class="font-test py-2 px-4"
                  onClick={downloadPdfDocument}
                >
                  📄 <a class="text-red-500">PDF</a>로 다운받기
                </button> : null} */}
                <button
                  class="font-test py-2 px-4"
                  onClick={downloadPdfDocument}
                >
                  📄 <a class="text-red-500">PDF</a>로 다운받기
                </button>
              </div>
              <div class="flex w-1/2 gap-5 items-center mt-24">
                <div class="text-left font-sbtest text-black text-4xl ">
                  <a class="text-indigo-300">●</a> 개발자{" "}
                  {portfolioInfo.username}{" "}
                  {portfolioInfo.job.length != 0 ? (
                    <a class="text-2xl">
                      {" "}
                      {"("} {portfolioInfo.job} {")"}{" "}
                    </a>
                  ) : null}
                </div>
              </div>
              {portfolioInfo.content != 0 ? (
                <div class="w-1/2 font-test text-lg">
                  {portfolioInfo.content}
                </div>
              ) : null}

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
                      <a class="mr-3 font-sbtest">연락처</a>{" "}
                      {portfolioInfo.phone}
                    </div>
                    <div>
                      <a class="mr-3 font-sbtest">이메일</a>{" "}
                      {portfolioInfo.email}
                    </div>
                    {portfolioInfo.github.length != 0 ? (
                      <div>
                        <a class="mr-3 font-sbtest">Github</a>{" "}
                        {portfolioInfo.github}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            {portfolioInfo.skills.length != 0 &&
            portfolioInfo.awards.length != 0 ? (
              <section class="relative">
                <div class="w-1/2 mt-10 mx-auto flex justify-center border-b border-gray-400 pb-12">
                  <div class="w-[50%]">
                    <div class="mr-5">
                      <div class="w-full flex items-center gap-5">
                        <div class="text-gray-800 text-4xl font-sbtest text-center">
                          <a class="text-3xl text-indigo-300">● </a>Skills
                        </div>
                      </div>

                      <div class="text-2xl font-test text-gray-500 flex items-center">
                        <div class="grid grid-cols-3">
                          {portfolioInfo.skills.map((skill) => {
                            return (
                              <a class="text-center my-4 mr-3 border border-gray-300 rounded-lg px-2 py-1">
                                {skill.name}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-[50%]">
                    <div class="flex flex-col items-center">
                      <div class="w-full flex items-center ml-16 gap-5">
                        <div class="ml-12 text-gray-800 text-4xl font-sbtest border-b border-white/50 text-shadow-white">
                          <a class="text-3xl text-indigo-300">● </a>Award
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
            ) : null}

            {portfolioInfo.projects.length != 0 ? (
              <section class="relative" id="project">
                <div class="w-1/2 mx-auto px-4 z-30 pt-16 border-b border-gray-400 pb-28">
                  <div class="flex justify-center">
                    <div class="w-full ">
                      <div class="w-fit flex items-center gap-5">
                        <div class="text-gray-800 text-4xl font-btest">
                          <a class="text-3xl text-indigo-300">● </a>Project
                        </div>
                      </div>
                      {portfolioInfo.projects.map((project, index) => {
                        return (
                          <div id="project_first">
                            <div class="mt-5 text-3xl font-sbtest text-black">
                              {index + 1} {". "}
                              {project.title}
                            </div>
                            <div class="text-xl font-test text-gray-900 border border-gray-300 mt-3 px-5 rounded-lg py-12">
                              <div class="flex justify-center gap-5">
                                <div
                                  class="w-3/4 h-full flex items-center"
                                  style={{ minHeight: "14rem" }}
                                >
                                  <img
                                    src={
                                      "data:image/" +
                                      project.imageType +
                                      ";base64," +
                                      project.imageBytes
                                    }
                                    class="w-full h-full drop-shadow-md"
                                    style={{
                                      maxHeight: "14rem",
                                    }}
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
                                    <a class="ml-3 text-gray-600">
                                      {project.job}
                                    </a>
                                  </div>
                                  <div class="mr-3 font-test text-xl">
                                    <div class="border-b border-gray-400 w-full px-1 pb-2">
                                      사용 기술
                                    </div>
                                    {
                                      <div class="text-lg text-center grid grid-cols-3 text-gray-600 mt-3">
                                        {project.tagId.map((skill) => {
                                          return <a class="">{skill.name}</a>;
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
            ) : null}

            {portfolioInfo.careers.length != 0 ? (
              <section class="relative" id="workExperience">
                <div class="w-1/2 mx-auto z-30 py-12 border-b border-gray-400 ">
                  <div class="w-full flex justify-center">
                    <div class="w-full flex flex-col items-center">
                      <div class="w-full flex items-center gap-5">
                        <div class="text-gray-800 text-4xl font-btest text-center">
                          <a class="text-3xl text-indigo-300">● </a>Work
                          Experience
                        </div>
                      </div>

                      {portfolioInfo.careers.map((career) => {
                        return (
                          <div class="text-xl w-full font-test text-gray-600 mt-5 justify-center items-center gap-4 py-3 px-3">
                            {" "}
                            <div class="w-1/4 relative py-2">
                              <div class="text-3xl text-black font-sbtest">
                                ✔ {career.title}
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
            ) : null}

            {portfolioInfo.boards.length != 0 ? (
              <section class="relative" id="blog">
                <div class="w-1/2 mx-auto px-4 z-30 py-24">
                  <div class="w-full flex justify-center font-test">
                    <div class="w-full flex flex-col ">
                      <div class="flex items-center gap-5">
                        <div class="text-black text-4xl font-btest">
                          {" "}
                          <a class="text-3xl text-indigo-300">● </a>Blog
                        </div>
                      </div>
                      <div class="mt-5 w-full">
                        <div class="flex items-center gap-2">
                          <div class="text-2xl font-sbtest text-gray-700">
                            추천수 상위글
                          </div>
                        </div>
                        {portfolioInfo.boards.map((board) => {
                          return (
                            <div
                              class="mt-8 mx-2 relative py-4 px-6 border border-indigo-200 rounded-md bg-white"
                              style={{ minHeight: "12rem" }}
                            >
                              <div class="flex items-center text-2xl text-gray-700 font-sbtest">
                                <div class="">1.</div>
                                <div class="">{board.title}</div>
                              </div>
                              <div
                                class="flex justify-center items-center mt-3 gap-6"
                                style={{
                                  maxHeight: "14rem",
                                  minWidth: "48rem",
                                }}
                              >
                                <div class="grow" style={{ minHeight: "6rem" }}>
                                  <div class="relative py-2 break-all">
                                    {board.content}
                                    <button
                                      class=" text-gray-600"
                                      onClick={() =>
                                        navigate(
                                          "/blog/detail/" + board.boardId
                                        )
                                      }
                                    >
                                      {"("}🔗더보기 {")"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                                <div>{board.date}</div>
                                <div>추천수 {board.recommend}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}

export default T3;
