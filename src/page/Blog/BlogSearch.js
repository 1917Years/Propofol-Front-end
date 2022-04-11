import React from "react";

function BlogSearch() {
  let tmpDetail =
    "글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~글내용123123218979ㅁㄴㅇsadaslkdjasdljsakldjjqwe~~~~~~";

  return (
    <div class="bg-white w-full h-screen font-test">
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2 ">
        <div class="relative mt-10 border-b border-slate-300 pb-10">
          <div class="h-12">
            <div class="flex gap-2 content-center bg-gray-50 rounded-lg border border-slate-300 px-2 py-2 ">
              <div class="self-center">🔍</div>
              <button class="text-gray-400 text-lg">제목{">"}</button>
              <input class="bg-gray-50 w-9/10 focus:outline-0" type="text" />
            </div>
          </div>
          <div class="flex content-center gap-4 font-ltest mt-3 h-10 ml-3">
            <div class="mr-1 self-center">#태그</div>
            <button class="border text-md rounded-lg w-[6rem]">JAVA</button>
            <button class="border text-md rounded-lg w-[6rem]">Spring</button>
            <button class="border text-md rounded-lg w-[6rem]">C++</button>
            <button class="border text-md rounded-lg w-[6rem]">
              JavaScript
            </button>
            <button class="border text-md rounded-lg w-[6rem]">C#</button>
            <button class="border text-md rounded-lg w-[6rem]">C</button>
            <button class="border text-md rounded-lg w-[6rem]">Python</button>
            <button class="border text-md rounded-lg w-[6rem]">선택▾</button>
          </div>
        </div>
        <div class="mt-10 border rounded-lg">
          <div
            className="Writing"
            class="flex border-b bg-white h-44 px-10 py-5 gap-5"
          >
            <div class="w-[47rem]">
              <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                <h>사용자명</h>
                <h>2022.04.11</h>
              </div>
              <button class="py-1 text-blue-400 text-lg">
                제목제목제목제목제목
              </button>
              <div class="font-ltest">{tmpDetail}</div>
            </div>
            <div class="w-grow">
              <div class="bg-gray-300 w-32 h-28 mb-2">사진</div>
              <div class="w-32 grid grid-cols-2 text-sm ">
                <div>🧡 10</div>
                <div>💬 5</div>
              </div>
            </div>
          </div>
          <div
            className="Writing"
            class="border-b bg-white h-48 px-10 py-5 gap-5"
          >
            <div class="w-full h-28">
              <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                <h>사용자명</h>
                <h>2022.04.11</h>
              </div>
              <button class="py-1 text-blue-400 text-lg">
                제목제목제목제목제목
              </button>
              <div class="font-ltest">{tmpDetail}</div>
            </div>
            <div class="flex">
              <div class="w-[47rem]"></div>
              <div class="w-32 grid grid-cols-2 text-sm">
                <div>🧡 10</div>
                <div>💬 5</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-5 gap-2 font-ltest">
          <button>{"<"}</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default BlogSearch;
