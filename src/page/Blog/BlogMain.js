import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { SERVER_URL } from "../../utils/SRC";
import { leafYear, dateToNumber, numberToDate } from "../../utils/date";
import { htmlDetailToText } from "../../utils/html";
import { Page } from "../../utils/page";

import { BlogWritingList } from "../../Component/Blog/BlogWritingList";
import { Streak } from "../../Component/Blog/Streak";
import { TagModal } from "../../Component/Modal";
import BlogSearchBar from "../../Component/Blog/BlogSearchBar";

function BlogMain() {
  const navigate = useNavigate();
  const page = useParams().page;

  const [tmp, setTmp] = useState(false);
  const [writingList, setWritingList] = useState([]);
  const [streak, setStreak] = useState([]);
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
    if (IsLeafYear) {
      for (let i = 1; i <= 366; i++) {
        let tmpDate = numberToDate(year, IsLeafYear, i);
        temp.push({
          date: tmpDate,
          day: day[new Date(tmpDate).getDay()],
          working: 0,
        });
      }
    } else {
      for (let i = 1; i <= 365; i++) {
        let tmpDate = numberToDate(year, IsLeafYear, i);
        temp.push({
          date: tmpDate,
          day: day[new Date(tmpDate).getDay()],
          working: 0,
        });
        //console.log(tmpDate + "일의 요일은 " + day[new Date(tmpDate).getDay()]);
      }
    }
    return temp;
  }

  function loadStreak() {
    axios
      .get(SERVER_URL + "/user-service/api/v1/members/streak")
      .then((res) => {
        let temp,
          tmpsum = 0;
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
    loadWritings(page);

    axios
      .get(
        SERVER_URL + "/til-service/api/v1/members/myBoards?page=" + currentPage
      )
      .then((res) => {
        let tmpPageCount = res.data.data.totalPageCount;
        setMaxPageCount(tmpPageCount);
        let max = tmpPageCount;
        let tmpPgList = [];
        for (let i = 1; i <= max; i++) {
          tmpPgList.push(i);
        }
        setPageList([...tmpPgList]);
      })
      .catch((err) => {});
  }, [page]);

  useEffect(() => {
    console.log("지금부터 스트릭을 출력해보겠습니다~~");
    console.log(streak);
  }, [streak]);

  function loadWritings(currentPage) {
    axios
      .get(
        SERVER_URL + "/til-service/api/v1/boards/myBoards?page=" + currentPage
      )
      .then((res) => {
        let tmpPageCount;
        if (res.data.data.totalCount == 0) setCheckNoPost(true);
        else setCheckNoPost(false);
        tmpPageCount = res.data.data.totalPageCount;
        setMaxPageCount(tmpPageCount);
        let tmpPgList = pageList;
        for (let i = 1; i <= tmpPageCount; i++) {
          tmpPgList.push(i);
        }
        setPageList([...tmpPgList]);

        let tmpWrList = [],
          tmpTextList = [];
        res.data.data.boards.map((writing) => {
          let tmpimgtype = null;
          if (writing.imgtype != null) {
            tmpimgtype = writing.imageType.toString().split("/")[1];
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
          };
          tmpWr.date =
            tmpWr.date.substring(0, 10) + "   " + tmpWr.date.substring(11, 16);
          tmpTextList.push(htmlDetailToText(writing.content));
          tmpWrList.push(tmpWr);
          setWritingList([...tmpWrList]);
          setTmp(!tmp);
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
  };

  const onPreviousPageHandler = () => {
    let iPage = parseInt(page);
    let previousPage = iPage - 1;
    if (previousPage == 0) navigate("/blog/main/" + page);
    else navigate("/blog/main/" + previousPage);
  };

  const onNextPageHandler = () => {
    let iPage = parseInt(page);
    let nextPage = iPage + 1;
    if (nextPage > maxPageCount) navigate("/blog/main/" + page);
    else navigate("/blog/main/" + nextPage);
  };

  useEffect(() => {
    loadFollowers(1);
    loadStreak();
  }, []);

  function loadFollowers(page) {
    axios
      .get(SERVER_URL + "/user-service/api/v1/subscribe/followers", {
        params: { page: page },
      })
      .then((res) => {
        console.log(res);
        setFollower(res.data.data.data);
        setFollowingCount(res.data.data.totalCount);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div class="bg-white w-full h-screen font-test ">
      {showTagMoadl ? (
        <TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />
      ) : null}
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
              <a class="text-indigo-400 text-[2.75rem]">T</a>oday{" "}
              <a class="text-indigo-400 text-[2.75rem]">I</a>{" "}
              <a class="text-indigo-400 text-[2.75rem]">L</a>earned
            </div>
            <div class="w-full flex flex-col items-center gap-2 text-gray-600 border-b border-gray-200 pb-5">
              <button
                class="text-gray-500 font-sbtest rounded-lg border border-gray-300 w-full h-full py-2 shadow-[0_3px_3px_0px_rgba(0,0,0,0.055)]"
                onClick={() => {
                  navigate("/blog/writing");
                }}
              >
                오늘 학습한 내용 쓰러가기 📒
              </button>
            </div>
            <div class="flex flex-col gap-2 items-cetenr w-full text-gray-500">
              <div class="text-gray-700 text-xl font-sbtest">Follower</div>
              <div class="flex gap-1 text-center">
                ✨{" "}
                <div class="flex">
                  <div class="text-indigo-400">{followingCount}</div>명이 내
                  블로그를 구독하고 있어요!
                </div>
              </div>
              <div class="flex flex-col gap-2 pl-5 border-l-[6px] border-gray-200 font-ltest text-lg">
                {follower.map((item) => {
                  return (
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-full bg-gray-300"></div>
                      <div>{item.nickname}</div>
                    </div>
                  );
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
              <Streak workingSum={workingSum} streak={streak} />
            </section>
          </div>

          <div class="mt-10 border rounded-lg">
            {
              <div class="flex justify-center">
                <div
                  class={
                    checkNoPost == true ? "my-10 m-auto text-center" : "hidden"
                  }
                >
                  {checkNoPost == true
                    ? "아직 아무 글도 작성하지 않았어요 😥"
                    : ""}
                </div>
              </div>
            }
            <BlogWritingList
              writingList={writingList}
              onWritingClickHandler={(e) => {
                navigate("/blog/detail/" + e.currentTarget.value);
              }}
              writingTextList={writingTextList}
            />
          </div>
          <div class="flex justify-center">
            <nav class="my-6">
              <ul class="inline-flex items-center -space-x-px">
                <li>
                  <button
                    onClick={() => {
                      onPreviousPageHandler();
                    }}
                    class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>

                {pageList.map((page) => {
                  return (
                    <li>
                      <button
                        onClick={() => {
                          onCurrentPageHandler(page);
                        }}
                        class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {page}
                      </button>
                    </li>
                  );
                })}

                <li>
                  <button
                    onClick={() => {
                      onNextPageHandler();
                    }}
                    class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogMain;
