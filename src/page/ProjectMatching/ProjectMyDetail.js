import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, useSearchParams } from "react-router-dom";
import profileImage from "../../assets/img/profile.jpg";
import { SERVER_URL } from "../../utils/SRC";
import { TeamScheduleModal } from "../../Component/Modal"
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { TagModal } from "../../Component/Modal";
import { getUserDataToken } from "../../utils/user";

function ProjectMyDetail() {
    const navigate = useNavigate();
    const [projectDetail, setProjectDetail] = useState({ id: 0, timeTables: [] });
    let tagList = [];
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

    function Page(props) { // props --> startPage, totalPage, load__함수, setSelected, selected
        let endPage = (props.startPage + 9 > props.totalPage ? props.totalPage : props.startPage + 9);
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
            >{"<"}
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
                )
            }
            else {
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
        result.push(<button
            class="text-gray-500"
            onClick={() => {
                if (props.startPage + 10 <= props.totalPage) { //totalPage를 넘어가지 않을 경우에만 작동
                    props.setStartPage(props.startPage + 10);
                    props.load(props.startPage + 10);
                    props.setSelected(props.startPage + 10);
                }
            }}
        >{">"}
        </button>);
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
            params.append('page', page);
            tagList.map((item) => {
                params.append('tagId', item.id);
            })
            console.log(params.getAll('tagId'));
            await axios.get(SERVER_URL + "/user-service/api/v1/members/matchings",
                { params: params }
            )
                .then((res) => {
                    console.log(res);
                    setRecommended(res.data.data.data);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        useEffect(() => {
            loadRecommendedDev(1);
            if (getUserDataToken()) {
                console.log(getUserDataToken());
                setUserNickname(getUserDataToken().nickname);
            }
        }, [])
        return (
            <>
                <div class="text-xl font-btest mb-4 mt-5">😊 {userNickname}님, 이런 인재들은 어떠신가요?</div>
                {recommended != null ?
                    recommended.map((item) => {
                        return (
                            <div class="px-4 py-4 flex mt-2 border rounded-lg h-40">
                                <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                    <img
                                        src={profileImage}
                                        class="w-28 h-28 rounded-full drop-shadow-lg"
                                        alt="profile"
                                    />
                                </div>
                                <div class="ml-4 my-auto flex flex-col items-start">
                                    <div class="text-2xl font-btest">{item.nickName}</div>
                                    <button class="mt-1 font-test text-sm">⏱ 시간표 확인하기 {">"}</button>
                                    <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>

                                </div>
                                <div class="ml-auto text-right text-sm self-center">
                                    <div class="">
                                        <div class="text-gray-500 text-lg text-left border-b mb-2">기술</div>
                                        <div class="text-black grid grid-cols-3 gap-2">
                                            {item.tagData.map((tag) => {
                                                return (
                                                    <div class="bg-indigo-100 text-center p-1">
                                                        {tag.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    :
                    <div>로딩중.</div>
                }
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

    }

    function Participants() {
        const [totalPage, setTotalPage] = useState(0);
        const [startPage, setStartPage] = useState(1);
        const [selected, setSelected] = useState(1);
        //
        const [participants, setParticipants] = useState([]);
        function loadParticipants(page) {
            axios.get(SERVER_URL + "/matching-service/api/v1/members/" + id + "/membersList",
                {
                    params: { page: page }
                }
            )
                .then((res) => {
                    console.log(res.data.data.data);
                    setParticipants(res.data.data.data);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        useEffect(() => {
            loadParticipants(1);
        }, [])
        return (
            <>
                <div class="text-xl font-btest mb-4 mt-5">🙆‍♀️ 현재 참여 중인 팀원들이에요.</div>
                {participants != null ?
                    participants.map((item) => {
                        return (
                            <div class="px-4 py-4 flex mt-2 border rounded-lg h-40">
                                <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                    <img
                                        src={profileImage}
                                        class="w-28 h-28 rounded-full drop-shadow-lg"
                                        alt="profile"
                                    />
                                </div>
                                <div class="ml-4 my-auto flex flex-col items-start">
                                    <div class="text-2xl font-btest">{item.nickName}</div>
                                    <button class="mt-1 font-test text-sm">⏱ 시간표 확인하기 {">"}</button>
                                    <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>

                                </div>
                                <div class="ml-auto text-right text-sm self-center">
                                    <div class="">
                                        <div class="text-gray-500 text-lg text-left border-b mb-2">기술</div>
                                        <div class="text-black grid grid-cols-3 gap-2">
                                            {item.tagInfos.map((tag) => {
                                                return (
                                                    <div class="bg-indigo-100 text-center p-1">
                                                        {tag.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                    :
                    <div>로딩중...</div>
                }

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
    }

    function Apply() {
        const [totalPage, setTotalPage] = useState(0);
        const [startPage, setStartPage] = useState(1);
        const [selected, setSelected] = useState(1);
        //
        const [apply, setApply] = useState([]);
        function loadApplyDev(page) {
            axios.get(SERVER_URL + "/matching-service/api/v1/members/" + id + "/waitingList",
                {
                    params: { page: page }
                }
            )
                .then((res) => {
                    console.log(res);
                    setApply(res.data.data.data);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        useEffect(() => {
            loadApplyDev(1);
        }, [])
        return (
            <>
                <div class="text-xl font-btest mt-5 mb-4">📢 본 프로젝트에 지원한 팀원들이에요. 어서 확인해보세요! </div>
                {apply != null ?
                    apply.map((item) => {
                        return (
                            <div class="px-4 py-4 flex mt-2 border rounded-lg h-40">
                                <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                    <img
                                        src={profileImage}
                                        class="w-28 h-28 rounded-full drop-shadow-lg"
                                        alt="profile"
                                    />
                                </div>
                                <div class="ml-4 my-auto flex flex-col items-start">
                                    <div class="text-2xl font-btest">{item.nickName}</div>
                                    <button class="mt-1 font-test text-sm">⏱ 시간표 확인하기 {">"}</button>
                                    <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>
                                </div>
                                <div class="w-[15%] ml-auto text-right text-sm self-center">
                                    <div class="">
                                        <div class="text-gray-500 text-lg text-left border-b mb-2">기술</div>
                                        <div class="text-black grid grid-cols-3 gap-2">
                                            {item.tagInfos.map((tag) => {
                                                return (
                                                    <div class="bg-indigo-100 text-center p-1">
                                                        {tag.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <button
                                            class="basis-1/2 px-4 py-2 rounded-lg bg-gray-500 text-white"
                                            onClick={() => {
                                                axios.post(SERVER_URL + "/matching-service/api/v1/members/" + id + "/" + item.id + "/approve")
                                                    .then((res) => {
                                                        console.log(res);
                                                    })
                                                    .catch((err) => {
                                                        console.log(err.response);
                                                    })
                                            }}
                                        >수락</button>
                                        <button
                                            class="basis-1/2 px-4 py-2 rounded-lg bg-gray-500 text-white"
                                            onClick={() => {
                                                axios.post(SERVER_URL + "/matching-service/api/v1/members/" + id + "/" + item.id + "/reject")
                                                    .then((res) => {
                                                        console.log(res);
                                                    })
                                                    .catch((err) => {
                                                        console.log(err.response);
                                                    })
                                            }}
                                        >거절
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div>로딩중.....</div>
                }


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
    }

    function deleteProject() {
        axios.delete(SERVER_URL + "/matching-service/api/v1/matchings/" + id)
            .then((res) => {
                console.log(res);
                navigate("/pm/mylist");
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    function loadProjectMyDetail() {
        axios.get(SERVER_URL + "/matching-service/api/v1/matchings/" + id)
            .then((res) => {
                console.log(res);
                res.data.data.tagInfos.map((item) => {
                    tagList.push(item);
                })
                setProjectDetail(res.data.data);
                setIsLoadingCompleted(true);
                //loadRecommendedDev(1);
                //loadApplyDev(1);
                //loadParticipants(1);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        loadProjectMyDetail();
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
                        selectedTagList={selectedTagList}
                    />
                    <div class="mt-6 px-4 border rounded-lg border-gray-300">
                        <div class="flex mt-4 gap-4">
                            <div class="text-2xl font-btest w-fit">
                                {projectDetail.title}
                            </div>
                        </div>
                        <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
                        <div class="mt-2 w-full flex justify-end gap-4">
                            <button
                                onClick={() => navigate("/pm/myteamschedule/" + id)}
                            >
                                시간표 수정{">"}
                            </button>
                            <button
                                onClick={() => navigate("/pm/writing?No=" + id)}
                            >
                                프로젝트 수정 {">"}
                            </button>
                            <button
                                onClick={() => { deleteProject() }}
                            >프로젝트 삭제 {">"} </button>
                        </div>
                        <div class="flex gap-3 justify-around mt-5 items-center text-xl font-btest mb-3">
                            <button
                                class={showRecommend ? "px-2 border-b-4 border-indigo-300 pb-3" : "px-2 border-b-4 border-white pb-3"}
                                onClick={() => { setShowRecommend(true); setShowParticipants(false); setShowApply(false); }}
                            >
                                팀원 추천
                            </button>
                            <button
                                class={showParticipants ? "px-2 border-b-4 border-indigo-300 pb-3" : "px-2 border-b-4 border-white pb-3"}
                                onClick={() => { setShowRecommend(false); setShowParticipants(true); setShowApply(false); }}
                            >
                                참여 중인 팀원들
                            </button>
                            <button
                                class={showApply ? "px-2 border-b-4 border-indigo-300 pb-3" : "px-2 border-b-4 border-white pb-3"}
                                onClick={() => { setShowRecommend(false); setShowParticipants(false); setShowApply(true); }}
                            >
                                지원한 개발자들
                            </button>
                        </div>
                        {isLoadingCompleted ? (
                            <>
                                {showRecommend ? (<Recommend />) : (null)}
                                {showParticipants ? (<Participants />) : (null)}
                                {showApply ? (<Apply />) : (null)}
                            </>
                        )
                            :
                            (<div>로딩중..</div>)}

                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProjectMyDetail;
