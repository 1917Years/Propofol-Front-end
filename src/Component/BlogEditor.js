import { React, useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
//import EditorToolbar, { modules, formats } from "./EditorToolbar";


//dangerouslySetInnerHTML 나중에 추가하기
function BlogEditor() {
  const [htmlContent, setHtmlContent] = useState("");
  const quillRef = useRef();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(true);
  const [writingInfo, setWritingInfo] = useState({ "title": null, "detail": null });
  const [imgList, setImgList] = useState([]);
  /* 커스텀 툴바 */
  const formData = new FormData();
  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      let fileReader = new FileReader();
      let imgsrc;
      const file = input.files[0]; // 현재 커서 위치 저장 
      formData.append('file', file);
      /*
      fileReader.readAsDataURL(file);
      fileReader.onload = function (evt) {
        imgsrc = evt.target.result;


        console.log(file);
        const range = quillRef.current.getEditor().getSelection(true);
        quillRef.current.getEditor().insertEmbed(range.index, "image", imgsrc);
      }
      */
      const range = quillRef.current.getEditor().getSelection();
      //quillRef.current.getEditor().insertEmbed(range.index, "image", require(process.env.PUBLIC_URL + "C:/Users/Yujin/Propofol-Front-end/src/Component/lenna.png"));
      try {
        const result = await axios.post(SERVER_URL + '/til-service/api/v1/boards/image', formData);
        console.log(result);
        const IMG_URL = result.data.data; //일케하면되니?
<<<<<<< HEAD
        console.log("유알엘 : " + IMG_URL);
        quillRef.current.getEditor().insertEmbed(range.index, "image", process.env.PUBLIC_URL + IMG_URL); // require -> react에서 src로 이미지 불러올 때 생기는 오류 해결하기 위함
=======
        let NEW_IMG_URL = IMG_URL.toString().replace("http://localhost:8000", SERVER_URL); // 이거맞나? ㅇㅇ맞는듯
        
        console.log("유알엘 : " + NEW_IMG_URL); // 제어가 여기까진 오는데
        quillRef.current.getEditor().insertEmbed(range.index, "image", NEW_IMG_URL); //
        //quillRef.current.getEditor().insertEmbed(range.index, "image", require(IMG_URL)); // require -> react에서 src로 이미지 불러올 때 생기는 오류 해결하기 위함
>>>>>>> 37ea6396ff01a39b98673f9d877a7762e3f8a336
        quillRef.current.getEditor().setSelection(range.index + 1);
        console.log("여기까지 오나?"); //여기까진 안와
      } catch (e) { quillRef.current.getEditor().deleteText(range.index, 1); }
    };
  }

  const CustomTmpSave = () => { 
    return (
      <button class="z-40 w-[5rem] rounded-[18px] bg-none border border-gray-400 text-gray-600 font-sbtest px-5 py-1 flex bg-white items-center gap-2">
        <div class="text-center">임시저장</div>
        <div class="h-3/5 w-1 border-l border-gray-400"></div>
        <div class="text-center text-gray-600 font-ltest">0</div>
      </button>
    );
  };

  let FontAttributor = Quill.import("attributors/class/font");
  FontAttributor.whitelist = [
    "iroBatang",
    "nanumGothic",
    "nanumMyeongjo",
    "maruBuri",
    "nanumPen",
    "nanumSquare",
    "tvn",
  ];
  Quill.register(FontAttributor, true);

  let Size = Quill.import("attributors/style/size");
  Size.whitelist = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "30px",
    "36px",
    "48px",
    "60px",
  ];
  Quill.register(Size, true);

  hljs.configure({
    languages: ["javascript", "ruby", "python", "c", "c++", "java"],
  });

  const modules = {
    toolbar: {
      /*
              container: [
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                  [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                      { align: [] },
                  ],
                  ["image", "video"],
              ],
              */
      container: "#toolbar",
      handlers: {
        image: imageHandler
      }
    },

    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
  };

  function EditorToolbar() {
    //Custom Toolbar
    return (
      <div
        id="toolbar"
        class="flex w-full min-w-[100rem] bg-gray-50 h-12 fixed z-40 gap-[1px]"
      >
        <span className="ql-formats mt-1 ml-3">
          <select className="ql-font" defaultValue="iroBatang">
            <option value="iroBatang" selected>
              이롭게 바탕체
            </option>
            <option value="nanumGothic">나눔고딕</option>
            <option value="nanumMyeongjo">나눔명조</option>
            <option value="nanumPen">나눔손글씨 펜</option>
            <option value="nanumSquare">나눔스퀘어</option>
            <option value="maruBuri">마루 부리</option>
            <option value="tvn">tvn 즐거운 이야기</option>
          </select>
          <select className="ql-size" defaultValue="18px">
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="22px">22px</option>
            <option value="24px">24px</option>
            <option value="26px">26px</option>
            <option value="28px">28px</option>
            <option value="30px">30px</option>
            <option value="36px">36px</option>
            <option value="48px">48px</option>
            <option value="60px">60px</option>
          </select>
        </span>
        <span className="ql-formats mt-1">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats mt-1">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats mt-1">
          <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" />
          <button className="ql-blockquote" />
          <button className="ql-direction" />
        </span>
        <span className="ql-formats mt-1">
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        <span className="ql-formats mt-1">
          <button className="ql-link" />
          <button id="ql-image" className="ql-image"></button>
          <button className="ql-video" />
        </span>
        <span className="ql-formats mt-1">
          <button className="ql-formula" />
          <button className="ql-code-block" />
          <button className="ql-clean" />
        </span>
        <span className="ql-formats mt-1">
          <button className="ql-undo"></button>
          <button className="ql-redo"></button>
        </span>
      </div>
    );
  }

  /* 커스텀 툴바 */

  const tmpSaveHandler = (e) => {

  };
  const saveHandler = (e) => {
    //console.log(htmlContent);
    console.log(formData);
    let tmp = { "title": title, "content": htmlContent, "open": open };
    setWritingInfo(tmp);
    console.log(tmp);
    console.log("이미지 리스트 : " + imgList);
    axios
      .post(SERVER_URL + "/til-service/api/v1/boards", tmp)
      .then((res) => {
        //console.log("성공.");
        console.log(res);
      })
      .catch((err) => {
        console.log("실패.");
        if (err.response) {
          console.log(err.response.data);
        }
      });

    //console.log(writingInfo);
  };
  const onTitileInputHandler = (e) => {
    setTitle(e.target.value);
  }
  const onHtmlChangeHandler = (value) => {
    //console.log(htmlContent);
    //console.log(e.target.value);
    setHtmlContent(value);
  };
  return (
    <div class="bg-gradient-to-b from-gray-100 w-full h-screen font-test">
      <EditorToolbar
        imageHandler={imageHandler}
      />
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
          class="w-[60rem] h-full"
          theme="snow"
        />
      </div>
      <div class="w-full h-16 "></div>
      <div class="fixed w-full h-16 bottom-0 bg-gray-100 border-b border border-gray-300 z-50 flex justify-end items-center gap-5 px-2">

        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => {
              setOpen(!open);
            }}
          />
          <div>비공개</div>
        </div>
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
