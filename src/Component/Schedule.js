import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

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
                    style: { position: "absolute", width: "100%", top: startLine + "%", height: scheduleHeight + "%", background: "teal", left: "0%", },
                    id: item.id,
                    startTime: item.startTime,
                    endTime: item.endTime,
                });
                setScheduleStyleList([...tmpScheduleStyleList_t]);
            }
        })

    })
}

export function TimeList() {
    let timetop = 0 - (1 / 12 * 100);
    const time = ["00시", "02시", "04시", "06시", "08시", "10시", "12시", "14시", "16시", "18시", "20시", "22시", "24시"];
    const timeStyle = (top) => {
        return (
            {
                position: "absolute",
                top: top,
                textAlign: "center",
                left: "50%",
                transform: "translateX(-50%)",

            }
        )
    }
    return (
        <div class="h-full relative">
            {
                time.map((item) => {
                    timetop = timetop + (1 / 12 * 100);
                    return (
                        <div
                            style={timeStyle(timetop + "%")}
                        >
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}

