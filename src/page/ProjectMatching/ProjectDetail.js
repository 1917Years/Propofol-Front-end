import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import profileImage from "../../assets/img/profile.jpg";
import axios from "axios";
import { SERVER_URL } from "../../utils/SRC";
import 'react-quill/dist/quill.bubble.css';
import ProjectSearchBar from "../../Component/ProjectSearchBar";
import { TagModal, ScheduleViewModal } from "../../Component/Modal";

function ProjectDetail() {
  const navigate = useNavigate();
  const id = useParams().id;
  const tagList = [
    "JAVA",
    "Spring",
    "C++",
    "JavaScript",
    "C#",
    "C",
    "Python",
    "냠냠",
    "ㅁㄴㅇ",
    "울랄라",
    "언어1",
    "언어2",
  ];
  const [isTC, setIsTC] = useState(false);
  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);
  const [project, setProject] = useState({})
  const [content, setContent] = useState();
  //
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [showTagMoadl, setShowTagModal] = useState(false);
  //
  const [showScheduleViewModal, setShowScheduleViewModal] = useState(false);

  let tmpDetail =
    "절대 잠수타지 않고 끝까지 책임감 있게 함께 지속해나갈 팀원을 구합니다. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절.";
  const onTagButtonClickHandler = (e) => {
    if (e.target.value == "-1") return;
    if (checkedTagList.length >= 3 && isTagChecked[e.target.value] == false) {
      setIsTagFull(true);
      return;
    }
    let t = isTagChecked;
    e.target.checked = true;
    t[e.target.value] = !t[e.target.value];
    setIsTagChecked(t);
    let t_c = checkedTagList;
    if (isTagChecked[e.target.value] == true) {
      t_c.push(e.target.name);
      setCheckedTagList(t_c);
    } else if (isTagChecked[e.target.value] == false) {
      setCheckedTagList(t_c.filter((tagname) => tagname !== e.target.name));
      setIsTagFull(false);
    }
    console.log(checkedTagList);
    setTmp(!tmp);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      navigate("/blog/search");
    }
  };

  function loadProjectDetail() {
    axios.get(SERVER_URL + "/matching-service/api/v1/matchings/" + id)
      .then((res) => {
        console.log(res);
        setProject(res.data.data);
        setContent(res.data.data.content);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  function postApply() {
    axios.post(SERVER_URL + "/matching-service/api/v1/members/" + id + "/apply")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  useEffect(() => {
    let t = [];
    loadProjectDetail();
    for (let i = 0; i < tagList.length; i++) {
      t.push(false);
    }

    console.log(t);
    setIsTagChecked(t);
    console.log(isTagChecked);
  }, []);

  return (
    <div class="bg-white w-full font-test">
      {showTagMoadl ?
        (<TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />)
        :
        (null)}
      {showScheduleViewModal ?
        (<ScheduleViewModal
          setShowScheduleViewModal={setShowScheduleViewModal}
          timeTables={project.timeTables}
        />)
        :
        (null)}
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
          />
          <div class="mt-6 px-4 border rounded-lg border-gray-300">
            <div class="flex mt-4 justify-between pr-2">
              <div class="flex">
                <div class="text-2xl font-btest">
                  {project.title}
                </div>
                {project.status == "ACTIVE" ?
                  (
                    <div class="ml-4 w-fit px-3 bg-green-300 text-black align-middle">
                      모집중
                    </div>
                  )
                  :
                  (
                    <div class="px-2 bg-red-300 text-black">
                      모집완료
                    </div>
                  )}
              </div>
              <button
                onClick={() => {
                  setShowScheduleViewModal(true);
                }}
              >{"시간표 >"}
              </button>
            </div>
            <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>

            <div class="flex">
              <div class="mt-4 w-3/4">
                <div
                  className="Writing"
                  class="flex bg-white h-54 py-5 gap-5"
                >
                  <div class="w-[47rem]">
                    <div class="flex">
                      <div>
                        <div class="bg-gray-300 w-56 h-72 mb-2">사진</div>
                      </div>
                      <div class="ml-10 flex flex-col gap-2 items-start">
                        <div class="flex items-center gap-2">
                          <div class="text-bluepurple text-lg mr-2">사용 기술</div>
                          {project.tags == null ?
                            (<div>로딩중.</div>)
                            :
                            (
                              project.tags.map((item) => {
                                return (
                                  <div class="text-base font-ltest text-black bg-gray-200 px-1">
                                    {item.name}
                                  </div>
                                )
                              })
                            )
                          }
                          <div class="text-base font-ltest text-black bg-gray-200 px-1">
                            Spring
                          </div>
                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-bluepurple text-lg">모집 인원</div>
                          {project.rescruit == null ?
                            (<div>로딩중.</div>)
                            :
                            (<div class="text-md text-gray-600 font-ltest">{project.rescruit}명</div>)
                          }

                        </div>
                        <div class="flex items-center gap-3">
                          <div class="text-bluepurple text-lg">프로젝트 기간 </div>
                          {project.startDate == null || project.endDate == null ?
                            (<div>로딩중.</div>)
                            :
                            (<div class="text-md text-gray-600 font-ltest">{project.startDate}~{project.endDate}</div>)
                          }
                        </div>
                      </div>
                    </div>

                    <div class="mt-4 font-ltest">
                      {content == null ?
                        (<div>로딩중</div>)
                        : (<ReactQuill
                          value={content}
                          readOnly={true}
                          theme={"bubble"}
                        />)}

                    </div>
                  </div>

                </div>
              </div>
              <div class="ml-5 w-1/4 py-5">
                <div class="mb-4 text-xl font-btest">팀장 정보</div>
                <div class="bg-gray-100 py-4 px-4 rounded-lg">
                  <div class="flex mt-2">
                    <div className="ProfileImage" class=" w-14 h-14 rounded-full">
                      <img
                        src={project.profileString}
                        class="w-14 h-14 rounded-full drop-shadow-lg"
                        alt="profile"
                      />
                    </div>
                    <div class="ml-4 my-auto text-2xl font-btest">{project.nickName}</div>
                  </div>
                  <div class="mt-4 text-sm font-ltest">안녕하세요.
                    저는 개발자 이지원입니다. 개발을 저의 인생 모토로 삼아 일일 공부를
                    목표로 하여 TIL 블로그를 운영하고 있습니다. 사람들에게 더 편리한
                    UI를 제공하는 것을 목표로 삼아 멋진 디자인을 만드는 프론트엔드
                    디자이너가 되기 위해 오늘도 달리는 중입니다. :D</div>
                </div>
                <button class="ml-6 mt-4 font-ltest text-sm"> 팀장의 포트폴리오 확인하기 {">"}</button>
                <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
                {project.apply ?
                  (<button
                    class="mt-4 border text-md rounded-lg w-full py-2"
                    onClick={() => { }}
                  >
                    신청 취소하기
                  </button>)
                  :
                  (<button
                    class="mt-4 border text-md rounded-lg w-full py-2"
                    onClick={postApply}
                  >
                    지원하기
                  </button>)}
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
