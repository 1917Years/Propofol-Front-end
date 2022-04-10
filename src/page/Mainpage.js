import React from "react";

function Mainpage() {
  return (
    <div className="header" class="">
      <div className="header">
        <div className="relative">
          <div class="whitespace-normal text-shadow-md font-semibold font-test text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
            <div>
              <a class="text-7xl">G</a>ithub
            </div>{" "}
            <div>
              <a class="text-7xl">D</a>ashboard
            </div>{" "}
            <div>
              <a class="text-7xl">P</a>roject
            </div>
          </div>
          <img
            src="https://media.discordapp.net/attachments/874660081160044625/890234115201306644/2021_09_22_22_50_1_1.gif"
            class="relative w-screen h-screen z-0"
          />
        </div>

        <div
          className="mention"
          class="my-20 font-test w-max relative top-1/2 left-1/2 transform -translate-x-1/2"
        >
          <div class="font-semibold text-3xl">더욱 편리하게.</div>
          <div class="mt-3 mb-7 text-gray-500">
            GDP 내의 컴파일 기능을 통해 코드의 에러를 바로 확인하세요.
          </div>
          <img src="https://media.discordapp.net/attachments/874660081160044625/889471029276213268/work-731198_960_720.png?width=1000&height=400" />
          <div class="font-semibold mt-20 text-3xl">모든 것을 한눈에.</div>
          <div class="mt-3 mb-7 text-gray-500">
            대시보드를 통해 프로젝트의 전반적인 프로세스를 한눈에 확인하세요.
            일정, 할일, 진행률 등 다양한 기능과 함께하세요!
          </div>
          <img src="https://media.discordapp.net/attachments/874660081160044625/889470805396832286/maximilien-t-scharner-GExOn1lUED0-unsplash.jpg?width=1000&height=400" />
          <div class="font-semibold mt-20 text-3xl">의사소통을 빠르게.</div>
          <div class="mt-3 mb-7 text-gray-500">
            메시지와 화상 통화를 통해 이동 없이 빠르게 연락을 주고 받으세요.
          </div>
          <img src="https://media.discordapp.net/attachments/874658668434583658/889033174322126858/mike-erskine-S_VbdMTsdiA-unsplash.jpg?width=1000&height=400" />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
