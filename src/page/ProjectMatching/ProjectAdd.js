import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { SERVER_URL } from "../../utils/SRC";
import { TagModal, TeamScheduleModal } from "../../Component/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import ProjectEditor from "../../Component/ProjectEditor";
import axios from "axios";

let tmpSkillList = [];

function ProjectAdd() {
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
    const [isTC, setIsTC] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isTagChecked, setIsTagChecked] = useState([]);
    const [isTagFull, setIsTagFull] = useState(false);
    const [checkedTagList, setCheckedTagList] = useState([]);
    const formData = new FormData();
    const [tmp, setTmp] = useState(false);

    const [skillsAdd, setSkillsAdd] = useState(false);
    const [skillInput, setSkillInput] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [recruit, setRecruit] = useState("");

    const [showTagMoadl, setShowTagModal] = useState(false);
    const [selectedTagList, setSelectedTagList] = useState([]);

    const [imageFileList, setImageFileList] = useState([]);

    const [showTeamScheduleModal, setShowTeamScheduleModal] = useState(false);
    const [teamScheduleList, setTeamScheduleList] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [selectedWeek, setSelectedWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    let tmpDetail =
        "절대 잠수타지 않고 끝까지 책임감 있게 함께 지속해나갈 팀원을 구합니다. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절.";

    function dateToString(prevdate) {
        let year, month, date;
        year = prevdate.getFullYear();
        if (prevdate.getMonth() < 10) {
            month = "0" + (prevdate.getMonth() + 1);
        }
        else {
            month = prevdate.getMonth();
        }
        if (prevdate.getDate() < 10) {
            date = "0" + prevdate.getDate();
        }
        else {
            date = prevdate.getDate();
        }
        return year + "-" + month + "-" + date;
    }

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
        /*
        if (isUpdated || !(props.isModify)) { //만약 업데이트가 되었거나, props.isModify가 거짓일 경우(글 수정이 아니라 작성 중일 경우)
            tmpContent = content; //tmpContent에 content 넣어줌.
        }
        else { // 글 수정중이고, 업데이트도 되지 않았을 경우
            //tmpContent = props.loadWritingInfo.detail; //props.loadWritingInfo에서 받아온 기존 글의 detail을 넣어줌.
        }
        */
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
            let imgB = imgByteList[i].replace("data:image/" + imgByteTypeList[i] + ";base64,", "");
            let bstr = atob(imgB);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            console.log("파일 구조체 만드는중~!");
            console.log(u8arr);
            let file = new File([u8arr], fileName[i] + "." + imgByteTypeList[i], { type: 'image/' + imgByteTypeList[i], lastModified: new Date() });
            console.log(imgB);
            //console.log(file);
            formData_Image.append('file', file);
            console.log(formData_Image.get('file'));
        }
    }


    async function saveHandler() {
        const formData_Save = new FormData();
        const formData_Image = new FormData();
        console.log(content);
        let tmpTagIdList = [];
        selectedTagList.map((item) => {
            tmpTagIdList.push(item.id);
        })
        //
        let imgByteList = [];
        let imgByteTypeList = [];
        await findImage(true, imgByteList, imgByteTypeList);
        console.log(imgByteList);
        await makeImageFileStruct(imgByteList, imgByteTypeList, formData_Image);
        console.log(formData_Image.getAll('file'));
        //

        if (formData_Image.getAll('file').length != 0) {
            await axios.post(SERVER_URL + "/matching-service/api/v1/matchings/images", formData_Image)
                .then((res) => {
                    console.log(res);
                    let content_after = content;
                    let tmpUrlList = [];
                    let tmpNameList = [];
                    res.data.data.map((result) => {
                        let IMG_URL = result.toString().replace("http://localhost:8000", SERVER_URL);
                        let imageName = result.toString().replace("http://localhost:8000/til-service/api/v1/images/", "");
                        tmpUrlList.push(IMG_URL);
                        tmpNameList.push(imageName);
                    })
                    tmpNameList.map((fileName) => { //formData_Save에 파일 이름(백에 저장된 이름) 저장
                        formData_Save.append('fileName', fileName);
                        console.log("fileName = " + fileName);
                    })
                    for (let i = 0; i < tmpUrlList.length; i++) {
                        content_after = content_after.toString().replace(imgByteList[i], tmpUrlList[i]);
                    }
                    formData_Save.append('content', content_after);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        console.log(formData_Save.get('content'));
        formData_Save.append('title', title);
        formData_Save.append('startDate', dateToString(startDate));
        formData_Save.append('endDate', dateToString(endDate));
        formData_Save.append('recruit', recruit);
        formData_Save.append('tagId', tmpTagIdList);
        teamScheduleList.map((item) => {
            formData_Save.append('startTime', item.startTime);
            formData_Save.append('endTime', item.endTime);
            formData_Save.append('week', item.week);
        })
        console.log(formData_Save.getAll('startTime'));
        console.log(formData_Save.getAll('endTime'));
        console.log(formData_Save.getAll('week'));
        console.log(formData.get('file'));
        console.log("플젝을 저장해볼까나~");

        await axios.post(SERVER_URL + "/matching-service/api/v1/matchings", formData_Save)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const onSkillInputHandler = (event) => {
        let tmpSkill = skillInput;
        tmpSkillList.push(tmpSkill);
        console.log(tmpSkill);
        setSkillsAdd(false);
    };


    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            onSkillInputHandler(event);
        }
    };

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

    useEffect(() => {
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
            {showTagMoadl ?
                (<TagModal
                    setShowTagModal={setShowTagModal}
                    selectedTagList={selectedTagList}
                    setSelectedTagList={setSelectedTagList}
                />)
                :
                (null)
            }
            {showTeamScheduleModal ?
                (<TeamScheduleModal
                    setShowTeamScheduleModal={setShowTeamScheduleModal}
                    setTeamScheduleList={setTeamScheduleList}
                />)
                :
                (null)}
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
                                {
                                /*
                                tagList.map((tag, index) => {
                                    if (isTagChecked[index]) {
                                        return (
                                            <div class="flex rounded-lg items-center font-ltest text-bluepurple text-sm bg-develbg px-2">
                                                <div>{tag}</div>
                                                <button
                                                    class="ml-2"
                                                    name={tag}
                                                    value={index}
                                                    onClick={onTagButtonClickHandler}
                                                >
                                                    x
                                                </button>
                                            </div>
                                        );
                                    }
                                })
                            */}
                                <input
                                    class="bg-gray-50 grow focus:outline-0 text-gray-500 ml-2"
                                    type="text"
                                    onKeyPress={keyPressHandler}
                                    placeholder={checkedTagList.length == 0 ? "원하는 프로젝트를 검색해 보세요!" : null}
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
                    <div class="mt-4 text-2xl font-btest">
                        새 프로젝트 생성하기
                    </div>
                    <div class="mt-4 border">
                        <input
                            class="w-full py-2 px-3 border bg-gray-50 focus:outline-0 text-lg font-ltest"
                            placeholder="제목"
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div class="flex items-center gap-5 mt-2">
                        {selectedTagList.map((item) => {
                            return (
                                <div class="w-1/6 mt-2 py-2 px-4 border border-indigo-300 text-indigo-400 rounded-xl text-center bg-indigo-50 text-lg font-test min-w-[8rem]">
                                    {item.name}
                                </div>
                            );
                        })}
                        <button
                            class="text-center w-1/6 mt-2 py-2 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-test min-w-[8rem]"
                            onClick={() => {
                                setShowTagModal(true);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <div class="mt-6 px-4 border rounded-lg border-gray-300"></div>
                    <div class="flex gap-2">
                        <div class="mt-4 w-1/3 border rounded-lg border-gray-300">
                            <DatePicker
                                selected={startDate}
                                dateFormat="yyyy-MM-dd"
                                onChange={date => setStartDate(date)}
                                shouldCloseOnSelect={false}
                                placeholderText="시작 날짜" />
                        </div>
                        <div class="mt-4 w-1/3 border rounded-lg border-gray-300">
                            <DatePicker
                                selected={endDate}
                                dateFormat="yyyy-MM-dd"
                                minDate={startDate}
                                onChange={date => setEndDate(date)}
                                shouldCloseOnSelect={false}
                                placeholderText="종료 날짜" />
                        </div>
                        <div class="mt-4 w-1/3 py-2 px-2 border rounded-lg border-gray-300">
                            <input
                                class="focus:outline-0"
                                placeholder="모집 인원"
                                onChange={(e) => setRecruit(e.currentTarget.value)}
                            />
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end gap-10">
                        <button
                            class=""
                            onClick={() => {
                                setShowTeamScheduleModal(true);
                            }}
                        >팀 시간표 생성</button>
                    </div>
                    <div class="w-full mt-6 min-h-[60rem] border border-gray-300 bg-white text-lg font-ltest min-w-[20rem] ">
                        <ProjectEditor
                            setContent={setContent}
                        />
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button
                            class="bg-gray-600 text-white border rounded-lg px-4 py-2"
                            onClick={() => { saveHandler() }}
                        >등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectAdd;
