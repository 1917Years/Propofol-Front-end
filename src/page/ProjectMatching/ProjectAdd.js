import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

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
    const [isTagChecked, setIsTagChecked] = useState([]);
    const [isTagFull, setIsTagFull] = useState(false);
    const [checkedTagList, setCheckedTagList] = useState([]);
    const [tmp, setTmp] = useState(false);

    let tmpDetail =
        "절대 잠수타지 않고 끝까지 책임감 있게 함께 지속해나갈 팀원을 구합니다. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절.";
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
                    <div class="mt-4 text-2xl font-btest">
                        새 프로젝트 생성하기
                    </div>
                    <div class="mt-4 border">
                        <input
                            class="w-full py-2 px-3 border bg-gray-50 focus:outline-0 text-lg font-ltest"
                            placeholder="제목"
                        />

                    </div>



                </div>
            </div>
        </div>
    );
}

export default ProjectAdd;
