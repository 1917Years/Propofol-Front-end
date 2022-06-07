import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../utils/SRC";
import { fillScheduleStyleList, TimeList } from "./Schedule";

export function ApplyingModal(props) { // props-> setShowApplyingModal, applying
    const navigate = useNavigate();
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
                            loadApplying(i);
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
                            loadApplying(i);
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
    function loadApplying(page) {
        axios.get(SERVER_URL + "/matching-service/api/v1/members/waiting",
            {
                params: { page: page }
            })
            .then((res) => {
                console.log(res);
                setTotalPage(res.data.data.totalPageCount);
                setProjectList([...res.data.data.boards]);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    function cancleProject(projectId) {
        axios.delete(SERVER_URL + "/matching-service/api/v1/members/" + projectId + "/cancel")
            .then((res) => {
                console.log(res);
                loadApplying(1);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        console.log(projectList);
    }, [projectList])

    useEffect(() => {
        loadApplying(1);
    }, [])

    return (
        <div class="fixed bg-black top-0 w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[41%] min-w-[45rem] min-h-[40rem] h-[65%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between border-b border-gray-300 pb-3">
                        <div class="ml-2 text-3xl font-sbtest">
                            신청 중인 프로젝트 목록
                        </div>
                        <button class="text-2xl"
                            onClick={() => { props.setShowApplyingModal(false) }}
                        >x
                        </button>
                    </div>
                    <div class="w-full mt-10 flex flex-col border-t border-gray-300">
                        {projectList.map((item) => {
                            console.log("뭐야시발");
                            return (
                                <div class="flex gap-2 items-center border-b py-1">
                                    <div class="px-3 py-2 w-4/5 break-all">
                                        <div class=" font-sbtest text-lg">{item.title}</div>
                                        <div class="flex mt-2 gap-3">
                                            <div class="bg-gray-100 font-ltest text-gray-700 text-sm">참여 인원 : {item.recruited}/{item.recruit}</div>
                                            <div class="bg-gray-100 font-ltest text-gray-700 text-sm">{item.startDate} ~{item.endDate}</div>
                                        </div>
                                        <div class="flex mt-1">
                                            {item.tagInfos.map((tag) => {
                                                return (
                                                    <div class="bg-gray-100 font-ltest text-gray-700 text-sm">
                                                        #{tag.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div class="grow mr-3 flex flex-col gap-2">
                                        <button
                                            class="bg-white border border-gray-300 text-gray-600 text-lg font-ltest w-full"
                                            value={item.id}
                                            onClick={(e) => { navigate("/pm/detail/" + e.target.value) }}
                                        >
                                            상세 보기
                                        </button>
                                        <button
                                            class="bg-white border border-gray-300 text-gray-600 text-lg font-ltest w-full"
                                            value={item.id}
                                            onClick={(e) => { cancleProject(e.target.value) }}
                                        >
                                            신청 취소
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div class="flex gap-2 justify-center w-full px-2">
                    <button
                        class="text-gray-500"
                        onClick={() => {
                            if (startPage - 10 >= 1) {
                                setStartPage(startPage - 10);
                                loadApplying(startPage - 10);
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
                                loadApplying(startPage + 10);
                                setSelected(startPage + 10);
                            }
                        }}
                    >{">"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export function ScheduleViewModal(props) {// props -> setShowScheduleViewModal
    let scheduleList = [];
    const day = ["월", "화", "수", "목", "금", "토", "일"];
    //const [scheduleList, setScheduleList] = useState([]);
    const [scheduleStyleList, setScheduleStyleList] = useState([[], [], [], [], [], [], []]);
    const [selectedSchedule, setSelectedSchedule] = useState({ startTime: "", endTime: "", week: "" });
    function loadPropsSchedule() {
        let tmpScheduleList = [];
        props.timeTables.map((item) => {
            tmpScheduleList.push(item);
        })
        scheduleList = tmpScheduleList;
        fillScheduleStyleList(scheduleStyleList, setScheduleStyleList, scheduleList);
    }
    return (
        <div class="fixed bg-black top-0 w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[38%] min-w-[46rem] min-h-[49rem] h-[60%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5">
                <div class="flex justify-between border-b border-gray-300 pb-3">
                    <div class="ml-2 text-3xl font-sbtest">
                        시간표
                    </div>
                    <button class="text-2xl"
                        onClick={() => { props.setShowScheduleViewModal(false) }}
                    >x
                    </button>
                </div>
                <div class="relative h-[100%] mt-5 mb-2">
                    <div class="h-[100%] w-full flex flex-col justify-start text-center border border-gray-300">
                        <div class="w-full h-fit grid grid-cols-8 font-ltest text-gray-600 border-b gap-1">
                            <div class="border-r pt-2 pb-2">시간</div>
                            {day.map((item) => {
                                if (item == "일") {
                                    return (
                                        <div class="pt-2">{item}</div>
                                    )
                                }
                                else {
                                    return (
                                        <div class="pt-2 border-r">{item}</div>
                                    )
                                }
                            })}
                        </div>
                        <div class="relative h-[100%]">
                            <div class="h-full w-full grow grid grid-cols-8 gap-1 text-sm">
                                <TimeList />
                                {day.map((week, index) => {
                                    return (
                                        <div class="h-full relative">
                                            <div>
                                                {scheduleStyleList.length == 0 ?
                                                    (
                                                        <div>로딩중.</div>
                                                    )
                                                    :
                                                    (
                                                        scheduleStyleList[index].map((item) => {
                                                            return (
                                                                <div
                                                                    style={item.style}
                                                                >
                                                                </div>
                                                            )
                                                        })
                                                    )}

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ScheduleDetailModal(props) { // props -> setShowScheduleDetailModal, selectedSchedule, deleteSchedule
    const day = ["월", "화", "수", "목", "금", "토", "일"];
    return (
        <div class="fixed bg-black top-0 w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[38%] min-w-[45rem] min-h-[36rem] h-[60%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5">
                <div class="flex justify-between border-b border-gray-300 pb-3">
                    <div class="ml-2 text-3xl font-sbtest">
                        일정 상세정보
                    </div>
                    <button class="text-2xl"
                        onClick={() => { props.setShowScheduleDetailModal(false) }}
                    >x
                    </button>
                </div>

                <div class="w-full mt-10 px-10 flex flex-col">
                    <div class="w-full flex gap-16">
                        <div class="flex flex-col gap-2 w-1/3">
                            <div class="font-sbtest text-2xl">시작 시간</div>
                            <div class="border rounded-lg border-gray-300 text-lg px-3 font-ltest py-1">
                                {props.selectedSchedule.startTime}
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-1/3">
                            <div class="font-sbtest text-2xl">종료 시간</div>
                            <div class="border rounded-lg border-gray-300 text-lg px-3 font-ltest py-1">
                                {props.selectedSchedule.endTime}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full mt-16 gap-5 border-b border-gray-300 pb-12">
                        <div class="font-sbtest text-2xl">요일</div>
                        <div class="flex justify-around">
                            {day.map((item) => {
                                if (props.selectedSchedule.week == item) {
                                    return (
                                        <div
                                            class="w-16 h-16 rounded-full bg-indigo-400 text-white text-2xl flex justify-center items-center"
                                        >
                                            <div>
                                                {item}
                                            </div>
                                        </div>)
                                }
                                else {
                                    return (
                                        <div
                                            class="w-16 h-16 rounded-full bg-gray-400 text-white text-2xl flex justify-center items-center"
                                        >
                                            <div>
                                                {item}
                                            </div>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                    <button
                        class="mt-12 mx-1 bg-black text-white text-2xl px-4 w-1/3 py-2 rounded-lg font-ltest self-end"
                        onClick={() => {
                            props.deleteSchedule(props.selectedSchedule.id);
                            props.setShowScheduleDetailModal(false);
                        }}
                    >
                        삭제하기
                    </button>
                </div>

            </div>
        </div>
    );
}

export function TeamScheduleModal(props) {
    let order = 0;
    const day = ["월", "화", "수", "목", "금", "토", "일"];
    const [selectedDay, setSelectedDay] = useState("");
    const [dayMes, setDayMes] = useState("");
    const [startTime, setStartTime] = useState("");
    const [startTimeMes, setStartTimeMes] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endTimeMes, setEndTimeMes] = useState("");
    const [scheduleList, setScheduleList] = useState([]);
    const [scheduleStyleList, setScheduleStyleList] = useState([[], [], [], [], [], [], []]);
    const [selectedSchedule, setSelectedSchedule] = useState({ startTime: "", endTime: "", week: "" });
    useEffect(() => {
        if (startTime.length === 4) {
            setStartTime(
                startTime
                    .replace(/(\d{2})(\d{2})/, "$1:$2")
            );
        }
    }, [startTime]);
    useEffect(() => {
        if (endTime.length === 4) {
            setEndTime(
                endTime
                    .replace(/(\d{2})(\d{2})/, "$1:$2")
            );
        }
    }, [endTime]);
    function checkSchedule() {
        let err = false;
        const regex = /^([0-9]{2})+:+?([0-9]{2})$/;
        console.log("ㅎㅇ");
        if (selectedDay == "") {
            setDayMes("요일을 선택해주세요.");
            err = true;
        }
        else {
            setDayMes("");
        }
        if (!regex.test(startTime)) {
            setStartTimeMes("올바르지 않은 형식입니다.");
            console.log("ㅅㅂ");
            err = true;
        }
        else if (startTime.slice(0, 2) * 1 < 0 || startTime.slice(0, 2) * 1 >= 24 || startTime.slice(3) * 1 < 0 || startTime.slice(3) * 1 >= 60) {
            setStartTimeMes("올바른 시간을 입력해주세요.");
            err = true;
        }
        else {
            setStartTimeMes("");
        }
        if (!regex.test(endTime)) {
            setEndTimeMes("올바르지 않은 형식입니다.");
            err = true;
        }
        else if (endTime.slice(0, 2) * 1 < 0 || endTime.slice(0, 2) * 1 >= 24 || endTime.slice(3) * 1 < 0 || endTime.slice(3) * 1 >= 60) {
            setEndTimeMes("올바른 시간을 입력해주세요.");
            err = true;
        }
        else {
            setEndTimeMes("");
        }
        if ((endTime.slice(0, 2) + endTime.slice(3)) * 1 <= (startTime.slice(0, 2) + startTime.slice(3)) * 1) {
            setStartTimeMes("시작 시간과 종료 시간을 확인해주세요.")
            setEndTimeMes("시작 시간과 종료 시간을 확인해주세요.");
            err = true;
        }
        return err;
    };
    function addSchedule() {
        if (checkSchedule()) return;
        let tmpScheduleList = scheduleList;
        tmpScheduleList.push(
            {
                startTime: startTime,
                endTime: endTime,
                week: selectedDay,
                id: ++order,
            }
        );
        setScheduleList([...tmpScheduleList]);
        props.setTeamScheduleList([...tmpScheduleList]);
        fillScheduleStyleList(scheduleStyleList, setScheduleStyleList, scheduleList);
    }
    function deleteSchedule(id) {
        let tmpScheduleList = scheduleList;
        for (let i = 0; i < tmpScheduleList.length; i++) {
            if (tmpScheduleList.id == id) {
                tmpScheduleList.splice(i, 1);
                console.log("지워짐!");
                break;
            }
        }
        setScheduleList([...tmpScheduleList]);
        console.log(tmpScheduleList);
        fillScheduleStyleList(scheduleStyleList, setScheduleStyleList, tmpScheduleList);
        setSelectedSchedule({ startTime: "", endTime: "", week: "" });
    }
    return (
        <div class="fixed bg-black top-0 w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[60%] min-w-[65rem] min-h-[50rem] h-[90%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5">
                <div class="flex justify-between border-b border-gray-300 pb-3">
                    <div class="ml-2 text-3xl font-sbtest">
                        팀 시간표 생성
                    </div>
                    <button class="text-2xl"
                        onClick={() => {
                            props.setShowTeamScheduleModal(false);
                        }}
                    >x
                    </button>
                </div>
                <div class="ml-2 flex grow mt-5 gap-3">
                    <div class="flex flex-col gap-2 basis-[65%]">
                        <div class="text-2xl font-sbtest">현재 시간표</div>
                        <div class="h-[90%] flex flex-col justify-start text-center border border-gray-300">
                            <div class="w-full h-fit grid grid-cols-8 font-ltest text-gray-600 border-b gap-1">
                                <div class="border-r pt-2 pb-2">시간</div>
                                {day.map((item) => {
                                    if (item == "일") {
                                        return (
                                            <div class="pt-2">{item}</div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div class="pt-2 border-r">{item}</div>
                                        )
                                    }
                                })}
                            </div>
                            <div class="relative h-[100%]">
                                <div class="h-full w-full grow grid grid-cols-8 gap-1 text-sm">
                                    <TimeList />
                                    {day.map((week, index) => {
                                        return (
                                            <div class="h-full relative">
                                                <div>
                                                    {scheduleStyleList[index].map((item) => {
                                                        return (
                                                            <button
                                                                style={item.style}
                                                                onClick={() => {
                                                                    setSelectedSchedule({ startTime: item.startTime, endTime: item.endTime, week: week });
                                                                    //setShowScheduleDetailModal(true);
                                                                }}
                                                            >
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                    {
                        selectedSchedule.week == "" ?
                            (<div class="border-l flex flex-col justify-between basis-[35%] pl-5 mt-10 mb-6">
                                <div class="">
                                    <div class="text-3xl font-sbtest mb-8">일정 추가</div>
                                    <div class="mx-2 flex flex-col gap-5">
                                        <div class="flex flex-col gap-3">
                                            <div class="text-2xl font-sbtest">시작 시간</div>
                                            <input
                                                class="border rounded-lg border-gray-300 text-xl pl-3 font-ltest py-2"
                                                placeholder="hh:mm"
                                                value={startTime}
                                                onChange={(e) => { setStartTime(e.target.value) }}
                                            />
                                            {startTimeMes == "" ?
                                                (<div class="text-red-500 font-ltest h-8"></div>) :
                                                (<div class="text-red-500 font-ltest">{startTimeMes}</div>)
                                            }
                                        </div>
                                        <div class="flex flex-col mt-2 gap-3">
                                            <div class="text-2xl font-sbtest">종료 시간</div>
                                            <input
                                                class="border rounded-lg border-gray-300 text-xl pl-3 font-ltest py-2"
                                                placeholder="hh:mm"
                                                value={endTime}
                                                onChange={(e) => { setEndTime(e.target.value) }}
                                            />
                                            {endTimeMes == "" ?
                                                (<div class="text-red-500 font-ltest h-8"></div>) :
                                                (<div class="text-red-500 font-ltest">{endTimeMes}</div>)
                                            }
                                        </div>
                                        <div class="flex flex-col mt-3 gap-6">
                                            <div class="text-2xl font-sbtest">요일</div>
                                            <div class="grid grid-cols-4 gap-3">
                                                {day.map((item) => {
                                                    if (selectedDay == item) {
                                                        return (
                                                            <button
                                                                class="w-16 h-16 rounded-full bg-indigo-400 text-white text-2xl focus:outline-0"
                                                                onClick={() => { setSelectedDay(item) }}
                                                            >
                                                                {item}
                                                            </button>)
                                                    }
                                                    else {
                                                        return (
                                                            <button
                                                                class="w-16 h-16 rounded-full bg-gray-400 text-white text-2xl focus:outline-0"
                                                                onClick={() => { setSelectedDay(item) }}
                                                            >
                                                                {item}
                                                            </button>
                                                        )
                                                    }
                                                })}
                                            </div>
                                            {dayMes == "" ?
                                                (<div class="text-red-500 font-ltest h-8"></div>) :
                                                (<div class="text-red-500 font-ltest">{dayMes}</div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button
                                    class="relative bottom-0 w-full bg-black text-white text-2xl px-4 py-3 rounded-lg font-test "
                                    onClick={() => { addSchedule() }}
                                >
                                    추가하기
                                </button>
                            </div>)
                            :
                            (
                                <div class="border-l flex flex-col justify-between basis-[35%] pl-5 mt-10 mb-6">
                                    <div class="">
                                        <div class="text-3xl font-sbtest mb-8">일정 정보</div>
                                        <div class="mx-2 flex flex-col gap-5">
                                            <div class="flex flex-col gap-3">
                                                <div class="text-2xl font-sbtest">시작 시간</div>
                                                <input
                                                    class="border rounded-lg border-gray-300 text-xl pl-3 font-ltest py-2"
                                                    placeholder="hh:mm"
                                                    value={selectedSchedule.startTime}
                                                    onChange={(e) => { setStartTime(e.target.value) }}
                                                />
                                                {startTimeMes == "" ?
                                                    (<div class="text-red-500 font-ltest h-8"></div>) :
                                                    (<div class="text-red-500 font-ltest">{startTimeMes}</div>)
                                                }
                                            </div>
                                            <div class="flex flex-col mt-2 gap-3">
                                                <div class="text-2xl font-sbtest">종료 시간</div>
                                                <input
                                                    class="border rounded-lg border-gray-300 text-xl pl-3 font-ltest py-2"
                                                    placeholder="hh:mm"
                                                    value={selectedSchedule.endTime}
                                                    onChange={(e) => { setEndTime(e.target.value) }}
                                                />
                                                {endTimeMes == "" ?
                                                    (<div class="text-red-500 font-ltest h-8"></div>) :
                                                    (<div class="text-red-500 font-ltest">{endTimeMes}</div>)
                                                }
                                            </div>
                                            <div class="flex flex-col mt-3 gap-6">
                                                <div class="text-2xl font-sbtest">요일</div>
                                                <div class="grid grid-cols-4 gap-3">
                                                    {day.map((item) => {
                                                        if (selectedDay == item) {
                                                            return (
                                                                <button
                                                                    class="w-16 h-16 rounded-full bg-indigo-400 text-white text-2xl focus:outline-0"
                                                                    onClick={() => { setSelectedDay(item) }}
                                                                >
                                                                    {item}
                                                                </button>)
                                                        }
                                                        else {
                                                            return (
                                                                <button
                                                                    class="w-16 h-16 rounded-full bg-gray-400 text-white text-2xl focus:outline-0"
                                                                    onClick={() => { setSelectedDay(item) }}
                                                                >
                                                                    {item}
                                                                </button>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                                {dayMes == "" ?
                                                    (<div class="text-red-500 font-ltest h-8"></div>) :
                                                    (<div class="text-red-500 font-ltest">{dayMes}</div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        class="relative bottom-0 w-full bg-black text-white text-2xl px-4 py-3 rounded-lg font-test "
                                        onClick={() => {
                                            //addSchedule() 
                                            deleteSchedule(selectedSchedule.id)
                                        }}
                                    >
                                        삭제하기
                                    </button>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export function ScheduleModal(props) { // props -> postSchedule, setShowScheduleModal, 기타등등... 수정끝나면 쓰기
    const [startTime, setStartTime] = useState("");
    const [startTimeMes, setStartTimeMes] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endTimeMes, setEndTimeMes] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [dayMes, setDayMes] = useState("");
    const day = ["월", "화", "수", "목", "금", "토", "일"];
    useEffect(() => {
        if (startTime.length === 4) {
            let st = startTime.replace(/(\d{2})(\d{2})/, "$1:$2");
            setStartTime(
                st
            );
            props.setStartTime(
                st
            );
        }
    }, [startTime]);
    useEffect(() => {
        if (endTime.length === 4) {
            let et = endTime.replace(/(\d{2})(\d{2})/, "$1:$2");
            setEndTime(
                et
            );
            props.setEndTime(
                et
            );
        }
    }, [endTime]);
    function checkSchedule() {
        let err = false;
        const regex = /^([0-9]{2})+:+?([0-9]{2})$/;
        console.log("ㅎㅇ");
        if (selectedDay == "") {
            setDayMes("요일을 선택해주세요.");
            err = true;
        }
        else {
            setDayMes("");
        }
        if (!regex.test(startTime)) {
            setStartTimeMes("올바르지 않은 형식입니다.");
            console.log("ㅅㅂ");
            err = true;
        }
        else if (startTime.slice(0, 2) * 1 < 0 || startTime.slice(0, 2) * 1 >= 24 || startTime.slice(3) * 1 < 0 || startTime.slice(3) * 1 >= 60) {
            setStartTimeMes("올바른 시간을 입력해주세요.");
            err = true;
        }
        else {
            setStartTimeMes("");
        }
        if (!regex.test(endTime)) {
            setEndTimeMes("올바르지 않은 형식입니다.");
            err = true;
        }
        else if (endTime.slice(0, 2) * 1 < 0 || endTime.slice(0, 2) * 1 >= 24 || endTime.slice(3) * 1 < 0 || endTime.slice(3) * 1 >= 60) {
            setEndTimeMes("올바른 시간을 입력해주세요.");
            err = true;
        }
        else {
            setEndTimeMes("");
        }
        if ((endTime.slice(0, 2) + endTime.slice(3)) * 1 <= (startTime.slice(0, 2) + startTime.slice(3)) * 1) {
            setStartTimeMes("시작 시간과 종료 시간을 확인해주세요.")
            setEndTimeMes("시작 시간과 종료 시간을 확인해주세요.");
            err = true;
        }
        return err;
    }

    return (
        <div class="fixed bg-black top-0 w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[38%] min-w-[45rem] min-h-[40rem] h-[65%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5">
                <div class="flex justify-between border-b border-gray-300 pb-3">
                    <div class="ml-2 text-3xl font-sbtest">
                        일정 추가
                    </div>
                    <button class="text-2xl"
                        onClick={() => {
                            props.setShowScheduleModal(false);
                        }}
                    >x
                    </button>
                </div>
                <div class="w-full mt-10 px-10 flex flex-col">
                    <div class="w-full flex gap-16">
                        <div class="flex flex-col gap-2 w-1/3">
                            <div class="font-sbtest text-2xl">시작 시간</div>
                            <input
                                class="border rounded-lg border-gray-300 text-lg px-3 font-ltest py-1"
                                placeholder="시작 시간(hh:mm)"
                                value={startTime}
                                onChange={(e) => { setStartTime(e.target.value); props.setStartTime(e.target.value); }}
                            />
                            {startTimeMes == "" ?
                                (<div class="text-red-500 font-ltest h-8"></div>) :
                                (<div class="text-red-500 font-ltest">{startTimeMes}</div>)
                            }
                        </div>
                        <div class="flex flex-col gap-2 w-1/3">
                            <div class="font-sbtest text-2xl">종료 시간</div>
                            <input
                                class="border rounded-lg border-gray-300 text-lg px-3 font-ltest py-1"
                                placeholder="종료 시간(hh:mm)"
                                value={endTime}
                                onChange={(e) => { setEndTime(e.target.value); props.setEndTime(e.target.value) }}
                            />
                            {endTimeMes == "" ?
                                (<div class="text-red-500 font-ltest h-8"></div>) :
                                (<div class="text-red-500 font-ltest">{endTimeMes}</div>)
                            }
                        </div>
                    </div>
                    <div class="flex flex-col w-full mt-16 gap-5 border-b border-gray-300 pb-12">
                        <div class="font-sbtest text-2xl">요일</div>
                        <div class="flex justify-around">
                            {day.map((item) => {
                                if (selectedDay == item) {
                                    return (
                                        <button
                                            class="w-16 h-16 rounded-full bg-indigo-400 text-white text-2xl"
                                            onClick={() => { setSelectedDay(item); props.setSelectedWeek(item); }}
                                        >
                                            {item}
                                        </button>)
                                }
                                else {
                                    return (
                                        <button
                                            class="w-16 h-16 rounded-full bg-gray-400 text-white text-2xl"
                                            onClick={() => { setSelectedDay(item); props.setSelectedWeek(item); }}
                                        >
                                            {item}
                                        </button>
                                    )
                                }
                            })}

                        </div>
                        {dayMes == "" ?
                            (<div class="text-red-500 font-ltest h-8"></div>) :
                            (<div class="text-red-500 font-ltest">{dayMes}</div>)
                        }
                    </div>
                    <button
                        class="mt-12 mx-1 bg-black text-white text-2xl px-4 w-1/3 py-2 rounded-lg font-ltest self-end"
                        onClick={() => {
                            if (checkSchedule()) { }
                            else {
                                props.postSchedule();
                                props.setShowScheduleModal(false);
                            }
                        }}
                    >
                        추가하기
                    </button>
                </div>
            </div>
        </div>
    )
}

export function TagModal(props) { // props -> setShowTagModal, selectedTagList, setSelectedTagList
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [tagList, setTagList] = useState({ tag: [], page: 0 });
    const [err, setErr] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [selected, setSelected] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    function getTagList(page, keypoint) {
        axios.get(SERVER_URL + "/tag-service/api/v1/tags?",
            {
                params: {
                    page: page,
                    keypoint: keypoint
                }
            })
            .then((res) => {
                let tmptaglist = { tag: [], page: page };
                // console.log("태그리스트 받아왔어요~");
                // console.log(res);
                res.data.data.tags.map((item) => {
                    tmptaglist.tag.push(item);
                })
                setTagList(tmptaglist);
                console.log("최대 페이지 수는 " + res.data.data.pageTotalCount);
                setTotalPage(res.data.data.pageTotalCount);
                setLoadingComplete(true);
            })
            .catch((err) => {
                console.log("태그리스트를 받아오려는데~ 에러가 났네요~");
                setErr("태그리스트를 받아오는 과정에서 오류가 발생했습니다. 오류가 계속되면 관리자에게 문의해주세요.");
                console.log(err.response);
            })
    }
    function checkTagList(id, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return true;
            }
        }
        return false;
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
                        class="pr-2 text-indigo-500"
                        onClick={() => {
                            getTagList(i, searchKeyword);
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
                        class="pr-2 text-gray-500"
                        onClick={() => {
                            getTagList(i, searchKeyword);
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
    useEffect(() => {
        getTagList(1);
    }, [])

    return (
        <div class="fixed top-0 bg-black w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[30%] min-w-[30rem] h-[80%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5">
                <div class="flex justify-between border-b border-gray-300 pb-3">
                    <div class="ml-2 text-3xl font-sbtest">
                        태그 추가
                    </div>
                    <button
                        class="mr-2 text-black text-2xl"
                        onClick={() => { props.setShowTagModal(false) }}
                    >X
                    </button>
                </div>
                <div class="px-2">
                    <div class="mt-5 flex items-center border border-indigo-200 w-full">
                        <input
                            class="grow py-3 pl-5 focus:outline-0"
                            placeholder="태그 검색"
                            onChange={(e) => { setSearchKeyword(e.target.value) }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    getTagList(1, searchKeyword);
                                }
                            }}
                        />
                        <button
                            class="bg-indigo-300 text-white h-full py-3 px-5"
                            onClick={() => {
                                getTagList(1, searchKeyword);
                            }}
                        >
                            검색
                        </button>
                    </div>
                </div>
                <div class="relative px-2 mt-5 grow">
                    {loadingComplete ? (
                        <div class="flex flex-col justify-between h-full">
                            <div class="flex flex-col justify-around grow mb-10">
                                {tagList.tag.map((item) => {
                                    let tmpSelctedTagList = props.selectedTagList;
                                    if (checkTagList(item.id, tmpSelctedTagList)) {
                                        return (
                                            <div
                                                key={item.id}
                                                class="border border-indigo-300 rounded-lg py-3 px-5 bg-indigo-50 text-indigo-500"
                                            >
                                                <button
                                                    class="flex w-full justify-between"
                                                    onClick={() => {
                                                        tmpSelctedTagList = tmpSelctedTagList.filter((element) => element.id != item.id)
                                                        props.setSelectedTagList(tmpSelctedTagList);
                                                        props.setShowTagModal(false);
                                                    }}
                                                >
                                                    <div>{item.name}</div>
                                                    <div>x</div>
                                                </button>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div
                                            key={item.id}
                                            class="border rounded-lg py-3 px-5"
                                        >
                                            <button
                                                class="flex w-full justify-between"
                                                onClick={() => {
                                                    tmpSelctedTagList.push({ name: item.name, id: item.id });
                                                    props.setSelectedTagList(tmpSelctedTagList);
                                                    props.setShowTagModal(false);
                                                }}
                                            >
                                                <div>{item.name}</div>
                                                <div>+</div>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div class="self-center flex gap-2 justify-center w-fit px-2">
                                <button
                                    class="text-gray-500"
                                    onClick={() => {
                                        if (startPage - 10 >= 1) {
                                            setStartPage(startPage - 10);
                                            getTagList(startPage - 10, searchKeyword);
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
                                            getTagList(startPage + 10, searchKeyword);
                                            setSelected(startPage + 10);
                                        }
                                    }}
                                >{">"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div class="text-lg">
                            {
                                err == "" ?
                                    (<div>로딩중...</div>)
                                    :
                                    (<div class="text-red-500 font-ltest">{err}</div>)
                            }
                        </div>
                    )}
                </div>
            </div>
        </div >
    )

}

