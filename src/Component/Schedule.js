import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

let timetop = 0 - (1 / 12 * 100);
let tmpSchedule = [
    { startTime: "13:48:00", endTime: "14:00:00", day: "월", id: 1 },
    { startTime: "18:00:00", endTime: "21:35:00", day: "월", id: 2 },
    { startTime: "10:00:00", endTime: "18:35:00", day: "수", id: 3 },
    { startTime: "08:00:00", endTime: "11:05:00", day: "토", id: 4 }
];

const day = ["월", "화", "수", "목", "금", "토", "일"];

export function fillScheduleStyleList(scheduleStyleList, setScheduleStyleList, scheduleList) {
    console.log("하이!");
    console.log(scheduleList);
    let tmpScheduleStyleList_t = [[], [], [], [], [], [], []]
    scheduleList.map((item) => {
        day.map((d, index) => {
            if (item.week == d) {
                let startLine = ((item.startTime.slice(0, 2) * 60 + item.startTime.slice(3, 5) * 1) / 1440) * 100;
                let endLine = ((item.endTime.slice(0, 2) * 60 + item.endTime.slice(3, 5) * 1) / 1440) * 100;
                let scheduleHeight = endLine - startLine;
                tmpScheduleStyleList_t[index].push({
                    style: { position: "absolute", width: "100%", top: startLine + "%", height: scheduleHeight + "%", background: "teal", left: "0%" },
                    id: item.id,
                    startTime: item.startTime,
                    endTime: item.endTime,
                });
                setScheduleStyleList([...tmpScheduleStyleList_t]);
            }
        })

    })
}

