import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { ScheduleModal, ScheduleDetailModal, TagModal } from "../../Component/Modal";
import { SERVER_URL } from "../../utils/SRC";
import { fillScheduleStyleList, TimeList } from "../../Component/Schedule";

function ProjectMySchedule() {
    const day = ["월", "화", "수", "목", "금", "토", "일"];
    let timeTable = []; // day:요일 , time : [0~24 리스트]
    let scheduleList = [];
    //
    const [scheduleStyleList, setScheduleStyleList] = useState([[], [], [], [], [], [], []]);
    const [selectedSchedule, setSelectedSchedule] = useState({ startTime: "", endTime: "", week: "", id: 0 });
    const [selectedWeek, setSelectedWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    //
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showScheduleDetailModal, setShowScheduleDetailModal] = useState(false);
    //

    function makeTimeTalbe() {
        day.map((item) => {
            let tmpTimeT = { day: item, time: [] };
            for (let i = 0; i <= 24; i = i + 2) {
                tmpTimeT.time.push(i);
            }
            timeTable.push(tmpTimeT);
        })
    }
    async function loadSchedule() {
        await axios.get(SERVER_URL + "/user-service/api/v1/timetables")
            .then((res) => {
                console.log(res);
                let tmpScheduleList = [];
                res.data.data.timeTables.map((item) => {
                    tmpScheduleList.push(item);
                })
                scheduleList = tmpScheduleList;
                console.log("스케쥴입니다~");
                console.log(tmpScheduleList);
                fillScheduleStyleList(scheduleStyleList, setScheduleStyleList, scheduleList);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    async function postSchedule() {
        //if (checkSchedule()) return;
        let data = {
            week: selectedWeek,
            startTime: startTime,
            endTime: endTime
        }
        console.log(data);
        await axios.post(SERVER_URL + "/user-service/api/v1/timetables", data)
            .then((res) => {
                console.log(res);
                loadSchedule();
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    async function deleteSchedule(id) {
        await axios.delete(SERVER_URL + "/user-service/api/v1/timetables/" + id)
            .then((res) => {
                console.log(res);
                //setScheduleStyleList([[], [], [], [], [], [], []]);
                loadSchedule();
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    //
    useEffect(() => {
        loadSchedule();
        makeTimeTalbe();
    }, []);

    return (
        <div class="bg-white w-full font-test">
            {showScheduleModal ?
                (<ScheduleModal
                    setShowScheduleModal={setShowScheduleModal}
                    isMain={true}
                    loadSchedule={loadSchedule}
                    postSchedule={postSchedule}
                    setSelectedWeek={setSelectedWeek}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                />)
                :
                (null)
            }
            {showScheduleDetailModal ? (
                <ScheduleDetailModal
                    selectedSchedule={selectedSchedule}
                    setShowScheduleDetailModal={setShowScheduleDetailModal}
                    deleteSchedule={deleteSchedule}
                />
            ) : (null)
            }
            <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
                <div class="w-3/4 mx-auto h-[50rem] flex flex-col gap-8 justify-between text-center">
                    <div class="flex justify-between">
                        <div class="mt-10 text-4xl font-btest">나의 시간표⏱</div>
                        <button
                            class="self-end text-lg font-ltest bg-gray-100"
                            onClick={() => {
                                setShowScheduleModal(true);
                            }}
                        >
                            {">"}일정 추가하기
                        </button>
                    </div>
                    <div class="flex flex-col relative border border-gray-300 grow">
                        <div class="w-full h-fit grid grid-cols-8 font-ltest gap-1 text-gray-600 border-b ">
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
                        <div class="relative w-full h-[100%] grid grid-cols-8 gap-1">
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
                                                            setSelectedSchedule({ startTime: item.startTime, endTime: item.endTime, week: week, id: item.id });
                                                            setShowScheduleDetailModal(true);
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
        </div>
    )
}

export default ProjectMySchedule;