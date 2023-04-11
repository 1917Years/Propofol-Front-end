import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import profileImage from "../../assets/img/profile.jpg";
import axios from "axios";
import { SERVER_URL } from "../../utils/SRC";
import "react-quill/dist/quill.bubble.css";
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { TagModal, ScheduleViewModal } from "../../Component/Modal";

function ProjectDetail() {
  const id = useParams().id;
  //
  const [project, setProject] = useState({});
  const [content, setContent] = useState();
  //
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [showTagMoadl, setShowTagModal] = useState(false);
  //
  const [showScheduleViewModal, setShowScheduleViewModal] = useState(false);
  //

  function cancleApply() {
    axios
      .delete(SERVER_URL + "/matching-service/api/v1/members/" + id + "/cancel")
      .then((res) => {
        console.log(res);
        loadProjectDetail();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function secedeProject() {
    axios
      .delete(
        SERVER_URL + "/matching-service/api/v1/members/" + id + "/secession"
      )
      .then((res) => {
        console.log(res);
        loadProjectDetail(1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  async function loadImage(content_before) {
    let tmpimgsrc = [];
    let tmpimgsrctype = [];
    let tmploadbyte = [];
    let start = 0;
    let end = 0;
    let k = 0;

    while (content_before.indexOf('<img src="http://', end) != -1) {
      start = content_before.indexOf('<img src="http://');
      end = content_before.indexOf(">", start);
      tmpimgsrc.push(content_before.slice(start + 10, end - 1));
      tmpimgsrctype.push(tmpimgsrc[k].slice(-3));
      k++;
    }
    for (let i = 0; i < tmpimgsrc.length; i++) {
      await axios
        .get(tmpimgsrc[i])
        .then((res) => {
          tmploadbyte.push(
            "data:image/" + tmpimgsrctype[i] + ";base64," + res.data
          );
          console.log(tmploadbyte[i]);
        })
        .catch((err) => {
          console.log("이미지 바이트를 가져오려고 했는데 에러가 났네요~");
          console.log(err);
        });
    }
    for (let i = 0; i < tmpimgsrc.length; i++) {
      content_before = content_before.replace(tmpimgsrc[i], tmploadbyte[i]);
    }
    setContent(content_before);
    console.log("달라진 디테일은~");
    console.log(content_before);
  }
  //
  function loadProjectDetail() {
    axios
      .get(SERVER_URL + "/matching-service/api/v1/matchings/" + id)
      .then((res) => {
        console.log(res);
        setProject(res.data.data);
        //setContent(res.data.data.content);
        loadImage(res.data.data.content);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function postApply() {
    axios
      .post(SERVER_URL + "/matching-service/api/v1/members/" + id + "/apply")
      .then((res) => {
        console.log(res);
        loadProjectDetail();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    loadProjectDetail();
  }, []);

  return (
    <div class="bg-white w-full font-test">
      {showTagMoadl ? (
        <TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />
      ) : null}
      {showScheduleViewModal ? (
        <ScheduleViewModal
          setShowScheduleViewModal={setShowScheduleViewModal}
          timeTables={project.timetables}
          name={project.title}
        />
      ) : null}
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
          />
          <div class="mt-6 px-4 border rounded-lg border-gray-300">
            <div class="flex mt-4 justify-between pr-2">
              <div class="flex">
                <div class="text-2xl font-btest">{project.title}</div>
                {project.status == "ACTIVE" ? (
                  <div class="flex items-center ml-4 w-fit px-3 bg-green-300 text-black align-middle">
                    <div>모집중</div>
                  </div>
                ) : (
                  <div class="flex items-center px-2 bg-red-300 text-black">
                    <div>모집완료</div>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setShowScheduleViewModal(true);
                }}
              >
                {"시간표 >"}
              </button>
            </div>
            <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>

            <div class="flex">
              <div class="mt-4 w-3/4">
                <div className="Writing" class="flex bg-white h-54 py-5 gap-5">
                  <div class="w-[47rem]">
                    <div class="flex">
                      {project.imageType == null ? null : (
                        <div>
                          <img
                            class="w-56 h-72 mb-2 mr-5"
                            src={
                              "data:image/" +
                              project.imageTypes[0] +
                              ";base64," +
                              project.imageStrings[0]
                            }
                          />
                        </div>
                      )}
                      <div class="ml-5 flex flex-col gap-2 items-start">
                        <div class="flex items-center gap-2">
                          <div class="text-bluepurple text-lg mr-2">
                            사용 기술
                          </div>
                          {project.tagInfos == null ? (
                            <div>로딩중.</div>
                          ) : (
                            project.tagInfos.map((item) => {
                              return (
                                <div class="text-base font-ltest text-black rounded-lg border px-1">
                                  {item.name}
                                </div>
                              );
                            })
                          )}
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-bluepurple text-lg">모집 인원</div>
                          {project.recruit == null ? (
                            <div>로딩중.</div>
                          ) : (
                            <div class="text-md text-gray-600 font-ltest">
                              {project.recruit}명
                            </div>
                          )}
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-bluepurple text-lg">
                            프로젝트 기간{" "}
                          </div>
                          {project.startDate == null ||
                          project.endDate == null ? (
                            <div>로딩중.</div>
                          ) : (
                            <div class="text-md text-gray-600 font-ltest">
                              {project.startDate}
                              {" ~ "}
                              {project.endDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="mt-4 font-ltest">
                      {content == null ? (
                        <div>로딩중</div>
                      ) : (
                        <ReactQuill
                          value={content}
                          readOnly={true}
                          theme={"bubble"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-5 w-1/4 py-5">
                <div class="mb-4 text-xl font-btest text-center">팀장 정보</div>
                <div class="px-4 rounded-lg">
                  <div class="flex mt-2">
                    <div
                      className="ProfileImage"
                      class=" w-14 h-14 rounded-full"
                    >
                      <img
                        src={
                          project.profileType == null
                            ? profileImage
                            : "data:image/" +
                              project.profileType +
                              ";base64," +
                              project.profileString
                        }
                        class="w-14 h-14 rounded-full drop-shadow-lg"
                        alt="profile"
                      />
                    </div>
                    <div class="flex flex-col gap-2">
                      <div class="ml-4 my-auto text-2xl font-btest">
                        {project.nickName}
                      </div>
                      <button class="ml-4 my-auto text-sm font-test">
                        📄 포트폴리오 {">"}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
                {project.master ? null : project.join ? (
                  <button
                    class="mt-4 border text-md rounded-lg w-full py-2"
                    onClick={() => {
                      secedeProject();
                    }}
                  >
                    탈퇴하기
                  </button>
                ) : project.apply ? (
                  <button
                    class="mt-4 border text-md rounded-lg w-full py-2"
                    onClick={() => {
                      cancleApply();
                    }}
                  >
                    신청 취소하기
                  </button>
                ) : (
                  <button
                    class="mt-4 border text-md rounded-lg w-full py-2"
                    onClick={() => {
                      postApply();
                    }}
                  >
                    지원하기
                  </button>
                )}
                <div class="mt-6 text-lg font-btest">현재 참여 중인 팀원</div>
                <div class="mt-3 text-gray-600">
                  {project.recruited + "명이 참여하고 있어요!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
