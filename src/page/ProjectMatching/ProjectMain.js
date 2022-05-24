import axios from "axios";
//import { da } from "date-fns/locale";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ScheduleModal, ScheduleDetailModal, TagModal } from "../../Component/Modal";
import { SERVER_URL } from "../../utils/SRC";
import { fillScheduleStyleList, TimeList } from "../../Component/Schedule";

function ProjectMain() {
  const navigate = useNavigate();
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
  const time = ["00시", "02시", "04시", "06시", "08시", "10시", "12시", "14시", "16시", "18시", "20시", "22시", "24시"];
  const day = ["월", "화", "수", "목", "금", "토", "일"];
  //const [scheduleList, setScheduleList] = useState([]);

  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);

  const [selectedTagList, setSelectedTagList] = useState([]);

  const [projectList, setProjectList] = useState([]);
  const [projectTextList, setProejctTextList] = useState([]);
  //
  const [showTagMoadl, setShowTagModal] = useState(false);
  //

  useEffect(() => {
    loadProject();
    let t = [];
    for (let i = 0; i < tagList.length; i++) {
      t.push(false);
    }
    console.log(t);
    setIsTagChecked(t);
    console.log(isTagChecked);
  }, []);

  function loadProject() {
    axios.get(SERVER_URL + "/matching-service/api/v1/matchings/page?",
      {
        params: {
          page: 1
        }
      })
      .then((res) => {
        let tmpProjectList = [], tmpTextList = [];
        console.log(res);
        res.data.data.boards.map((item) => {
          tmpProjectList.push(item);
          tmpTextList.push(htmlDetailToText(item.content));
        })
        tmpProjectList.map((item) => {
          console.log(item);
        })
        setProjectList([...tmpProjectList]);
        setProejctTextList([...tmpTextList]);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  function htmlDetailToText(htmlContent) {
    let text = htmlContent.replace(/(<([^>]+)>)/ig, "");
    text = text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, s => {
      const entityMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
      };
      return entityMap[s];
    });
    console.log(text);
    return text;
  }

  let tmpDetail =
    "절대 잠수타지 않고 끝까지 책임감 있게 함께 지속해나갈 팀원을 구합니다. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절.";
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
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <div class="flex ">
            <div class="h-12 grow">
              <div class="flex gap-2 content-center bg-gray-50 rounded-lg border border-slate-300 px-2 py-2 ">
                <div class="self-center ml-2">🔍</div>
                <select class="text-gray-400 text-lg appearance-none focus:outline-none bg-transparent">
                  <option
                    value="제목"
                    class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
                  >
                    제목
                  </option>
                </select>
                <div class="h-6 my-auto border-l border-gray-300 z-10"></div>
                {selectedTagList.map((tag, index) => {
                  if (isTagChecked[index]) {
                    return (
                      <div class="flex rounded-lg items-center font-ltest text-bluepurple text-sm bg-develbg px-2">
                        <div>{tag}</div>
                        <button
                          class="ml-2"
                          name={tag}
                          value={index}
                          onClick={onTagButtonClickHandler}
                        >
                          x
                        </button>
                      </div>
                    );
                  }
                })}
                <input
                  class="bg-gray-50 grow focus:outline-0 text-gray-500 ml-2"
                  type="text"
                  onKeyPress={keyPressHandler}
                  placeholder={checkedTagList.length == 0 ? "원하는 프로젝트를 검색해 보세요!" : null}
                />
              </div>
            </div>
            <div class="flex content-center gap-4 text-lg font-ltest mt-1 h-10 ml-3">
              <button
                class="self-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-500 py-2 px-2"
                onClick={() => { setShowTagModal(true) }}
              >태그 추가 +
              </button>
            </div>
            {isTagFull ? (
              <div class="absolute text-sm font-ltest ml-3 mt-2 text-bluepurple">
                태그는 최대 3개까지 선택할 수 있습니다.
              </div>
            ) : null}
          </div>
          <div class="mt-4 flex">
            <p>
              <input class="w-3 h-3" type="checkbox" id="timetable" />{" "}
              <label class="ml-2" for="timetable">
                시간표 기반
              </label>
            </p>
          </div>
          <div class="flex gap-5">
            <button
              onClick={() => navigate("/pm/writing")}
              class="text-gray-500 rounded-xl border border-slate-300 w-full my-4 py-3">
              새 프로젝트 모집하기📄
            </button>
            <button
              onClick={() => navigate("/pm/mylist")}
              class=" text-gray-500 rounded-xl border border-slate-300 w-full my-4 py-3">
              내 프로젝트 보기😊
            </button>
            <button
              onClick={() => navigate("/pm/myschedule")}
              class="text-gray-500 rounded-xl border border-slate-300 w-full my-4 py-3">
              나의 시간표⏰
            </button>
          </div>
          <div class="mt-4 text-2xl font-btest">
            유진님, 이런 프로젝트는 어떠신가요?
          </div>

          <div class="mt-4 border rounded-lg">
            {projectList.map((item, index) => {
              if (item.image != null) {
                return (
                  <div
                    className="Writing"
                    class="flex border-b bg-white h-54 px-10 pt-3 gap-5 text-left w-[59.5rem]"
                  >
                    <div class="w-[47rem]">
                      <div class="text-sm text-gray-400 flex items-center font-ltest">
                        {item.status == "ACTIVE" ? (
                          <>
                            <div class="w-fit px-2 bg-green-300 text-black">모집중</div>
                          </>
                        )
                          :
                          (<div class="px-2 bg-red-300 text-black">모집완료</div>)
                        }
                      </div>
                      <button
                        onClick={() => navigate("/pm/detail/" + item.id)}
                        class="mt-1 py-1 text-black text-xl">
                        {item.title}
                      </button>
                      <div class="font-ltest min-h-[45px]">{projectTextList[index]}</div>
                      <div class="flex gap-2">
                        {item.tagInfos.map((tags) => {
                          return (
                            <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                              {tags.name}
                            </div>
                          )
                        })}
                      </div>
                      <div class="text-sm font-ltest text-gray-400">{item.startDate + "~" + item.endDate}</div>
                    </div>
                    <div class="w-grow">
                      <div class="w-32 h-32 mb-2">
                        <img
                          src={"data:image/" + item.imgType + ";base64," + item.image}
                          class="z-40 w-32 h-32"
                        />
                      </div>
                      <div class="w-32 grid grid-rows-2 text-sm ">
                        <div>{"참여 인원: " + item.recruited + "/" + item.recruit}</div>
                      </div>
                    </div>
                  </div>
                )
              }
              else {
                return (
                  <div
                    className="Writing"
                    class="flex border-b bg-white h-54 px-10 pt-3 gap-5 text-left w-[59.5rem]"
                  >
                    <div class="w-[47rem]">
                      <div class="text-sm text-gray-400 flex items-center font-ltest">
                        {item.status == "ACTIVE" ? (
                          <>
                            <div class="w-fit px-2 bg-green-300 text-black">모집중</div>
                          </>
                        )
                          :
                          (<div class="px-2 bg-red-300 text-black">모집완료</div>)
                        }
                      </div>
                      <button
                        onClick={() => navigate("/pm/detail/" + item.id)}
                        class="mt-1 py-1 text-black text-xl">
                        {item.title}
                      </button>
                      <div class="font-ltest min-h-[45px]">{item.content}</div>
                      <div class="flex gap-2">
                        {item.tagInfos.map((tags) => {
                          return (
                            <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                              {tags.name}
                            </div>
                          )
                        })}
                      </div>
                      <div class="text-sm font-ltest text-gray-400">{item.startDate + "~" + item.endDate}</div>
                    </div>
                    <div class="w-grow">
                      <div class="w-32 grid grid-rows-2 text-sm ">
                        <div>{"참여 인원: " + item.recruited + "/" + item.recruit}</div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
            <div
              className="Writing"
              class="flex border-b bg-white h-54 px-10 py-5 gap-5"
            >
              <div class="w-[47rem]">
                <div class="text-sm flex gap-4 text-gray-400 font-ltest">
                  <div class="px-2 bg-green-300 text-black">모집중</div>
                  <h>팀장명</h>
                </div>
                <button class="mt-1 py-1 text-black text-xl"
                  onClick={() => navigate("/pm/detail")}>
                  개발자 도움 웹 서비스를 함께 만들어나갈 팀원을 구합니다.
                </button>
                <div class="font-ltest">{tmpDetail}</div>
                <div class="flex gap-2">
                  <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                    #Spring
                  </div>
                  <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                    #JavaScript
                  </div>
                </div>
              </div>
              <div class="w-grow">
                <div class="bg-gray-300 w-32 h-28 mb-2">사진</div>
                <div class="w-32 grid grid-rows-2 text-sm ">
                  <div>마감 날짜: 5월 12일</div>
                  <div>참여 인원: 2/4</div>
                </div>
              </div>
            </div>
            <div
              className="Writing"
              class="flex border-b bg-white h-54 px-10 py-5 gap-5"
            >
              <div class="w-[47rem]">
                <div class="text-sm flex gap-4 text-gray-400 font-ltest">
                  <div class="px-2 bg-green-300 text-black">모집중</div>
                  <h>팀장명</h>
                </div>
                <button class="mt-1 py-1 text-black text-xl">
                  개발자 도움 웹 서비스를 함께 만들어나갈 팀원을 구합니다.
                </button>
                <div class="font-ltest">{tmpDetail}</div>
                <div class="flex gap-2">
                  <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                    #Spring
                  </div>
                  <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                    #JavaScript
                  </div>
                </div>
              </div>
              <div class="w-grow">
                <div class="bg-gray-300 w-32 h-28 mb-2">사진</div>
                <div class="w-32 grid grid-rows-2 text-sm ">
                  <div>마감 날짜: 5월 12일</div>
                  <div>참여 인원: 2/4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProjectMain;
