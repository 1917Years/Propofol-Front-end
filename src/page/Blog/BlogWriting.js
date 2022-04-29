import { React, useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogEditor from "../../Component/BlogEditor";

function BlogWriting() {
  const [htmlContent, setHtmlContent] = useState("");
  const quillRef = useRef();
  return (
    <div class="bg-white w-full h-screen font-test">
      <div class="fixed w-full h-16 bg-gray-100 border-b border border-gray-300 z-50 flex items-center gap-5 px-2">
        <label
          for="input-picture"
          class="font-ltest text-sm ml-10"
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
          사진
        </label>
        <input type="file" accept=".gif, .jpg, .png" class="w-0 h-0" id="input-picture" />
        <label
          for="input-file"
          class="font-ltest text-sm"
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 24h-18v-22h12l6 6v16zm-7-21h-10v20h16v-14h-6v-6zm-1-2h-11v21h-1v-22h12v1zm2 7h4.586l-4.586-4.586v4.586z" /></svg>
          파일
        </label>
        <input type="file" class="w-0 h-0" id="input-file" />
        <button class="font-ltest text-sm">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 3.383l-.924-.383-7.297 17.617.924.383 7.297-17.617zm.287 3.617l6.153 4.825-6.173 5.175.678.737 7.055-5.912-7.048-5.578-.665.753zm-8.478 0l-6.249 4.825 6.003 5.175-.679.737-6.884-5.912 7.144-5.578.665.753z" /></svg>
          <div>코드</div>
        </button>
        <div class="grow"></div>
        <button class="rounded-[18px] bg-none border border-gray-400 text-gray-600 font-sbtest px-5 py-1 flex items-center gap-2">
          <div class="text-center">임시저장</div>
          <div class="h-3/5 w-1 border-l border-gray-400"></div>
          <div class="text-center text-gray-600 font-ltest">0</div>
        </button>
        <button class="rounded-[18px] bg-gray-700 text-white font-sbtest px-6 py-1 mr-6">
          작성하기
        </button>
      </div>
      <div class="w-full h-12"></div>
      <div class="relative w-[60rem] h-full inset-x-1/2 transform -translate-x-1/2 ">
        <div className="Writing h-full">
          <input class="focus:outline-0 mt-12 border-b rounded-sm w-full border-slate-300 pt-3 pb-8 px-5 text-3xl font-sbtest" placeholder="제목" />
          <textarea
            class="focus:outline-0 mt-12 rounded-sm w-full h-[70%] py-3 px-5 text-base resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogWriting;
