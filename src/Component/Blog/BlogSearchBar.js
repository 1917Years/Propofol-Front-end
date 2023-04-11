import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BlogSearchBar(props) {
  // setShowTagModal, selectedTagList(props) / keyword(props) <- 검색창에서만 보내주면 됨.
  const navigate = useNavigate();
  const [isTagFull, setIsTagFull] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("제목");
  function keyPressHandler(e) {
    let keyword = e.currentTarget.value;
    let taglist = "";
    props.selectedTagList.map((item) => {
      taglist = taglist + "+" + item.id + "_" + item.name;
    });
    if (e.key === "Enter") {
      navigate(
        "/blog/search?keyword=" +
          keyword +
          "&option=" +
          searchOption +
          "&tag=" +
          taglist
      );
    }
  }
  useEffect(() => {
    if (props.keyword != null) {
      setKeyword(props.keyword);
    }
  }, []);
  return (
    <div class="mb-3">
      <div class="flex ">
        <div class="h-12 grow">
          <div class="flex gap-2 content-center rounded-xl border border-gray-200 px-2 py-[9px] shadow-[0_3px_6px_0px_rgba(0,0,0,0.075)]">
            <div class="self-center ml-2">🔍</div>
            <select
              class="text-gray-400 text-lg appearance-none focus:outline-none bg-transparent"
              value={searchOption}
              defaultValue="제목"
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option
                value="제목"
                class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
              >
                제목
              </option>
              <option
                value="제목+내용"
                class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
              >
                제목+내용
              </option>
              <option
                value="작성자"
                class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
              >
                작성자
              </option>
            </select>
            <div class="h-6 my-auto border-l border-gray-300 z-10"></div>
            {props.selectedTagList != null
              ? props.selectedTagList.map((tag, index) => {
                  return (
                    <div class="flex rounded-lg items-center font-ltest text-bluepurple text-sm bg-develbg px-2">
                      <div>{tag.name}</div>
                      <button class="ml-2" name={tag.name} key={tag.id}>
                        x
                      </button>
                    </div>
                  );
                })
              : null}
            <input
              class="bg-inherit grow focus:outline-0 text-gray-500 ml-2"
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyPress={keyPressHandler}
              placeholder={
                props.selectedTagList.length == 0
                  ? "원하는 글을 검색해 보세요!"
                  : null
              }
            />
          </div>
        </div>
        <div class="flex content-center gap-4 text-lg font-ltest mt-1 h-10 ml-3">
          <button
            class="self-center rounded-xl bg-indigo-400/80 text-white py-[9px] px-7 shadow-[0_3px_6px_0px_rgba(117,117,215,0.35)]"
            onClick={() => {
              props.setShowTagModal(true);
            }}
          >
            태그 +
          </button>
        </div>
        {isTagFull ? (
          <div class="absolute text-sm font-ltest ml-3 mt-2 text-bluepurple">
            태그는 최대 3개까지 선택할 수 있습니다.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BlogSearchBar;
