import axios from "axios";
import { React, useState, useEffect } from "react";
import {
  useNavigate,
  Navigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import profileImage from "../../assets/img/profile.jpg";
import { SERVER_URL } from "../../utils/SRC";
import { TeamScheduleModal, ScheduleViewModal } from "../../Component/Modal";
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { TagModal } from "../../Component/Modal";
import { getUserDataToken } from "../../utils/user";
import Swal from "sweetalert2";

function ProjectMyDetail() {
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState({ id: 0, timeTables: [] });
  //let tagList = [];
  const [tagList, setTagList] = useState([]);
  const id = useParams().id;
  //
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [showTagMoadl, setShowTagModal] = useState(false);
  //
  const [showRecommend, setShowRecommend] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showApply, setShowApply] = useState(false);
  //
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);
  //
  const [userNickname, setUserNickname] = useState(null);
  //
  const [showScheduleViewModal, setShowScheduleViewModal] = useState(false);
  const [timeTable, setTimeTable] = useState([]);
  const [name, setName] = useState("");
  //let timeTable;
  const Swal = require("sweetalert2");

  function Page(props) {
    // props --> startPage, totalPage, load__함수, setSelected, selected
    let endPage =
      props.startPage + 9 > props.totalPage
        ? props.totalPage
        : props.startPage + 9;
    const result = [];
    console.log(props.totalPage);
    console.log(endPage);
    result.push(
      <button
        class="text-gray-500"
        onClick={() => {
          if (props.startPage - 10 >= 1) {
            props.setStartPage(props.startPage - 10);
            props.load(props.startPage - 10);
            props.setSelected(props.startPage - 10);
          }
        }}
      >
        {"<"}
      </button>
    );
    for (let i = props.startPage; i <= endPage; i++) {
      if (i == props.selected) {
        result.push(
          <button
            class="pr-2 text-indigo-500"
            onClick={() => {
              props.load(i);
              props.setSelected(i);
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
              props.load(i);
              props.setSelected(i);
            }}
          >
            {i}
          </button>
        );
      }
    }
    result.push(
      <button
        class="text-gray-500"
        onClick={() => {
          if (props.startPage + 10 <= props.totalPage) {
            //totalPage를 넘어가지 않을 경우에만 작동
            props.setStartPage(props.startPage + 10);
            props.load(props.startPage + 10);
            props.setSelected(props.startPage + 10);
          }
        }}
      >
        {">"}
      </button>
    );
    return result;
  }

  function Recommend() {
    const [totalPage, setTotalPage] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [selected, setSelected] = useState(1);
    //
    const [recommended, setRecommended] = useState([]);
    async function loadRecommendedDev(page) {
      const params = new URLSearchParams();
      params.append("page", page);
      //console.log(tagList);
      tagList.map((item) => {
        params.append("tagId", item.id);
      });
      params.append("boardId", id);
      console.log(params.get("boardId"));
      console.log(params.getAll("tagId"));
      await axios
        .get(SERVER_URL + "/user-service/api/v1/members/matchings", {
          params: params,
        })
        .then((res) => {
          console.log(res);
          setRecommended(res.data.data.data);
          setTotalPage(res.data.data.totalPageCount);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    useEffect(() => {
      loadRecommendedDev(1);
      if (getUserDataToken()) {
        console.log(getUserDataToken());
        setUserNickname(getUserDataToken().nickname);
      }
    }, []);
    return (
      <>
        <div class="text-xl font-btest mb-4 mt-5">
          😊 {userNickname}님, 이런 인재들은 어떠신가요?
        </div>
        {recommended != null ? (
          totalPage == 0 ? (
            <div class="text-lg pb-5">프로젝트에 적합한 팀원이 없어요😥</div>
          ) : (
            <>
              {recommended.map((item) => {
                return (
                  <div class="px-4 py-4 flex mt-2 border rounded-lg h-40">
                    <div
                      className="ProfileImage"
                      class="my-auto mx-4 w-28 h-28 rounded-full"
                    >
                      <img
                        src={
                          item.profileType == null
                            ? profileImage
                            : "data:image/" +
                              item.profileType +
                              ";base64," +
                              item.profileString
                        }
                        class="w-28 h-28 rounded-full drop-shadow-lg"
                      />
                    </div>
                    <div class="ml-4 my-auto flex flex-col items-start">
                      <div class="text-2xl font-btest">{item.nickname}</div>
                      <button
                        class="mt-1 font-test text-sm"
                        id={item.id}
                        value={item.nickName}
                        onClick={(e) => {
                          console.log(e.currentTarget.id);
                          console.log(e.currentTarget.value);
                          console.log("ddd");
                          console.log(item.nickname);
                          loadPersonSchedule(e.currentTarget.id, item.nickname);
                        }}
                      >
                        ⏱ 시간표 확인하기 {">"}
                      </button>
                      <button
                        class="mt-1 font-test text-sm"
                        onClick={(e) => seePortfolio(item.id, e)}
                      >
                        📄 포트폴리오 확인하기 {">"}
                      </button>
                    </div>
                  </div>
                );
              })}
              <div class="flex gap-2 justify-center w-full px-2">
                <Page
                  startPage={startPage}
                  totalPage={totalPage}
                  selected={selected}
                  setSelected={setSelected}
                  load={loadRecommendedDev}
                />
              </div>
            </>
          )
        ) : (
          <div>로딩중.</div>
        )}
      </>
    );
  }

  function Participants() {
    const [totalPage, setTotalPage] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [selected, setSelected] = useState(1);
    //
    const [participants, setParticipants] = useState([]);
    function loadParticipants(page) {
      axios
        .get(
          SERVER_URL +
            "/matching-service/api/v1/members/" +
            id +
            "/membersList",
          {
            params: { page: page },
          }
        )
        .then((res) => {
          console.log(res.data.data.data);
          setParticipants(res.data.data.data);
          setTotalPage(res.data.data.totalPageCount);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    useEffect(() => {
      loadParticipants(1);
    }, []);
    return (
      <>
        <div class="text-xl font-btest mb-4 mt-5">
          🙆‍♀️ 현재 참여 중인 팀원들이에요.
        </div>
        {participants != null ? (
          totalPage == 0 ? (
            <div class="text-lg pb-5">프로젝트에 참여 중인 팀원이 없어요😥</div>
          ) : (
            <>
              {participants.map((item) => {
                return (
                  <div class="px-4 py-4 flex mt-2 border rounded-lg h-40">
                    <div
                      className="ProfileImage"
                      class="my-auto mx-4 w-28 h-28 rounded-full"
                    >
                      <img
                        src={
                          item.profileType == null
                            ? profileImage
                            : "data:image/" +
                              item.profileType +
                              ";base64," +
                              item.profileString
                        }
                        class="w-28 h-28 rounded-full drop-shadow-lg"
                      />
                    </div>
                    <div class="ml-4 my-auto flex flex-col items-start">
                      <div class="text-2xl font-btest">{item.nickName}</div>
                      <button
                        class="mt-1 font-test text-sm"
                        id={item.id}
                        value={item.nickName}
                        onClick={(e) => {
                          loadPersonSchedule(
                            e.currentTarget.id,
                            item.nickName,
                            e
                          );
                        }}
                      >
                        ⏱ 시간표 확인하기 {">"}
                      </button>
                      <button
                        class="mt-1 font-test text-sm"
                        onClick={(e) => seePortfolio(item.id, e)}
                      >
                        📄 포트폴리오 확인하기 {">"}
                      </button>
                    </div>
                  </div>
                );
              })}
              <div class="flex gap-2 justify-center w-full px-2">
                <Page
                  startPage={startPage}
                  totalPage={totalPage}
                  selected={selected}
                  setSelected={setSelected}
                  load={loadParticipants}
                />
              </div>
            </>
          )
        ) : (
          <div>로딩중...</div>
        )}
      </>
    );
  }

  function Apply() {
    const [totalPage, setTotalPage] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [selected, setSelected] = useState(1);
    //
    const [apply, setApply] = useState([]);
    function loadApplyDev(page) {
      axios
        .get(
          SERVER_URL +
            "/matching-service/api/v1/members/" +
            id +
            "/waitingList",
          {
            params: { page: page },
          }
        )
        .then((res) => {
          console.log(res);
          setApply(res.data.data.data);
          setTotalPage(res.data.data.totalPageCount);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    useEffect(() => {
      loadApplyDev(1);
    }, []);
    return (
      <>
        <div class="text-xl font-btest mt-5 mb-4">
          📢 본 프로젝트에 지원한 팀원들이에요. 어서 확인해보세요!{" "}
        </div>
        {apply != null ? (
          totalPage == 0 ? (
            <div class="text-lg pb-5">프로젝트에 지원한 팀원이 없어요😥</div>
          ) : (
            <>
              {apply.map((item) => {
                return (
                  <div class="px-4 py-4 flex mt-2 border rounded-lg h-40">
                    <div
                      className="ProfileImage"
                      class="my-auto mx-4 w-28 h-28 rounded-full"
                    >
                      <img
                        src={
                          item.profileType == null
                            ? profileImage
                            : "data:image/" +
                              item.profileType +
                              ";base64," +
                              item.profileString
                        }
                        class="w-28 h-28 rounded-full drop-shadow-lg"
                      />
                    </div>
                    <div class="ml-4 my-auto flex flex-col items-start">
                      <div class="text-2xl font-btest">{item.nickName}</div>
                      <button
                        class="mt-1 font-test text-sm"
                        id={item.id}
                        value={item.nickName}
                        onClick={(e) => {
                          loadPersonSchedule(
                            e.currentTarget.id,
                            item.nickName,
                            e
                          );
                        }}
                      >
                        ⏱ 시간표 확인하기 {">"}
                      </button>
                      <button
                        class="mt-1 font-test text-sm"
                        onClick={(e) => seePortfolio(item.id, e)}
                      >
                        📄 포트폴리오 확인하기 {">"}
                      </button>
                    </div>
                    <div class="w-[30%] ml-auto text-right text-sm self-center">
                      <div class="flex gap-1">
                        <button
                          class="basis-1/2 px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-300"
                          onClick={() => {
                            axios
                              .post(
                                SERVER_URL +
                                  "/matching-service/api/v1/members/" +
                                  id +
                                  "/" +
                                  item.id +
                                  "/approve"
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => {
                                console.log(err.response);
                              });
                          }}
                        >
                          수락
                        </button>
                        <button
                          class="basis-1/2 px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-300"
                          onClick={() => {
                            axios
                              .post(
                                SERVER_URL +
                                  "/matching-service/api/v1/members/" +
                                  id +
                                  "/" +
                                  item.id +
                                  "/reject"
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => {
                                console.log(err.response);
                              });
                          }}
                        >
                          거절
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div class="flex gap-2 justify-center w-full px-2">
                <Page
                  startPage={startPage}
                  totalPage={totalPage}
                  selected={selected}
                  setSelected={setSelected}
                  load={loadApplyDev}
                />
              </div>
            </>
          )
        ) : (
          <div>로딩중.....</div>
        )}
      </>
    );
  }

  async function loadPersonSchedule(ct, nickname, e) {
    await axios
      .get(SERVER_URL + "/user-service/api/v1/members/timetables", {
        params: {
          memberId: ct,
        },
      })
      .then((res) => {
        console.log(res);
        let tmpPersonSch = [];
        for (let i = 0; i < res.data.data.endTimes.length; i++) {
          tmpPersonSch.push({
            week: res.data.data.weeks[i],
            startTime: res.data.data.startTimes[i],
            endTime: res.data.data.endTimes[i],
          });
        }
        console.log(tmpPersonSch);
        //timeTable = tmpPersonSch;

        console.log("닉네임ㅇㅇㅇ");
        console.log(nickname);

        setName(nickname);
        setTimeTable([...tmpPersonSch]);
        setShowScheduleViewModal(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function seePortfolio(id, e) {
    // 되는지 테스트 필요함...!
    axios
      .get(
        SERVER_URL +
          "/ptf-service/api/v1/portfolio/memberPortfolio/template?memberId=" +
          id
      )
      .then((res) => {
        console.log("포폴 템플릿 조회");
        console.log(res.data.data);

        if (res.data.data == "TYPE_1") navigate("/portfolio/template/t1/" + id);
        else if (res.data.data == "TYPE_2")
          navigate("/portfolio/template/t2/" + id);
        else if (res.data.data == "TYPE_3")
          navigate("/portfolio/template/t3/" + id);
        else navigate("/portfolio/template/t4/" + id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteProject() {
    axios
      .delete(SERVER_URL + "/matching-service/api/v1/matchings/" + id)
      .then((res) => {
        console.log(res);
        navigate("/pm/mylist");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  async function loadProjectMyDetail() {
    await axios
      .get(SERVER_URL + "/matching-service/api/v1/matchings/" + id)
      .then((res) => {
        console.log(res);
        let tmpTagIdList = [];
        res.data.data.tagInfos.map((item) => {
          tmpTagIdList.push(item);
        });
        console.log(tagList);
        setTagList([...tmpTagIdList]);
        setProjectDetail(res.data.data);
        setIsLoadingCompleted(true);
        //loadRecommendedDev(1);
        //loadApplyDev(1);
        //loadParticipants(1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function completeProject() {
    const params = new URLSearchParams();
    axios
      .get(
        SERVER_URL +
          "/matching-service/api/v1/members/" +
          id +
          "/membersList/noPage"
      )
      .then((res) => {
        console.log(res.data.data);
        res.data.data.map((item) => {
          params.append("memberId", item.id);
        });
        params.append("title", projectDetail.title);
        console.log(params.getAll("memberId"));
        console.log(params.get("title"));
        Swal.fire({
          title: "프로젝트 모집이 완료됐습니다. ",
          text: "Gitime로 이동하시겠습니까?",
          confirmButtonText: "Yes",
          confirmButtonColor: "#171717",
          cancelButtonText: "No",
          cancelButtonColor: "#d33",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
        }).then((result) => {
          console.log("뭐냐");
          axios
            .get(
              SERVER_URL + "/matching-service/api/v1/matchings/completeTeam",
              { params: params }
            )
            .then((res) => {
              console.log(res);
              if (result.isCancled) {
                navigate("/pm/mylist");
              } else {
                navigate("/pm/mylist");
              }
            })
            .catch((err) => {
              console.log(err.response);
            });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    loadProjectMyDetail();
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
      {showScheduleViewModal ? (
        <ScheduleViewModal
          setShowScheduleViewModal={setShowScheduleViewModal}
          timeTables={timeTable}
          isPerson={true}
          name={name}
        />
      ) : null}
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <ProjectSearchBar
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
          />
          <div class="mt-6 px-4 border rounded-lg border-gray-300">
            <div class="flex mt-4 gap-4">
              <div class="text-2xl font-btest w-fit">{projectDetail.title}</div>
            </div>
            <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
            <div class="mt-2 w-full flex justify-end gap-4">
              <button onClick={() => navigate("/pm/myteamschedule/" + id)}>
                시간표 수정{">"}
              </button>
              <button onClick={() => navigate("/pm/writing?No=" + id)}>
                프로젝트 수정 {">"}
              </button>
              <button
                onClick={() => {
                  deleteProject();
                }}
              >
                프로젝트 삭제 {">"}{" "}
              </button>
              <button
                class="text-red-600"
                onClick={() => {
                  completeProject();
                }}
              >
                모집 완료하기
              </button>
            </div>
            <div class="flex gap-3 justify-around mt-5 items-center text-xl font-btest mb-3">
              <button
                class={
                  showRecommend
                    ? "px-2 border-b-4 border-indigo-300 pb-3"
                    : "px-2 border-b-4 border-white pb-3"
                }
                onClick={() => {
                  setShowRecommend(true);
                  setShowParticipants(false);
                  setShowApply(false);
                }}
              >
                팀원 추천
              </button>
              <button
                class={
                  showParticipants
                    ? "px-2 border-b-4 border-indigo-300 pb-3"
                    : "px-2 border-b-4 border-white pb-3"
                }
                onClick={() => {
                  setShowRecommend(false);
                  setShowParticipants(true);
                  setShowApply(false);
                }}
              >
                참여 중인 팀원들
              </button>
              <button
                class={
                  showApply
                    ? "px-2 border-b-4 border-indigo-300 pb-3"
                    : "px-2 border-b-4 border-white pb-3"
                }
                onClick={() => {
                  setShowRecommend(false);
                  setShowParticipants(false);
                  setShowApply(true);
                }}
              >
                지원한 개발자들
              </button>
            </div>
            {isLoadingCompleted ? (
              <>
                {showRecommend ? <Recommend /> : null}
                {showParticipants ? <Participants /> : null}
                {showApply ? <Apply /> : null}
              </>
            ) : (
              <div>로딩중..</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectMyDetail;
