import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function BlogMain() {
  const navigate = useNavigate();
  const tagList = ["JAVA", "Spring", "C++", "JavaScript", "C#", "C", "Python", "냠냠", "ㅁㄴㅇ", "울랄라", "언어1", "언어2"];
  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);
  let tmpDetail =
    "글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~";
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
    let t = [];
    for (let i = 0; i < tagList.length; i++) {
      t.push(false);
    }
    console.log(t);
    setIsTagChecked(t);
    console.log(isTagChecked);
  }, []);

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
                class="bg-gray-50 grow focus:outline-0 text-gray-500 ml-2"
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
          {isTagFull ? (<div class="absolute text-sm font-ltest ml-3 mt-2 text-bluepurple">태그는 최대 3개까지 선택할 수 있습니다.</div>) : null}
        </div>
        <div class="flex gap-10 pt-6">
          <div class="">
            <div class="text-5xl font-btest text-bluepurple border-b border-slate-400 pb-6">
              <a class="text-black">T</a>oday <a class="text-black">I</a>{" "}
              <a class="text-black">L</a>earned
            </div>
            <button
              class="text-gray-600 rounded-lg border border-slate-300 w-full py-2 mt-10"
              onClick={() => {
                navigate('/blog/writing');
              }}
            >
              오늘 학습한 내용 쓰러가기 📒
            </button>
          </div>
          <div class="bg-gray-400 grow">스트릭</div>
        </div>
        <div class="mt-10 border rounded-lg">
          <div
            className="Writing"
            class="flex border-b bg-white h-44 px-10 py-5 gap-5"
          >
            <div class="w-[47rem]">
              <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                <h>사용자명</h>
                <h>2022.04.11</h>
              </div>
              <button class="py-1 text-blue-400 text-lg">
                제목제목제목제목제목
              </button>
              <div class="font-ltest">{tmpDetail}</div>
            </div>
            <div class="w-grow">
              <div class="bg-gray-300 w-32 h-28 mb-2">사진</div>
              <div class="w-32 grid grid-cols-2 text-sm ">
                <div>🧡 10</div>
                <div>💬 5</div>
              </div>
            </div>
          </div>
          <div
            className="Writing"
            class="border-b bg-white h-48 px-10 py-5 gap-5"
          >
            <div class="w-full h-28">
              <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                <h>사용자명</h>
                <h>2022.04.11</h>
              </div>
              <button class="py-1 text-blue-400 text-lg">
                제목제목제목제목제목
              </button>
              <div class="font-ltest">{tmpDetail}</div>
            </div>
            <div class="flex">
              <div class="w-[47rem]"></div>
              <div class="w-32 grid grid-cols-2 text-sm">
                <div>🧡 10</div>
                <div>💬 5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogMain;
