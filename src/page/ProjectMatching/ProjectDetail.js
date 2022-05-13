import { React, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import profileImage from "../../assets/img/profile.jpg";

function ProjectDetail() {
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
    "절대 잠수타지 않고 끝까지 책임감 있게 함께 지속해나갈 팀원을 구합니다. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절. 잠수 사절. 잠수 사절. 잠수 사절.  잠수 사절. 잠수 사절. 잠수 사절.잠수 사절.";
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
            <div class="flex mt-4">
              <div class="text-2xl font-btest">
                개발자 도움 웹 서비스를 함께 만들어나갈 팀원을 구합니다.
              </div>
              <div class="ml-4 w-fit px-3 bg-green-300 text-black">모집중</div>
            </div>
            <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>

            <div class="flex">
              <div class="mt-4 w-3/4">
                <div
                  className="Writing"
                  class="flex border-b bg-white h-54 py-5 gap-5"
                >
                  <div class="w-[47rem]">
                    <div class="flex">
                      <div>
                        <div class="bg-gray-300 w-56 h-72 mb-2">사진</div>
                      </div>
                      <div class="ml-10">
                        <div class="text-bluepurple text-lg">팀명 <a class="text-base ml-3 text-black">델리만쥬</a></div>
                        <div class="text-bluepurple text-lg">프로젝트명 <a class="text-base ml-3 text-black">프로포폴 - 개발자 경력 개발 도움 웹 서비스</a></div>
                        <div class="text-bluepurple text-lg">사용 기술 <a class="text-base ml-3 text-black">Java, JavaScript, Spring</a></div>
                        <div class="text-bluepurple text-lg">모집 인원 <a class="text-base ml-3 text-black">4명</a></div>
                        <div class="text-bluepurple text-lg">프로젝트 기간 <a class="text-base ml-3 text-black">2022.06.01~2022.09.01</a></div>
                        <div class="text-bluepurple text-lg">모집 분야<a class="text-base ml-3 text-black">Web Service</a></div>
                        <div class="text-bluepurple text-lg">가능 시간</div>
                        <div>월요일 화요일 15:00~16:30</div>
                        <div>수요일 목요일 16:00~18:30</div>
                        <div>금요일 토요일 일요일 18:00~16:30</div>
                      </div>
                    </div>

                    <div class="mt-4 font-ltest">{tmpDetail}</div>

                  </div>

                </div>
              </div>
              <div class="ml-5 w-1/4 py-5">

                <div class="mt-10 mb-4 text-xl font-btest">팀장 정보</div>

                <div class="bg-gray-100 py-4 px-4 rounded-lg">
                  <div class="flex mt-2">
                    <div className="ProfileImage" class=" w-14 h-14 rounded-full">
                      <img
                        src={profileImage}
                        class="w-14 h-14 rounded-full drop-shadow-lg"
                        alt="profile"
                      />
                    </div>
                    <div class="ml-4 my-auto text-2xl font-btest">신유진</div>
                  </div>
                  <div class="mt-4 text-sm font-ltest">안녕하세요.
                    저는 개발자 신유진입니다. 개발을 저의 인생 모토로 삼아 일일 공부를
                    목표로 하여 TIL 블로그를 운영하고 있습니다. 사람들에게 더 편리한
                    UI를 제공하는 것을 목표로 삼아 멋진 디자인을 만드는 프론트엔드
                    디자이너가 되기 위해 오늘도 달리는 중입니다. :D</div>
                </div>
                <button class="ml-6 mt-4 font-ltest text-sm"> 팀장의 포트폴리오 확인하기 ></button>
                <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
                <button class="mt-4 border text-md rounded-lg w-full py-2">지원하기</button>
                <div class="mt-6 text-lg font-btest">현재 참여 중인 팀원</div>
                <div class="mt-3">
                  <div class="flex mb-2">
                    <div className="ProfileImage" class=" w-6 h-6 rounded-full">
                      <img
                        src={profileImage}
                        class="w-6 h-6 rounded-full drop-shadow-lg"
                        alt="profile"
                      />
                    </div>
                    <div class="ml-2 my-auto font-btest">최영찬</div>
                  </div>
                  <div class="flex mb-2">
                    <div className="ProfileImage" class="w-6 h-6 rounded-full">
                      <img
                        src={profileImage}
                        class="w-6 h-6 rounded-full drop-shadow-lg"
                        alt="profile"
                      />
                    </div>
                    <div class="ml-2 my-auto font-btest">최영찬</div>
                  </div>
                  <div class="flex mb-2">
                    <div className="ProfileImage" class="w-6 h-6 rounded-full">
                      <img
                        src={profileImage}
                        class="w-6 h-6 rounded-full drop-shadow-lg"
                        alt="profile"
                      />
                    </div>
                    <div class="ml-2 my-auto font-btest">최영찬</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
