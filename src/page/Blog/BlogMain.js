import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/SRC";
import { leafYear, dateToNumber, numberToDate } from "../../utils/date";

let tmpSt = [];

function BlogMain() {
  const navigate = useNavigate();
  const page = useParams().page;

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
  const [streak, setStreak] = useState([]);
  const [streakUpdated, setStreakUpdated] = useState(false);
  const [tmpWorkingSUm, setTmpWorkingSum] = useState(0);
  const [workingSum, setWorkingSum] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState(1);
  const [pageList, setPageList] = useState([]);
  const [checkNoPost, setCheckNoPost] = useState(false);

  let isLeafYear;

  function putNumberToStreak(year, IsLeafYear) {
    let temp = [];
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    console.log("왜 안오니?");

    if (IsLeafYear) {
      for (let i = 1; i <= 366; i++) {
        let tmpDate = numberToDate(year, IsLeafYear, i);
        temp.push({
          date: tmpDate, day: day[new Date(tmpDate).getDay()], working: 0
        });
      }
    }
    else {
      for (let i = 1; i <= 365; i++) {
        let tmpDate = numberToDate(year, IsLeafYear, i);
        temp.push({
          date: tmpDate, day: day[new Date(tmpDate).getDay()], working: 0
        });
        //console.log(tmpDate + "일의 요일은 " + day[new Date(tmpDate).getDay()]);
      }
    }
    return temp;
    //setStreak([...temp]);
  }

  function loadStreak() {
    console.log("스트릭~~");
    axios.get(SERVER_URL + "/user-service/api/v1/members/streak")
      .then((res) => {
        let temp, tmpsum = 0;
        console.log("년도는");
        console.log(res.data.data.year);
        isLeafYear = leafYear(res.data.data.year);
        console.log(isLeafYear);
        temp = putNumberToStreak(res.data.data.year, isLeafYear);
        res.data.data.streaks.map((item) => {
          let tmpnum = dateToNumber(isLeafYear, item.date);
          console.log("날짜(number)는 " + tmpnum);
          temp[tmpnum - 1].working = item.working;
          tmpsum = tmpsum + item.working * 1;
        });
        console.log(temp);
        setStreak(temp);
        setWorkingSum(tmpsum * 1);
        console.log("씨발");

      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("저는 페이지입니다.");
    console.log(page);
    loadWritings(page);

    axios.get(SERVER_URL + "/user-service/api/v1/members/myBoards?page=" + currentPage)
      .then((res) => {
        let tmpPageCount = res.data.data.totalPageCount;
        setMaxPageCount(tmpPageCount);
        console.log("페이지 카운트 최대 몇?");
        console.log(tmpPageCount);
        let max = tmpPageCount;
        let tmpPgList = [];
        for (let i = 1; i <= max; i++) {
          tmpPgList.push(i);
        }
        setPageList([...tmpPgList]);
        console.log("페이지 리스트를 보여주시겠어요?");
        console.log(pageList);
      })
      .catch((err) => {
      })
  }, [page])

  useEffect(() => {
    console.log("지금부터 스트릭을 출력해보겠습니다~~");
    console.log(streak);
  }, [streak]);

  function loadWritings(currentPage) {
    console.log("현재 페이지를 알려주세요");
    console.log(currentPage)
    axios.get(SERVER_URL + "/til-service/api/v1/boards/myBoards?page=" + currentPage)
      .then((res) => {
        console.log("저는 글을 로딩하고 있어요");
        console.log(res);
        let tmpPageCount;
        if (res.data.data.totalCount == 0)
          setCheckNoPost(true);
        else
          setCheckNoPost(false);
        tmpPageCount = res.data.data.totalPageCount;
        // if (res.data.data.totalPageCount > 1)
        //   tmpPageCount = res.data.data.totalPageCount;
        // else
        //   tmpPageCount = 1;
        setMaxPageCount(tmpPageCount);
        console.log("페이지 카운트 최대 몇?");
        console.log(tmpPageCount);
        //

        // let tmpPgList = pageList;
        // for (let i = 1; i <= tmpPageCount; i++) {
        //   tmpPgList.push(i);
        // }
        // setPageList([...tmpPgList]);
        // console.log("페이지 리스트를 보여주시겠어요?");
        // console.log(pageList);

        //
        let tmpWrList = [];
        res.data.data.boards.map((writing) => {
          let tmpimgtype = null;
          if (writing.imgtype != null) {
            tmpimgtype = writing.imageType.toString().split('/')[1];
          }
          let tmpWr;
          tmpWr = {
            id: writing.id,
            title: writing.title,
            detail: writing.content,
            date: writing.createdDate,
            open: writing.open,
            img: writing.imageBytes,
            imgtype: tmpimgtype,
            like: writing.recommend,
            comment: writing.commentCount,
            tag: writing.tags == null ? [] : writing.tags,
          }
          tmpWr.date = tmpWr.date.substring(0, 10) + "   " + tmpWr.date.substring(11, 16);

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

  const onCurrentPageHandler = (page) => {
    console.log("현재 페이지를 알려주겠니?");
    console.log(page);
    navigate("/blog/main/" + page);
  }

  const onPreviousPageHandler = () => {
    var iPage = parseInt(page);
    var previousPage = iPage - 1;
    if (previousPage == 0)
      navigate("/blog/main/" + page);
    else
      navigate("/blog/main/" + previousPage);
  }

  const onNextPageHandler = () => {
    var iPage = parseInt(page);
    var nextPage = iPage + 1;
    console.log("뭐야");
    console.log(nextPage);
    console.log(maxPageCount);
    if (nextPage > maxPageCount)
      navigate("/blog/main/" + page);
    else
      navigate("/blog/main/" + nextPage);

  }

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
    axios
      .get(SERVER_URL + "/user-service/api/v1/members/follower")
      .then((res) => {
        console.log("팔로워 조회");
        console.log(res);
        setFollowingCount(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("뭐야 ㅅㅄㅄ");
      });

    setSearchOption("제목");
    // setCurrentPage(page);
    // loadWritings(currentPage);
    loadStreak();
    //
    let temp = [];
    let tmpsum = 0;
    let day = ["Mon", "Tue", "Wed", "T", "F", "S", "Su"];
    for (let i = 0; i < 365; i++) {
      temp.push({ date: i, day: day[i % 7], working: Math.floor(Math.random() * 6) });
      tmpsum = tmpsum + temp[i].working;
    }
    tmpSt = temp;
    setTmpStreak([...temp, tmpStreak]);
    setTmpWorkingSum(tmpsum);
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
    //
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
            <div class="w-1/2 flex flex-col items-center gap-2 text-gray-500">
              <div class="">✨ {followingCount}명이 내 블로그를 구독하고 있어요!</div>
              <button
                class="text-gray-600 rounded-lg border border-slate-300 w-full h-full py-2 "
                onClick={() => {
                  navigate('/blog/writing');
                }}
              >
                오늘 학습한 내용 쓰러가기 📒
              </button>
            </div>
          </div>
          <section className="Streak grow">
            <div class="w-full h-full border rounded-md pb-6 pt-3">
              <div class="px-8 pb-3 text-base font-ltest text-gray-500">This year, I learned {workingSum} times</div>
              {(streak != []) ?
                (
                  <div>
                    <div class="flex px-8 gap-3 items-start">
                      <div class="h-full grid grid-rows-7 grid-flow-col gap-[0px]">
                        {streak.slice(0, 7).map((item) => {
                          if (item.day == "Mon") {
                            return (
                              <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                            );
                          }
                          else if (item.day == "Wed") {
                            return (
                              <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                            );
                          }
                          else if (item.day == "Fri") {
                            return (
                              <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                            );
                          }
                          else if (item.day == "Sun") {
                            return (
                              <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                            );
                          }
                          else {
                            return (
                              <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                            );
                          }
                        })
                        }
                      </div>
                      <div class="grow grid grid-rows-7 grid-flow-col gap-[0.1px]">
                        {streak.map((item) => {
                          if (item.working == 0) {
                            return (
                              <div class="">
                                <div class="group bg-gray-200 w-[12px] h-[12px] rounded-sm border border-gray-300">
                                  <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                 before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                before:border-t-[12px] before:border-t-white
                                before:border-r-[12px] before:border-r-transparent
                                before:border-l-[0px] before:border-l-transparent
                                before:border-b-[0px] before:border-b-transparent
                                before:absolute before:z-20">
                                    {item.date}일에, {item.working}번 공부를 했어요.
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          else if (item.working == 1) {
                            return (
                              <div class="group bg-indigo-200 w-[12px] h-[12px] rounded-sm border border-gray-300">
                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                before:border-t-[12px] before:border-t-white
                                before:border-r-[12px] before:border-r-transparent
                                before:border-l-[0px] before:border-l-transparent
                                before:border-b-[0px] before:border-b-transparent
                                before:absolute before:z-20
                                ">
                                  {item.date}일에, {item.working}번 공부를 했어요.
                                </div>
                              </div>
                            )
                          }
                          else if (item.working == 2) {
                            return (
                              <div class="group bg-indigo-300 w-[12px] h-[12px] rounded-sm border border-gray-300">
                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                before:border-t-[12px] before:border-t-white
                                before:border-r-[12px] before:border-r-transparent
                                before:border-l-[0px] before:border-l-transparent
                                before:border-b-[0px] before:border-b-transparent
                                before:absolute before:z-20
                                ">
                                  {item.date}일에, {item.working}번 공부를 했어요.
                                </div>
                              </div>
                            )
                          }
                          else if (item.working == 3) {
                            return (
                              <div class="group bg-[#8289D9] w-[12px] h-[12px] rounded-sm border border-gray-300">
                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-300 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                3
                                before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                before:border-t-[12px] before:border-t-white
                                before:border-r-[12px] before:border-r-transparent
                                before:border-l-[0px] before:border-l-transparent
                                before:border-b-[0px] before:border-b-transparent
                                before:absolute before:z-20
                                ">
                                  {item.date}일에, {item.working}번 공부를 했어요.
                                </div>
                              </div>
                            )
                          }
                          else if (item.working == 4) {
                            return (
                              <div class="group bg-[#6369A6] w-[12px] h-[12px] rounded-sm border border-gray-300">
                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                before:border-t-[12px] before:border-t-white
                                before:border-r-[12px] before:border-r-transparent
                                before:border-l-[0px] before:border-l-transparent
                                before:border-b-[0px] before:border-b-transparent
                                before:absolute before:z-20
                                ">
                                  {item.date}일에, {item.working}번 공부를 했어요.
                                </div>
                              </div>
                            )
                          }
                          else if (item.working >= 5) {
                            return (
                              <div class={"group bg-[#54598C] w-[12px] h-[12px] rounded-sm border border-gray-300"}>
                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                before:border-t-[12px] before:border-t-white
                                before:border-r-[12px] before:border-r-transparent
                                before:border-l-[0px] before:border-l-transparent
                                before:border-b-[0px] before:border-b-transparent
                                before:absolute before:z-20
                                ">
                                  {item.date}일에, {item.working}번 공부를 했어요.
                                </div>
                              </div>
                            )
                          }
                        })
                        }
                      </div>
                    </div>
                  </div>
                )
                :
                (null)
              }
            </div>
          </section>
        </div>

        <div class="mt-10 border rounded-lg">
          {
            <div class="flex justify-center">
              <div class={checkNoPost == true ? "my-10 m-auto text-center"
                : "hidden"}>{checkNoPost == true ? "아직 아무 글도 작성하지 않았어요 😥" : ""}</div>
            </div>
          }
          {writingList.map((item) => {
            if (item.img != null) {
              return (
                <button
                  className="Writing"
                  class="flex border bg-white h-48 px-10 py-5 gap-5 text-left"
                  value={item.id}
                  onClick={(e) => {
                    navigate('/blog/detail/' + e.currentTarget.value);
                  }}
                >
                  <div class="w-[45.5rem] h-36 flex flex-col justify-between">
                    <div class="">
                      <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                        <h>나</h>
                        <h>{item.date}</h>
                      </div>
                      <button class="py-1 text-blue-400 text-lg">
                        {item.title}
                      </button>
                      <div class="font-ltest">{item.detail.slice(0, 150) + "..."}</div>
                    </div>
                    <div class="flex gap-2">
                      {item.tag.map((item) => {
                        return (
                          <div class="bg-indigo-50 text-sm border border-indigo-300 text-indigo-300 rounded-lg px-2 py-1">
                            {item.name}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div class="w-grow">
                    <div class=" w-32 h-32 mb-2">
                      <img
                        src={"data:image/" + item.imgtype + ";base64," + item.img}
                        class="w-full z-full z-40 min-h-[8rem] max-h-[8rem]"
                      />
                    </div>
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
                  <div class="w-[45.5rem] h-36 flex flex-col justify-between">
                    <div class="">
                      <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                        <h>나</h>
                        <h>{item.date}</h>
                      </div>
                      <button class="py-1 text-blue-400 text-lg">
                        {item.title}
                      </button>
                      <div class="font-ltest">{item.detail.slice(0, 150) + "..."}</div>
                    </div>
                    <div class="flex gap-2">
                      {item.tag.map((item) => {
                        return (
                          <div class="bg-indigo-50 text-sm border border-indigo-300 text-indigo-300 rounded-lg px-2 py-1">
                            {item.name}
                          </div>
                        )
                      })}
                    </div>
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
        <div class="flex justify-center">
          <nav class="my-6">
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <button
                  onClick={() => { onPreviousPageHandler() }}
                  class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </button>
              </li>

              {
                pageList.map((page) => {
                  return (
                    <li>
                      <button
                        onClick={() => { onCurrentPageHandler(page) }}
                        class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >{page}</button>
                    </li>
                  );
                })
              }

              <li>
                <button
                  onClick={() => { onNextPageHandler() }}
                  class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div >
    </div >
  );
}

export default BlogMain;
