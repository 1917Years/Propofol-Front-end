import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/SRC";
import { leafYear, dateToNumber, numberToDate } from "../../utils/date";
import { htmlDetailToText } from "../../utils/html";
import { TagModal } from "../../Component/Modal";
import BlogSearchBar from "../../Component/Blog/BlogSearchBar";
import { Page } from "../../utils/page";
import { BlogWritingList } from "../../Component/Blog/BlogWritingList";
import { Streak } from "../../Component/Blog/Streak";

let tmpSt = [];

function BlogMain() {
  const navigate = useNavigate();
  const page = useParams().page;

  const tagList = ["JAVA", "Spring", "C++", "JavaScript", "C#", "C", "Python", "냠냠", "ㅁㄴㅇ", "울랄라", "언어1", "언어2"];
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
  const [follower, setFollower] = useState([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState(1);
  const [pageList, setPageList] = useState([]);
  const [checkNoPost, setCheckNoPost] = useState(false);
  const [writingTextList, setWritingTextList] = useState([]);
  //
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [showTagMoadl, setShowTagModal] = useState(false);
  //
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
    axios.get(SERVER_URL + "/user-service/api/v1/members/streak")
      .then((res) => {
        let temp, tmpsum = 0;
        isLeafYear = leafYear(res.data.data.year);
        temp = putNumberToStreak(res.data.data.year, isLeafYear);
        res.data.data.streaks.map((item) => {
          let tmpnum = dateToNumber(isLeafYear, item.date);
          temp[tmpnum - 1].working = item.working;
          tmpsum = tmpsum + item.working * 1;
        });
        setStreak(temp);
        setWorkingSum(tmpsum * 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("저는 페이지입니다.");
    console.log(page);
    loadWritings(page);

    axios.get(SERVER_URL + "/til-service/api/v1/members/myBoards?page=" + currentPage)
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
        let tmpWrList = [], tmpTextList = [];
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
          tmpTextList.push(htmlDetailToText(writing.content));
          console.log("아이디는 " + tmpWr.id);
          tmpWrList.push(tmpWr);
          setWritingList([...tmpWrList]);
          setTmp(!tmp);
          console.log("tmpWR : ");
          console.log(tmpWr);
        });
        setWritingTextList([...tmpTextList]);
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

  useEffect(() => {
    // axios
    //   .get(SERVER_URL + "/user-service/api/v1/members/follower")
    //   .then((res) => {
    //     console.log("팔로워 조회");
    //     console.log(res);
    //     setFollowingCount(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log("뭐야 ㅅㅄㅄ");
    //   });

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
    loadFollowers(1);
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

  function loadFollowers(page) {
    axios.get(SERVER_URL + "/user-service/api/v1/subscribe/followers",
      { params: { page: page } })
      .then((res) => {
        console.log(res);
        setFollower(res.data.data.data);
        setFollowingCount(res.data.data.totalCount);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  return (
    <div class="bg-white w-full h-screen font-test ">
      {showTagMoadl ?
        (<TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />)
        :
        (null)
      }
      <div class="relative w-[80rem] inset-x-1/2 transform -translate-x-1/2 mt-10 border-b border-gray-200 pb-5">
        <BlogSearchBar
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
        />
      </div>
      <div class="relative h-full flex w-[82rem] gap-5 inset-x-1/2 transform -translate-x-1/2 ">
        <div class="flex flex-col items-center w-[22rem]">
          <div class="relative pt-10 flex items-start h-full border-r border-gray-200 pr-5 flex-col gap-5 pb-6">
            <div class="text-[2.5rem] font-btest text-center text-gray-400 font-test">
              <a class="text-indigo-400 text-[2.75rem]">T</a>oday <a class="text-indigo-400 text-[2.75rem]">I</a>{" "}
              <a class="text-indigo-400 text-[2.75rem]">L</a>earned
            </div>
            <div class="w-full flex flex-col items-center gap-2 text-gray-600 border-b border-gray-200 pb-5">
              <button
                class="text-gray-500 font-sbtest rounded-lg border border-gray-300 w-full h-full py-2 "
                onClick={() => {
                  navigate('/blog/writing');
                }}
              >
                오늘 학습한 내용 쓰러가기 📒
              </button>
            </div>
            <div class="flex flex-col gap-2 items-cetenr w-full text-gray-500">
              <div class="text-gray-700 text-xl font-sbtest">Follower</div>
              <div class="flex gap-1 text-center">✨ <div class="flex"><div class="text-indigo-400">{followingCount}</div>명이 내 블로그를 구독하고 있어요!</div></div>
              <div class="flex flex-col gap-2 pl-5 border-l-[6px] border-gray-200 font-ltest text-lg">
                {follower.map((item) => {
                  return (
                    <div class="flex items-center gap-2"><div class="w-6 h-6 rounded-full bg-gray-300"></div><div>{item.nickname}</div></div>
                  )
                })}
                <div class="w-fit self-center flex gap-2 border rounded-lg py-1 px-2 font-sbtest">
                  <Page />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[60rem] pt-5">

          <div class="flex flex-col gap-10 pt-6">
            <section className="Streak grow">
              <Streak
                workingSum={workingSum}
                streak={streak}
              />
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
            <BlogWritingList
              writingList={writingList}
              onWritingClickHandler={(e) => { navigate('/blog/detail/' + e.currentTarget.value) }}
              writingTextList={writingTextList}
            />
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
        </div>
      </div >
    </div >
  );
}

export default BlogMain;
