import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TagModal } from "../../Component/Modal";
import { SERVER_URL } from "../../utils/SRC";
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { htmlDetailToText } from "../../utils/html";
import { getUserDataToken } from "../../utils/user";
import { ProjectWritingList } from "../../Component/Project/ProjectWritingList";

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
  const [userTag, setUserTag] = useState([]);

  const [userNickname, setUserNickname] = useState(null);
  function Page() {
    let endPage = startPage + 9 > totalPage ? totalPage : startPage + 9;
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
        );
      } else {
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
    if (getUserDataToken()) {
      console.log(getUserDataToken());
      setUserNickname(getUserDataToken().nickname);
    }
  }, []);

  function loadProject(page) {
    axios
      .get(SERVER_URL + "/matching-service/api/v1/matchings/page?", {
        params: {
          page: page,
        },
      })
      .then((res) => {
        let tmpProjectList = [],
          tmpTextList = [];
        console.log(res);
        setUserTag([...res.data.data.userTags]);
        res.data.data.boards.map((item) => {
          tmpProjectList.push(item);
          tmpTextList.push(htmlDetailToText(item.content));
        });
        tmpProjectList.map((item) => {
          console.log(item);
        });
        setProjectList([...tmpProjectList]);
        setProejctTextList([...tmpTextList]);
        setTotalPage(res.data.data.totalPageCount);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div class="bg-white w-full font-test">
      {showTagMoadl ? (
        <TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />
      ) : null}
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
          />
          <div class="flex gap-5">
            <button
              onClick={() => navigate("/pm/writing")}
              class="text-gray-500 rounded-xl border border-slate-300 w-full my-4 py-3 shadow-[0_3px_3px_0px_rgba(0,0,0,0.055)]"
            >
              새 프로젝트 모집하기📄
            </button>
            <button
              onClick={() => navigate("/pm/mylist")}
              class=" text-gray-500 rounded-xl border border-slate-300 w-full my-4 py-3 shadow-[0_3px_3px_0px_rgba(0,0,0,0.055)]"
            >
              내 프로젝트 보기😊
            </button>
            <button
              onClick={() => navigate("/pm/myschedule")}
              class="text-gray-500 rounded-xl border border-slate-300 w-full my-4 py-3 shadow-[0_3px_3px_0px_rgba(0,0,0,0.055)]"
            >
              나의 시간표⏰
            </button>
          </div>
          <div class="flex items-center gap-3">
            <div class="mt-4 text-2xl font-btest">
              {userNickname}님, 이런 프로젝트는 어떠신가요?
            </div>
          </div>
          <div class="flex items-center mt-4 gap-2">
            <div class="w-full flex gap-3 mx">
              {userTag.map((item) => {
                return (
                  <div class="bg-gray-200 text-black px-3 py-1 rounded-xl text-sm font-ltest">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          {totalPage == 0 ? (
            <div class="text-xl font-test">
              태그가 아직 없네요😅 활동을 통해 태그를 추가해 보세요!
            </div>
          ) : (
            <div class="mt-4 border rounded-lg">
              <ProjectWritingList
                projectList={projectList}
                projectTextList={projectTextList}
                onWritingClickHandler={(e) => {
                  navigate("/pm/detail/" + e.currentTarget.value);
                }}
              />
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
                >
                  {"<"}
                </button>
                <Page />
                <button
                  class="text-gray-500"
                  onClick={() => {
                    if (startPage + 10 <= totalPage) {
                      //totalPage를 넘어가지 않을 경우에만 작동
                      setStartPage(startPage + 10);
                      loadProject(startPage + 10);
                      setSelected(startPage + 10);
                    }
                  }}
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectMain;
