import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { SERVER_URL } from "../../utils/SRC";
import { TagModal, TeamScheduleModal } from "../../Component/Modal";
import "react-datepicker/dist/react-datepicker.css";
import ProjectEditor from "../../Component/Project/ProjectEditor";
import axios from "axios";
import Swal from "sweetalert2";

function ProjectWriting() {
  const [isModify, setIsModify] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const writingNo = searchParams.get('No');
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recruit, setRecruit] = useState("");

  const [showTagMoadl, setShowTagModal] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);

  const [project, setProject] = useState({});
  const [showTeamScheduleModal, setShowTeamScheduleModal] = useState(false);
  const [teamScheduleList, setTeamScheduleList] = useState([]);

  const [errmsg, setErrmsg] = useState("");

  const Swal = require("sweetalert2");

  function dateToString(prevdate) {
    let year, month, date;
    year = prevdate.getFullYear();
    if (prevdate.getMonth() < 10) {
      month = "0" + (prevdate.getMonth() + 1);
    } else {
      month = prevdate.getMonth();
    }
    if (prevdate.getDate() < 10) {
      date = "0" + prevdate.getDate();
    } else {
      date = prevdate.getDate();
    }
    return year + "-" + month + "-" + date;
  }

  async function loadImage(tmpInfo) {
    let tmpimgsrc = [];
    let tmpimgsrctype = [];
    let tmploadbyte = [];
    let start = 0;
    let end = 0;
    let k = 0;
    while (tmpInfo.content.indexOf("<img src=\"http://", end) != -1) {
      start = tmpInfo.content.indexOf("<img src=\"http://");
      end = tmpInfo.content.indexOf(">", start);
      tmpimgsrc.push(tmpInfo.content.slice(start + 10, end - 1));
      tmpimgsrctype.push(tmpimgsrc[k].slice(-3));
      console.log("?????? ?????????????????????");
      console.log(start);
      console.log(end);
      console.log(tmpimgsrc[k]);
      console.log(tmpimgsrctype[k]);
      k++;
    }
    for (let i = 0; i < tmpimgsrc.length; i++) {
      await axios.get(tmpimgsrc[i])
        .then((res) => {
          console.log("????????? ???????????? ???????????????~");
          console.log(res);
          tmploadbyte.push("data:image/" + tmpimgsrctype[i] + ";base64," + res.data);
          console.log(tmploadbyte[i]);
        })
        .catch((err) => {
          console.log("????????? ???????????? ??????????????? ????????? ????????? ?????????~");
          console.log(err.response);
        });
    }

    for (let i = 0; i < tmpimgsrc.length; i++) {
      tmpInfo.content = tmpInfo.content.replace(tmpimgsrc[i], tmploadbyte[i]);
    }
    console.log("????????? ????????????~");
    console.log(tmpInfo.content);
    await setProject(tmpInfo);
    setTitle(tmpInfo.title);
    setSelectedTagList(tmpInfo.tagInfos);
    setStartDate(new Date(tmpInfo.startDate));
    setEndDate(new Date(tmpInfo.endDate));
    setRecruit(tmpInfo.recruit);
    setContent(tmpInfo.content);
    await setLoadingComplete(true);
  };

  function findImage(isUpdated, imgByteList, imgByteTypeList) {
    //content ????????? image??? string ???????????? ?????????.
    //?????? ??????????????? imgByteList??? push??????, ?????? ???????????? type?????? imgByteTypeList??? push???.
    // --> imgByteList , imgByteTypeList
    let start = 0;
    let end = 0;
    let k = 0;
    let tmpContent;
    //
    tmpContent = content;

    if (isUpdated || !(isModify)) { //?????? ??????????????? ????????????, props.isModify??? ????????? ??????(??? ????????? ????????? ?????? ?????? ??????)
      tmpContent = content; //tmpContent??? content ?????????.
    }
    else { // ??? ???????????????, ??????????????? ?????? ????????? ??????
      tmpContent = content; //props.loadWritingInfo?????? ????????? ?????? ?????? detail??? ?????????.
    }

    while (tmpContent.indexOf('<img src="data:image/', end) != -1) {
      start = tmpContent.indexOf('<img src="data:image/', end);
      end = tmpContent.indexOf(">", start);
      imgByteList.push(tmpContent.slice(start + 10, end - 1));
      imgByteTypeList.push(
        imgByteList[k].slice(11, imgByteList[k].indexOf(";", 11))
      );
      console.log(k + "????????? ?????? ????????????????????????");
      console.log(start);
      console.log(end);
      console.log(imgByteList[k]);
      console.log(imgByteTypeList[k]);
      k++;
    }
  }

  function makeImageFileStruct(imgByteList, imgByteTypeList, formData_Image) {
    //?????? ????????? ??????
    //findImage ????????? ?????????. findImage?????? ????????? base64?????? ?????? imgByteList??? ????????? ?????? File ????????? ??????.
    //?????? File ???????????? formData_Image??? append???. --> ?????? backend??? axios??? ?????? ??????.
    let fileName = [];
    console.log("??????!!!!");
    console.log(imgByteList.length);
    for (let i = 0; i < imgByteList.length; i++) {
      fileName.push(Math.random().toString(36).substring(2, 11));
    }
    for (let i = 0; i < imgByteList.length; i++) {
      let imgB = imgByteList[i].replace(
        "data:image/" + imgByteTypeList[i] + ";base64,",
        ""
      );
      let bstr = atob(imgB);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      console.log("?????? ????????? ????????????~!");
      console.log(u8arr);
      let file = new File([u8arr], fileName[i] + "." + imgByteTypeList[i], {
        type: "image/" + imgByteTypeList[i],
        lastModified: new Date(),
      });
      console.log(imgB);
      //console.log(file);
      formData_Image.append("file", file);
      console.log(formData_Image.get("file"));
    }
  }


  async function modifyHandler() {
    // saveHandler??? ???????????? ????????? ??????. 
    // ?????? ???????????? ???????????? ????????? ????????? if????????? ????????????.
    // ???????????? ?????? ??? boardId??? ?????? ?????????. 
    const formData_Save = new FormData();
    const formData_Image = new FormData();
    let imgByteList = [];
    let imgByteTypeList = [];
    let tmpTagIdList = [];
    console.log("??????????????????????????????!! ???????????????><");
    console.log(content);
    console.log(title);
    if (content == "") { // content??? ????????? ?????? setState??? ???????????? htmlContent??? ???????????? ??? 
      await findImage(false, imgByteList, imgByteTypeList); // findImage??? ?????? ????????? ???????????? ??????
    }
    else { // ?????? ????????? ????????? ??????
      await findImage(true, imgByteList, imgByteTypeList); // findImage??? ?????? ????????? ???????????? ??????
    }
    await makeImageFileStruct(imgByteList, imgByteTypeList, formData_Image);
    if (title == "") { formData_Save.append('title', project.title); } // ????????? ????????? ????????? ??? ?????? ?????? formData_Save??? ?????????.
    else { formData_Save.append('title', title); }
    //
    if (startDate == null) { formData_Save.append("startDate", project.startDate); }
    else { formData_Save.append("startDate", dateToString(startDate)); }
    if (endDate == null) { formData_Save.append("startDate", project.startDate); }
    else { formData_Save.append("endDate", dateToString(endDate)); }
    if (recruit == "") { formData_Save.append("recruit", project.recruit); }
    else { formData_Save.append("recruit", recruit); }

    selectedTagList.map((item) => {
      tmpTagIdList.push(item.id);
    });
    formData_Save.append("tagId", tmpTagIdList);

    //
    if (imgByteList.length != 0) {
      let htmlContent_after;
      formData_Image.append('boardId', project.id * 1);
      await axios
        .post(SERVER_URL + "/matching-service/api/v1/images", formData_Image)
        .then((res) => {
          console.log(res);
          let tmpUrlList = [];
          let tmpNameList = [];
          res.data.data.map((result) => {
            let IMG_URL = result.toString().replace("http://localhost:8000", SERVER_URL);
            let imageName = result.toString().replace("http://localhost:8000/matching-service/api/v1/images/", "");
            console.log("????????? : " + IMG_URL);
            console.log("?????? : " + imageName);
            tmpUrlList.push(IMG_URL);
            tmpNameList.push(imageName);
          })
          tmpNameList.map((fileName) => {
            formData_Save.append('fileName', fileName);
            console.log("fileName = " + fileName);
          })

          if (content == "") { // ?????? ????????? ????????? ???, props.loadWritingInfo.detail?????? image src ??????
            console.log("??????????????? ????????????~ prevContent??? " + content);
            htmlContent_after = content;
          }
          else {
            console.log("??????????????????!" + content);
            htmlContent_after = content;
          }
          for (let i = 0; i < tmpUrlList.length; i++) {
            htmlContent_after = htmlContent_after.toString().replace(imgByteList[i], tmpUrlList[i]);
          }
          formData_Save.append('content', htmlContent_after);
          console.log(formData_Save.get('content'));
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
    else { //???????????? ?????? ???
      console.log("????????? ???????????? ?????????~");
      console.log(content);
      if (content == "") { // ?????? ????????? ??????????????? ?????? ????????? formData_save??? 'content' ???????????? ??????
        console.log("??????????????? ????????????~ prevContent??? " + content);
        formData_Save.append('content', content);
      } else { //, ?????? htmlContent??? ????????? formData_save??? 'content' ???????????? ??????
        console.log("??????");
        formData_Save.append('content', content);
      }
    }
    console.log(formData_Save.get('content'));
    await axios
      .post(SERVER_URL + "/matching-service/api/v1/matchings/" + project.id, formData_Save)
      .then((res) => {
        console.log("??????.");
        console.log(res);
      })
      .catch((err) => {
        console.log("??????.");
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  async function saveHandler() {
    const formData_Save = new FormData();
    const formData_Image = new FormData();
    console.log(content);
    let err = -1;
    let tmpTagIdList = [];
    selectedTagList.map((item) => {
      tmpTagIdList.push(item.id);
    });

    if (title == "") { setErrmsg("????????? ??????????????????."); }
    else if (content == "") { setErrmsg("????????? ??????????????????."); }
    else if (startDate == null) { setErrmsg("?????? ????????? ??????????????????."); }
    else if (endDate == null) { setErrmsg("?????? ????????? ??????????????????."); }
    else if (recruit == "") {
      setErrmsg("?????? ????????? ??????????????????.");
    }
    else if (selectedTagList.length == 0) {
      setErrmsg("????????? ??????????????????.");
    }
    else if (teamScheduleList.length == 0) {
      setErrmsg("??? ???????????? ??????????????????.");
    }
    else {
      err = 0;
    }
    if (err == -1) {
      Swal.fire({
        text: errmsg,
        confirmButtonText: "",
        confirmButtonColor: "#171717",
        timer: 650,
        icon: 'error',
        showConfirmButton: false,
        timerProgressBar: false,
      });
      return;
    }
    //
    let imgByteList = [];
    let imgByteTypeList = [];
    await findImage(true, imgByteList, imgByteTypeList);
    console.log(imgByteList);
    await makeImageFileStruct(imgByteList, imgByteTypeList, formData_Image);
    console.log(formData_Image.getAll("file"));
    //
    if (formData_Image.getAll("file").length != 0) {
      await axios
        .post(
          SERVER_URL + "/matching-service/api/v1/images",
          formData_Image
        )
        .then((res) => {
          console.log(res);
          let content_after = content;
          let tmpUrlList = [];
          let tmpNameList = [];
          res.data.data.map((result) => {
            let IMG_URL = result
              .toString()
              .replace("http://localhost:8000", SERVER_URL);
            let imageName = result
              .toString()
              .replace("http://localhost:8000/matching-service/api/v1/images/", "");
            tmpUrlList.push(IMG_URL);
            tmpNameList.push(imageName);
          });
          tmpNameList.map((fileName) => {
            //formData_Save??? ?????? ??????(?????? ????????? ??????) ??????
            formData_Save.append("fileName", fileName);
            console.log("fileName = " + fileName);
          });
          for (let i = 0; i < tmpUrlList.length; i++) {
            content_after = content_after
              .toString()
              .replace(imgByteList[i], tmpUrlList[i]);
          }
          formData_Save.append("content", content_after);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    else {
      formData_Save.append("content", content);
    }
    console.log(formData_Save.get("content"));
    formData_Save.append("title", title);
    formData_Save.append("startDate", dateToString(startDate));
    formData_Save.append("endDate", dateToString(endDate));
    formData_Save.append("recruit", recruit);
    formData_Save.append("tagId", tmpTagIdList);
    teamScheduleList.map((item) => {
      formData_Save.append("startTime", item.startTime);
      formData_Save.append("endTime", item.endTime);
      formData_Save.append("week", item.week);
    });
    console.log("??????~~");
    console.log(formData_Save.get("tagId"));
    console.log(formData_Save.getAll("startTime"));
    console.log(formData_Save.getAll("endTime"));
    console.log(formData_Save.getAll("week"));
    console.log("????????? ??????????????????~");

    await axios
      .post(SERVER_URL + "/matching-service/api/v1/matchings", formData_Save)
      .then((res) => {
        console.log(res);
        navigate("/pm/main");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const keyPressHandler = (e) => {
    let keyword = e.currentTarget.value;
    let taglist = "";
    selectedTagList.map((item) => {
      taglist = taglist + "+" + item.id
    })
    if (e.key === 'Enter') {
      navigate("/pm/search?keyword=" + keyword + "&tag=" + taglist);
    }
  };

  const onFileButtonHandler = (e) => {
    const myInput = document.getElementById("input-file");
    myInput.click();
  };

  function loadProjectDetail() {
    let tmpInfo;
    axios.get(SERVER_URL + "/matching-service/api/v1/matchings/" + writingNo)
      .then((res) => {
        console.log(res);
        //setProject(res.data.data);
        console.log("^^tmpInfo???");
        console.log(tmpInfo);
        tmpInfo = res.data.data;
        //console.log(wrInfo);
        loadImage(tmpInfo);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  useEffect(() => {
    if (writingNo != null) {
      setIsModify(true);
      loadProjectDetail();
      console.log("??????????????????!");
      console.log("??? ?????????~");
      if (isModify) {
        console.log("??? ???????????? ???...");
        //loadWritings();
        console.log("????????? ??? ?????????~");
        //console.log(wrInfo);
      }
    }
  }, []);

  return (
    <div class="bg-white w-full font-test">
      {showTagMoadl ? (
        <TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />
      ) : null}
      {showTeamScheduleModal ? (
        <TeamScheduleModal
          setShowTeamScheduleModal={setShowTeamScheduleModal}
          setTeamScheduleList={setTeamScheduleList}
        />
      ) : null}
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
        <div class="relative my-10">
          <div class="mt-4 text-3xl font-btest">
            {isModify ? "???????????? ????????????" : "??? ???????????? ????????????"}
          </div>
          <div class="mt-4">
            <input
              class="w-full py-2 px-3 border bg-gray-50 focus:outline-0 text-lg font-ltest"
              placeholder="??????"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div class="flex flex-wrap items-center gap-5 mt-4">
            <div class="text-lg text-gray-600 font-ltest w-fit">#??????</div>
            {selectedTagList.map((item) => {
              return (
                <div class="w-1/6 py-2 px-3 border border-indigo-300 text-indigo-400 text-center bg-indigo-50 text-md font-test min-w-[6rem]">
                  {item.name}
                </div>
              );
            })}
            <button
              class="text-center w-1/6 py-2 px-3 border border-gray-300 bg-gray-50 focus:outline-0 text-md font-test min-w-[6rem]"
              onClick={() => {
                setShowTagModal(true);
              }}
            >
              +
            </button>
          </div>
          <div class="flex gap-2">
            <div class="mt-4 w-1/3 border border-gray-300">
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setStartDate(date)}
                shouldCloseOnSelect={false}
                placeholderText="?????? ??????"
              />
            </div>
            <div class="mt-4 w-1/3 border border-gray-300">
              <DatePicker
                selected={endDate}
                dateFormat="yyyy-MM-dd"
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
                shouldCloseOnSelect={false}
                placeholderText="?????? ??????"
              />
            </div>
            <div class="mt-4 w-1/3 py-2 px-2 border border-gray-300">
              <input
                class="focus:outline-0"
                placeholder="?????? ??????"
                value={recruit}
                onChange={(e) => setRecruit(e.currentTarget.value)}
              />
            </div>
          </div>
          <div class="mt-4 flex text-lg text-gray-600 font-ltest justify-start gap-10">
            {isModify ?
              (null)
              :
              (
                teamScheduleList.length == 0 ?
                  (<button
                    class=""
                    onClick={() => {
                      setShowTeamScheduleModal(true);
                    }}
                  >
                    ??? ????????? ??????{">"}
                  </button>)
                  :
                  (<button
                    class=""
                    onClick={() => {
                      setShowTeamScheduleModal(true);
                    }}
                  >
                    ??? ????????? ??????{">"}
                  </button>)

              )}
          </div>
          {isModify ? (
            loadingComplete ?
              (
                <>
                  <div class="w-full mt-6 min-h-[60rem] border border-gray-300 bg-white text-lg font-ltest min-w-[20rem] ">
                    <ProjectEditor
                      setContent={setContent}
                      isModify={isModify}
                      content={content}
                    />
                  </div>
                  <div class="mt-4 flex justify-end">
                    <button
                      class="bg-gray-600 text-white border rounded-lg px-4 py-2"
                      onClick={() => {
                        modifyHandler();
                      }}
                    >
                      ????????????
                    </button>
                  </div>
                </>
              )
              :
              (<div>?????????...</div>)
          ) : (
            <>
              <div class="w-full mt-6 min-h-[60rem] border border-gray-300 bg-white text-lg font-ltest min-w-[20rem] ">
                <ProjectEditor
                  content={content}
                  setContent={setContent}
                  isModify={isModify}
                />
              </div>
              <div class="mt-4 flex justify-end">
                <button
                  class="bg-gray-600 text-white border rounded-lg px-4 py-2"
                  onClick={() => {
                    saveHandler();
                  }}
                >
                  ????????????
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectWriting;
