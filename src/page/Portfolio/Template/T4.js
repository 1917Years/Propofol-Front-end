import { React, useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import profileImage from "../../../assets/img/profile.jpg";
import { SERVER_URL } from "../../../utils/SRC";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function T4() {
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
      var pageHeight = 358;
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
    <div class="w-full bg-gradient-to-b from-bg7 to-bg8" id="testId">
      {loadingComplete ? (
        <>
          <div class="pt-14 bg-bg7"></div>
          <div class="bg-white w-5/6 mx-auto flex">
            <div class="basis-1/2">
              <div class="flex flex-col w-1/2 mt-14 items-center mx-auto">
                <div
                  class="flex font-test border-b border-gray-400 py-4 mb-4"
                  data-html2canvas-ignore="true"
                >
                  <div class="py-2 text-base">
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

                <div class="font-sbtest text-black text-4xl text-center">
                  {portfolioInfo.username}
                </div>
                {portfolioInfo.job.length != 0 ? (
                  <div class="font-timeless font-semibold">
                    {portfolioInfo.job}
                  </div>
                ) : null}

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
                    {portfolioInfo.github.length != 0 ? (
                      <>
                        <a class="mr-3 font-sbtest">Github</a>{" "}
                        {portfolioInfo.github}
                      </>
                    ) : null}
                  </div>
                  {portfolioInfo.content.length != 0 ? (
                    <>
                      <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>{" "}
                      {portfolioInfo.content}
                    </>
                  ) : null}
                </div>

                <div className="skills">
                  {portfolioInfo.skills.length != 0 ? (
                    <>
                      <div class="mb-5 mt-5 mx-auto h-0.5 bg-black"></div>
                      <div class="font-timelessB text-3xl">SKILLS</div>
                      <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>
                      {portfolioInfo.skills.map((skill) => {
                        return (
                          <>
                            <div class="flex gap-1 items-center">
                              <div class="w-3 h-3 bg-bg9 shadow-md"></div>
                              <div class="ml-4 font-iroBatang text-xl">
                                {skill.name}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>

                <div className="award">
                  {portfolioInfo.awards.length != 0 ? (
                    <>
                      <div class="mb-5 mt-10 mx-auto h-0.5 bg-black"></div>
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
                    </>
                  ) : null}
                </div>

                {portfolioInfo.careers.length != 0 ? (
                  <div className="workExperience" class="mb-10">
                    <div class="mb-5 mt-10 mx-auto h-0.5 bg-black"></div>
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
                ) : null}
              </div>
            </div>
            <div class="basis-1/2">
              {portfolioInfo.projects.length != 0 ? (
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
                              src={
                                "data:image/" +
                                project.imageType +
                                ";base64," +
                                project.imageBytes
                              }
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
                                {project.tagId.map((skill) => {
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
              ) : null}

              {portfolioInfo.boards.length != 0 ? (
                <div className="blog" class="w-3/4 mt-10 mb-10">
                  <div class="mt-10 mx-auto h-0.5 bg-black"></div>
                  <div class="mt-4 font-timelessB text-3xl">BLOG</div>
                  <div class="mt-3 mb-5 mx-auto h-0.25 bg-black"></div>

                  <div class="flex items-center gap-2 mb-1 mt-4">
                    <div class="w-2 h-2 rounded-full bg-gray-600"></div>
                    <div class="text-lg w-full text-gray-800 font-sbtest">
                      추천수 상위글
                    </div>
                  </div>

                  {portfolioInfo.boards.map((board) => {
                    return (
                      <div
                        class="mt-6 w-full relative py-4 px-6 border-2 border-gray-300 rounded-md bg-white"
                        style={{ minHeight: "12rem" }}
                      >
                        <div class="flex items-center">
                          <div class="text-xl text-gray-700 font-sbtest text-center">
                            {board.title}
                          </div>
                        </div>
                        <div
                          class="flex justify-center items-center mt-3 gap-2"
                          style={{ maxHeight: "14rem", minWidth: "14rem" }}
                        >
                          <div class="font-ltest" style={{ minHeight: "6rem" }}>
                            {board.content}
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
                        <div class="mt-1 flex justify-end gap-5 right-0 mr-3 text-gray-500 font-ltest text-sm">
                          <div>{board.date} </div>
                          <div>추천수 {board.recommend}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <div class="pt-14 bg-bg8"></div>
        </>
      ) : null}
    </div>
  );
}

export default T4;
