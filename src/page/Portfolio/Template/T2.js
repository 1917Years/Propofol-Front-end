import { React, useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import { SERVER_URL } from "../../../utils/SRC";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

//갬성버전
function T2() {
  const style = {
    backgroundImage:
      "url(https://cdn.discordapp.com/attachments/766266146520563785/968491436746088510/martin-jernberg-veMLshzPEq0-unsplash.jpg)",
  };
  const navigate = useNavigate();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [portfolioInfo, setPortfolioInfo] = useState([]);
  const [checkProfile, setCheckProfile] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileType, setProfileType] = useState();
  const id = useParams().id;

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/getPortfolio?memberId=" +
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
    <div class="w-full    bg-blue-200" id="testId">
      {loadingComplete ? (
        <>
          <div
            class="pt-10 mx-auto w-1/2 flex font-test"
            data-html2canvas-ignore="true"
          >
            <div class="mx-auto py-2 text-lg z-50">
              {portfolioInfo.username}님의 포트폴리오예요 😚 :
              {/* 만약 id 받아오면 추가해주기! */}
              {/* {portfolioInfo.id == id ? <button class="font-test py-2 px-4" onClick={downloadPdfDocument}>
                📄 <a class="">PDF</a>로 다운받기
              </button> : null} */}
              <button class="font-test py-2 px-4" onClick={downloadPdfDocument}>
                📄 <a class="">PDF</a>로 다운받기
              </button>
            </div>
          </div>
          <div class="absolute w-full h-[80%] top-[10%] xl:border-t xl:border-t border-gray-200 mix-blend-multiply z-40"></div>
          <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-gray-200 mix-blend-multiply z-40"></div>
          <div
            class="flex justify-center bg-blue-200"
            style={{ minHeight: "35rem" }}
          >
            <div class="mt-30 w-3/4 pt-10">
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
                {portfolioInfo.job.length != 0 ? (
                  <div class="text-xl text-ltest">{portfolioInfo.job}</div>
                ) : null}

                <div class="text-4xl">개발자 {portfolioInfo.username}</div>
                {portfolioInfo.job.length != 0 ? (
                  <div class="mt-2 text-2xl">{portfolioInfo.content}</div>
                ) : null}
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
                    <div class="text-gray-600 text-4xl font-btest text-center ">
                      <a class="text-3xl text-blue-300">● </a>About me
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
                    {portfolioInfo.github.length != 0 ? (
                      <div>
                        <a class="bg-blue-100 p-1 mr-3 font-sbtest">Github</a>{" "}
                        {portfolioInfo.github}
                      </div>
                    ) : null}
                  </div>
                </div>
                {portfolioInfo.skills.length != 0 ? (
                  <div class="w-1/2 px-10">
                    <div class="w-full flex items-center gap-5">
                      <div class="text-gray-600 text-4xl font-btest text-center ">
                        <a class="text-3xl text-blue-300">● </a>Skills
                      </div>
                    </div>

                    <div class="text-lg h-3/4 font-test text-gray-600 flex items-center gap-4 py-3">
                      <div class="grid grid-cols-3">
                        {portfolioInfo.skills.map((skill) => {
                          return (
                            <a class="text-center my-4 mr-3 bg-blue-100 rounded-lg px-2 py-1">
                              {skill.name}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {portfolioInfo.projects.length != 0 ? (
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
                              class="w-3/4 h-full"
                              style={{ minHeight: "16rem" }}
                            >
                              <img
                                src={
                                  "data:image/" +
                                  project.imageType +
                                  ";base64," +
                                  project.imageBytes
                                }
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
                                  <div class="text-lg text-center grid grid-cols-3 text-gray-600 mt-3">
                                    {project.tagId.map((skill) => {
                                      return (
                                        <a class="my-2 mx-2 rounded-lg bg-gray-200">
                                          {skill.name}
                                        </a>
                                      );
                                    })}
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                          <div class="mt-5 text-gray-600 font-test text-lg break-all">
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
          ) : null}

          {portfolioInfo.awards.length != 0 ? (
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
          ) : null}

          {portfolioInfo.careers.length != 0 ? (
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
                          <div class="w-3/4 relative py-2">
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
            <section class="relative bg-yellow-50" id="blog">
              <div class="absolute w-[60%] h-full left-[20%] xl:border-l xl:border-r border-[#f1e7d0] z-40"></div>
              <div class="w-[60%] mx-auto px-4 z-30 py-24">
                <div class="w-full flex justify-center font-test">
                  <div class="w-full px-20 flex flex-col items-center">
                    <div class="text-gray-900 text-5xl font-btest text-center bg-[#ffeeb2] p-1">
                      Blog
                    </div>
                    <div class="flex justify-center items-center"></div>
                    <div class="text-xl w-full h-3/4 font-test text-gray-600 flex justify-center items-center gap-4 py-3 px-3"></div>
                    <div class="mt-5 w-full">
                      <div class="flex items-center gap-3">
                        <div class="text-2xl font-sbtest text-gray-700 border-b-2 border-gray-400 pb-1">
                          추천수 상위글
                        </div>
                      </div>
                      {portfolioInfo.boards.map((board) => {
                        return (
                          <div
                            class="mt-6 w-full relative py-4 px-6 border-2 border-gray-300 rounded-md  bg-white"
                            style={{ minHeight: "12rem" }}
                          >
                            <div class="flex items-center">
                              <div class="w-3 h-3 mr-3 bg-gray-400"></div>
                              <div class="text-2xl text-gray-700 font-sbtest text-center">
                                {board.title}
                              </div>
                            </div>
                            <div
                              class="flex justify-center items-center mt-3 gap-6"
                              style={{ maxHeight: "14rem", minWidth: "48rem" }}
                            >
                              <div
                                class="grow z-50"
                                style={{ minHeight: "6rem" }}
                              >
                                <div class="relative py-2 break-all">
                                  {board.content}{" "}
                                  <button
                                    class=" text-gray-600"
                                    onClick={() =>
                                      navigate("/blog/detail/" + board.boardId)
                                    }
                                  >
                                    {"("}🔗더보기 {")"}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                              <div>{board.date} </div>
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
  );
}

export default T2;
