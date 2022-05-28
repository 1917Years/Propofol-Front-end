import axios from "axios";
//import { da } from "date-fns/locale";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TagModal } from "../../Component/Modal";
import { SERVER_URL } from "../../utils/SRC";
import { fillScheduleStyleList, TimeList } from "../../Component/Schedule";
import ProjectSearchBar from "../../Component/ProjectSearchBar";
import { htmlDetailToText } from "../../utils/html";

function ProjectMain() {
  const navigate = useNavigate();
  //
  const [selectedTagList, setSelectedTagList] = useState([]);
  //
  const [projectList, setProjectList] = useState([]);
  const [projectTextList, setProejctTextList] = useState([]);
  //
  const [showTagMoadl, setShowTagModal] = useState(false);
  //
  const [totalPage, setTotalPage] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [selected, setSelected] = useState(1);
  //
  function Page() {
    let endPage = (startPage + 9 > totalPage ? totalPage : startPage + 9);
    const result = [];
    console.log(totalPage);
    console.log(endPage);
    for (let i = startPage; i <= endPage; i++) {
      if (i == selected) {
        result.push(
          <button
            class="pr-2 text-indigo-500"
            onClick={() => {
              loadProject(i);
              setSelected(i);
            }}
          >
            {i}
          </button>
        )
      }
      else {
        result.push(
          <button
            class="pr-2 text-gray-500"
            onClick={() => {
              loadProject(i);
              setSelected(i);
            }}
          >
            {i}
          </button>
        );
      }
    }
    return result;
  }
  //
  useEffect(() => {
    loadProject(1);
  }, []);

  function loadProject(page) {
    axios.get(SERVER_URL + "/matching-service/api/v1/matchings/page?",
      {
        params: {
          page: page
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
        setTotalPage(res.data.data.totalPageCount);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

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
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
          />
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
                      <div class="font-ltest min-h-[45px]">{projectTextList[index].slice(0, 128)}</div>
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
                      <div class="font-ltest min-h-[45px]">{projectTextList[index].slice(0, 128)}</div>
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
            <div class="flex gap-2 justify-center w-full px-2">
              <button
                class="text-gray-500"
                onClick={() => {
                  if (startPage - 10 >= 1) {
                    setStartPage(startPage - 10);
                    loadProject(startPage - 10);
                    setSelected(startPage - 10);
                  }
                }}
              >{"<"}
              </button>
              <Page />
              <button
                class="text-gray-500"
                onClick={() => {
                  if (startPage + 10 <= totalPage) { //totalPage를 넘어가지 않을 경우에만 작동
                    setStartPage(startPage + 10);
                    loadProject(startPage + 10);
                    setSelected(startPage + 10);
                  }
                }}
              >{">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProjectMain;
