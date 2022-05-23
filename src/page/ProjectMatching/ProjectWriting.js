import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { SERVER_URL } from "../../utils/SRC";
import { TagModal, TeamScheduleModal } from "../../Component/Modal";
import "react-datepicker/dist/react-datepicker.css";
import ProjectEditor from "../../Component/ProjectEditor";
import axios from "axios";

function ProjectWriting() {
  let isModify = false;
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const writingNo = searchParams.get('No');
  const navigate = useNavigate();
  const tagList = [
    "JAVA",
    "Spring",
    "C++",
    "JavaScript",
    "C#",
    "C",
    "Python",
    "냠냠",
    "ㅁㄴㅇ",
    "울랄라",
    "언어1",
    "언어2",
  ];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recruit, setRecruit] = useState("");

  const [showTagMoadl, setShowTagModal] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);

  const [project, setProject] = useState({});
  const [showTeamScheduleModal, setShowTeamScheduleModal] = useState(false);
  const [teamScheduleList, setTeamScheduleList] = useState([]);

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
      tmpInfo.detail = tmpInfo.detail.replace(tmpimgsrc[i], tmploadbyte[i]);
    }
    //console.log("달라진 디테일은~");
    await setProject(tmpInfo);
    console.log(tmpInfo);
    await setLoadingComplete(true);
  };

  function findImage(isUpdated, imgByteList, imgByteTypeList) {
    //content 내부의 image를 string 검색으로 찾아냄.
    //해당 이미지들을 imgByteList에 push하고, 해당 이미지의 type들도 imgByteTypeList에 push함.
    // --> imgByteList , imgByteTypeList
    let start = 0;
    let end = 0;
    let k = 0;
    let tmpContent;
    //
    tmpContent = content;

    if (isUpdated || !(isModify)) { //만약 업데이트가 되었거나, props.isModify가 거짓일 경우(글 수정이 아니라 작성 중일 경우)
      tmpContent = content; //tmpContent에 content 넣어줌.
    }
    else { // 글 수정중이고, 업데이트도 되지 않았을 경우
      tmpContent = project.detail; //props.loadWritingInfo에서 받아온 기존 글의 detail을 넣어줌.
    }

    while (tmpContent.indexOf('<img src="data:image/', end) != -1) {
      start = tmpContent.indexOf('<img src="data:image/', end);
      end = tmpContent.indexOf(">", start);
      imgByteList.push(tmpContent.slice(start + 10, end - 1));
      imgByteTypeList.push(
        imgByteList[k].slice(11, imgByteList[k].indexOf(";", 11))
      );
      console.log(k + "번째고 저는 이미지바이트에용");
      console.log(start);
      console.log(end);
      console.log(imgByteList[k]);
      console.log(imgByteTypeList[k]);
      k++;
    }
  }

  function makeImageFileStruct(imgByteList, imgByteTypeList, formData_Image) {
    //파일 구조체 만듦
    //findImage 이후에 호출함. findImage에서 이미지 base64값을 넣은 imgByteList의 값들을 통해 File 객체를 만듦.
    //해당 File 객체들은 formData_Image에 append됨. --> 이후 backend에 axios를 통해 전달.
    let fileName = [];
    console.log("하이!!!!");
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
      console.log("파일 구조체 만드는중~!");
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
    // saveHandler와 동일하게 정보를 보냄. 
    // 기존 내용에서 수정되지 않았을 경우를 if문으로 처리해줌.
    // 이미지를 보낼 때 boardId도 함께 보내줌. 
    const formData_Save = new FormData();
    const formData_Image = new FormData();
    let imgByteList = [];
    let imgByteTypeList = [];
    console.log("모디파이핸들러입니다!! 안녕하세요><");
    console.log(content);
    console.log(title);
    if (content == "") { // content에 변화가 없어 setState로 관리되는 htmlContent가 비어있을 때 
      await findImage(false, imgByteList, imgByteTypeList); // findImage에 내용 변화가 없었음을 전달
    }
    else { // 내용 변화가 있었을 경우
      await findImage(true, imgByteList, imgByteTypeList); // findImage에 내용 변화가 있었음을 전달
    }
    await makeImageFileStruct(imgByteList, imgByteTypeList);
    if (title == "") { formData_Save.append('title', project.title); } // 제목에 변화가 없었을 시 기존 제목 formData_Save에 넣어줌.
    else { formData_Save.append('title', title); }
    //
    if (startDate == null) { formData_Save.append("startDate", project.startDate); }
    else { formData_Save.append("startDate", dateToString(startDate)); }
    if (endDate == null) { formData_Save.append("startDate", project.startDate); }
    else { formData_Save.append("endDate", dateToString(endDate)); }
    if (recruit == "") { formData_Save.append("recruit", project.recruit); }
    else { formData_Save.append("recruit", recruit); }
    if (selectedTagList.length == 0) {
      formData_Save.append("tagId", project.tags); //이거 이름 맞나? 내일 확인해보기
    }
    else {
      selectedTagList.map((item) => {
        tmpTagIdList.push(item.id);
      });
      formData_Save.append("tagId", tmpTagIdList);
    }
    /* 그러고보니 수정할 때는 시간표 생성 막아야하지 않나? 그럼 시간표는 axios로 보내면 안될듯..... 내일 백이랑 얘기해보기!!!
        if (teamScheduleList.length == 0) {
    
        }
        else {
          teamScheduleList.map((item) => {
            formData_Save.append("startTime", item.startTime);
            formData_Save.append("endTime", item.endTime);
            formData_Save.append("week", item.week);
          });
        }
        */
    //
    if (imgByteList.length != 0) {
      let htmlContent_after;
      formData_Image.append('boardId', project.id);
      await axios
        .post(SERVER_URL + "/matching-service/api/v1/boards/image", formData_Image)
        .then((res) => {
          console.log(res);
          let tmpUrlList = [];
          let tmpNameList = [];
          res.data.data.map((result) => {
            let IMG_URL = result.toString().replace("http://localhost:8000", SERVER_URL);
            let imageName = result.toString().replace("http://localhost:8000/til-service/api/v1/images/", "");
            console.log("유알엘 : " + IMG_URL);
            console.log("이름 : " + imageName);
            tmpUrlList.push(IMG_URL);
            tmpNameList.push(imageName);
          })
          tmpNameList.map((fileName) => {
            formData_Save.append('fileName', fileName);
            console.log("fileName = " + fileName);
          })

          if (content == "") { // 내용 수정이 없었을 시, props.loadWritingInfo.detail에서 image src 교체
            console.log("내용수정이 없었네용~ prevContent는 " + project.content);
            htmlContent_after = project.content;
          }
          else {
            htmlContent_after = content;
          }
          for (let i = 0; i < tmpUrlList.length; i++) {
            htmlContent_after = htmlContent_after.toString().replace(imgByteList[i], tmpUrlList[i]);
          }
          formData_Save.append('content', htmlContent_after);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    }
    else { //이미지가 없을 시
      console.log("이미지 리스트가 없어용~");
      console.log(content);
      if (content == "") { // 내용 변화가 없었으므로 기존 내용을 formData_save에 'content' 키값으로 저장
        console.log("내용수정이 없었네용~ prevContent는 " + project.content);
        formData_Save.append('content', project.content);
      } else { //, 기존 htmlContent를 그대로 formData_save에 'content' 키값으로 저장
        formData_Save.append('content', content);
      }
    }
    let tmpTagIdList = [];
    selectedTagList.map((item) => {
      tmpTagIdList.push(item.id);
    })
    console.log(tmpTagIdList);
    formData_Save.append('tagId', tmpTagIdList);
    await axios
      .post(SERVER_URL + "/matching-service/api/v1/boards/" + project.id, formData_Save)
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


  async function saveHandler() {
    const formData_Save = new FormData();
    const formData_Image = new FormData();
    console.log(content);
    let tmpTagIdList = [];
    selectedTagList.map((item) => {
      tmpTagIdList.push(item.id);
    });
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
          SERVER_URL + "/matching-service/api/v1/matchings/images",
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
            //formData_Save에 파일 이름(백에 저장된 이름) 저장
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
    console.log(formData_Save.getAll("startTime"));
    console.log(formData_Save.getAll("endTime"));
    console.log(formData_Save.getAll("week"));
    console.log("플젝을 저장해볼까나~");

    await axios
      .post(SERVER_URL + "/matching-service/api/v1/matchings", formData_Save)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const onTagButtonClickHandler = (e) => {
    if (e.target.value == "-1") return;
    if (checkedTagList.length >= 3 && isTagChecked[e.target.value] == false) {
      setIsTagFull(true);
      return;
    }
    let t = isTagChecked;
    e.target.checked = true;
    t[e.target.value] = !t[e.target.value];
    setIsTagChecked(t);
    let t_c = checkedTagList;
    if (isTagChecked[e.target.value] == true) {
      t_c.push(e.target.name);
      setCheckedTagList(t_c);
    } else if (isTagChecked[e.target.value] == false) {
      setCheckedTagList(t_c.filter((tagname) => tagname !== e.target.name));
      setIsTagFull(false);
    }
    console.log(checkedTagList);
    setTmp(!tmp);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      navigate("/blog/search");
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
        console.log("^^tmpInfo는");
        console.log(tmpInfo);
        //console.log(wrInfo);
        loadImage(tmpInfo);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  useEffect(() => {
    if (writingNo != null) {
      isModify = true;
      loadProjectDetail();
      console.log("수정중이에요!");
      console.log("글 정보는~");
      if (isModify) {
        console.log("글 불러오는 중...");
        //loadWritings();
        console.log("불러온 글 정보는~");
        //console.log(wrInfo);
      }
    }
    let t = [];
    for (let i = 0; i < tagList.length; i++) {
      t.push(false);
    }
    console.log(t);
    setIsTagChecked(t);
    console.log(isTagChecked);
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
          <div class="flex ">
            <div class="h-12 w-1/2">
              <div class="flex gap-2 content-center bg-gray-50 rounded-lg border border-slate-300 px-2 py-2 ">
                <div class="self-center ml-2">🔍</div>
                <select class="text-gray-400 text-lg appearance-none focus:outline-none bg-transparent">
                  <input
                    placeholder="제목"
                    class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTitle(e.target.value);
                    }}
                  />
                </select>
                <div class="h-6 my-auto border-l border-gray-300 z-10"></div>
                <div class="flex rounded-lg items-center font-ltest text-bluepurple text-sm bg-develbg px-2">
                  <div>{ }</div>
                  <button
                    class="ml-2"
                    name=""
                    value=""
                    onClick={onTagButtonClickHandler}
                  >
                    x
                  </button>
                </div>
                <input
                  class="bg-gray-50 grow focus:outline-0 text-gray-500 ml-2"
                  type="text"
                  onKeyPress={keyPressHandler}
                  placeholder={
                    checkedTagList.length == 0
                      ? "원하는 프로젝트를 검색해 보세요!"
                      : null
                  }
                />
              </div>
            </div>
            <div class="flex content-center gap-4 text-lg font-ltest mt-1 h-10 ml-3">
              <div class="self-center">#</div>
              {tagList.slice(0, 3).map((tag, index) => {
                return (
                  <button
                    class={
                      isTagChecked[index] == true
                        ? "border text-base rounded-lg w-[6rem] bg-develbg border-bluepurple text-bluepurple"
                        : "border text-md rounded-lg w-[6rem]"
                    }
                    name={tag}
                    value={index}
                    onClick={onTagButtonClickHandler}
                  >
                    {tag}
                  </button>
                );
              })}
              <select
                class="border text-md rounded-lg w-[6rem]"
                onChange={onTagButtonClickHandler}
              >
                <option
                  value="-1"
                  class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
                >
                  선택
                </option>
                {tagList.slice(8, tagList.length).map((tag, index) => {
                  return (
                    <option class="text-center" name={tag} value={index + 8}>
                      {tag}
                    </option>
                  );
                })}
              </select>
            </div>
            {isTagFull ? (
              <div class="absolute text-sm font-ltest ml-3 mt-2 text-bluepurple">
                태그는 최대 3개까지 선택할 수 있습니다.
              </div>
            ) : null}
          </div>
          <div class="mt-4 flex">
            <p>
              <input class="w-3 h-3" type="checkbox" id="timetable" />{" "}
              <label class="ml-2" for="timetable">
                시간표 기반
              </label>
            </p>
          </div>
          <div class="mt-4 text-2xl font-btest">새 프로젝트 생성하기</div>
          <div class="mt-4">
            <input
              class="w-full py-2 px-3 border bg-gray-50 focus:outline-0 text-lg font-ltest"
              placeholder="제목"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div class="flex items-center gap-5 mt-4">
            <div class="text-lg text-gray-600 font-ltest">#태그</div>
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
                placeholderText="시작 날짜"
              />
            </div>
            <div class="mt-4 w-1/3 border border-gray-300">
              <DatePicker
                selected={endDate}
                dateFormat="yyyy-MM-dd"
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
                shouldCloseOnSelect={false}
                placeholderText="종료 날짜"
              />
            </div>
            <div class="mt-4 w-1/3 py-2 px-2 border border-gray-300">
              <input
                class="focus:outline-0"
                placeholder="모집 인원"
                onChange={(e) => setRecruit(e.currentTarget.value)}
              />
            </div>
          </div>
          <div class="mt-4 flex text-lg text-gray-600 font-ltest justify-start gap-10">
            {teamScheduleList.length == 0 ?
              (<button
                class=""
                onClick={() => {
                  setShowTeamScheduleModal(true);
                }}
              >
                팀 시간표 생성{">"}
              </button>)
              :
              (<button
                class=""
                onClick={() => {
                  setShowTeamScheduleModal(true);
                }}
              >
                팀 시간표 조회{">"}
              </button>)}
          </div>
          {isModify ? (
            loadingComplete ?
              (
                <>
                  <div class="w-full mt-6 min-h-[60rem] border border-gray-300 bg-white text-lg font-ltest min-w-[20rem] ">
                    <ProjectEditor
                      setContent={setContent}
                      isModify={isModify}
                      loadedProject={project}
                    />
                  </div>
                  <div class="mt-4 flex justify-end">
                    <button
                      class="bg-gray-600 text-white border rounded-lg px-4 py-2"
                      onClick={() => {
                        modifyHandler();
                      }}
                    >
                      수정하기
                    </button>
                  </div>
                </>
              )
              :
              (<div>로딩중...</div>)
          ) : (
            <>
              <div class="w-full mt-6 min-h-[60rem] border border-gray-300 bg-white text-lg font-ltest min-w-[20rem] ">
                <ProjectEditor
                  setContent={setContent}
                  isModify={isModify}
                  loadedProject={project}
                />
              </div>
              <div class="mt-4 flex justify-end">
                <button
                  class="bg-gray-600 text-white border rounded-lg px-4 py-2"
                  onClick={() => {
                    saveHandler();
                  }}
                >
                  등록하기
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
