import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { TagModal } from "../../Component/Modal";
import { htmlDetailToText } from "../../utils/html";

function ProjectSearch() {
  const navigate = useNavigate();
  //
  const [searchParams, setSeratchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const tag = searchParams.get('tag');
  //
  const [projectList, setProjectList] = useState([]);
  const [projectTextList, setProejctTextList] = useState([]);
  //
  const [showTagMoadl, setShowTagModal] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);
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
              loadSearchResult(i);
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
              loadSearchResult(i);
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
  async function loadSearchResult(page) {
    console.log(keyword);
    console.log(tag);
    console.log(page);
    let taglist = tag.split(" ").slice(1);
    let tmptaglist = [];
    let tagIdlist = [];
    taglist.map((item) => {
      tmptaglist.push({ name: item.split("_")[1], id: item.split("_")[0] });
      tagIdlist.push(item.split("_")[0]);
    })
    setSelectedTagList([...tmptaglist]);
    console.log(taglist);
    console.log(tagIdlist);
    const params = new URLSearchParams();
    params.append('keyword', keyword);
    params.append('page', page);
    tagIdlist.map((item) => {
      params.append('tagId', item);
    });
    console.log(taglist);
    await axios.get(SERVER_URL + "/matching-service/api/v1/matchings/search?",
      {
        params: params
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

  let tmpDetail =
    "절대 잠수타지 않고 끝까지 책임감 있게 함께 지속해나갈 팀원을 구합니다. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절.";

  useEffect(() => {
    loadSearchResult(1);
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
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            keyword={keyword}
            selectedTagList={selectedTagList}
          />
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
                  <div class="px-2 bg-red-300 text-black">모집완료</div>
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
          <div class="flex gap-2 justify-center w-full px-2">
            <button
              class="text-gray-500"
              onClick={() => {
                if (startPage - 10 >= 1) {
                  setStartPage(startPage - 10);
                  loadSearchResult(startPage - 10);
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
                  loadSearchResult(startPage + 10);
                  setSelected(startPage + 10);
                }
              }}
            >{">"}
            </button>
          </div>



        </div>
      </div>
    </div>
  );
}

export default ProjectSearch;
