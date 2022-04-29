import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import EditorToolbar, { modules, formats } from "./EditorToolbar";

function BlogEditor({ quillRef, htmlContent, setHtmlContent }) {
  const onHtmlChangeHandler = (value) => {
    console.log(htmlContent);
    //console.log(e.target.value);
    setHtmlContent(value);
  };
  return (
    <div class="bg-white w-full h-screen font-test">
      <EditorToolbar />
      <div class="w-full h-12"></div>
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2 ">
        <input
          class="focus:outline-0 mt-12 border-b rounded-sm w-full border-slate-300 pt-3 pb-8 px-5 text-3xl font-sbtest"
          placeholder="제목"
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
    </div>
  );
}

export default BlogEditor;
