import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/SRC";
import ProjectSearchBar from "../../Component/Project/ProjectSearchBar";
import { TagModal, ApplyingModal } from "../../Component/Modal";
import { htmlDetailToText } from "../../utils/html";
import { getUserDataToken } from "../../utils/user";

function ProjectMyList() {
    const navigate = useNavigate();
    //
    const [selectedTagList, setSelectedTagList] = useState([]);
    const [showTagMoadl, setShowTagModal] = useState(false);
    //
    const [showApplyingModal, setShowApplyingModal] = useState(false);
    //
    const [showRecruiting, setShowRecruiting] = useState(true);
    const [showJoining, setShowJoining] = useState(false);
    //
    const [userNickname, setUserNickname] = useState(null);
    function Project(props) { //projectList, projectTextList
        return (
            <div>
                {props.projectList.map((item, index) => {
                    if (item.image != null) {
                        return (
                            <div
                                className="Writing"
                                class="flex border-b bg-white h-54 px-10 pt-3 gap-5 text-left w-[59.5rem]"
                            >
                                <div class="w-[47rem]">
                                    <div class="text-sm text-gray-400 flex items-center font-ltest">
                                        {item.status == "ACTIVE" ? (
                                            <>
                                                <div class="w-fit px-2 bg-green-300 text-black">모집중</div>
                                                <button
                                                    class="ml-auto"
                                                    onClick={async () => {
                                                        navigate("/pm/writing?No=" + item.id);
                                                    }}


                                                >{">"} 수정하기</button>
                                            </>
                                        )
                                            :
                                            (<div class="px-2 bg-red-300 text-black">모집완료</div>)
                                        }
                                    </div>
                                    <button
                                        onClick={() => navigate("/pm/myproject/" + item.id)}
                                        class="mt-1 py-1 text-black text-xl">
                                        {item.title}
                                    </button>
                                    <div class="font-ltest min-h-[45px]">{props.projectTextList[index].slice(0, 128)}</div>
                                    <div class="flex gap-2">
                                        {item.tagInfos.map((tags) => {
                                            return (
                                                <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                                                    {tags.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div class="text-sm font-ltest text-gray-400">{item.startDate + "~" + item.endDate}</div>
                                </div>
                                <div class="w-grow">
                                    <div class="w-32 h-32 mb-2">
                                        <img
                                            src={"data:image/" + item.imgType + ";base64," + item.image}
                                            class=" z-40 h-32 w-32"
                                        />
                                    </div>
                                    <div class="w-32 grid grid-rows-2 text-sm ">
                                        <div>{"참여 인원: " + item.recruited + "/" + item.recruit}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div
                                className="Writing"
                                class="flex border-b bg-white h-54 px-10 pt-3 gap-5 text-left w-[59.5rem]"
                            >
                                <div class="w-[47rem]">
                                    <div class="text-sm text-gray-400 flex items-center font-ltest">
                                        {item.status == "ACTIVE" ? (
                                            <>
                                                <div class="w-fit px-2 bg-green-300 text-black">모집중</div>
                                            </>
                                        )
                                            :
                                            (<div class="px-2 bg-red-300 text-black">모집완료</div>)
                                        }
                                    </div>
                                    <button
                                        onClick={
                                            props.isRecruiting ? () => navigate("/pm/detail/" + item.id) : () => navigate("/pm/myproject/" + item.id)
                                        }
                                        class="mt-1 py-1 text-black text-xl">
                                        {item.title}
                                    </button>
                                    <div class="font-ltest min-h-[45px]">{props.projectTextList[index].slice(0, 128)}</div>
                                    <div class="flex gap-2">
                                        {item.tagInfos.map((tags) => {
                                            return (
                                                <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                                                    {tags.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div class="text-sm font-ltest text-gray-400">{item.startDate + "~" + item.endDate}</div>
                                </div>
                                <div class="w-grow flex flex-col items-start justify-end">
                                    {props.isRecruiting ? (
                                        <button
                                            class="border p-1"
                                            onClick={() => { props.secedeProject(item.id) }}
                                        >
                                            탈퇴
                                        </button>
                                    ) : (null)}
                                    <div class="w-32 grid grid-rows-2 text-sm ">
                                        <div>{"참여 인원: " + item.recruited + "/" + item.recruit}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
    function Joining() {
        const [projectTextList, setProejctTextList] = useState([]);
        const [projectList, setProjectList] = useState([]);
        //
        const [totalPage, setTotalPage] = useState(0);
        const [startPage, setStartPage] = useState(1);
        const [selected, setSelected] = useState(1);
        //
        function Page() {
            let endPage = (startPage + 9 > totalPage ? totalPage : startPage + 9);
            const result = [];
            console.log(totalPage);
            console.log(endPage);
            for (let i = startPage; i <= endPage; i++) {
                if (i == selected) {
                    result.push(
                        <button
                            class="text-indigo-500"
                            onClick={() => {
                                loadProject(i);
                                setSelected(i);
                            }}
                        >
                            {i}
                        </button>
                    )
                }
                else {
                    result.push(
                        <button
                            class="text-gray-500"
                            onClick={() => {
                                loadProject(i);
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
        function loadProject(page) {
            axios.get(SERVER_URL + "/matching-service/api/v1/matchings/myBoard?",
                {
                    params: {
                        page: page
                    }
                })
                .then((res) => {
                    let tmpProjectList = [], tmpTextList = [];
                    console.log(res);
                    res.data.data.boards.map((item) => {
                        tmpProjectList.push(item);
                        tmpTextList.push(htmlDetailToText(item.content));
                    })
                    tmpProjectList.map((item) => {
                        console.log(item);
                    })
                    setTotalPage(res.data.data.totalPageCount);
                    setProjectList([...tmpProjectList]);
                    setProejctTextList([...tmpTextList]);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        useEffect(() => {
            loadProject(1);
        }, [])
        return (
            <>
                <div class="mt-10 text-2xl font-btest">
                    {userNickname}님이 모집 중인 프로젝트예요.
                </div>
                <div class="mt-4 border rounded-lg">
                    <Project
                        projectList={projectList}
                        projectTextList={projectTextList}
                    />
                    <div class="flex gap-2 justify-center w-full px-2">
                        <button
                            class="text-gray-500"
                            onClick={() => {
                                if (startPage - 10 >= 1) {
                                    setStartPage(startPage - 10);
                                    loadProject(startPage - 10);
                                    setSelected(startPage - 10);
                                }
                            }}
                        >{"<"}
                        </button>
                        <Page />
                        <button
                            class="text-gray-500"
                            onClick={() => {
                                if (startPage + 10 <= totalPage) { //totalPage를 넘어가지 않을 경우에만 작동
                                    setStartPage(startPage + 10);
                                    loadProject(startPage + 10);
                                    setSelected(startPage + 10);
                                }
                            }}
                        >{">"}
                        </button>
                    </div>
                </div>
            </>
        )
    }

    function Recruiting() {
        const [projectInTextList, setProejctInTextList] = useState([]);
        const [projectInList, setProjectInList] = useState([]);
        const [totalPage, setTotalPage] = useState(0);
        const [startPage, setStartPage] = useState(1);
        const [selected, setSelected] = useState(1);
        function secedeProject(projectId) {
            axios.delete(SERVER_URL + "/matching-service/api/v1/members/" + projectId + "/secession")
                .then((res) => {
                    console.log(res);
                    loadProjectIn(1);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        function Page() {
            let endPage = (startPage + 9 > totalPage ? totalPage : startPage + 9);
            const result = [];
            console.log(totalPage);
            console.log(endPage);
            for (let i = startPage; i <= endPage; i++) {
                if (i == selected) {
                    result.push(
                        <button
                            class="text-indigo-500"
                            onClick={() => {
                                loadProjectIn(i);
                                setSelected(i);
                            }}
                        >
                            {i}
                        </button>
                    )
                }
                else {
                    result.push(
                        <button
                            class="text-gray-500"
                            onClick={() => {
                                loadProjectIn(i);
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
        function loadProjectIn(page) {
            axios.get(SERVER_URL + "/matching-service/api/v1/members/joining",
                {
                    params: { page: page }
                })
                .then((res) => {
                    console.log(res);
                    let tmpProjectList = [], tmpTextList = [];
                    res.data.data.boards.map((item) => {
                        tmpProjectList.push(item);
                        tmpTextList.push(htmlDetailToText(item.content));
                    })
                    setProjectInList([...res.data.data.boards]);
                    setTotalPage(res.data.data.totalPageCount);
                    setProejctInTextList([...tmpTextList]);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        useEffect(() => {
            loadProjectIn(1);
        }, []);
        return (
            <>
                <div class="flex mt-10 ">
                    <div class="text-2xl font-btest">
                        {userNickname}님이 참여 중인 프로젝트예요.
                    </div>
                    <button
                        class="ml-auto text-lg mr-2"
                        onClick={() => { setShowApplyingModal(true) }}
                    >{">"} 신청 목록</button>
                </div>

                <div class="mt-4 border rounded-lg">
                    <Project
                        projectList={projectInList}
                        projectTextList={projectInTextList}
                        isRecruiting={true}
                        secedeProject={secedeProject}
                    />
                    <div class="flex gap-2 justify-center w-full px-2">
                        <button
                            class="text-gray-500"
                            onClick={() => {
                                if (startPage - 10 >= 1) {
                                    setStartPage(startPage - 10);
                                    loadProjectIn(startPage - 10);
                                    setSelected(startPage - 10);
                                }
                            }}
                        >{"<"}
                        </button>
                        <Page />
                        <button
                            class="text-gray-500"
                            onClick={() => {
                                if (startPage + 10 <= totalPage) { //totalPage를 넘어가지 않을 경우에만 작동
                                    setStartPage(startPage + 10);
                                    loadProjectIn(startPage + 10);
                                    setSelected(startPage + 10);
                                }
                            }}
                        >{">"}
                        </button>
                    </div>
                </div>
            </>
        )
    }
    //

    useEffect(() => {
        if (getUserDataToken()) {
            console.log(getUserDataToken());
            setUserNickname(getUserDataToken().nickname);
        }
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
            {showApplyingModal ?
                (<ApplyingModal
                    setShowApplyingModal={setShowApplyingModal}
                />)
                :
                (null)}
            <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
                <div class="relative my-10">
                    <ProjectSearchBar
                        setShowTagModal={setShowTagModal}
                        selectedTagList={selectedTagList}
                    />
                    <div class="flex justify-around text-2xl font-btest mx-10 items-center mt-5">
                        <button
                            class={showRecruiting ? "px-3 border-b-4 border-indigo-300 pb-5" : "px-3 pb-5 border-b-4 border-white"}
                            onClick={() => { setShowJoining(false); setShowRecruiting(true); }}
                        >모집 중인 프로젝트
                        </button>
                        <button
                            class={showJoining ? "px-3 border-b-4 border-indigo-300 pb-5" : "px-3 pb-5 border-b-4 border-white"}
                            onClick={() => { setShowJoining(true); setShowRecruiting(false); }}
                        >참여 중인 프로젝트
                        </button>
                    </div>
                    {showRecruiting ?
                        (
                            <Joining />
                        )
                        :
                        (
                            null
                        )
                    }
                    {showJoining ?
                        (
                            <Recruiting />
                        )
                        :
                        (null)
                    }
                </div>
            </div>
        </div>
    );
}

export default ProjectMyList;
