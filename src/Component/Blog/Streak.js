import { React, useState, useEffect } from "react";

export function Streak(props) { // props -> workingSum, streak
    return (
        <div class="w-full h-full border rounded-md pb-6 pt-3">
            <div class="px-8 pb-3 text-base font-ltest text-gray-500">This year, I learned {props.workingSum} times</div>
            {(props.streak != []) ?
                (
                    <div>
                        <div class="flex px-8 gap-3 items-start">
                            <div class="h-full grid grid-rows-7 grid-flow-col gap-[0px]">
                                {props.streak.slice(0, 7).map((item) => {
                                    if (item.day == "Mon") {
                                        return (
                                            <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                                        );
                                    }
                                    else if (item.day == "Wed") {
                                        return (
                                            <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                                        );
                                    }
                                    else if (item.day == "Fri") {
                                        return (
                                            <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                                        );
                                    }
                                    else if (item.day == "Sun") {
                                        return (
                                            <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                                        );
                                    }
                                    else {
                                        return (
                                            <div class="font-ltest text-gray-500 text-[11px] h-[11px] ">{item.day}</div>
                                        );
                                    }
                                })
                                }
                            </div>
                            <div class="grow grid grid-rows-7 grid-flow-col gap-[0.1px]">
                                {props.streak.map((item) => {
                                    if (item.working == 0) {
                                        return (
                                            <div class="">
                                                <div class="group bg-gray-200 w-[12px] h-[12px] rounded-sm border border-gray-300">
                                                    <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                                                before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                                                before:border-t-[12px] before:border-t-white
                                                                before:border-r-[12px] before:border-r-transparent
                                                                before:border-l-[0px] before:border-l-transparent
                                                                before:border-b-[0px] before:border-b-transparent
                                                                before:absolute before:z-20">
                                                        {item.date}일에, {item.working}번 공부를 했어요.
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (item.working == 1) {
                                        return (
                                            <div class="group bg-indigo-200 w-[12px] h-[12px] rounded-sm border border-gray-300">
                                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                                            before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                                            before:border-t-[12px] before:border-t-white
                                                            before:border-r-[12px] before:border-r-transparent
                                                            before:border-l-[0px] before:border-l-transparent
                                                            before:border-b-[0px] before:border-b-transparent
                                                            before:absolute before:z-20
                                                            ">
                                                    {item.date}일에, {item.working}번 공부를 했어요.
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (item.working == 2) {
                                        return (
                                            <div class="group bg-indigo-300 w-[12px] h-[12px] rounded-sm border border-gray-300">
                                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                                            before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                                            before:border-t-[12px] before:border-t-white
                                                            before:border-r-[12px] before:border-r-transparent
                                                            before:border-l-[0px] before:border-l-transparent
                                                            before:border-b-[0px] before:border-b-transparent
                                                            before:absolute before:z-20
                                                            ">
                                                    {item.date}일에, {item.working}번 공부를 했어요.
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (item.working == 3) {
                                        return (
                                            <div class="group bg-[#8289D9] w-[12px] h-[12px] rounded-sm border border-gray-300">
                                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-300 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                                            
                                                            before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                                            before:border-t-[12px] before:border-t-white
                                                            before:border-r-[12px] before:border-r-transparent
                                                            before:border-l-[0px] before:border-l-transparent
                                                            before:border-b-[0px] before:border-b-transparent
                                                            before:absolute before:z-20
                                                            ">
                                                    {item.date}일에, {item.working}번 공부를 했어요.
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (item.working == 4) {
                                        return (
                                            <div class="group bg-[#6369A6] w-[12px] h-[12px] rounded-sm border border-gray-300">
                                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                                            before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                                            before:border-t-[12px] before:border-t-white
                                                            before:border-r-[12px] before:border-r-transparent
                                                            before:border-l-[0px] before:border-l-transparent
                                                            before:border-b-[0px] before:border-b-transparent
                                                            before:absolute before:z-20
                                                            ">
                                                    {item.date}일에, {item.working}번 공부를 했어요.
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if (item.working >= 5) {
                                        return (
                                            <div class={"group bg-[#54598C] w-[12px] h-[12px] rounded-sm border border-gray-300"}>
                                                <div class="group-hover:block absolute hidden rounded-xl p-1 w-fit bg-white text-gray-500 border border-gray-200 font-ltest text-sm -translate-y-10 -translate-x-1 z-40
                                                            before:translate-y-[22px] before:-translate-x-[0rem] after:border
                                                            before:border-t-[12px] before:border-t-white
                                                            before:border-r-[12px] before:border-r-transparent
                                                            before:border-l-[0px] before:border-l-transparent
                                                            before:border-b-[0px] before:border-b-transparent
                                                            before:absolute before:z-20
                                                            ">
                                                    {item.date}일에, {item.working}번 공부를 했어요.
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                }
                            </div>
                        </div>
                    </div>
                )
                :
                (null)
            }
        </div>
    );
}