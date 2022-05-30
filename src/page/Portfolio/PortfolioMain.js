import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import profileImage from "../../assets/img/profile.jpg";
import { TagModal, TeamScheduleModal } from "../../Component/Modal";
import { isCompositeComponent } from "react-dom/test-utils";

let tmpSkillList = [];
let tmpWorkList = [];
let tmpAwardList = [];
let tmpPrjSkillsList = [];
let tmpPrjList = [];
let tmpPrjImgList = [];

function PortfolioMain() {
  const [skillsAdd, setSkillsAdd] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [workNameInput, setWorkNameInput] = useState(null);
  const [workDetailInput, setWorkDetailInput] = useState(null);
  const [workStart, setWorkStart] = useState(null);
  const [workEnd, setWorkEnd] = useState(null);
  const [workAdd, setWorkAdd] = useState(false);

  const [awardDate, setAwardDate] = useState(null);
  const [awardName, setAwardName] = useState(null);
  const [awardAdd, setAwardAdd] = useState(false);

  const [prjName, setPrjName] = useState(null);
  const [prjImg, setPrjImg] = useState(null);
  const [prjImgList, setPrjImgList] = useState([]);
  const [prjDevStart, setPrjDevStart] = useState(null);
  const [prjDevEnd, setPrjDevEnd] = useState(null);
  const [prjDev, setPrjDev] = useState(null);
  const [prjSkillsList, setPrjSkillsList] = useState([]);
  const [prjSkillInput, setPrjSkillInput] = useState(null);
  const [prjSkillsAdd, setPrjSkillsAdd] = useState(false);
  const [prjDetailInput, setPrjDetailInput] = useState(null);
  const [prjImageList, setPrjImageList] = useState([]);
  const [projectAdd, setProjectAdd] = useState(false);

  const [userInfo, setUserInfo] = useState([]);
  const [checkProfile, setCheckProfile] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [profileType, setProfileType] = useState();
  const [jobInput, setJobInput] = useState(null);
  const [githubInput, setGithubInput] = useState(null);
  const [introInput, setIntroInput] = useState(null);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [template, setTemplate] = useState(null);

  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkillList, setSelectedSkillList] = useState([]);

  const [checkCreate, setCheckCreate] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const [portfolioInfo, setPortfolioInfo] = useState([]);
  const [basicInfo, setBasicInfo] = useState([]);
  const [careerInfo, setCareerInfo] = useState([]);
  const [awardInfo, setAwardInfo] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);

  const [firstCareerInfo, setFirstCareerInfo] = useState([]);
  const [careerIndex, setCareerIndex] = useState(0);
  const [firstAwardInfo, setFirstAwardInfo] = useState([]);
  const [awardIndex, setAwardIndex] = useState(0);
  const [firstProjectInfo, setFirstProjectInfo] = useState([]);
  const [projectIndex, setProjectIndex] = useState(0);
  const [axiosFinish, setAxiosFinish] = useState(false);

  const [topRecommendPost, setTopRecommendPost] = useState([]);
  const [contentAfter, setContentAfter] = useState([]);
  const [dateAfter, setDateAfter] = useState([]);
  const [checkTopPost, setCheckTopPost] = useState(false);

  const navigate = useNavigate();
  const id = useParams().id;

  function htmlDetailToText(htmlContent) {
    let text = htmlContent.replace(/(<([^>]+)>)/gi, "");
    text = text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, (s) => {
      const entityMap = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      };
      return entityMap[s];
    });
    return text;
  }

  async function onWorkInputHandler() {
    if (checkCreate) {
      let tmpWork = {
        title: workNameInput,
        content: workDetailInput,
        startTerm: workStart,
        endTerm: workEnd,
      };
      tmpWorkList = tmpWork;
      console.log(tmpWork);

      await axios
        .post(
          SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/career",
          tmpWork
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setWorkNameInput(null);
      setWorkDetailInput(null);
      setWorkStart(null);
      setWorkEnd(null);
      setWorkAdd(false);
      onCareerGetHandler();
    } else {
      let tmpWork = {
        id: careerIndex,
        title: workNameInput,
        content: workDetailInput,
        startTerm: workStart,
        endTerm: workEnd,
        update: false,
        delete: false,
      };
      tmpWorkList.push(tmpWork);
      setFirstCareerInfo(tmpWorkList);
      setWorkAdd(false);
      setWorkNameInput(null);
      setWorkDetailInput(null);
      setWorkStart(null);
      setWorkEnd(null);
      setCareerIndex(careerIndex + 1);
      console.log(tmpWorkList);
    }
  }

  async function onAwardInputHandler() {
    if (checkCreate) {
      let tmpAward = {
        name: awardName,
        date: awardDate,
      };
      tmpAwardList = tmpAward;
      console.log(tmpAward);

      await axios
        .post(
          SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/award",
          tmpAward
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setAwardName(null);
      setAwardDate(null);
      setAwardAdd(false);
      onAwardGetHandler();
    } else {
      let tmpAward = {
        id: awardIndex,
        name: awardName,
        date: awardDate,
        update: false,
        delete: false,
      };
      tmpAwardList.push(tmpAward);
      setFirstAwardInfo(tmpAwardList);
      setAwardIndex(awardIndex + 1);

      setAwardName(null);
      setAwardDate(null);
      setAwardAdd(false);

      console.log(tmpAwardList);
    }
  }

  async function onProjectInputHandler() {
    if (checkCreate) {
      const formData = new FormData();
      let tmpProject = {
        title: prjName,
        content: prjDetailInput,
        job: prjDev,
        startTerm: prjDevStart,
        endTerm: prjDevEnd,
        projectSkills: selectedTagList,
        image: prjImg,
      };
      tmpPrjList = tmpProject;
      console.log(tmpProject);

      formData.append("portfolioId", id);
      formData.append("title", tmpProject.title);
      formData.append("content", tmpProject.content);
      formData.append("job", tmpProject.job);
      formData.append("startTerm", tmpProject.startTerm);
      formData.append("endTerm", tmpProject.endTerm);

      let tmpTag = [];
      selectedTagList.map((tag) => {
        tmpTag.push(tag.id);
      });
      formData.append("skills", tmpTag);

      prjImageList.map((image) => {
        formData.append("file", image);
      });

      console.log("이미지 리스트 확인~~");
      console.log(prjImageList);

      await axios
        .post(
          SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/project",
          formData
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setProjectAdd(false);
      setPrjName(null);
      setPrjDev(null);
      setPrjDevStart(null);
      setPrjDevEnd(null);
      setPrjSkillsList([]);
      setPrjDetailInput(null);
      setPrjImageList(null);
      tmpPrjImgList = [];

      // setPrjImg(null);
      // tmpPrjList = [];

      onProjectGetHandler();
    } else {
      let tmpProject = {
        id: projectIndex,
        title: prjName,
        content: prjDetailInput,
        job: prjDev,
        startTerm: prjDevStart,
        endTerm: prjDevEnd,
        projectSkills: selectedTagList,
        projectSkillsCount: selectedTagList.length,
        // projectSkills: prjSkillsList,
        // projectSkillsCount: prjSkillsList.length,
        image: prjImg,
      };

      console.log("태그가 잘 들어갔는지...?");
      // console.log(selectedTagList);
      // console.log(tmpProject.projectSkills);
      // console.log(tmpProject.projectSkillsCount);

      tmpPrjList.push(tmpProject);
      setFirstProjectInfo(tmpPrjList);

      setProjectAdd(false);
      setPrjName(null);
      setPrjDev(null);
      setPrjDevStart(null);
      setPrjDevEnd(null);
      setPrjSkillsList([]);
      setPrjDetailInput(null);
      setPrjImg(null);
      setProjectIndex(projectIndex + 1);
      console.log(tmpPrjList);
    }
  }

  const onSkillInputHandler = (event) => {
    let tmpSkill = skillInput;
    tmpSkillList.push(tmpSkill);
    console.log(tmpSkill);
    setSkillsAdd(false);
  };

  const onPrjSkillInputHandler = (event) => {
    console.log("태그리스트");
    let tmpSkills = {
      name: prjSkillInput,
    };
    tmpPrjSkillsList.push(tmpSkills);

    console.log(tmpPrjSkillsList);

    setPrjSkillsList(tmpPrjSkillsList);
    setPrjSkillsAdd(false);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onSkillInputHandler(event);
    }
  };

  const onProfileButtonHandler = (e) => {
    const myInput = document.getElementById("input-file");
    myInput.click();
  };

  const onProfileInputHandler = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);
    // console.log(e.target.files[0]);

    axios
      .post(SERVER_URL + "/user-service/api/v1/members/profile", formData)
      .then((res) => {
        console.log("프로필 이미지 확인ㅇㅇㅇ");
        console.log(res.data.data);
        setProfileType(res.data.data.profileType);
        setProfileImg(res.data.data.profileBytes);
        // console.log(profileType);
        // console.log(profileImg);
      })
      .catch((err) => {
        console.log(err);
        console.log("뭐야 ㅅㅄㅄ");
        console.log(err.request);
      });

    console.log("여기 찍힘???");
  };

  const onJobInputHandler = (e) => {
    setJobInput(e.target.value);
  };

  const onGithubInputHandler = (e) => {
    setGithubInput(e.target.value);
  };

  const onIntroInputHandler = (e) => {
    setIntroInput(e.target.value);
  };

  const onTemplateUpdateHandler = (e) => {
    if (checkCreate) {
      axios
        .post(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/template?template=" +
          template
        )
        .then((res) => {
          console.log("템플릿 변경");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setOpenTemplate(!openTemplate);
  };

  const setTemplateHandler = (params, e) => {
    console.log("템플릿 타입");
    console.log(params);
    setTemplate(params);
  };

  const onWorkStartInputHandler = (e) => {
    const regex = /^[0-9\b .]{0,7}$/;
    if (regex.test(e.target.value)) {
      console.log(e.target.value.length);

      /** 비교하려고 했는데 우선 스킵... */
      // if (e.target.value.length == 4) {
      //   console.log(parseInt(e.target.value));
      //   if (
      //     parseInt(2000) > parseInt(e.target.value) ||
      //     parseInt(e.target.value) >= parseInt(2023)
      //   ) {
      //     setWorkStartMsg(
      //       "올바른 날짜를 입력해주세요. (2000~2022년 사이의 경력만 작성 가능합니다.)"
      //     );
      //     setWorkStartValid(false);
      //   }
      // }
      // if (e.target.value.length == 7) {
      //   console.log("입력값");
      //   console.log(e.target.value);
      // }

      setWorkStart(e.target.value);
    }
  };

  const onWorkEndInputHandler = (e) => {
    const regex = /^[0-9\b .]{0,7}$/;
    if (regex.test(e.target.value)) {
      console.log(e.target.value.length);
      setWorkEnd(e.target.value);
    }
  };

  const onAwardDateInputHandler = (e) => {
    const regex = /^[0-9\b .]{0,7}$/;
    if (regex.test(e.target.value)) {
      console.log(e.target.value.length);
      setAwardDate(e.target.value);
    }
  };

  const onPrjDevStartInputHandler = (e) => {
    const regex = /^[0-9\b .]{0,7}$/;
    if (regex.test(e.target.value)) {
      console.log(e.target.value.length);
      setPrjDevStart(e.target.value);
    }
  };

  const onPrjEndInputHandler = (e) => {
    const regex = /^[0-9\b .]{0,7}$/;
    if (regex.test(e.target.value)) {
      console.log(e.target.value.length);
      setPrjDevEnd(e.target.value);
    }
  };

  async function onUpdateSkillHandler() {
    console.log("스킬 수정");
    const formData = new FormData();
    let tmpSkill = [];
    selectedSkillList.map((skill) => {
      tmpSkill.push(skill.id);
    });
    formData.append("skills", tmpSkill);

    await axios
      .post(
        SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/skill",
        formData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    onSkillGetHandler();
  }

  async function onUpdateCareerHandler(params, title, content, start, end, e) {
    console.log("경력 수정");

    if (checkCreate) {
      let tmpWork = {
        title: workNameInput,
        content: workDetailInput,
        startTerm: workStart,
        endTerm: workEnd,
      };

      if (workNameInput == null) {
        tmpWork.title = title;
      }

      if (workDetailInput == null) {
        tmpWork.content = content;
      }

      if (workStart == null) {
        tmpWork.startTerm = start;
      }

      if (workEnd == null) {
        tmpWork.endTerm = end;
      }

      tmpWorkList = tmpWork;
      console.log(tmpWorkList);

      await axios
        .post(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/career/" +
          params,
          tmpWork
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      const findIndex = careerInfo.findIndex((element) => element.id == params);
      let copyCareer = [...careerInfo];
      copyCareer[findIndex] = {
        ...copyCareer[findIndex],
        update: false,
      };
      setCareerInfo(copyCareer);
      onCareerGetHandler();
    } else {
      let tmpWork = {
        id: params,
        title: workNameInput,
        content: workDetailInput,
        startTerm: workStart,
        endTerm: workEnd,
        update: false,
        delete: false,
      };

      if (workNameInput == null) {
        tmpWork.title = title;
      }

      if (workDetailInput == null) {
        tmpWork.content = content;
      }

      if (workStart == null) {
        tmpWork.startTerm = start;
      }

      if (workEnd == null) {
        tmpWork.endTerm = end;
      }

      console.log("바꿀값들");
      console.log(tmpWork);
      console.log("기존의 workList");
      console.log(tmpWorkList);

      // 기존에 있던 애 복사해두기
      let copyCareer = [...tmpWorkList];
      // 인덱스 찾기
      const findIndex = tmpWorkList.findIndex(
        (element) => element.id == params
      );

      console.log("바꿀 친구 잘 찾았나요?");
      console.log(copyCareer[findIndex]);

      // 값 바꿔주기
      copyCareer[findIndex] = tmpWork;
      setFirstCareerInfo(copyCareer);

      console.log("잘 변경되었나요?");
      console.log(copyCareer);
    }
  }

  async function onUpdateAwardHandler(params, date, name, e) {
    console.log("수상 수정");

    if (checkCreate) {
      let tmpAward = {
        name: awardName,
        date: awardDate,
      };

      if (awardName == null) {
        tmpAward.name = name;
      }

      if (awardDate == null) {
        tmpAward.date = date;
      }

      tmpAwardList = tmpAward;
      console.log(tmpAwardList);

      await axios
        .post(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/award/" +
          params,
          tmpAward
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      const findIndex = awardInfo.findIndex((element) => element.id == params);
      let copyAward = [...awardInfo];
      copyAward[findIndex] = {
        ...copyAward[findIndex],
        update: false,
      };
      setAwardInfo(copyAward);
      onAwardGetHandler();
    } else {
      let tmpAward = {
        id: params,
        name: awardName,
        date: awardDate,
        update: false,
        delete: false,
      };

      if (awardName == null) {
        tmpAward.name = name;
      }

      if (awardDate == null) {
        tmpAward.date = date;
      }

      let copyAward = [...tmpAwardList];
      const findIndex = tmpAwardList.findIndex(
        (element) => element.id == params
      );
      copyAward[findIndex] = tmpAward;
      setFirstAwardInfo(copyAward);
    }
  }

  async function onUpdateProjectHandler(
    params,
    title,
    content,
    startTerm,
    endTerm,
    job,
    prjImage,
    projectSkills,
    e
  ) {
    console.log("프로젝트 수정");

    if (checkCreate) {
      const formData = new FormData();
      let tmpProject = {
        title: prjName,
        content: prjDetailInput,
        job: prjDev,
        startTerm: prjDevStart,
        endTerm: prjDevEnd,
        // projectSkills: prjSkillsList,
        image: prjImg,
      };

      if (prjName == null) {
        tmpProject.title = title;
      }

      if (prjDetailInput == null) {
        tmpProject.content = content;
      }

      if (prjDev == null) {
        tmpProject.job = job;
      }

      if (prjDevStart == null) {
        tmpProject.startTerm = startTerm;
      }

      if (prjDevEnd == null) {
        tmpProject.endTerm = endTerm;
      }

      if (prjImg == null) {
        tmpProject.image = prjImage;
      }

      // if (prjSkillsList == null) {
      // tmpProject.projectSkills = projectSkills;
      // }

      // tmpPrjList = tmpProject;
      formData.append("title", tmpProject.title);
      formData.append("content", tmpProject.content);
      formData.append("job", tmpProject.job);
      formData.append("startTerm", tmpProject.startTerm);
      formData.append("endTerm", tmpProject.endTerm);
      // formData.append("skillCount", );
      // formData.append("skills", )
      formData.append("file", tmpProject.image);
      formData.append("projectId", params);

      await axios
        .post(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/project/" +
          params,
          // tmpProject
          formData
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      const findIndex = projectInfo.findIndex(
        (element) => element.id == params
      );
      let copyProject = [...projectInfo];
      copyProject[findIndex] = {
        ...copyProject[findIndex],
        update: false,
      };
      console.log(copyProject);
      setProjectInfo(copyProject);
      onProjectGetHandler();
    } else {
      let tmpProject = {
        id: params,
        title: prjName,
        content: prjDetailInput,
        job: prjDev,
        startTerm: prjDevStart,
        endTerm: prjDevEnd,
        projectSkills: prjSkillsList,
        image: prjImg,
        update: false,
        delete: false,
      };

      if (prjName == null) {
        tmpProject.title = title;
      }

      if (prjDetailInput == null) {
        tmpProject.content = content;
      }

      if (prjDev == null) {
        tmpProject.job = job;
      }

      if (prjDevStart == null) {
        tmpProject.startTerm = startTerm;
      }

      if (prjDevEnd == null) {
        tmpProject.endTerm = endTerm;
      }

      if (prjSkillsList == null) {
        tmpProject.projectSkills = projectSkills;
      }

      if (prjImage == null) {
        tmpProject.image = prjImage;
      }

      let copyProject = [...tmpPrjList];
      const findIndex = tmpPrjList.findIndex((element) => element.id == params);
      copyProject[findIndex] = tmpProject;
      setFirstProjectInfo(copyProject);
    }
  }

  async function onUpdateBlogHandler() {
    console.log("블로그 글 목록 확인");
    const formData = new FormData();

    let tmpId = [];
    let tmpTitle = [];
    let tmpContent = [];
    let tmpRecommend = [];
    let tmpDate = [];

    topRecommendPost.map((post, index) => {
      tmpId.push(post.id);
      tmpTitle.push(post.title);
      tmpRecommend.push(post.recommend);
    });

    contentAfter.map((content) => {
      tmpContent.push(content);
    });

    dateAfter.map((date) => {
      tmpDate.push(date);
    });

    console.log(tmpContent);

    formData.append("boardId", tmpId);
    formData.append("content", tmpContent);
    formData.append("date", tmpDate);
    formData.append("title", tmpTitle);
    formData.append("recommend", tmpRecommend);

    axios
      .post(
        SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/blog",
        formData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /****************/

  const onUpdateWorknameInput = (params, title, e) => {
    console.log("경력 이름");
    console.log(params);
    if (params == null) setWorkNameInput(title);
    else setWorkNameInput(params);

    console.log(workNameInput);
  };

  const onUpdateWorkDetailInput = (params, detail, e) => {
    console.log("경력 내용");
    console.log(params);
    if (params == null) setWorkDetailInput(detail);
    else setWorkDetailInput(params);

    console.log(workDetailInput);
  };

  const onUpdateWorkStartInput = (params, start, e) => {
    console.log("경력 시작");
    console.log(params);
    if (params == null) setWorkStart(start);
    else setWorkStart(params);

    console.log(workStart);
  };

  const onUpdateWorkEndInput = (params, end, e) => {
    console.log("경력 끝");
    console.log(params);
    if (params == null) setWorkEnd(end);
    else setWorkEnd(params);

    console.log(workEnd);
  };

  const onUpdateAwardDateInput = (params, date, e) => {
    console.log("수상 날짜");
    console.log(params);
    if (params == null) setAwardDate(date);
    else setAwardDate(params);

    console.log(awardDate);
  };

  const onUpdateAwardNameInput = (params, name, e) => {
    console.log("수상 이름");
    console.log(params);
    if (params == null) setAwardName(name);
    else setAwardName(params);

    console.log(awardName);
  };

  const onUpdatePrjNameInput = (params, name, e) => {
    console.log("프로젝트 시작 이름");
    console.log(params);
    if (params == null) setPrjName(name);
    else setPrjName(params);

    console.log(prjName);
  };

  const onUpdatePrjStartInput = (params, start, e) => {
    console.log("프로젝트 시작 날짜");
    console.log(params);
    if (params == null) setPrjDevStart(start);
    else setPrjDevStart(params);

    console.log(prjDevStart);
  };

  const onUpdatePrjEndInput = (params, end, e) => {
    console.log("프로젝트 끝 날짜");
    console.log(params);
    if (params == null) setPrjDevEnd(end);
    else setPrjDevEnd(params);

    console.log(prjDevEnd);
  };

  const onUpdatePrjJobInput = (params, job, e) => {
    console.log("프로젝트 직군");
    console.log(params);
    if (params == null) setPrjDev(job);
    else setPrjDev(params);

    console.log(prjDev);
  };

  const onUpdatePrjContentInput = (params, content, e) => {
    console.log("프로젝트 설명");
    console.log(params);
    if (params == null) setPrjDetailInput(content);
    else setPrjDetailInput(params);

    console.log(prjDetailInput);
  };

  const onUpdatePrjImgInput = (params, imageBytes, imageType) => {
    console.log("프로젝트 이미지");
    let image = "data:image/" + imageType + ";base64," + imageBytes;
    if (params == null) setPrjImg(image);
    else setPrjImg(params);
  };

  // useEffect(() => {
  //   if (workStart.length == 6) {
  //     setWorkStart(workStart.replace(/(\d{4})(\d{2})/, "$1.$2"));
  //   }
  // }, [workStart]);

  // useEffect(() => {
  //   if (workEnd.length == 6) {
  //     setWorkEnd(workEnd.replace(/(\d{4})(\d{2})/, "$1.$2"));
  //   }
  // }, [workEnd]);

  // useEffect(() => {
  //   if (awardDate.length == 6) {
  //     setAwardDate(awardDate.replace(/(\d{4})(\d{2})/, "$1.$2"));
  //   }
  // }, [awardDate]);

  // useEffect(() => {
  //   if (prjDevStart.length == 6) {
  //     setPrjDevStart(prjDevStart.replace(/(\d{4})(\d{2})/, "$1.$2"));
  //   }
  // }, [prjDevStart]);

  // useEffect(() => {
  //   if (prjDevEnd.length == 6) {
  //     setPrjDevEnd(prjDevEnd.replace(/(\d{4})(\d{2})/, "$1.$2"));
  //   }
  // }, [prjDevEnd]);

  const onPortfolioCreateHandler = (e) => {
    const formData = new FormData();

    let tempSkillList = [];
    selectedSkillList.map((skill) => {
      tempSkillList.push(skill.id);
    });

    formData.append("skills", tempSkillList);

    formData.append("template", template);
    formData.append("github", githubInput);
    formData.append("job", jobInput);
    formData.append("content", introInput);

    let tempAwardName = [];
    let tempAwardDate = [];
    firstAwardInfo.map((award) => {
      tempAwardName.push(award.name);
      tempAwardDate.push(award.date);
    });
    formData.append("awardNames", tempAwardName);
    formData.append("awardDates", tempAwardDate);

    let tempCareerTitle = [];
    let tempCareerContent = [];
    let tempCareerSTerm = [];
    let tempCareerETerm = [];
    firstCareerInfo.map((car) => {
      tempCareerTitle.push(car.title);
      tempCareerContent.push(car.content);
      tempCareerSTerm.push(car.startTerm);
      tempCareerETerm.push(car.endTerm);
    });
    formData.append("careerTitles", tempCareerTitle);
    formData.append("careerContents", tempCareerContent);
    formData.append("careerStartTerms", tempCareerSTerm);
    formData.append("careerEndTerms", tempCareerETerm);

    let tempPrjTitle = [];
    let tempPrjContent = [];
    let tempPrjJob = [];
    let tempPrjSTerm = [];
    let tempPrjETerm = [];
    let tempPrjSCount = [];
    let tempPrjSkill = [];

    firstProjectInfo.map((prj) => {
      tempPrjTitle.push(prj.title);
      tempPrjContent.push(prj.content);
      tempPrjJob.push(prj.job);
      tempPrjSTerm.push(prj.startTerm);
      tempPrjETerm.push(prj.endTerm);
      tempPrjSCount.push(prj.projectSkillsCount);

      prj.projectSkills.map((skill) => {
        tempPrjSkill.push(skill.id);
      });
    });

    formData.append("prjTitles", tempPrjTitle);
    formData.append("prjContents", tempPrjContent);
    formData.append("prjJobs", tempPrjJob);
    formData.append("prjStartTerms", tempPrjSTerm);
    formData.append("prjEndTerms", tempPrjETerm);
    formData.append("prjSkillCount", tempPrjSCount);
    formData.append("prjSkills", tempPrjSkill);

    prjImageList.map((image) => {
      formData.append("files", image);
    });

    console.log("포트폴리오 생성 정보 확인");
    console.log(tempAwardName);
    console.log(tempAwardDate);
    console.log(tempCareerTitle);
    console.log(tempCareerContent);
    console.log(tempCareerSTerm);
    console.log(tempCareerETerm);
    console.log(tempPrjTitle);
    console.log(tempPrjContent);
    console.log(tempPrjJob);
    console.log(tempPrjSTerm);
    console.log(tempPrjETerm);
    console.log(tempPrjSCount);
    console.log(tempPrjSkill);
    console.log(prjImageList);

    axios
      .post(SERVER_URL + "/ptf-service/api/v1/portfolio", formData)
      .then((res) => {
        console.log(res);
        setAxiosFinish(true);
      })
      .catch((err) => {
        console.log(err);
      });

    if (axiosFinish) {
      if (template == "TYPE_1") navigate("/portfolio/template/t1");
      else if (template == "TYPE_2") navigate("/portfolio/template/t2");
      else if (template == "TYPE_3") navigate("/portfolio/template/t3");
      else if (template == "TYPE_4") navigate("/portfolio/template/t4");
    }
  };

  async function onSkillGetHandler() {
    await axios
      .get(SERVER_URL + "/ptf-service/api/v1/portfolio/myPortfolio/skills")
      .then((res) => {
        console.log("스킬 정보 가져오기~~");
        let tmp = res.data.data;
        console.log(tmp);

        let newSkill = [];
        tmp.map((skill) => {
          let tmpSkill = {
            id: skill.id,
            name: skill.name,
          };
          newSkill.push(tmpSkill);
        });
        setSelectedSkillList(newSkill);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function onCareerGetHandler() {
    await axios
      .get(SERVER_URL + "/ptf-service/api/v1/portfolio/myPortfolio/career")
      .then((res) => {
        console.log("경력 정보 가져오기~~");
        let tmp = res.data.data;
        console.log(tmp);
        setCareerInfo(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function onAwardGetHandler() {
    await axios
      .get(SERVER_URL + "/ptf-service/api/v1/portfolio/myPortfolio/award")
      .then((res) => {
        console.log("수상 정보 가져오기~~");
        let tmp = res.data.data;
        console.log(tmp);
        setAwardInfo(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function onProjectGetHandler() {
    await axios
      .get(SERVER_URL + "/ptf-service/api/v1/portfolio/myPortfolio/project")
      .then((res) => {
        console.log("프로젝트 정보 가져오기~~");
        let tmp = res.data.data;
        console.log(tmp);
        setProjectInfo(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function onPortfolioCheckHandler() {
    console.log("템플릿 조회");
    console.log(template);
    if (template == "TYPE_1") navigate("/portfolio/template/t1");
    else if (template == "TYPE_2") navigate("/portfolio/template/t2");
    else if (template == "TYPE_3") navigate("/portfolio/template/t3");
    else if (template == "TYPE_4") navigate("/portfolio/template/t4");
  }

  function onCareerDeleteHandler(params, e) {
    if (checkCreate) {
      axios
        .delete(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/career/" +
          params
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      tmpWorkList = tmpWorkList.filter((career) => career.id !== params);
      setFirstCareerInfo(tmpWorkList);

      console.log("엥...?");
      console.log(tmpWorkList);
    }
  }

  function onAwardDeleteHandler(params, e) {
    if (checkCreate) {
      axios
        .delete(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/award/" +
          params
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      tmpAwardList = tmpAwardList.filter((award) => award.id !== params);
      setFirstAwardInfo(tmpAwardList);

      console.log("수상경력...");
      console.log(tmpAwardList);
    }
  }

  function onProjectDeleteHandler(params, e) {
    if (checkCreate) {
      axios
        .delete(
          SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          id +
          "/project/" +
          params
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      tmpPrjList = tmpPrjList.filter((prj) => prj.id !== params);
      setFirstProjectInfo(tmpPrjList);

      console.log("프로젝트...");
      console.log(tmpPrjList);
    }
  }

  function onTopPostDeleteHandler(params, e) {
    let tmpPost = [...topRecommendPost];
    let tmpContent = [...contentAfter];
    let tmpDate = [...dateAfter];
    tmpPost.splice(params, 1);
    tmpContent.splice(params, 1);
    tmpDate.splice(params, 1);
    setTopRecommendPost(tmpPost);
    setContentAfter(tmpContent);
    setDateAfter(tmpDate);
  }

  const onUpdateBasicInfoHandler = () => {
    let basicInfo = {
      github: githubInput,
      job: jobInput,
      content: introInput,
    };

    axios
      .post(
        SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/basic",
        basicInfo
      )
      .then((res) => {
        console.log("기본 정보 업데이트");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    let copyBasic = { ...basicInfo, update: false };
    setBasicInfo(copyBasic);
  };

  useEffect(() => {
    setOpenTemplate(false);
    console.log("포트폴리오 페이지 처음으로 들어옴~~~");

    async function fetchData() {
      await axios
        .get(SERVER_URL + "/user-service/api/v1/members")
        .then((res) => {
          console.log("여기 찍힘?");
          let tmpCm = {
            email: res.data.data.email,
            phone: res.data.data.phoneNumber,
            username: res.data.data.username,
          };
          setUserInfo(tmpCm);
        })
        .catch((err) => {
          console.log(err);
          console.log("뭐야 ㅅㅄㅄ");
        });
    }

    async function fetchData2() {
      await axios
        .get(SERVER_URL + "/user-service/api/v1/members/profile")
        .then((res) => {
          console.log("프로필 이미지 조회");
          console.log(res.data.data);
          if (res.data.data.profileType == null) {
            console.log("프로필 없삼");
            setCheckProfile(false);
          } else {
            console.log("이미 프로필 이미지 있삼");
            setProfileType(res.data.data.profileType);
            setProfileImg(res.data.data.profileBytes);
            console.log(profileType);
            console.log(profileType);
            setCheckProfile(true);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("오류가 나버림");
        });
    }

    console.log("id가 찍힐까...?");
    console.log(id);
    async function fetchData3() {
      if (id == null) {
        console.log("포폴 생성 페이지가 되어야 해요~~");
        setCheckCreate(false);
        setLoadingComplete(true);
        setTemplate("TYPE_1"); //default
      } else {
        let tmpCm = [];
        await axios
          .get(SERVER_URL + "/ptf-service/api/v1/portfolio/myPortfolio")
          .then((res) => {
            console.log("서버에서 보내준 값");
            console.log(res);

            tmpCm = {
              email: res.data.data.email,
              phone: res.data.data.phoneNumber,
              username: res.data.data.username,
              content: res.data.data.portfolio.content,
              github: res.data.data.portfolio.github,
              job: res.data.data.portfolio.job,
              skills: res.data.data.portfolio.skills,
              awards: res.data.data.portfolio.awards,
              careers: res.data.data.portfolio.careers,
              projects: res.data.data.portfolio.projects,
              template: res.data.data.portfolio.template,
              boards: res.data.data.portfolio.boards,
            };
            console.log("포트폴리오 정보 조회하기~~~");
            console.log(tmpCm);
            setPortfolioInfo(tmpCm);

            if (tmpCm.boards.length == 0) {
              console.log("한번도 수정한적없음");
              updateTopPost();
            } else {
              console.log("한번이라도 수정한적 있삼");
              setTopRecommendPost([...tmpCm.boards]);
              let tmpContentAfter = [];
              let tmpDate = [];
              tmpCm.boards.map((item) => {
                tmpContentAfter.push(
                  htmlDetailToText(item.content).substring(0, 300) + "..."
                );
                tmpDate.push(item.date);
              });

              let tmpDateAfter = [];
              tmpDate.map((item) => {
                tmpDateAfter.push(item.substring(0, 10));
              });

              setContentAfter([...tmpContentAfter]);
              setDateAfter([...tmpDateAfter]);
            }

            let newSkill = [];
            let newCareer = [];
            let newAward = [];
            let newProject = [];

            let tmpBasic = {
              content: tmpCm.content,
              github: tmpCm.github,
              job: tmpCm.job,
              update: false,
            };

            tmpCm.skills.map((skill) => {
              let tmpSkill = {
                id: skill.id,
                name: skill.name,
              };
              newSkill.push(tmpSkill);
            });

            tmpCm.awards.map((award) => {
              let tmpAward = {
                id: award.id,
                name: award.name,
                date: award.date,
                update: false,
                delete: false,
              };
              newAward.push(tmpAward);
            });

            tmpCm.careers.map((car) => {
              let tmpCareer = {
                content: car.content,
                endTerm: car.endTerm,
                id: car.id,
                startTerm: car.startTerm,
                title: car.title,
                update: false,
                delete: false,
              };
              newCareer.push(tmpCareer);
            });

            tmpCm.projects.map((pro) => {
              let tmpProject = {
                id: pro.id,
                title: pro.title,
                content: pro.content,
                startTerm: pro.startTerm,
                endTerm: pro.endTerm,
                job: pro.job,
                imageBytes: pro.imageBytes,
                imageType: pro.imageType,
                tagId: pro.tagId,
                update: false,
                delete: false,
              };
              newProject.push(tmpProject);
            });

            setSelectedSkillList(newSkill);
            setBasicInfo(tmpBasic);
            setCareerInfo(newCareer);
            setAwardInfo(newAward);
            setProjectInfo(newProject);
          })
          .catch((err) => {
            console.log(err);
          });

        setCheckCreate(true);
        setLoadingComplete(true);
        setTemplate(tmpCm.template);
      }
    }

    fetchData();
    fetchData2();
    fetchData3();
  }, []);

  async function updateTopPost() {
    await axios
      .get(SERVER_URL + "/til-service/api/v1/boards/portfolio/myBoards")
      .then((res) => {
        console.log("추천수 높은 글을 가져올거예요~~~^^");
        console.log(res);
        setTopRecommendPost([...res.data.data]);
        let tmpContentAfter = [];
        let tmpDate = [];
        res.data.data.map((item) => {
          tmpContentAfter.push(
            htmlDetailToText(item.content).substring(0, 300) + "..."
          );
          tmpDate.push(item.createdDate);
        });

        let tmpDateAfter = [];
        tmpDate.map((item) => {
          tmpDateAfter.push(item.substring(0, 10));
        });

        setContentAfter([...tmpContentAfter]);
        setDateAfter([...tmpDateAfter]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div class="bg-white font-test">
      {showTagModal ? (
        <TagModal
          setShowTagModal={setShowTagModal}
          selectedTagList={selectedTagList}
          setSelectedTagList={setSelectedTagList}
        />
      ) : null}
      {showSkillModal ? (
        <TagModal
          setShowTagModal={setShowSkillModal}
          selectedTagList={selectedSkillList}
          setSelectedTagList={setSelectedSkillList}
        />
      ) : null}
      {loadingComplete ? (
        <>
          <div class="w-2/3 mt-10 mx-auto border rounded-lg">
            <section class="lg:flex gap-5 items-center">
              <div class="ml-10 mt-10 grow font-sbtest text-2xl">
                {checkCreate ? portfolioInfo.username : userInfo.username}님을
                위한 포트폴리오예요 😊
              </div>
            </section>
            <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
            <div class="flex justify-end text-base font-test">
              <button
                class="px-4 py-2 rounded-xl"
                onClick={() => onTemplateUpdateHandler()}
              >
                {checkCreate ? "🖼 템플릿 수정" : "🖼 템플릿 선택"}
              </button>
              <button
                class="pr-5 py-2 rounded-xl"
                onClick={
                  checkCreate
                    ? onPortfolioCheckHandler
                    : onPortfolioCreateHandler
                }
              >
                {checkCreate
                  ? "✨ 포트폴리오 확인하기"
                  : "✨ 포트폴리오 생성하기"}
              </button>
            </div>
            {openTemplate ? (
              <div class="relative mx-auto p-4 w-full max-w-2xl h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-300">
                  <div class="flex p-4 rounded-t border dark:border-gray-300">
                    <div class="text-lg font-ltest font-semibold text-gray-900 dark:text-white align-middle">
                      {checkCreate ? "🖼 템플릿 수정하기" : "🖼 템플릿 선택하기"}
                    </div>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => onTemplateUpdateHandler()}
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="p-6 space-y-6">
                    <div class="flex justify-center font-test">
                      각 템플릿의 대표 색상이에요. 색깔을 클릭하면 샘플 템플릿을
                      볼 수 있어요.
                    </div>
                    <div class="flex gap-4 justify-center">
                      <div>
                        <button
                          class="w-28 h-56 bg-white border border-gray-300"
                          onClick={() =>
                            navigate("/portfolio/template/samplet1")
                          }
                        >

                        </button>
                        <button
                          class={
                            template == "TYPE_1"
                              ? "ml-6 mt-4 text-indigo-500 text-lg"
                              : "ml-6 mt-4"
                          }
                          onClick={(e) => setTemplateHandler("TYPE_1", e)}
                        >
                          TYPE 1
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-28 h-56 bg-black"
                          onClick={() =>
                            navigate("/portfolio/template/samplet2")
                          }
                        >

                        </button>
                        <button
                          class={
                            template == "TYPE_2"
                              ? "ml-6 mt-4 text-indigo-500 text-lg"
                              : "ml-6 mt-4"
                          }
                          onClick={(e) => setTemplateHandler("TYPE_2", e)}
                        >
                          TYPE 2
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-28 h-56 bg-indigo-300"
                          onClick={() =>
                            navigate("/portfolio/template/samplet3")
                          }
                        >

                        </button>
                        <button
                          class={
                            template == "TYPE_3"
                              ? "ml-6 mt-4 text-indigo-500 text-lg"
                              : "ml-6 mt-4"
                          }
                          onClick={(e) => setTemplateHandler("TYPE_3", e)}
                        >
                          TYPE 3
                        </button>
                      </div>
                      <div>
                        <button
                          class="w-28 h-56 bg-bg7"
                          onClick={() =>
                            navigate("/portfolio/template/samplet4")
                          }
                        >

                        </button>
                        <button
                          class={
                            template == "TYPE_4"
                              ? "ml-6 mt-4 text-indigo-500 text-lg"
                              : "ml-6 mt-4"
                          }
                          onClick={(e) => setTemplateHandler("TYPE_4", e)}
                        >
                          TYPE 4
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <section class="mt-3">
              <div class="ml-10 text-xl font-bold">기본 정보 입력</div>
              <div class="mx-10 mt-5 border-b pb-10 border-gray-300">
                <table class="w-full table-auto border-collapse border border-slate-400">
                  <tbody>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        프로필 이미지
                      </td>
                      <td class="border border-slate-300">
                        <div class="ml-5 mt-2 ">
                          <button
                            className="ProfileImage"
                            class="mx-auto w-24 h-24 rounded-full"
                            onClick={onProfileButtonHandler}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              id="input-file"
                              class="hidden"
                              onChange={onProfileInputHandler}
                            />

                            <img
                              src={
                                checkProfile == false
                                  ? profileImage
                                  : "data:image/" +
                                  profileType +
                                  ";base64," +
                                  profileImg
                              }
                              class="w-24 h-24 rounded-full drop-shadow-md"
                              alt="profile"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        이름
                      </td>
                      <td class="bg-gray-200 border border-slate-300">
                        <input
                          class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                          placeholder={userInfo.username}
                          type="text"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        핸드폰 번호
                      </td>
                      <td class="bg-gray-200 border border-slate-300">
                        <input
                          class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                          placeholder={userInfo.phone}
                          type="text"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2  bg-indigo-100 border border-slate-300">
                        이메일
                      </td>
                      <td class="bg-gray-200 border border-slate-300">
                        <input
                          class="w-full pl-2  py-2 focus:outline-0 text-lg font-ltest min-w-[20rem] "
                          placeholder={userInfo.email}
                          type="text"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2  bg-indigo-100 border border-slate-300">
                        직무
                      </td>
                      <td class="border border-slate-300">
                        {basicInfo.update ? (
                          <input
                            class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder={basicInfo.job}
                            type="text"
                            onChange={onJobInputHandler}
                          />
                        ) : checkCreate ? (
                          <input
                            class="text-gray-500 bg-gray-100 w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder={basicInfo.job}
                            disabled
                          />
                        ) : (
                          <input
                            class=" w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder="간단한 직무명을 입력해주세요."
                            onChange={onJobInputHandler}
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        깃허브 주소
                      </td>
                      <td class="border border-slate-300">
                        {basicInfo.update ? (
                          <input
                            class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder={basicInfo.github}
                            type="text"
                            onChange={onGithubInputHandler}
                          />
                        ) : checkCreate ? (
                          <input
                            class="text-gray-500 bg-gray-100 w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder={basicInfo.github}
                            disabled
                          />
                        ) : (
                          <input
                            class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder={"https://github.com/userId"}
                            onChange={onGithubInputHandler}
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        한줄소개
                      </td>
                      <td class="border border-slate-300">
                        {basicInfo.update ? (
                          <div class="w-full pl-2 py-2 text-lg font-ltest min-w-[20rem] ">
                            <textarea
                              class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 min-h-[10rem] "
                              placeholder={basicInfo.content}
                              onChange={onIntroInputHandler}
                            />
                          </div>
                        ) : checkCreate ? (
                          <div class="bg-gray-100 w-full pl-2 py-2 text-lg font-ltest min-w-[20rem] ">
                            <textarea
                              class="text-gray-500 w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 min-h-[10rem] "
                              placeholder={basicInfo.content}
                              disabled
                            />
                          </div>
                        ) : (
                          <div class="w-full pl-2 py-2 text-lg font-ltest min-w-[20rem] ">
                            <textarea
                              class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 min-h-[10rem] "
                              placeholder="자기소개를 입력해주세요."
                              onChange={onIntroInputHandler}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {checkCreate ? (
                  <div class="flex justify-end">
                    {basicInfo && basicInfo.update ? (
                      <button
                        class="ml-full py-3 mt-2 border border-gray-300 px-6 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                        onClick={() => {
                          onUpdateBasicInfoHandler();
                        }}
                      >
                        수정완료
                      </button>
                    ) : (
                      <button
                        class="ml-full py-3 mt-2 border border-gray-300 px-6 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                        onClick={() => {
                          let copyBasic = { ...basicInfo, update: true };
                          setBasicInfo(copyBasic);
                        }}
                      >
                        수정하기
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </section>
            <section class="mt-10">
              <div class="ml-10 text-xl font-bold">기술 및 이력 정보</div>
              <div class="mx-10 mt-5 border-b pb-10 border-gray-300">
                <table class="w-full table-auto border-collapse border border-slate-400">
                  <tbody>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        사용 기술
                      </td>
                      <td class="border border-slate-300">
                        {checkCreate ? (
                          <>
                            <div class="flex">
                              <div class="flex flex-wrap items-center gap-3">
                                {selectedSkillList.map((item) => {
                                  return (
                                    <div class="text-center border border-gray-300 rounded-lg  py-2 px-4 bg-white focus:outline-0 text-base font-ltest">
                                      {item.name}
                                    </div>
                                  );
                                })}
                              </div>
                              <div class="flex flex-col ml-auto">
                                <button
                                  class="w-full py-2 px-6 border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest min-w-[8rem]"
                                  onClick={() => {
                                    setShowSkillModal(true);
                                  }}
                                >
                                  수정하기
                                </button>
                                <button
                                  class="w-full py-2 px-4 border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest"
                                  onClick={() => {
                                    onUpdateSkillHandler();
                                    // setShowSkillModal(true);
                                  }}
                                >
                                  수정완료
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div class="flex flex-wrap items-center gap-3">
                            {selectedSkillList.map((item) => {
                              return (
                                <div class="text-center border border-gray-300 rounded-lg  py-2 px-4 bg-white focus:outline-0 text-base font-ltest">
                                  {item.name}
                                </div>
                              );
                            })}
                            <button
                              class="rounded-lg w-1/6 py-2 px-4 border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest"
                              onClick={() => {
                                setShowSkillModal(true);
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2  bg-indigo-100 border border-slate-300">
                        경력
                      </td>
                      <td class="border border-slate-300">
                        <div>
                          {checkCreate
                            ? careerInfo &&
                            careerInfo.map((item) => {
                              return (
                                <div>
                                  {item.delete ? null : (
                                    <div
                                      class={
                                        item.update
                                          ? "border-b border-gray-300 w-full px-4 text-gray-500 bg-white text-base font-ltest min-w-[20rem]"
                                          : "border-b border-gray-300 w-full px-4 text-gray-500 bg-gray-50 text-base font-ltest min-w-[20rem]"
                                      }
                                    >
                                      {item.update ? (
                                        <input
                                          class="text-lg w-full focus:outline-0 border-b border-gray-300 pt-3 pb-2 "
                                          placeholder={item.title}
                                          onChange={(e) =>
                                            onUpdateWorknameInput(
                                              e.currentTarget.value,
                                              item.title,
                                              e
                                            )
                                          }
                                        />
                                      ) : (
                                        <input
                                          class="text-lg w-full focus:outline-0 border-b border-gray-300 pt-3 pb-2 bg-inherit"
                                          placeholder={item.title}
                                          disabled
                                        />
                                      )}

                                      {item.update ? (
                                        <textarea
                                          class="w-full mt-5 focus:outline-0 resize-none pb-3 border-b border-gray-300  min-h-[10rem] "
                                          placeholder={item.content}
                                          onChange={(e) =>
                                            onUpdateWorkDetailInput(
                                              e.currentTarget.value,
                                              item.content,
                                              e
                                            )
                                          }
                                        />
                                      ) : (
                                        <textarea
                                          class="w-full mt-5 focus:outline-0 resize-none text-gray-500 bg-inherit pb-3 border-b border-gray-300  min-h-[10rem] "
                                          placeholder={item.content}
                                          disabled
                                        />
                                      )}

                                      <div class="font-ltest text-lg text-gray-400 pb-4">
                                        경력 기간
                                        <div class="mt-4 flex justify-between items-center text-base text-center text-gray-500 ">
                                          <div class="border border-gray-300 rounded-md text-md w-[45%] py-2 px-3 focus:outline-0">
                                            {item.update ? (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2"
                                                placeholder={item.startTerm}
                                                onChange={(e) =>
                                                  onUpdateWorkStartInput(
                                                    e.currentTarget.value,
                                                    item.startTerm,
                                                    e
                                                  )
                                                }
                                              />
                                            ) : (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                                                placeholder={item.startTerm}
                                                disabled
                                              />
                                            )}
                                          </div>
                                          <div>~</div>
                                          <div class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0">
                                            {item.update ? (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2"
                                                placeholder={item.endTerm}
                                                onChange={(e) =>
                                                  onUpdateWorkEndInput(
                                                    e.currentTarget.value,
                                                    item.endTerm,
                                                    e
                                                  )
                                                }
                                              />
                                            ) : (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                                                placeholder={item.endTerm}
                                                disabled
                                              />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div class="w-full flex justify-end gap-5">
                                        {item.update ? (
                                          <button
                                            class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                            onClick={(e) =>
                                              onUpdateCareerHandler(
                                                item.id,
                                                item.title,
                                                item.content,
                                                item.startTerm,
                                                item.endTerm,
                                                e
                                              )
                                            }
                                          >
                                            수정완료
                                          </button>
                                        ) : (
                                          <>
                                            {" "}
                                            <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={() => {
                                                const findIndex =
                                                  careerInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyCareer = [
                                                  ...careerInfo,
                                                ];
                                                copyCareer[findIndex] = {
                                                  ...copyCareer[findIndex],
                                                  update: true,
                                                };
                                                setCareerInfo(copyCareer);
                                              }}
                                            >
                                              수정하기
                                            </button>
                                            <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={(e) => {
                                                onCareerDeleteHandler(
                                                  item.id,
                                                  e
                                                );
                                                const findIndex =
                                                  careerInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyCareer = [
                                                  ...careerInfo,
                                                ];
                                                copyCareer[findIndex] = {
                                                  ...copyCareer[findIndex],
                                                  delete: true,
                                                };
                                                setCareerInfo(copyCareer);
                                              }}
                                            >
                                              삭제하기
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                            : firstCareerInfo.map((item) => {
                              return (
                                <div>
                                  {item.delete ? null : (
                                    <div
                                      class={
                                        item.update
                                          ? "border-b border-gray-300 w-full px-4 text-gray-500 bg-white text-base font-ltest min-w-[20rem]"
                                          : "border-b border-gray-300 w-full px-4 text-gray-500 bg-gray-50 text-base font-ltest min-w-[20rem]"
                                      }
                                    >
                                      {item.update ? (
                                        <input
                                          class="text-lg w-full focus:outline-0 border-b border-gray-300 pt-3 pb-2 "
                                          placeholder={item.title}
                                          onChange={(e) =>
                                            onUpdateWorknameInput(
                                              e.currentTarget.value,
                                              item.title,
                                              e
                                            )
                                          }
                                        />
                                      ) : (
                                        <input
                                          class="text-lg w-full focus:outline-0 border-b border-gray-300 pt-3 pb-2 bg-inherit"
                                          placeholder={item.title}
                                          disabled
                                        />
                                      )}

                                      {item.update ? (
                                        <textarea
                                          class="w-full mt-5 focus:outline-0 resize-none pb-3 border-b border-gray-300  min-h-[10rem] "
                                          placeholder={item.content}
                                          onChange={(e) =>
                                            onUpdateWorkDetailInput(
                                              e.currentTarget.value,
                                              item.content,
                                              e
                                            )
                                          }
                                        />
                                      ) : (
                                        <textarea
                                          class="w-full mt-5 focus:outline-0 resize-none text-gray-500 bg-inherit pb-3 border-b border-gray-300  min-h-[10rem] "
                                          placeholder={item.content}
                                          disabled
                                        />
                                      )}

                                      <div class="font-ltest text-lg text-gray-400 pb-4">
                                        경력 기간
                                        <div class="mt-4 flex justify-between items-center text-base text-center text-gray-500 ">
                                          <div class="border border-gray-300 rounded-md text-md w-[45%] py-2 px-3 focus:outline-0">
                                            {item.update ? (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2"
                                                placeholder={item.startTerm}
                                                onChange={(e) =>
                                                  onUpdateWorkStartInput(
                                                    e.currentTarget.value,
                                                    item.startTerm,
                                                    e
                                                  )
                                                }
                                              />
                                            ) : (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                                                placeholder={item.startTerm}
                                                disabled
                                              />
                                            )}
                                          </div>
                                          <div>~</div>
                                          <div class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0">
                                            {item.update ? (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2"
                                                placeholder={item.endTerm}
                                                onChange={(e) =>
                                                  onUpdateWorkEndInput(
                                                    e.currentTarget.value,
                                                    item.endTerm,
                                                    e
                                                  )
                                                }
                                              />
                                            ) : (
                                              <input
                                                class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                                                placeholder={item.endTerm}
                                                disabled
                                              />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div class="w-full flex justify-end gap-5">
                                        {item.update ? (
                                          <button
                                            class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                            onClick={(e) =>
                                              onUpdateCareerHandler(
                                                item.id,
                                                item.title,
                                                item.content,
                                                item.startTerm,
                                                item.endTerm,
                                                e
                                              )
                                            }
                                          >
                                            수정완료
                                          </button>
                                        ) : (
                                          <>
                                            {" "}
                                            <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={() => {
                                                const findIndex =
                                                  firstCareerInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyCareer = [
                                                  ...firstCareerInfo,
                                                ];
                                                copyCareer[findIndex] = {
                                                  ...copyCareer[findIndex],
                                                  update: true,
                                                };

                                                console.log(copyCareer);
                                                setFirstCareerInfo(
                                                  copyCareer
                                                );
                                              }}
                                            >
                                              수정하기
                                            </button>
                                            <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={(e) => {
                                                onCareerDeleteHandler(
                                                  item.id,
                                                  e
                                                );
                                                const findIndex =
                                                  firstCareerInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyCareer = [
                                                  ...firstCareerInfo,
                                                ];
                                                copyCareer[findIndex] = {
                                                  ...copyCareer[findIndex],
                                                  delete: true,
                                                };
                                                // setFirstCareerInfo(
                                                //   copyCareer
                                                // );
                                              }}
                                            >
                                              삭제하기
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          {workAdd ? (
                            <div class="w-full mt-2 py-2 px-4  bg-white text-base font-ltest min-w-[20rem] ">
                              <input
                                class="w-full focus:outline-0 border-b border-gray-300 pt-1 pb-2 bg-inherit"
                                placeholder="경력명"
                                onChange={(e) =>
                                  setWorkNameInput(e.currentTarget.value)
                                }
                              />
                              <textarea
                                class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 border-b border-gray-300  min-h-[10rem] "
                                placeholder="설명"
                                onChange={(e) =>
                                  setWorkDetailInput(e.currentTarget.value)
                                }
                              />
                              <div class="font-ltest text-lg text-gray-400 pb-4">
                                경력 기간
                                <div class="mt-4 flex justify-between items-center text-base text-center text-gray-500 ">
                                  <div class="border border-gray-300 rounded-md text-md w-[45%] py-2 px-3 focus:outline-0">
                                    <input
                                      class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                                      placeholder="시작 일자 (yyyy.mm)"
                                      onChange={onWorkStartInputHandler}
                                    />
                                  </div>
                                  <div>~</div>
                                  <div class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0">
                                    <input
                                      class="w-full focus:outline-0 pt-1 pb-2 bg-inherit"
                                      placeholder="종료 일자 (yyyy.mm)"
                                      onChange={onWorkEndInputHandler}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="w-full flex justify-end">
                                <button
                                  class="w-[15%] ml-full py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                  onClick={onWorkInputHandler}
                                >
                                  추가하기
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              class="w-full py-2 px-4 bg-gray-50 focus:outline-0 text-base font-test min-w-[20rem]"
                              onClick={() => {
                                setWorkAdd(true);
                              }}
                            >
                              ➕
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2  bg-indigo-100 border border-slate-300">
                        수상 이력
                      </td>
                      <td class="border border-slate-300">
                        {checkCreate
                          ? awardInfo &&
                          awardInfo.map((item) => {
                            return (
                              <div class="xl:flex justify-between w-full">
                                {item.delete ? null : (
                                  <>
                                    {item.update ? (
                                      <>
                                        <div class="w-[30%]">
                                          <input
                                            class="text-gray-500 py-2 w-full h-full border border-gray-300 focus:outline-0 text-base font-ltest min-w-[10rem]"
                                            placeholder={item.date}
                                            onChange={(e) =>
                                              onUpdateAwardDateInput(
                                                e.currentTarget.value,
                                                item.date,
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                        <div class="w-[60%]">
                                          <input
                                            class="text-gray-500 py-2 w-full h-full border border-gray-300 focus:outline-0 text-base font-ltest min-w-[20rem]"
                                            placeholder={item.name}
                                            onChange={(e) =>
                                              onUpdateAwardNameInput(
                                                e.currentTarget.value,
                                                item.name,
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                        <button
                                          class="py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 bg-inherit text-gray-500 text-base font-test min-w-[5rem]"
                                          onClick={(e) =>
                                            onUpdateAwardHandler(
                                              item.id,
                                              item.date,
                                              item.name,
                                              e
                                            )
                                          }
                                        >
                                          수정완료
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <div class="w-[40%]">
                                          <input
                                            class="text-gray-500 py-2 w-full h-full border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest min-w-[10rem]"
                                            placeholder={item.date}
                                            type="text"
                                            disabled
                                          />
                                        </div>
                                        <div class="w-[60%]">
                                          <input
                                            class="text-gray-500 py-2 w-full h-full border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest min-w-[20rem]"
                                            placeholder={item.name}
                                            type="text"
                                            disabled
                                          />
                                        </div>
                                        <button
                                          class="bg-gray-50 py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 text-gray-500 text-base font-test min-w-[5rem]"
                                          onClick={() => {
                                            const findIndex =
                                              awardInfo.findIndex(
                                                (element) =>
                                                  element.id == item.id
                                              );
                                            let copyAward = [...awardInfo];
                                            copyAward[findIndex] = {
                                              ...copyAward[findIndex],
                                              update: true,
                                            };
                                            setAwardInfo(copyAward);
                                          }}
                                        >
                                          수정하기
                                        </button>
                                        <button
                                          class="bg-gray-50 py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 text-gray-500 text-base font-test min-w-[5rem]"
                                          onClick={(e) => {
                                            onAwardDeleteHandler(item.id, e);
                                            const findIndex =
                                              awardInfo.findIndex(
                                                (element) =>
                                                  element.id == item.id
                                              );
                                            let copyAward = [...awardInfo];
                                            copyAward[findIndex] = {
                                              ...copyAward[findIndex],
                                              delete: true,
                                            };
                                            setAwardInfo(copyAward);
                                          }}
                                        >
                                          삭제하기
                                        </button>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })
                          : firstAwardInfo.map((item) => {
                            return (
                              <div class="xl:flex justify-between w-full">
                                {item.delete ? null : (
                                  <>
                                    {item.update ? (
                                      <>
                                        <div class="w-[30%]">
                                          <input
                                            class="text-gray-500 py-2 w-full h-full border border-gray-300 focus:outline-0 text-base font-ltest min-w-[10rem]"
                                            placeholder={item.date}
                                            onChange={(e) =>
                                              onUpdateAwardDateInput(
                                                e.currentTarget.value,
                                                item.date,
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                        <div class="w-[60%]">
                                          <input
                                            class="text-gray-500 py-2 w-full h-full border border-gray-300 focus:outline-0 text-base font-ltest min-w-[20rem]"
                                            placeholder={item.name}
                                            onChange={(e) =>
                                              onUpdateAwardNameInput(
                                                e.currentTarget.value,
                                                item.name,
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                        <button
                                          class="py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 bg-inherit text-gray-500 text-base font-test min-w-[5rem]"
                                          onClick={(e) =>
                                            onUpdateAwardHandler(
                                              item.id,
                                              item.date,
                                              item.name,
                                              e
                                            )
                                          }
                                        >
                                          수정완료
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <div class="w-[40%]">
                                          <input
                                            class="px-2 text-gray-500 py-2 w-full h-full border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest min-w-[10rem]"
                                            placeholder={item.date}
                                            type="text"
                                            disabled
                                          />
                                        </div>
                                        <div class="w-[60%]">
                                          <input
                                            class="px-2 text-gray-500 py-2 w-full h-full border border-gray-300 bg-gray-50 focus:outline-0 text-base font-ltest min-w-[20rem]"
                                            placeholder={item.name}
                                            type="text"
                                            disabled
                                          />
                                        </div>
                                        <button
                                          class="bg-gray-50 py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 text-gray-500 text-base font-test min-w-[5rem]"
                                          onClick={() => {
                                            const findIndex =
                                              firstAwardInfo.findIndex(
                                                (element) =>
                                                  element.id == item.id
                                              );
                                            let copyAward = [
                                              ...firstAwardInfo,
                                            ];
                                            copyAward[findIndex] = {
                                              ...copyAward[findIndex],
                                              update: true,
                                            };
                                            setFirstAwardInfo(copyAward);
                                          }}
                                        >
                                          수정하기
                                        </button>
                                        <button
                                          class="bg-gray-50 py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 text-gray-500 text-base font-test min-w-[5rem]"
                                          onClick={(e) => {
                                            onAwardDeleteHandler(item.id, e);
                                            const findIndex =
                                              firstAwardInfo.findIndex(
                                                (element) =>
                                                  element.id == item.id
                                              );
                                            let copyAward = [
                                              ...firstAwardInfo,
                                            ];
                                            copyAward[findIndex] = {
                                              ...copyAward[findIndex],
                                              delete: true,
                                            };
                                            // setFirstAwardInfo(copyAward);
                                          }}
                                        >
                                          삭제하기
                                        </button>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })}

                        {awardAdd ? (
                          <div class="xl:flex justify-between w-full">
                            <div class="w-[30%]">
                              <input
                                class="text-gray-500 px-2 py-2 w-full h-full border-r border-gray-300 focus:outline-0 text-base font-ltest min-w-[10rem]"
                                placeholder="수상 일자(yyyy.mm)"
                                onChange={onAwardDateInputHandler}
                              />
                            </div>
                            <div class="w-[60%]">
                              <input
                                class="text-gray-500 px-2 py-2 w-full h-full  focus:outline-0 text-base font-ltest min-w-[20rem]"
                                placeholder="수상한 상 이름"
                                onChange={(e) =>
                                  setAwardName(e.currentTarget.value)
                                }
                              />
                            </div>
                            <button
                              class="rounded-lg py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 bg-inherit text-gray-500 text-base font-ltest min-w-[5rem]"
                              onClick={onAwardInputHandler}
                            >
                              추가하기
                            </button>
                          </div>
                        ) : (
                          <button
                            class="w-full py-2 px-4 bg-gray-50 focus:outline-0 text-base font-ltest min-w-[20rem]"
                            onClick={() => {
                              setAwardAdd(true);
                            }}
                          >
                            ➕
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2 bg-indigo-100 border border-slate-300">
                        참여한 프로젝트
                      </td>
                      <td class="border border-slate-300">
                        {checkCreate ? (
                          <>
                            {projectInfo &&
                              projectInfo.map((item) => {
                                return (
                                  <>
                                    {item.delete ? null : (
                                      <div
                                        class={
                                          item.update
                                            ? "text-base font-test rounded-xl border border-gray-300 px-10 pt-8 pb-4"
                                            : "text-base font-test bg-gray-100 rounded-xl border border-gray-300 px-10 pt-8 pb-4"
                                        }
                                      >
                                        {item.update ? (
                                          <input
                                            class="w-full border-b border-gray-300 pb-2 font-test text-base mb-2 text-gray-700 focus:outline-0"
                                            placeholder={item.title}
                                            onChange={(e) => {
                                              onUpdatePrjNameInput(
                                                e.currentTarget.value,
                                                item.title,
                                                e
                                              );
                                            }}
                                          />
                                        ) : (
                                          <input
                                            class=" text-gray-500 w-full border-b border-gray-300 pb-2 font-test text-lg mb-2 bg-inherit  focus:outline-0"
                                            placeholder={item.title}
                                            type="text"
                                            disabled
                                          />
                                        )}

                                        {item.update ? (
                                          <div class="flex justify-center gap-1 mt-5">
                                            {prjImg ? (
                                              <div class="flex flex-col items-center">
                                                <img
                                                  class="w-40rem h-50rem border border-gray-300"
                                                  src={prjImg}
                                                  style={{
                                                    minHeight: "12rem",
                                                    minWidth: "16rem",
                                                    maxHeight: "12rem",
                                                    maxWidth: "16rem",
                                                  }}
                                                />
                                                <label
                                                  for="input-prjimg"
                                                  class="w-full flex justify-end"
                                                >
                                                  <div class="mt-3 w-1/4 py-1 text-base text-white bg-gray-400 rounded-xl text-center focus:outline-0 flex flex-col justify-center cursor-pointer">
                                                    <div>사진 수정</div>
                                                  </div>
                                                </label>
                                              </div>
                                            ) : (
                                              <div>
                                                <label
                                                  for="input-prjimg"
                                                  class=""
                                                >
                                                  <img
                                                    class="w-full h-full font-ltest text-base text-gray-500 rounded-xl border border-dashed border-gray-300 text-center focus:outline-0 flex flex-col justify-center cursor-pointer"
                                                    src={
                                                      "data:image/" +
                                                      item.imageType +
                                                      ";base64," +
                                                      item.imageBytes
                                                    }
                                                    style={{
                                                      minHeight: "12rem",
                                                      minWidth: "16rem",
                                                      maxHeight: "12rem",
                                                      maxWidth: "16rem",
                                                    }}
                                                  />
                                                </label>
                                                <input
                                                  type="file"
                                                  accept="image/*"
                                                  id="input-prjimg"
                                                  class="w-0 h-0"
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.value.length > 0
                                                    ) {
                                                      let tmpList = prjImgList;
                                                      let imgTarget =
                                                        e.target.files[0];
                                                      tmpList.push(imgTarget);
                                                      setPrjImgList([
                                                        ...tmpList,
                                                      ]);
                                                      let fileReader =
                                                        new FileReader();
                                                      fileReader.readAsDataURL(
                                                        imgTarget
                                                      );
                                                      fileReader.onload =
                                                        function (evt) {
                                                          /* file을 꺼내서 State로 지정 */
                                                          // setPrjImg(
                                                          //   evt.target.result
                                                          // );
                                                          onUpdatePrjImgInput(
                                                            evt.target.result,
                                                            item.imageBytes,
                                                            item.imageType
                                                          );
                                                        };
                                                    }
                                                  }}
                                                />
                                              </div>
                                            )}

                                            <div class="w-full flex flex-col gap-4 px-3 justify-center">
                                              <div class="mr-3 font-test text-base px-1">
                                                개발 날짜
                                                <div class="font-ltest mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                                                  <input
                                                    class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                    placeholder={item.startTerm}
                                                    onChange={(e) =>
                                                      onUpdatePrjStartInput(
                                                        e.currentTarget.value,
                                                        item.startTerm,
                                                        e
                                                      )
                                                    }
                                                  />
                                                  <div>~</div>
                                                  <input
                                                    class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                    onChange={(e) =>
                                                      onUpdatePrjEndInput(
                                                        e.currentTarget.value,
                                                        item.endTerm,
                                                        e
                                                      )
                                                    }
                                                    placeholder={item.endTerm}
                                                  />
                                                </div>
                                              </div>
                                              <div class="flex gap-6 font-test text-base items-center">
                                                <div class="text-base font-test text-lg pl-1 pr-3 border-r border-gray-300 ">
                                                  맡은 직군
                                                </div>
                                                <input
                                                  class="font-ltest text-gray-600 w-1/2 focus:outline-0"
                                                  placeholder={item.job}
                                                  onChange={(e) => {
                                                    onUpdatePrjJobInput(
                                                      e.currentTarget.value,
                                                      item.job,
                                                      e
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div class="mr-3 font-test text-base">
                                                <div class="text-base border-b border-gray-400 w-full px-1 pb-2">
                                                  사용 기술
                                                </div>
                                                <div class="grid grid-cols-3 text-gray-600 text-base mt-3 gap-3">
                                                  {selectedTagList.map(
                                                    (item) => {
                                                      return (
                                                        <div class="text-base w-full rounded-lg border border-gray-300 px-2 text-center py-1 ">
                                                          {item.name}
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                                  <button
                                                    class="w-full rounded-lg border border-dashed border-gray-300 p-1"
                                                    onClick={() => {
                                                      setShowTagModal(true);
                                                    }}
                                                  >
                                                    +
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div class="flex justify-center gap-5 mt-5">
                                            <div class="flex flex-col items-center">
                                              <img
                                                class="w-40rem h-50rem border border-gray-300"
                                                src={
                                                  "data:image/" +
                                                  item.imageType +
                                                  ";base64," +
                                                  item.imageBytes
                                                }
                                                style={{
                                                  minHeight: "12rem",
                                                  minWidth: "16rem",
                                                  maxHeight: "12rem",
                                                  maxWidth: "16rem",
                                                }}
                                              />
                                            </div>
                                            <div class="text-gray-500 w-full flex flex-col gap-4 px-3 justify-center">
                                              <div class="text-base mr-3 font-test text-xl px-1">
                                                개발 날짜
                                                <div class="font-ltest text-gray-500 mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                                                  <input
                                                    class="bg-gray-100 border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                    placeholder={item.startTerm}
                                                    disabled
                                                  />
                                                  <div>~</div>
                                                  <input
                                                    class="bg-gray-100 border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                    placeholder={item.endTerm}
                                                    disabled
                                                  />
                                                </div>
                                              </div>
                                              <div class="text-gray-500 flex gap-6 font-test text-base items-center">
                                                <div class="font-test text-base pl-1 pr-3 border-r border-gray-300 ">
                                                  맡은 직군
                                                </div>
                                                <input
                                                  class="bg-gray-100 font-ltest text-gray-600 w-1/2 focus:outline-0"
                                                  placeholder={item.job}
                                                />
                                              </div>

                                              <div class="mr-3 font-test text-base">
                                                <div class="border-b border-gray-400 w-full px-1 pb-2">
                                                  사용 기술
                                                </div>
                                                <div class="text-gray-500 grid grid-cols-3 text-gray-600 text-base mt-3 gap-3">
                                                  {item.tagId &&
                                                    item.tagId.map((tag) => {
                                                      return (
                                                        <div class="text-base w-full rounded-lg border border-gray-300 px-2 text-center py-1 ">
                                                          {tag.name}
                                                        </div>
                                                      );
                                                    })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {item.update ? (
                                          <>
                                            <div class="text-gray-500 mt-5 font-test text-base break-all border-b border-gray-300">
                                              <div class="border-b border-gray-300 w-full pb-2 mb-2 ">
                                                프로젝트 설명
                                              </div>
                                              <textarea
                                                class="text-base w-full focus:outline-0 resize-none bg-inherit min-h-[10rem] "
                                                placeholder={item.content}
                                                onChange={(e) => {
                                                  onUpdatePrjContentInput(
                                                    e.currentTarget.value,
                                                    item.content,
                                                    e
                                                  );
                                                }}
                                              />
                                            </div>
                                            <div class="w-full flex justify-end">
                                              <button
                                                class="w-[15%] mt-2 ml-full py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                                onClick={(e) => {
                                                  onUpdateProjectHandler(
                                                    item.id,
                                                    item.title,
                                                    item.content,
                                                    item.startTerm,
                                                    item.endTerm,
                                                    item.job,
                                                    prjImg,
                                                    // item.projectSkills,
                                                    e
                                                  );
                                                }}
                                              >
                                                수정완료
                                              </button>
                                            </div>
                                          </>
                                        ) : (
                                          <div class="text-gray-500 mt-5 font-test text-base break-all border-b border-gray-300">
                                            <div class="border-b border-gray-300 w-full pb-2 mb-2 ">
                                              프로젝트 설명
                                            </div>
                                            <textarea
                                              class="font-ltest w-full bg-inherit min-h-[10rem]"
                                              placeholder={item.content}
                                              disabled
                                            />
                                            <div class="flex justify-end gap-2">
                                              {/* <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={() => {
                                                const findIndex =
                                                  projectInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyProject = [
                                                  ...projectInfo,
                                                ];
                                                copyProject[findIndex] = {
                                                  ...copyProject[findIndex],
                                                  update: true,
                                                };
                                                setProjectInfo(copyProject);
                                                setPrjSkillsList([]);
                                                tmpPrjSkillsList = [];
                                              }}
                                            >
                                              수정하기
                                            </button> */}
                                              <button
                                                class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                                onClick={(e) => {
                                                  onProjectDeleteHandler(
                                                    item.id,
                                                    e
                                                  );
                                                  const findIndex =
                                                    projectInfo.findIndex(
                                                      (element) =>
                                                        element.id == item.id
                                                    );
                                                  let copyProject = [
                                                    ...projectInfo,
                                                  ];
                                                  copyProject[findIndex] = {
                                                    ...copyProject[findIndex],
                                                    delete: true,
                                                  };
                                                  setProjectInfo(copyProject);
                                                }}
                                              >
                                                삭제하기
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                          </>
                        ) : (
                          <>
                            {firstProjectInfo.map((item) => {
                              return (
                                <>
                                  {item.delete ? null : (
                                    <div
                                      class={
                                        item.update
                                          ? "text-base font-test rounded-xl border border-gray-300 px-10 pt-8 pb-4"
                                          : "text-base font-test bg-gray-100 rounded-xl border border-gray-300 px-10 pt-8 pb-4"
                                      }
                                    >
                                      {item.update ? (
                                        <input
                                          class="w-full border-b border-gray-300 pb-2 font-test text-base mb-2 text-gray-700 focus:outline-0"
                                          placeholder={item.title}
                                          onChange={(e) => {
                                            onUpdatePrjNameInput(
                                              e.currentTarget.value,
                                              item.title,
                                              e
                                            );
                                          }}
                                        />
                                      ) : (
                                        <input
                                          class=" text-gray-500 w-full border-b border-gray-300 pb-2 font-test text-lg mb-2 bg-inherit  focus:outline-0"
                                          placeholder={item.title}
                                          type="text"
                                          disabled
                                        />
                                      )}

                                      {item.update ? (
                                        <div class="flex justify-center gap-1 mt-5">
                                          {prjImg ? (
                                            <div class="flex flex-col items-center">
                                              <img
                                                class="w-40rem h-50rem border border-gray-300"
                                                src={prjImg}
                                                style={{
                                                  minHeight: "12rem",
                                                  minWidth: "16rem",
                                                  maxHeight: "12rem",
                                                  maxWidth: "16rem",
                                                }}
                                              />
                                              <label
                                                for="input-prjimg"
                                                class="w-full flex justify-end"
                                              >
                                                <div class="mt-3 w-1/4 py-1 text-base text-white bg-gray-400 rounded-xl text-center focus:outline-0 flex flex-col justify-center cursor-pointer">
                                                  <div>사진 수정</div>
                                                </div>
                                              </label>
                                            </div>
                                          ) : (
                                            <div>
                                              <img
                                                class="w-full h-full font-ltest text-base text-gray-500 rounded-xl border border-dashed border-gray-300 text-center focus:outline-0 flex flex-col justify-center cursor-pointer"
                                                src={item.image}
                                                style={{
                                                  minHeight: "12rem",
                                                  minWidth: "16rem",
                                                  maxHeight: "12rem",
                                                  maxWidth: "16rem",
                                                }}
                                              />
                                              <label
                                                for="input-prjimg"
                                                class="w-full flex justify-end"
                                              >
                                                <div class="mt-3 w-1/4 py-1 text-base text-white bg-gray-300 rounded-xl text-center focus:outline-0 flex flex-col justify-center cursor-pointer">
                                                  <div>사진 수정</div>
                                                </div>
                                              </label>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                id="input-prjimg"
                                                class="w-0 h-0"
                                                onChange={(e) => {
                                                  console.log(e.target.value);
                                                  if (
                                                    e.target.value.length > 0
                                                  ) {
                                                    let imgTarget =
                                                      e.target.files[0];
                                                    let fileReader =
                                                      new FileReader();
                                                    fileReader.readAsDataURL(
                                                      imgTarget
                                                    );

                                                    if (
                                                      tmpPrjImgList.includes(
                                                        imgTarget
                                                      )
                                                    ) {
                                                      tmpPrjImgList[
                                                        tmpPrjImgList.indexOf(
                                                          imgTarget
                                                        )
                                                      ] = imgTarget;
                                                    } else {
                                                      tmpPrjImgList.push(
                                                        imgTarget
                                                      );
                                                    }

                                                    console.log(
                                                      "이미지 리스트 보여주세여"
                                                    );
                                                    console.log(tmpPrjImgList);

                                                    setPrjImageList(
                                                      tmpPrjImgList
                                                    );

                                                    fileReader.onload =
                                                      function (evt) {
                                                        /* file을 꺼내서 State로 지정 */

                                                        setPrjImg(
                                                          evt.target.result
                                                        );
                                                      };
                                                  }
                                                }}
                                              />
                                            </div>
                                          )}

                                          <div class="w-full flex flex-col gap-4 px-3 justify-center">
                                            <div class="mr-3 font-test text-base px-1">
                                              개발 날짜
                                              <div class="font-ltest mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                                                <input
                                                  class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                  placeholder={item.startTerm}
                                                  onChange={(e) =>
                                                    onUpdatePrjStartInput(
                                                      e.currentTarget.value,
                                                      item.startTerm,
                                                      e
                                                    )
                                                  }
                                                />
                                                <div>~</div>
                                                <input
                                                  class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                  onChange={(e) =>
                                                    onUpdatePrjEndInput(
                                                      e.currentTarget.value,
                                                      item.endTerm,
                                                      e
                                                    )
                                                  }
                                                  placeholder={item.endTerm}
                                                />
                                              </div>
                                            </div>
                                            <div class="flex gap-6 font-test text-base items-center">
                                              <div class="text-base font-test text-lg pl-1 pr-3 border-r border-gray-300 ">
                                                맡은 직군
                                              </div>
                                              <input
                                                class="font-ltest text-gray-600 w-1/2 focus:outline-0"
                                                placeholder={item.job}
                                                onChange={(e) => {
                                                  onUpdatePrjJobInput(
                                                    e.currentTarget.value,
                                                    item.job,
                                                    e
                                                  );
                                                }}
                                              />
                                            </div>
                                            <div class="mr-3 font-test text-base">
                                              <div class="text-base border-b border-gray-400 w-full px-1 pb-2">
                                                사용 기술
                                              </div>
                                              <div class="grid grid-cols-3 text-gray-600 text-base mt-3 gap-3">
                                                {selectedTagList.map(
                                                  (skill) => {
                                                    return (
                                                      <div class="text-base w-full rounded-lg border border-gray-300 px-2 text-center py-1 ">
                                                        {skill.name}
                                                      </div>
                                                    );
                                                  }
                                                )}
                                                <button
                                                  class="w-full rounded-lg border border-dashed border-gray-300 p-1"
                                                  onClick={() => {
                                                    setShowTagModal(true);
                                                  }}
                                                >
                                                  +
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div class="flex justify-center gap-5 mt-5">
                                          <div class="flex flex-col items-center">
                                            <img
                                              class="w-40rem h-50rem border border-gray-300"
                                              src={item.image}
                                              style={{
                                                minHeight: "12rem",
                                                minWidth: "16rem",
                                                maxHeight: "12rem",
                                                maxWidth: "16rem",
                                              }}
                                            />
                                          </div>
                                          <div class="text-gray-500 w-full flex flex-col gap-4 px-3 justify-center">
                                            <div class="text-base mr-3 font-test text-xl px-1">
                                              개발 날짜
                                              <div class="font-ltest text-gray-500 mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                                                <input
                                                  class="bg-gray-100 border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                  placeholder={item.startTerm}
                                                  disabled
                                                />
                                                <div>~</div>
                                                <input
                                                  class="bg-gray-100 border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                                  placeholder={item.endTerm}
                                                  disabled
                                                />
                                              </div>
                                            </div>
                                            <div class="text-gray-500 flex gap-6 font-test text-base items-center">
                                              <div class="font-test text-base pl-1 pr-3 border-r border-gray-300 ">
                                                맡은 직군
                                              </div>
                                              <input
                                                class="bg-gray-100 font-ltest text-gray-600 w-1/2 focus:outline-0"
                                                placeholder={item.job}
                                              />
                                            </div>

                                            <div class="mr-3 font-test text-base">
                                              <div class="border-b border-gray-400 w-full px-1 pb-2">
                                                사용 기술
                                              </div>
                                              <div class="text-gray-500 grid grid-cols-3 text-base mt-3 gap-3">
                                                {item.projectSkills &&
                                                  item.projectSkills.map(
                                                    (skill) => {
                                                      return (
                                                        <div class="text-base w-full rounded-lg border border-gray-300 px-2 text-center py-1 ">
                                                          {skill.name}
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {item.update ? (
                                        <>
                                          <div class="text-gray-500 mt-5 font-test text-base break-all border-b border-gray-300">
                                            <div class="border-b border-gray-300 w-full pb-2 mb-2 ">
                                              프로젝트 설명
                                            </div>
                                            <textarea
                                              class="text-base w-full focus:outline-0 resize-none bg-inherit min-h-[10rem] "
                                              placeholder={item.content}
                                              onChange={(e) => {
                                                onUpdatePrjContentInput(
                                                  e.currentTarget.value,
                                                  item.content,
                                                  e
                                                );
                                              }}
                                            />
                                          </div>
                                          <div class="w-full flex justify-end">
                                            <button
                                              class="w-[15%] mt-2 ml-full py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={(e) => {
                                                onUpdateProjectHandler(
                                                  item.id,
                                                  item.title,
                                                  item.content,
                                                  item.startTerm,
                                                  item.endTerm,
                                                  item.job,
                                                  item.projectSkills,
                                                  item.image,
                                                  e
                                                );
                                              }}
                                            >
                                              수정완료
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <div class="text-gray-500 mt-5 font-test text-base break-all border-b border-gray-300">
                                          <div class="border-b border-gray-300 w-full pb-2 mb-2 ">
                                            프로젝트 설명
                                          </div>
                                          <textarea
                                            class="font-ltest w-full bg-inherit min-h-[10rem]"
                                            placeholder={item.content}
                                            disabled
                                          />
                                          <div class="flex justify-end gap-2">
                                            {/* <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={() => {
                                                const findIndex =
                                                  firstProjectInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyProject = [
                                                  ...firstProjectInfo,
                                                ];
                                                copyProject[findIndex] = {
                                                  ...copyProject[findIndex],
                                                  update: true,
                                                };
                                                setFirstProjectInfo(
                                                  copyProject
                                                );

                                                // 이거 두개는 애매함...
                                                setPrjSkillsList([]);
                                                tmpPrjSkillsList = [];
                                              }}
                                            >
                                              수정하기
                                            </button> */}
                                            <button
                                              class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                              onClick={(e) => {
                                                onProjectDeleteHandler(
                                                  item.id,
                                                  e
                                                );
                                                const findIndex =
                                                  firstProjectInfo.findIndex(
                                                    (element) =>
                                                      element.id == item.id
                                                  );
                                                let copyProject = [
                                                  ...firstProjectInfo,
                                                ];
                                                copyProject[findIndex] = {
                                                  ...copyProject[findIndex],
                                                  delete: true,
                                                };
                                                // setFirstProjectInfo(
                                                //   copyProject
                                                // );
                                              }}
                                            >
                                              삭제하기
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </>
                        )}

                        {projectAdd ? (
                          <div class="text-base font-test bg-white rounded-xl text-gray-900  border border-gray-300 px-10 pt-8 pb-4">
                            <input
                              class="w-full border-b border-gray-300 pb-2 font-test text-base mb-2 text-gray-700 focus:outline-0"
                              placeholder="프로젝트명 입력"
                              onChange={(e) => {
                                setPrjName(e.target.value);
                              }}
                            />

                            <div class="flex justify-center gap-1 mt-5">
                              {prjImg ? (
                                <div class="flex flex-col items-center">
                                  <img
                                    class="w-40rem h-50rem border border-gray-300"
                                    src={prjImg}
                                    style={{
                                      minHeight: "12rem",
                                      minWidth: "16rem",
                                      maxHeight: "12rem",
                                      maxWidth: "16rem",
                                    }}
                                  />
                                  <label
                                    for="input-prjimg"
                                    class="w-full flex justify-end"
                                  >
                                    <div class="mt-3 w-1/4 py-1 text-base text-white bg-gray-400 rounded-xl text-center focus:outline-0 flex flex-col justify-center cursor-pointer">
                                      <div>사진 수정</div>
                                    </div>
                                  </label>
                                </div>
                              ) : (
                                <div>
                                  <label for="input-prjimg" class="">
                                    <div
                                      class="w-full h-full font-ltest text-base text-gray-500 rounded-xl border border-dashed border-gray-300 text-center focus:outline-0 flex flex-col justify-center cursor-pointer"
                                      style={{
                                        minHeight: "14rem",
                                        minWidth: "22rem",
                                        maxHeight: "14rem",
                                        maxWidth: "22rem",
                                      }}
                                    >
                                      <div>+</div>프로젝트 대표 이미지 추가
                                    </div>
                                  </label>
                                </div>
                              )}

                              <input
                                type="file"
                                accept="image/*"
                                id="input-prjimg"
                                class="w-0 h-0"
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  if (e.target.value.length > 0) {
                                    let imgTarget = e.target.files[0];

                                    // tmpPrjImgList.push(imgTarget);
                                    // setPrjImageList(tmpPrjImgList);

                                    setPrjImageList(tmpPrjImgList);

                                    let fileReader = new FileReader();

                                    fileReader.readAsDataURL(imgTarget);
                                    fileReader.onload = function (evt) {
                                      /* file을 꺼내서 State로 지정 */
                                      setPrjImg(evt.target.result);
                                    };
                                  }
                                }}
                              />

                              <div class="w-full flex flex-col gap-4 px-3 justify-center">
                                <div class="mr-3 font-test text-base px-1">
                                  개발 날짜
                                  <div class="font-ltest mt-1 flex justify-between items-center text-base text-center text-gray-500 ">
                                    <input
                                      class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                      onChange={onPrjDevStartInputHandler}
                                      placeholder="시작 일자(yyyy.mm)"
                                    // value={prjDevStart}
                                    />
                                    <div>~</div>
                                    <input
                                      class="border border-gray-300 rounded-md text-md w-[45%] py-1 px-3 focus:outline-0"
                                      onChange={onPrjEndInputHandler}
                                      placeholder="종료 일자(yyyy.mm)"
                                    // value={prjDevEnd}
                                    />
                                  </div>
                                </div>
                                <div class="flex gap-6 font-test text-base items-center">
                                  <div class="text-base font-test text-lg pl-1 pr-3 border-r border-gray-300 ">
                                    맡은 직군
                                  </div>
                                  <input
                                    class="font-ltest text-gray-600 w-1/2 focus:outline-0"
                                    placeholder="입력"
                                    onChange={(e) => {
                                      setPrjDev(e.target.value);
                                    }}
                                  />
                                </div>
                                <div class="mr-3 font-test text-base">
                                  <div class="text-base border-b border-gray-400 w-full px-1 pb-2">
                                    사용 기술
                                  </div>
                                  <div class="font-ltest grid grid-cols-3 text-gray-600 text-base mt-3 gap-3">
                                    {selectedTagList.map((item) => {
                                      return (
                                        <div class="text-base w-full rounded-lg border border-gray-300 px-2 text-center py-1 ">
                                          {item.name}
                                        </div>
                                      );
                                    })}
                                    <button
                                      class="w-full rounded-lg border border-dashed border-gray-300 p-1"
                                      onClick={() => {
                                        setShowTagModal(true);
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="text-gray-600 mt-5 font-test text-base break-all border-b border-gray-300">
                              <div class="border-b border-gray-300 w-full pb-2 mb-2 text-gray-700">
                                프로젝트 설명
                              </div>
                              <textarea
                                class="text-base w-full focus:outline-0 resize-none bg-inherit min-h-[10rem] "
                                placeholder="설명"
                                onChange={(e) => {
                                  setPrjDetailInput(e.target.value);
                                }}
                              />
                            </div>
                            <div class="w-full flex justify-end">
                              <button
                                class="w-[15%] mt-2 ml-full py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                onClick={() => {
                                  onProjectInputHandler();
                                  setSelectedTagList([]);
                                  setPrjSkillsList([]);
                                  tmpPrjSkillsList = [];

                                  if (!checkCreate) {
                                    tmpPrjImgList.push(prjImg);
                                    setPrjImageList(tmpPrjImgList);
                                  }

                                  setPrjImg(null);
                                }}
                              >
                                추가하기
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            class="w-full py-2 px-4 bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            onClick={() => {
                              setProjectAdd(true);
                              setPrjSkillsList([]);
                              tmpPrjSkillsList = [];
                            }}
                          >
                            ➕
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="mt-5 border-b pb-10 border-gray-300"></div>
                <section class="mt-10">
                  {topRecommendPost ? (
                    <>
                      <div class="text-xl font-bold">
                        블로그 정보{" "}
                        <a class="text-base text-gray-500">
                          (실제로 등록된 글이 삭제되지는 않습니다.)
                        </a>
                      </div>
                      {checkCreate ? <div class="flex justify-end">
                        <button
                          class=" text-base text-gray-500"
                          onClick={() => updateTopPost()}
                        >
                          🔄추천수 상위글 갱신하기
                        </button>
                      </div> : null}

                      {checkCreate ? (
                        <>
                          {topRecommendPost &&
                            topRecommendPost.map((item, index) => {
                              return (
                                <div class="w-full mt-4 pt-3 pb-6 px-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-0 text-lg font-ltest min-w-[20rem]">
                                  <div>
                                    <div class="text-gray-500 flex w-full border-b border-gray-300 pb-1 mb-3 mt-2 ">
                                      <div class="">추천수 상위글</div>
                                      <button
                                        class="ml-auto pr-2"
                                        onClick={(e) =>
                                          onTopPostDeleteHandler(index, e)
                                        }
                                      >
                                        ✂ 삭제하기
                                      </button>
                                    </div>
                                    <div class="w-full flex px-5 items-center gap-5 text-gray-500 text-md">
                                      <div class="w-3 h-3 rounded-full bg-gray-500"></div>
                                      <div class="grow">{item.title}</div>
                                      <div>추천수 : {item.recommend}</div>
                                      <div>{dateAfter[index]}</div>
                                    </div>

                                    <div
                                      class="px-5 flex justify-center items-center mt-3 gap-6"
                                      style={{
                                        maxHeight: "10rem",
                                        minWidth: "48rem",
                                      }}
                                    >
                                      <div class="bg-white rounded-lg border border-gray-300 py-4 grow">
                                        <div class="relative py-2 px-2 break-all text-gray-500">
                                          {contentAfter[index]}{" "}
                                          {
                                            <button
                                              class=" text-gray-600"
                                              onClick={() =>
                                                navigate(
                                                  "/blog/detail/" + item.boardId
                                                )
                                              }
                                            >
                                              {"("}🔗더보기 {")"}
                                            </button>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          <div class="flex justify-end mt-5">
                            <button
                              class="rounded-lg py-2 w-[20rem] xl:w-[15%] h-full border border-gray-300 text-gray-500 text-base font-test min-w-[5rem]"
                              onClick={(e) => onUpdateBlogHandler()}
                            >
                              등록하기
                            </button>
                          </div>
                        </>
                      ) : (
                        <div class="mt-2">
                          블로그 글은 포트폴리오 생성 후에 확인할 수 있어요!
                        </div>
                      )}
                    </>
                  ) : (
                    <div class="font-test">
                      블로그에 등록된 글이 존재하지 않습니다.😅
                    </div>
                  )}
                </section>
              </div>
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PortfolioMain;
