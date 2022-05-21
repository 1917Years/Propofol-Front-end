import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../utils/SRC";

export function ScheduleModal(props) { // props -> setShowScheduleModal
    const [startTime, setStartTime] = useState("");
    const [startTimeMes, setStartTimeMes] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endTimeMes, setEndTimeMes] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [dayMes, setDayMes] = useState("");
    const day = ["월", "화", "수", "목", "금", "토", "일"];
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
    }
    function postSchedule() {
        if (checkSchedule()) return;
        let data = {
            week: selectedDay,
            //startTime: new Date(2022, 5, 20, startTime.slice(0, 2) * 1, startTime.slice(3) * 1, 0),
            //endTime: new Date(2022, 5, 20, endTime.slice(0, 2) * 1, endTime.slice(3) * 1, 0),
            startTime: startTime,
            endTime: endTime
            //startHour: startTime.slice(0, 2) * 1,
            //startMinute: startTime.slice(3) * 1,
            //endHour: endTime.slice(0, 2) * 1,
            //endMinute: endTime.slice(3) * 1,
        }
        console.log(data);
        axios.post(SERVER_URL + "/user-service/api/v1/timetables", data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    return (
        <div class="fixed bg-black top-0 w-full h-full bg-opacity-[30%] z-[100] flex justify-center items-center">
            <div class="bg-white w-[38%] min-w-[45rem] min-h-[40rem] h-[65%] flex flex-col font-test border rounded-xl shadow-lg px-8 py-5">
                <div class="flex justify-between border-b border-gray-300 pb-3">
                    <div class="ml-2 text-3xl font-sbtest">
                        일정 추가
                    </div>
                    <button class=""
                        onClick={() => { props.setShowScheduleModal(false) }}
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
                                onChange={(e) => { setStartTime(e.target.value) }}
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
                                onChange={(e) => { setEndTime(e.target.value) }}
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
                                            onClick={() => { setSelectedDay(item) }}
                                        >
                                            {item}
                                        </button>)
                                }
                                else {
                                    return (
                                        <button
                                            class="w-16 h-16 rounded-full bg-gray-400 text-white text-2xl"
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
                    <button
                        class="mt-12 mx-1 bg-black text-white text-2xl px-4 w-1/3 py-2 rounded-lg font-ltest self-end"
                        onClick={postSchedule}
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
    //let totalPage;
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
                console.log("태그리스트 받아왔어요~");
                console.log(res);

                res.data.data.tags.map((item) => {
                    tmptaglist.tag.push(item);
                })
                setTagList(tmptaglist);
                console.log("최대 페이지 수는 " + res.data.data.pageTotalCount);
                setTotalPage(res.data.data.pageTotalCount);
                //totalPage = res.data.data.pageTotalCount * 1;
                //console.log(totalPage);
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
            /*
            return (
                <div class="border-r pr-2">{i}</div>
            )
            */
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
                        class="mr-2 text-black"
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
                                >{"<"}</button>
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
                                >{">"}</button>
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

