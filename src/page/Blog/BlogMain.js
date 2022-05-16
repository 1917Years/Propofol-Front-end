import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/SRC";

let tmpSt = [];

function BlogMain() {
  const navigate = useNavigate();
  const tagList = ["JAVA", "Spring", "C++", "JavaScript", "C#", "C", "Python", "냠냠", "ㅁㄴㅇ", "울랄라", "언어1", "언어2"];
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);
  const [writingList, setWritingList] = useState([]);
  const [searchOption, setSearchOption] = useState("");
  const [tmpStreak, setTmpStreak] = useState([]);
  const [streakUpdated, setStreakUpdated] = useState(false);

  function loadStreak() {
    console.log("스트릭~~");
    axios.get(SERVER_URL + "/user-service/api/v1/members/streak")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadWritings() {
    axios.get(SERVER_URL + "/user-service/api/v1/members/myBoards?page=" + 1)
      .then((res) => {
        console.log(res);
        res.data.data.boards.map((writing) => {
          let tmpWr;
          let tmpWrList = writingList;
          tmpWr = {
            id: writing.id,
            title: writing.title,
            detail: writing.content,
            date: writing.createdDate,
            open: writing.open,
            img: writing.imageBytes,
            imgtype: writing.imageType.toString().split('/')[1],
            like: writing.recommend,
            comment: writing.commentCount
          }
          console.log("아이디는 " + tmpWr.id);
          tmpWrList.push(tmpWr);
          setWritingList([...tmpWrList]);
          setTmp(!tmp);
          console.log("tmpWR : ");
          console.log(tmpWr);

        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


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
    let keyword = e.currentTarget.value;
    // console.log(searchOption);
    // console.log(keyword);
    if (e.key === 'Enter') {
      navigate("/blog/search?keyword=" + keyword + "&option=" + searchOption);
    }
  };
  useEffect(() => {
    setSearchOption("제목");
    loadWritings();
    loadStreak();
    //
    let temp = [];
    let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let i = 0; i < 365; i++) {
      temp.push({ date: i, day: day[i % 7], working: Math.floor(Math.random() * 6) });
    }
    tmpSt = temp;
    setTmpStreak([...temp, tmpStreak]);
    setStreakUpdated(true);
    setTmp(!tmp);
    //
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
                value={searchOption}
                defaultValue="제목"
                onChange={(e) => setSearchOption(e.target.value)}
              >
                <option value="제목"
                  class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
                >
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
        <div class="flex flex-col gap-10 pt-6">
          <div class="flex gap-10 items-center pb-6">
            <div class="grow text-5xl font-btest text-center text-bluepurple ">
              <a class="text-black">T</a>oday <a class="text-black">I</a>{" "}
              <a class="text-black">L</a>earned
            </div>
            <button
              class="text-gray-600 rounded-lg border border-slate-300 w-1/2 h-full py-2 "
              onClick={() => {
                navigate('/blog/writing');
              }}
            >
              오늘 학습한 내용 쓰러가기 📒
            </button>
          </div>
          <section className="Streak grow">
            {(tmpStreak != []) ?
              (
                <div class="flex px-8 gap-3 items-start">
                  <div clas="grid grid-rows-7 grid-flow-col gap-[0.1px] bg-red-300">
                    {tmpStreak.slice(0, 7).map((item) => {
                      if (item.day == "Mon") {
                        return (
                          <div class="font-ltest align-top text-gray-500 text-[11px] h-[12px] ">{item.day}</div>
                        );
                      }
                      else if (item.day == "Wed") {
                        return (
                          <div class="font-ltest text-gray-500 text-[11px] h-[12px] mt-[2.75px] ">{item.day}</div>
                        );
                      }
                      else if (item.day == "Fri") {
                        return (
                          <div class="font-ltest text-gray-500 text-[11px] h-[12px] mt-[2.75px] ">{item.day}</div>
                        );
                      }
                      else if (item.day == "Sun") {
                        return (
                          <div class="font-ltest text-gray-500 text-[11px] h-[12px] mt-[2.75px] ">{item.day}</div>
                        );
                      }
                      else {
                        return (
                          <div class="font-ltest text-gray-500 h-[12px] mt-[2.75px] "></div>
                        );
                      }
                    })
                    }
                  </div>
                  <div class="grow grid grid-rows-7 grid-flow-col gap-[0.1px]">
                    {tmpStreak.map((item) => {
                      if (item.working == 0) {
                        return (
                          <div class="bg-gray-200 w-[12px] h-[12px] rounded-sm border border-gray-300">
                          </div>
                        )
                      }
                      else if (item.working == 1) {
                        return (
                          <div class="bg-indigo-200 w-[12px] h-[12px] rounded-sm border border-gray-300">
                          </div>
                        )
                      }
                      else if (item.working == 2) {
                        return (
                          <div class="bg-indigo-300 w-[12px] h-[12px] rounded-sm border border-gray-300">
                          </div>
                        )
                      }
                      else if (item.working == 3) {
                        return (
                          <div class="bg-[#8289D9] w-[12px] h-[12px] rounded-sm border border-gray-300">
                          </div>
                        )
                      }
                      else if (item.working == 4) {
                        return (
                          <div class="bg-[#6369A6] w-[12px] h-[12px] rounded-sm border border-gray-300">
                          </div>
                        )
                      }
                      else if (item.working == 5) {
                        return (
                          <div class="bg-[#54598C] w-[12px] h-[12px] rounded-sm border border-gray-300">
                          </div>
                        )
                      }
                    })
                    }
                  </div>
                </div>
              )
              :
              (null)
            }
          </section>
        </div>

        <div class="mt-10 border rounded-lg">
          {writingList.map((item) => {
            if (item.image == null) {
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
                      <h>사용자명</h>
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
                        class="w-full z-full z-40 max-h-[7rem]"
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
                  class="border-b bg-white h-48 px-10 py-5 gap-5 text-left"
                  onClick={(e) => {
                    navigate('/blog/detail/' + e.currentTarget.value);
                  }}
                >
                  <div class="w-full h-28">
                    <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                      <h>{"본인 닉네임"}</h>
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
