import { React, useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import projectImage from "../../../assets/img/projectImage.jpg";
import projectImage2 from "../../../assets/img/projectImage2.jpg";
import sky from "../../../assets/img/sky.jpg";
import { SERVER_URL } from "../../../utils/SRC";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function T1() {
  let tempTopPost = [];

  const navigate = useNavigate();
  const image = require("../../../assets/img/skt.png");
  const style = {
    backgroundImage: `url(${image})`,
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
            //setLoadingComplete(true);
          } else {
            console.log("이미 프로필 이미지 있삼");
            setProfileType(res.data.data.profileType);
            setProfileImg(res.data.data.profileString);
            setCheckProfile(true);
            //setLoadingComplete(true);
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
    <div class="w-full" id="testId">
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
            <div
              class="mx-auto text-white w-1/2 flex font-test border rounded-lg border-gray-400 py-4 mb-4"
              data-html2canvas-ignore="true"
            >
              <div class="mx-auto py-2 text-xl">
                {portfolioInfo.username}님의 포트폴리오예요 😚 :
                <button
                  class="font-test py-2 px-4"
                  onClick={downloadPdfDocument}
                >
                  📄 <a class="">PDF</a>로 다운받기
                </button>
              </div>
            </div>
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
                {portfolioInfo.job.length != 0 ? (
                  <div class="mt-20 text-2xl text-white font-iroBatang">
                    {portfolioInfo.job}
                  </div>
                ) : null}

                <div class="text-5xl text-white z-20 font-iroBatang text-shadow-white mb-4">
                  개발자 {portfolioInfo.username}
                </div>
                {portfolioInfo.content.length != 0 ? (
                  <div
                    className="인사말"
                    class="text-2xl font-iroBatang text-white z-20 opacity-[70%] mb-2"
                  >
                    {">"} {portfolioInfo.content}
                  </div>
                ) : null}
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
                  {portfolioInfo.github.length != 0 ? (
                    <div class="flex items-center">
                      <div class="p-1 mr-3 font-timeless opacity-[90%] ">
                        Github
                      </div>
                      <div class="font-timeless opacity-[65%] ">
                        {portfolioInfo.github}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div class="px-16">
                {portfolioInfo.skills.length != 0 ? (
                  <>
                    <div class="w-full flex items-center gap-5">
                      <div class="text-white text-4xl opacity-[90%] font-timeless text-center text-shadow-sm border-b border-white/50">
                        Skills
                      </div>
                    </div>
                    <div class="text-2xl h-3/4 font-timeless text-white opacity-70 flex items-center gap-2 py-3 px-3">
                      <div class="grid grid-cols-3">
                        {portfolioInfo.skills.map((skill) => {
                          return (
                            <a class="mx-2 my-2 border border-white/70 rounded-lg px-2 py-1 text-center align-top">
                              {skill.name}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {portfolioInfo.projects.length != 0 ? (
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
                                    {project.tagId.map((skill) => {
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
          ) : null}

          {portfolioInfo.awards.length != 0 ? (
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
                              <div class="mr-3 font-iroBatang">
                                {award.name}
                              </div>
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
            <section class="relative bg-gray-500" id="workExperience">
              <div class="w-[60%] mx-auto px-4 z-30 pt-24 pb-32">
                <div class="w-full flex justify-center">
                  <div class="w-full px-20 flex flex-col items-center">
                    <div class="text-white text-5xl font-timelessB text-center border-b border-white mb-10">
                      Work Experience
                    </div>
                    {portfolioInfo.careers.map((career) => {
                      return (
                        <div class="text-xl w-full h-3/4 font-test text-gray-600 mt-10 flex justify-center items-center gap-4 py-6 px-8 bg-white rounded-xl">
                          <div class="w-1/4 relative border-r border-gray-300 py-2">
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
                        <div class="text-2xl font-iroBatang font-semibold text-gray-600">
                          <a class="text-xl text-gray-500">● </a> 추천수 상위글
                        </div>
                      </div>
                      {portfolioInfo.boards.map((board) => {
                        return (
                          <div
                            class="mt-6 w-full relative py-4 px-6 rounded-md bg-white"
                            style={{ minHeight: "12rem" }}
                          >
                            <div class="text-2xl text-gray-700 font-sbtest text-left">
                              {board.title}
                            </div>

                            <div
                              class="flex justify-center items-center mt-3 gap-6"
                              style={{ maxHeight: "14rem", minWidth: "48rem" }}
                            >
                              <div class="grow">
                                <div
                                  class="relative py-2 break-all text-gray-500"
                                  style={{ minHeight: "6rem" }}
                                >
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
  );
}

export default T1;
