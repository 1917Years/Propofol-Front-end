import React from "react";

function ProjectMain() {
  return (
    <div class="container mx-auto px-4 bg-white bg-cover min-h-screen pt-12 md:pt-10 pb-6 px-4 md:px-0">
      <div class="flex flex-wrap items-center mx-10">
        <div class="grid w-full grid-cols-4 gap-4 mx-10">
          <div class="col-span-3">
            <input class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 transition duration-500 px-3 pb-3" />
          </div>
          <div class="grid grid-cols-3 w-full mx-19 gap-3 h-5">
            <button class="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 rounded ">
              #JAVA
            </button>
            <button class="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 rounded">
              #Python
            </button>
            <button class="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 rounded">
              #C++
            </button>
          </div>
        </div>

        <div>
          <h>프로젝트 추천</h>
        </div>
        <div>
          <h>시간표</h>
        </div>
      </div>
    </div>
  );
}

export default ProjectMain;
