import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import profileImage from "../../assets/img/profile.jpg";

function ProjectMyDetail() {
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
    const [isTagChecked, setIsTagChecked] = useState([]);
    const [isTagFull, setIsTagFull] = useState(false);
    const [checkedTagList, setCheckedTagList] = useState([]);
    const [tmp, setTmp] = useState(false);
    const id = useParams().id;

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
            <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2">
                <div class="relative my-10">
                    <div class="flex ">
                        <div class="h-12 w-1/2">
                            <div class="flex gap-2 content-center bg-gray-50 rounded-lg border border-slate-300 px-2 py-2 ">
                                <div class="self-center ml-2">🔍</div>
                                <select class="text-gray-400 text-lg appearance-none focus:outline-none bg-transparent">
                                    <option
                                        value="제목"
                                        class="hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
                                    >
                                        제목
                                    </option>
                                </select>
                                <div class="h-6 my-auto border-l border-gray-300 z-10"></div>
                                {tagList.map((tag, index) => {
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
                                })}
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
                    <div class="mt-6 px-4 border rounded-lg border-gray-300">
                        <div class="flex mt-4 gap-4">
                            <div class="text-2xl font-btest w-fit">
                                개발자 도움 웹 서비스를 함께 만들어나갈 팀원을 구합니다.
                            </div>
                        </div>
                        <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
                        <div class="mt-2 w-full flex justify-end gap-4">
                            <button>프로젝트 수정 {">"} </button>
                            <button>프로젝트 삭제 {">"} </button>
                        </div>
                        <div class="text-xl font-btest mb-4">지원님, 이런 인재들은 어떠신가요?</div>
                        <div class="px-4 py-4 flex mt-2 border rounded-lg">
                            <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                <img
                                    src={profileImage}
                                    class="w-28 h-28 rounded-full drop-shadow-lg"
                                    alt="profile"
                                />
                            </div>
                            <div class="ml-4 my-auto ">
                                <div class="text-2xl font-btest">신유진</div>
                                <div class="tont-ltest pt-1 text-sm">UI/UX Designer</div>
                                <div class="mt-2 text-sm font-test text-black">💬 안녕하세요, 프론트 디자이너입니다. </div>
                                <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>
                            </div>
                            <div class="ml-auto text-right text-sm">
                                <div class="text-bluepurple text-base">기술</div>
                                <div class=" ml-3 text-black">React, Javascript</div>
                                <div class="text-bluepurple text-base mt-1">가능 시간</div>
                                <div>월요일 화요일 15:00~16:30</div>
                                <div>수요일 목요일 16:00~18:30</div>
                                <div>금요일 토요일 일요일 18:00~16:30</div>
                            </div>
                        </div>
                        <div class="px-4 py-4 flex mt-2 mb-4 border rounded-lg">
                            <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                <img
                                    src={profileImage}
                                    class="w-28 h-28 rounded-full drop-shadow-lg"
                                    alt="profile"
                                />
                            </div>
                            <div class="ml-4 my-auto ">
                                <div class="text-2xl font-btest">최영찬</div>
                                <div class="tont-ltest pt-1 text-sm">Backend Developer</div>
                                <div class="mt-2 text-sm font-test text-black">💬 안녕하세요, 백엔드 디자이너입니다.</div>
                                <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>
                            </div>
                            <div class="ml-auto text-right text-sm">
                                <div class="text-bluepurple text-base">기술</div>
                                <div class="ml-3 text-black">Spring, Java</div>

                                <div class="text-bluepurple text-base mt-1">가능 시간</div>
                                <div>월요일 화요일 12:00~16:30</div>
                                <div>목요일 13:00~18:30</div>
                                <div>일요일 19:00~16:30</div>
                            </div>
                        </div>

                        <div class="text-xl font-btest mt-10 mb-4">📢 본 프로젝트에 지원한 팀원들이에요. 어서 확인해보세요! </div>
                        <div class="flex gap-3">
                            <div class="px-4 py-4 flex mt-2 border rounded-lg w-5/6">
                                <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                    <img
                                        src={profileImage}
                                        class="w-28 h-28 rounded-full drop-shadow-lg"
                                        alt="profile"
                                    />
                                </div>
                                <div class="ml-4 my-auto ">
                                    <div class="text-2xl font-btest">신유진</div>
                                    <div class="tont-ltest pt-1 text-sm">UI/UX Designer</div>
                                    <div class="mt-2 text-sm font-test text-black">💬 안녕하세요, 저를 뽑아주세요. 잠수는 절대 안 탑니다. </div>
                                    <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>
                                </div>
                                <div class="ml-auto text-right text-sm">
                                    <div class="text-bluepurple text-base">기술</div>
                                    <div class=" ml-3 text-black">React, Javascript</div>
                                    <div class="text-bluepurple text-base mt-1">가능 시간</div>
                                    <div>월요일 화요일 15:00~16:30</div>
                                    <div>수요일 목요일 16:00~18:30</div>
                                    <div>금요일 토요일 일요일 18:00~16:30</div>
                                </div>
                            </div>
                            <div class="grow flex flex-col gap-4 mt-2 justify-center mb-4">
                                <button class="basis-1/2 px-4 py-2 rounded-lg bg-gray-500 text-white">수락</button>
                                <button class="basis-1/2 px-4 py-2 rounded-lg bg-gray-500 text-white">거절</button>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <div class="px-4 py-4 flex mt-2 mb-4 border rounded-lg w-5/6">
                                <div className="ProfileImage" class="my-auto mx-4 w-28 h-28 rounded-full">
                                    <img
                                        src={profileImage}
                                        class="w-28 h-28 rounded-full drop-shadow-lg"
                                        alt="profile"
                                    />
                                </div>
                                <div class="ml-4 my-auto ">
                                    <div class="text-2xl font-btest">최영찬</div>
                                    <div class="tont-ltest pt-1 text-sm">Backend Developer</div>
                                    <div class="mt-2 text-sm font-test text-black">💬 안녕하세요, "혁준"하지 않겠습니다. </div>
                                    <button class="mt-1 font-test text-sm">📄 포트폴리오 확인하기 {">"}</button>
                                </div>
                                <div class="ml-auto text-right text-sm">
                                    <div class="text-bluepurple text-base">기술</div>
                                    <div class="ml-3 text-black">Spring, Java</div>

                                    <div class="text-bluepurple text-base mt-1">가능 시간</div>
                                    <div>월요일 화요일 12:00~16:30</div>
                                    <div>목요일 13:00~18:30</div>
                                    <div>일요일 19:00~16:30</div>
                                </div>
                            </div>
                            <div class="grow flex flex-col gap-4 mt-2 justify-center mb-4">
                                <button class="basis-1/2 px-4 py-2 rounded-lg bg-gray-500 text-white">수락</button>
                                <button class="basis-1/2 px-4 py-2 rounded-lg bg-gray-500 text-white">거절</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProjectMyDetail;
