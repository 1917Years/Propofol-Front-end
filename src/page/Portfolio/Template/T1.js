import { React, useState } from "react";
//갬성버전
function T1() {
    const style = {
        backgroundImage:
            "url(https://cdn.discordapp.com/attachments/766266146520563785/968491436746088510/martin-jernberg-veMLshzPEq0-unsplash.jpg)",
    };
    return (
        <div class="w-full">
            <div class="flex flex-col justify-center" style={{ minHeight: "35rem" }}>
                <div
                    class="bg-cover bg-center absolute top-0 w-full h-[58rem] bg-bg6 bg-blend-multiply brightness-[.80] grayscale-[10%] -z-10"
                    style={style}
                >
                </div>
                <div class="mt-50 w-3/4">
                    <div class="mt-20 text-5xl text-white z-20 font-sbtest text-shadow">개발자 이지원</div>
                    <div className="인사말" class="text-2xl font-test text-white z-20">
                        {">"} 안녕하세요.
                    </div>
                    <div className="소개" class="text-2xl font-test text-white z-20">
                        {">"} 저는 개발과 공부를 좋아하고, 호기심이 많은 개발자 이지원입니다.
                    </div>
                </div>

            </div>

            <section class="relative bg-white" id="TIL">
                <div class="absolute w-[75%] h-full left-[12.5%] xl:border-l xl:border-r border-gray-300 z-40"></div>
                <div class="container mx-auto px-4 z-30 py-32 ">
                    <div class="flex flex-wrap items-center">
                        <div class="w-full md:w-1/4 px-4 mr-auto ml-auto">
                            <div class="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300"></div>

                            <h3 class="z-40 font-test text-3xl mb-2 font-semibold leading-normal">
                                TIL 블로그
                            </h3>
                            <p class="font-test text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                                솰랴솰랴
                            </p>
                            <p class="font-test text-lg font-light leading-relaxed mt-0 mb-8 text-gray-700">
                                솰랴솰랴
                            </p>
                        </div>
                        <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
                            <div class="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-lg rounded-lg bg-bg3">
                                <img
                                    alt="..."
                                    src="https://media.discordapp.net/attachments/874660081160044625/889471029276213268/work-731198_960_720.png"
                                    class="w-full align-middle rounded-t-lg"
                                />
                                <blockquote class="relative p-8 mb-4">
                                    <svg
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 583 95"
                                        class="absolute left-0 w-full block"
                                        style={{ height: "95px", top: "-94px" }}
                                    >
                                        <polygon
                                            points="-30,95 583,95 583,65"
                                            class="text-bg3 fill-current"
                                        ></polygon>
                                    </svg>
                                    <h4 class="font-test text-xl font-bold text-white">
                                        이번 프로젝트 어떡하지...🤯
                                    </h4>
                                    <p class="text-md font-ltest font-light mt-2 text-white">
                                        막막했던 팀프로젝트, 이제는 Gitime와 함께하세요. <br></br>
                                        사장님께는 사랑받는 사원으로, 교수님께는 칭찬받는
                                        학생으로! <br></br>
                                        더욱 편리하게 프로젝트를 관리할 수 있어요.
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default T1;