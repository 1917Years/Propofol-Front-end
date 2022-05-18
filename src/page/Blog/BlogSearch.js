import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";

function BlogSearch(props) {
  //const keyword = useParams().keyword;
  //const option = useParams().option;
  // const keyword = useLocation();
  // const option = useLocation();
  const navigate = useNavigate();
  const tagList = ["JAVA", "Spring", "C++", "JavaScript", "C#", "C", "Python", "냠냠", "ㅁㄴㅇ", "울랄라", "언어1", "언어2"];
  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSeratchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const option = searchParams.get('option');


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
    }
    else if (isTagChecked[e.target.value] == false) {
      setCheckedTagList(t_c.filter((tagname) => tagname !== e.target.name));
      setIsTagFull(false);
    }
    console.log(checkedTagList);
    setTmp(!tmp);
  };
  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      navigate('/blog/search');
    }
  };
  useEffect(() => {
    console.log(keyword);
    console.log("option : " + option);
    let t = [];
    for (let i = 0; i < tagList.length; i++) {
      t.push(false);
    }
    console.log(t);
    setIsTagChecked(t);
    console.log(isTagChecked);


    if (option == '제목') {
      axios.get(SERVER_URL + "/til-service/api/v1/boards/search/title/" + keyword + "?page=1")
        .then((res) => {
          console.log(res);
          let pageCount = res.data.data.pageCount;
          let totalCount = res.data.data.totalCount;

          res.data.data.boards.map((board) => {
            let tempSR;
            let tempSRList = searchResult;
            let tmpImgType = null;
            if (board.imgtype != null) {
              tmpImgType = board.imageType.toString().split('/')[1];
            }
            tempSR = {
              id: board.id,
              title: board.title,
              detail: board.content,
              date: board.createdDate,
              nickname: board.nickname,
              open: board.open,
              img: board.imageBytes,
              imgtype: tmpImgType,
              like: board.recommend,
              comment: board.commentCount
            }
            tempSR.date = tempSR.date.substring(0, 10) + "   " + tempSR.date.substring(11, 16);

            tempSRList.push(tempSR);
            setSearchResult([...tempSRList]);
            setTmp(!tmp);
          });
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }, []);
  let tmpDetail =
    "글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~";

  return (
    <div class="bg-white w-full h-screen font-test">
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2 ">
        <div class="relative mt-10 border-b border-slate-300 pb-10">
          <div class="h-12">
            <div class="flex gap-2 content-center bg-gray-50 rounded-lg border border-slate-300 px-2 py-2 ">
              <div class="self-center ml-2">🔍</div>
              <select
                class="text-gray-400 text-lg appearance-none focus:outline-none bg-transparent"
              >
                <option value="제목" class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center">
                  제목
                </option>
                <option value="제목+내용" class="text-center">제목+내용</option>
                <option value="작성자" class="text-center">작성자</option>
              </select>
              <div class="h-6 my-auto border-l border-gray-300 z-10"></div>
              {tagList.map((tag, index) => {
                if (isTagChecked[index]) {
                  return (
                    <div class="flex rounded-lg items-center font-ltest text-bluepurple text-sm bg-develbg px-2">
                      <div>{tag}</div>
                      <button
                        class="ml-2"
                        name={tag}
                        value={index}
                        onClick={onTagButtonClickHandler}
                      >x</button>
                    </div>
                  );
                }
              }
              )}
              <input
                class="bg-gray-50 grow focus:outline-0"
                type="text"
                onKeyPress={keyPressHandler}
              />
            </div>
          </div>
          <div class="flex content-center gap-4 font-ltest mt-3 h-10 ml-3">
            <div class="mr-1 self-center">#태그</div>
            {tagList.slice(0, 7).map((tag, index) => {
              return (
                <button
                  class={isTagChecked[index] == true ? "border text-base rounded-lg w-[6rem] bg-develbg border-bluepurple text-bluepurple" : "border text-md rounded-lg w-[6rem]"}
                  name={tag}
                  value={index}
                  onClick={onTagButtonClickHandler}
                >
                  {tag}
                </button>
              );
            }
            )}
            <select
              class="border text-md rounded-lg w-[6rem]"
              onChange={onTagButtonClickHandler}
            >
              <option value="-1" class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center">
                선택
              </option>
              {tagList.slice(8, tagList.length).map((tag, index) => {
                return (
                  <option
                    class="text-center"
                    name={tag}
                    value={index + 8}
                  >{tag}</option>
                );
              })}
            </select>
          </div>
          {isTagFull ? (<div class="text-sm font-ltest ml-2 mt-2 text-bluepurple">태그는 최대 3개까지 선택할 수 있습니다.</div>) : null}
        </div>

        <div class="mt-10 border rounded-lg">
          {searchResult.map((item) => {
            if (item.image != null) {
              return (
                <button
                  className="Writing"
                  class="flex border-b bg-white h-44 px-10 py-5 gap-5 text-left"
                  value={item.id}
                  onClick={(e) => {
                    navigate('/blog/detail/' + e.currentTarget.value);
                  }}
                >
                  <div class="w-[45.5rem]">
                    <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                      <h>{item.nickname}</h>
                      <h>{item.date}</h>
                    </div>
                    <button class="py-1 text-blue-400 text-lg">
                      {item.title}
                    </button>
                    <div class="font-ltest">{item.detail}</div>
                  </div>
                  <div class="w-grow">
                    <div class=" w-32 h-28 mb-2">
                      <img
                        src={"data:image/" + item.imgtype + ";base64," + item.img}
                        class="w-full z-full z-40 max-h-[7rem] max-w-[8rem]"
                      /></div>
                    <div class="w-32 grid grid-cols-2 text-sm ">
                      <div>🧡 {item.like}</div>
                      <div>💬 {item.comment}</div>
                    </div>
                  </div>
                </button>
              );
            } else {
              return (
                <button
                  className="Writing"
                  class="border bg-white h-48 px-10 py-5 gap-5 text-left"
                  value={item.id}
                  onClick={(e) => {
                    navigate('/blog/detail/' + e.currentTarget.value);
                  }}
                >
                  <div class="w-[45.5rem] h-28">
                    <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                      <h>{item.nickname}</h>
                      <h>{item.date}</h>
                    </div>
                    <button class="py-1 text-blue-400 text-lg">
                      {item.title}
                    </button>
                    <div class="font-ltest">{item.detail}</div>
                  </div>
                  <div class="flex">
                    <div class="w-[47rem]"></div>
                    <div class="w-32 grid grid-cols-2 text-sm">
                      <div>🧡 {item.like}</div>
                      <div>💬 {item.comment}</div>
                    </div>
                  </div>
                </button>
              );
            }
          })}


        </div>
        <div class="flex justify-center mt-5 gap-2 font-ltest">
          <button>{"<"}</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default BlogSearch;
