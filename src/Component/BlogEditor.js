import { React, useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { TagModal } from "./Modal";
import { set } from "date-fns";
//import EditorToolbar, { modules, formats } from "./EditorToolbar";


const modules = {
  toolbar: {
    container: "#toolbar_custom",
  },
  syntax: {
    value: (text) => hljs.highlightAuto(text).language,
    highlight: (text) => {
      return (hljs.highlightAuto(text).value);
    }
  },
};

function EditorToolbar() {
  //Custom Toolbar
  return (
    <div
      id="toolbar_custom"
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
    </div>
  );
}

//dangerouslySetInnerHTML 나중에 추가하기
function BlogEditor(props) {
  const [detailAfter, setDetailAfter] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  let prevTitle = "";
  let prevContent = "";
  let imgByteList = [];
  let imgByteTypeList = [];
  const [prev_Title, setPrev_Title] = useState("");
  const [prev_Content, setPrev_Content] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(true);
  const [writingInfo, setWritingInfo] = useState({ "title": null, "detail": null });
  const [baseUrlList, setBaseUrlList] = useState([]);
  const [imgFileList, setImgFileList] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [imgUrlList, setImgUrlList] = useState([]);
  const [imgNameList, setImgNameList] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [language, setLanguage] = useState("");
  const [showTagMoadl, setShowTagModal] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);
  /* */
  const formData_Image = new FormData();
  const formData_Save = new FormData();

  const navigate = useNavigate();

  useState(() => {
    console.log("로드 결과는~");
    console.log(props.loadWritingInfo);
    if (props.isModify && (props.loadWritingInfo != null)) {
      console.log("하이루");
      console.log(props.loadWritingInfo.detail);
      setSelectedTagList(props.loadWritingInfo.tag);
      prevTitle = props.loadWritingInfo.title;
      prevContent = props.loadWritingInfo.detail;
      setPrev_Content(prevContent);
      setPrev_Title(prevTitle);
      //setTitle(props.loadWritingInfo.title);
      //setHtmlContent(props.loadWritingInfo.detail);
      //setHtmlContent(prevContent);
      /*
      console.log(quillRef);
      const range = quillRef.current?.getEditor().getSelection()?.index;
      let quill = quillRef.current?.getEditor();
      quill?.clipboard.dangerouslyPasteHTML(5, '&nbsp;<b>World</b>');
      */
    }
  }, [])

  useState(() => {
    console.log("prevCon은");
    console.log(prevContent);
    if (prevContent != "") {
      //setTitle("z");
      //setHtmlContent(props.loadWritingInfo.detail);
      loadImage(prevContent);
    }
  }, [prevContent])
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


  /*
  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: imageHandler
      }
    },
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
  }),
    []
  );
*/

  useEffect(() => {
    console.log(codeInput);
    console.log(language);
  }, [codeInput, language])


  /*
    const modules = useMemo(() => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler
        }
      },
      syntax: {
        //onChange: (text) => setCodeInput(text),
        //attach: (text) => setCodeInput(text),
        //initTimer: (text) => setCodeInput(text),
        value: (text) => hljs.highlightAuto(text).language,
        highlight: (text) => {
          setCodeInput(text);
          setLanguage(hljs.highlightAuto(text).language);
          return (hljs.highlightAuto(text).value);
        }
        //language: (text) => hljs.highlightAuto(text).language
      },
    }), []);
  */


  /* 커스텀 툴바 */
  async function loadImage(tmpInfo) {
    let tmpimgsrc = [];
    let tmpimgsrctype = [];
    let tmploadbyte = [];
    let start = 0;
    let end = 0;
    let k = 0;
    while (tmpInfo.detail.indexOf("<img src=\"http://", end) != -1) {
      start = tmpInfo.detail.indexOf("<img src=\"http://");
      end = tmpInfo.detail.indexOf(">", start);
      tmpimgsrc.push(tmpInfo.detail.slice(start + 10, end - 1));
      tmpimgsrctype.push(tmpimgsrc[k].slice(-3));
      console.log("저는 이미지소스에용");
      console.log(start);
      console.log(end);
      console.log(tmpimgsrc[k]);
      console.log(tmpimgsrctype[k]);
      k++;
    }
    for (let i = 0; i < tmpimgsrc.length; i++) {
      await axios.get(tmpimgsrc[i])
        .then((res) => {
          console.log("이미지 바이트를 가져왔어요~");
          console.log(res);
          tmploadbyte.push("data:image/" + tmpimgsrctype[i] + ";base64," + res.data);
          console.log(tmploadbyte[i]);
        })
        .catch((err) => {
          console.log("이미지 바이트를 가져오려고 했는데 에러가 났네요~");
          console.log(err);
        });
    }

    for (let i = 0; i < tmpimgsrc.length; i++) {
      setDetailAfter(tmpInfo.detail.replace(tmpimgsrc[i], tmploadbyte[i]));
    }
    console.log("달라진 디테일은~");
    console.log(detailAfter);
  };

  function findImage(isUpdated) {
    //content 내부의 image를 string 검색으로 찾아냄. 
    //해당 이미지들을 imgByteList에 push하고, 해당 이미지의 type들도 imgByteTypeList에 push함.
    // --> imgByteList , imgByteTypeList 
    let start = 0;
    let end = 0;
    let k = 0;
    let tmpContent;
    if (isUpdated || !(props.isModify)) { //만약 업데이트가 되었거나, props.isModify가 거짓일 경우(글 수정이 아니라 작성 중일 경우)
      tmpContent = htmlContent; //tmpContent에 htmlContent 넣어줌.
    }
    else { // 글 수정중이고, 업데이트도 되지 않았을 경우
      tmpContent = props.loadWritingInfo.detail; //props.loadWritingInfo에서 받아온 기존 글의 detail을 넣어줌.
    }
    while (tmpContent.indexOf("<img src=\"data:image/", end) != -1) {
      start = tmpContent.indexOf("<img src=\"data:image/", end);
      end = tmpContent.indexOf(">", start);
      imgByteList.push(tmpContent.slice(start + 10, end - 1));
      imgByteTypeList.push(imgByteList[k].slice(11, imgByteList[k].indexOf(";", 11)));
      console.log(k + "번째고 저는 이미지바이트에용");
      console.log(start);
      console.log(end);
      console.log(imgByteList[k]);
      console.log(imgByteTypeList[k]);
      k++;
    }
  }

  function makeImageFileStruct() {
    //파일 구조체 만듦
    //findImage 이후에 호출함. findImage에서 이미지 base64값을 넣은 imgByteList의 값들을 통해 File 객체를 만듦.
    //해당 File 객체들은 formData_Image에 append됨. --> 이후 backend에 axios를 통해 전달.
    let fileName = [];
    console.log("하이!!!!");
    console.log(imgByteList.length);
    for (let i = 0; i < imgByteList.length; i++) {
      fileName.push(Math.random().toString(36).substring(2, 11));
      //formData_Save.append('fileName', fileName[i]);
      //postWriting();
    }
    for (let i = 0; i < imgByteList.length; i++) {
      let imgB = imgByteList[i].replace("data:image/" + imgByteTypeList[i] + ";base64,", "");
      //console.log(imgB);
      let bstr = atob(imgB);
      //console.log(bstr);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      console.log("파일 구조체 만드는중~!");
      console.log(u8arr);
      let file = new File([u8arr], fileName[i] + "." + imgByteTypeList[i], { type: 'image/' + imgByteTypeList[i], lastModified: new Date() });
      console.log(imgB);
      console.log(file);
      formData_Image.append('file', file);
      console.log(formData_Image.get('file'));
    }
  }

  function postWriting() {
    console.log(formData_Save.get('content'));


  }

  async function saveHandler() {
    console.log("세이브핸들러입니다~안녕하세요~~!");
    console.log(htmlContent);
    await findImage();
    await makeImageFileStruct();
    /*
    if (imgByteList.length != 0) { //이미지가 존재할 때 
      let htmlContent_after;
      await axios // 이미지 File 객체가 저장 된 formData_Image를 backend에 post.
        .post(SERVER_URL + "/til-service/api/v1/boards/image", formData_Image)
        .then((res) => { // 이미지 File 객체들이 저장된 주소를 받아와, 기존 htmlContent의 base64 코드를 받아온 url로 대체함.
          console.log(res);
          res.data.data.map((result) => {
            let tmpUrlList = imgUrlList;
            let tmpNameList = imgNameList;
            let IMG_URL = result.toString().replace("http://localhost:8000", SERVER_URL);
            let imageName = result.toString().replace("http://localhost:8000/til-service/api/v1/images/", "");
            
            //console.log("유알엘 : " + IMG_URL);
            //console.log("이름 : " + imageName);
            
            tmpUrlList.push(IMG_URL);
            tmpNameList.push(imageName);
            setImgUrlList([...tmpUrlList]);
            setImgNameList([...tmpNameList]);
          })
          imgNameList.map((fileName) => { //formData_Save에 파일 이름(백에 저장된 이름) 저장
            formData_Save.append('fileName', fileName);
            console.log("fileName = " + fileName);
          })
          // htmlContent의 base64를 url로 대체하고 결과를 formData_Save에 저장
          htmlContent_after = htmlContent;
          for (let i = 0; i < imgUrlList.length; i++) {
            htmlContent_after = htmlContent_after.toString().replace(imgByteList[i], imgUrlList[i]);
          }
          console.log("content..추가했다...");
          formData_Save.append('content', htmlContent_after);
          console.log(htmlContent_after);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
      console.log("이미지 유알엘 리스트 : ");
      console.log(imgUrlList);
    }
    else { //이미지가 없을 시, 기존 htmlContent를 그대로 formData_save에 'content' 키값으로 저장
      console.log("이미지 리스트가 없어용~");
      console.log(htmlContent);
      formData_Save.append('content', htmlContent);
    }
    //제목과 공개여부를 formData_Save에 저장
    formData_Save.append('title', title);
    formData_Save.append('open', open);
    //tagList의 id를 formData_Save에 추가
    let tmpTagIdList = [];
    selectedTagList.map((item) => {
      tmpTagIdList.push(item.id);
    })
    console.log(tmpTagIdList);
    formData_Save.append('tagId', tmpTagIdList);

    //제목, 내용, 공개여부, 태그가 포함 된 formData_Save를 backend에 post.
    await axios
      .post(SERVER_URL + "/til-service/api/v1/boards", formData_Save)
      .then((res) => {
        console.log("성공.");
        console.log(res);
      })
      .catch((err) => {
        console.log("실패.");
        if (err.response) {
          console.log(err.response.data);
        }
      });
      */
  };

  useEffect(() => {
    console.log("타이틀은 " + title);

  }, [title])

  async function modifyHandler() {
    // saveHandler와 동일하게 정보를 보냄. 
    // 기존 내용에서 수정되지 않았을 경우를 if문으로 처리해줌.
    // 이미지를 보낼 때 boardId도 함께 보내줌. 
    console.log("모디파이핸들러입니다!! 안녕하세요><");
    console.log(htmlContent);

    console.log(title);
    console.log(open);
    if (htmlContent == "") { // content에 변화가 없어 setState로 관리되는 htmlContent가 비어있을 때 
      await findImage(false); // findImage에 내용 변화가 없었음을 전달
    }
    else { // 내용 변화가 있었을 경우
      await findImage(true); // findImage에 내용 변화가 있었음을 전달
    }
    await makeImageFileStruct();
    formData_Save.append('open', open);
    if (title == "") { formData_Save.append('title', props.loadWritingInfo.title); } // 제목에 변화가 없었을 시 기존 제목 formData_Save에 넣어줌.
    else { formData_Save.append('title', title); }

    if (imgByteList.length != 0) {
      let htmlContent_after;
      formData_Image.append('boardId', props.boardId);
      await axios
        .post(SERVER_URL + "/til-service/api/v1/boards/image", formData_Image)
        .then((res) => {
          console.log(res);
          res.data.data.map((result) => {
            let tmpUrlList = imgUrlList;
            let tmpNameList = imgNameList;
            let IMG_URL = result.toString().replace("http://localhost:8000", SERVER_URL);
            let imageName = result.toString().replace("http://localhost:8000/til-service/api/v1/images/", "");
            console.log("유알엘 : " + IMG_URL);
            console.log("이름 : " + imageName);
            tmpUrlList.push(IMG_URL);
            tmpNameList.push(imageName);
            setImgUrlList(tmpUrlList);
            setImgNameList(tmpNameList);
          })
          imgNameList.map((fileName) => {
            formData_Save.append('fileName', fileName);
            console.log("fileName = " + fileName);
          })

          if (htmlContent == "") { // 내용 수정이 없었을 시, props.loadWritingInfo.detail에서 image src 교체
            console.log("내용수정이 없었네용~ prevContent는 " + props.loadWritingInfo.detail);
            htmlContent_after = props.loadWritingInfo.detail;
            //formData_Save.append('content', props.loadWritingInfo.detail);
          }
          else {
            htmlContent_after = htmlContent;
          }
          for (let i = 0; i < imgUrlList.length; i++) {
            htmlContent_after = htmlContent_after.toString().replace(imgByteList[i], imgUrlList[i]);
          }
          formData_Save.append('content', htmlContent_after);
          //console.log("content..추가했다...");
          //console.log(htmlContent_after);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
      console.log("이미지 유알엘 리스트 : ");
      console.log(imgUrlList);
      console.log("open은");
      console.log(props.loadWritingInfo.open);
    }
    else { //이미지가 없을 시
      console.log("이미지 리스트가 없어용~");
      console.log(htmlContent);
      if (htmlContent == "") { // 내용 변화가 없었으므로 기존 내용을 formData_save에 'content' 키값으로 저장
        console.log("내용수정이 없었네용~ prevContent는 " + props.loadWritingInfo.detail);
        formData_Save.append('content', props.loadWritingInfo.detail);
      } else { //, 기존 htmlContent를 그대로 formData_save에 'content' 키값으로 저장
        formData_Save.append('content', htmlContent);
      }
    }
    let tmpTagIdList = [];
    selectedTagList.map((item) => {
      tmpTagIdList.push(item.id);
    })
    console.log(tmpTagIdList);
    formData_Save.append('tagId', tmpTagIdList);
    await axios
      .post(SERVER_URL + "/til-service/api/v1/boards/" + props.boardId, formData_Save)
      .then((res) => {
        console.log("성공.");
        console.log(res);
      })
      .catch((err) => {
        console.log("실패.");
        if (err.response) {
          console.log(err.response.data);
        }
      });

  }

  const tmpSaveHandler = (e) => {

  };

  const onTitleInputHandler = (e) => {
    setTitle(e.target.value);
  }

  const onHtmlChangeHandler = (value) => {
    //console.log(htmlContent);
    //console.log(e.target.value);
    setHtmlContent(value);
  };

  return (
    <div class="bg-gradient-to-b from-gray-100 w-full h-screen font-test">
      {
        showTagMoadl ?
          (<TagModal
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
            setSelectedTagList={setSelectedTagList}
          />)
          : (null)
      }
      <EditorToolbar
      />
      <div class="w-full h-12"></div>
      <div class="relative bg-white w-[66rem] inset-x-1/2 transform -translate-x-1/2 border-r border-l px-[6rem]">
        <input
          class="focus:outline-0 mt-12 border-b rounded-sm w-full border-slate-300 pt-3 pb-8 px-5 text-3xl font-sbtest"
          defaultValue={prev_Title}
          placeholder="제목"
          onChange={onTitleInputHandler}
        />
        <div class="mt-10 min-h-[60rem]">
          <ReactQuill
            defaultValue={prev_Content}
            //ref={quillRef}
            onChange={onHtmlChangeHandler}
            modules={modules}
            class="w-[60rem] h-full"
            theme="snow"
          />
        </div>
      </div>
      <div class="w-full h-24"></div>
      <div class="flex flex-col justify-between fixed w-full h-28 bottom-0 z-50 ">
        <div class="bg-white border-t border-gray-300 flex gap-3 px-8 h-12 py-2 justify-end items-center">
          <div class="text-lg text-gray-500 font-test">
            #
          </div>
          {selectedTagList.map((item) => {
            return (
              <button
                class="px-2 bg-indigo-50 rounded-lg border border-indigo-300 text-indigo-400 font-ltest flex gap-2"
                key={item.id}
                onClick={() => {
                  let tmpSelctedTagList = selectedTagList;
                  console.log(tmpSelctedTagList);
                  tmpSelctedTagList = tmpSelctedTagList.filter((element) => element.id != item.id)
                  setSelectedTagList(tmpSelctedTagList);
                }}
              >
                <div>
                  {item.name}
                </div>
                <div>
                  x
                </div>
              </button>
            )
          })}
        </div>
        <div class="flex h-16 justify-end items-center gap-5 bg-gray-100 border border-gray-300 px-2">
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
            onClick={() => { setShowTagModal(true) }}
          >
            <div class="text-center">태그 추가</div>
            <div class="h-3/5 w-1 border-l border-gray-400"></div>
            <div class="text-center text-gray-600 font-ltest">+</div>
          </button>
          <button
            class="rounded-[18px] bg-none border border-gray-400 text-gray-600 font-sbtest px-5 py-2 flex items-center gap-2"
            onClick={tmpSaveHandler}
          >
            <div class="text-center">임시저장</div>
            <div class="h-3/5 w-1 border-l border-gray-400"></div>
            <div class="text-center text-gray-600 font-ltest">0</div>
          </button>
          {props.isModify ? (
            <button
              class="rounded-[18px] bg-gray-700 text-white font-sbtest px-6 py-2 mr-6"
              onClick={() => {
                modifyHandler()
                //navigate("/blog/main/1");
              }}
            >
              수정하기
            </button>) : (<button
              class="rounded-[18px] bg-gray-700 text-white font-sbtest px-6 py-2 mr-6"
              onClick={() => {
                saveHandler()
                //navigate("/blog/main/1");
              }}
            >
              작성하기
            </button>)}
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;
