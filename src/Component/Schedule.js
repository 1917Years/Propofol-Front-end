import { React } from "react";

const day = ["월", "화", "수", "목", "금", "토", "일"];

export function fillScheduleStyleList(
  scheduleStyleList,
  setScheduleStyleList,
  scheduleList
) {
  console.log("하이!");
  console.log(scheduleList);
  let tmpScheduleStyleList_t = [[], [], [], [], [], [], []];
  scheduleList.map((item) => {
    day.map((d, index) => {
      if (item.week == d) {
        let startLine =
          ((item.startTime.slice(0, 2) * 60 + item.startTime.slice(3, 5) * 1) /
            1440) *
          100;
        let endLine =
          ((item.endTime.slice(0, 2) * 60 + item.endTime.slice(3, 5) * 1) /
            1440) *
          100;
        let scheduleHeight = endLine - startLine;
        let color,
          rancolor = Math.floor(Math.random() * 3);
        if (rancolor == 0) {
          color = "#C9C7FF";
        } else if (rancolor == 1) {
          color = "#B5B2FF";
        } else {
          color = "#E1E0FF";
        }
        tmpScheduleStyleList_t[index].push({
          style: {
            position: "absolute",
            width: "100%",
            top: startLine + "%",
            height: scheduleHeight + "%",
            background: color,
            left: "0%",
          },
          id: item.id,
          startTime: item.startTime,
          endTime: item.endTime,
        });
      }
    });
  });
  setScheduleStyleList([...tmpScheduleStyleList_t]);
}

export function TimeList() {
  let timetop = 0 - (1 / 12) * 100;
  const time = [
    "00",
    "02",
    "04",
    "06",
    "08",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
  ];
  return (
    <div class="h-[100%] relative flex flex-col items-center justify-between text-gray-600 text-sm font-ltest border-r">
      {time.map((item) => {
        if (item == "00") {
          return <div class="w-full">{item}</div>;
        } else {
          return <div class="border-t w-full">{item}</div>;
        }
      })}
    </div>
  );
}
