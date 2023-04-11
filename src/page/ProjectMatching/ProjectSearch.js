import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { TagModal } from "../../Component/Modal";
import { htmlDetailToText } from "../../utils/html";
import { ProjectWritingList } from "../../Component/Project/ProjectWritingList";

function ProjectSearch() {
  const navigate = useNavigate();
  //
  const [searchParams, setSeratchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const tag = searchParams.get("tag");
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
              loadSearchResult(i);
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
    });
    setSelectedTagList([...tmptaglist]);
    console.log(taglist);
    console.log(tagIdlist);
    const params = new URLSearchParams();
    params.append("keyword", keyword);
    params.append("page", page);
    tagIdlist.map((item) => {
      params.append("tagId", item);
    });
    console.log(taglist);
    await axios
      .get(SERVER_URL + "/matching-service/api/v1/matchings/search?", {
        params: params,
      })
      .then((res) => {
        let tmpProjectList = [],
          tmpTextList = [];
        console.log(res);
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

  useEffect(() => {
    loadSearchResult(1);
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
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            keyword={keyword}
            selectedTagList={selectedTagList}
          />
          <div class="mt-4 border rounded-lg">
            <ProjectWritingList
              projectList={projectList}
              projectTextList={projectTextList}
              onWritingClickHandler={(e) => {
                navigate("/pm/detail/" + e.currentTarget.value);
              }}
            />
          </div>
          <div class="mt-5 flex gap-2 justify-center w-full px-2">
            <button
              class="text-gray-500"
              onClick={() => {
                if (startPage - 10 >= 1) {
                  setStartPage(startPage - 10);
                  loadSearchResult(startPage - 10);
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
                  loadSearchResult(startPage + 10);
                  setSelected(startPage + 10);
                }
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSearch;
