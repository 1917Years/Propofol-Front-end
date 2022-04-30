import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import EditorToolbar, { modules, formats } from "./EditorToolbar";

//dangerouslySetInnerHTML 나중에 추가하기

function BlogEditor({ quillRef, htmlContent, setHtmlContent }) {
  const [title, setTitle] = useState("");
  const [writingInfo, setWritingInfo] = useState({ "title": null, "detail": null });
  const tmpSaveHandler = (e) => {

  };
  const saveHandler = (e) => {
    //console.log("응?");
    //console.log(htmlContent);
    let tmp = { "title": title, "detail": htmlContent };
    setWritingInfo(tmp);
    console.log(tmp);
    console.log(writingInfo);
  };
  const onTitileInputHandler = (e) => {
    setTitle(e.target.value);
  }
  const onHtmlChangeHandler = (value) => {
    console.log(htmlContent);
    //console.log(e.target.value);
    setHtmlContent(value);
  };
  return (
    <div class="bg-gradient-to-b from-gray-100 w-full h-screen font-test">
      <EditorToolbar />
      <div class="w-full h-12"></div>
      <div class="relative bg-white w-[66rem] inset-x-1/2 transform -translate-x-1/2 border-r border-l px-[6rem]">
        <input
          class="focus:outline-0 mt-12 border-b rounded-sm w-full border-slate-300 pt-3 pb-8 px-5 text-3xl font-sbtest"
          placeholder="제목"
          onChange={onTitileInputHandler}
        />
        <ReactQuill
          ref={quillRef}
          onChange={onHtmlChangeHandler}
          modules={modules}
          //formats={formats}
          class="w-[60rem] h-full"
          theme="snow"
        />
      </div>
      <div class="w-full h-16 "></div>
      <div class="fixed w-full h-16 bottom-0 bg-gray-100 border-b border border-gray-300 z-50 flex justify-end items-center gap-5 px-2">
        <button
          class="rounded-[18px] bg-none border border-gray-400 text-gray-600 font-sbtest px-5 py-2 flex items-center gap-2"
          onClick={tmpSaveHandler}
        >
          <div class="text-center">임시저장</div>
          <div class="h-3/5 w-1 border-l border-gray-400"></div>
          <div class="text-center text-gray-600 font-ltest">0</div>
        </button>
        <button
          class="rounded-[18px] bg-gray-700 text-white font-sbtest px-6 py-2 mr-6"
          onClick={saveHandler}
        >
          작성하기
        </button>
      </div>
    </div>
  );
}

export default BlogEditor;
