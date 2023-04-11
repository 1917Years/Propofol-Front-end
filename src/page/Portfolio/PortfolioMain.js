import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import profileImage from "../../assets/img/profile.jpg";
import { TagModal } from "../../Component/Modal";
import { TemplateModal } from "./TemplateModal";

let tmpWorkList = [];
let tmpAwardList = [];
let tmpPrjList = [];
let tmpPrjImgList = [];

function PortfolioMain() {
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
  const [prjDevStart, setPrjDevStart] = useState(null);
  const [prjDevEnd, setPrjDevEnd] = useState(null);
  const [prjDev, setPrjDev] = useState(null);
  const [prjSkillsList, setPrjSkillsList] = useState([]);
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

  const [topRecommendPost, setTopRecommendPost] = useState([]);
  const [noPost, setNoPost] = useState(false);
  const [contentAfter, setContentAfter] = useState([]);
  const [dateAfter, setDateAfter] = useState([]);

  const [userTagInfo, setUserTagInfo] = useState([]);

  const navigate = useNavigate();
  const id = useParams().id;

  function htmlDetailToText(htmlContent) {
    let text = htmlContent.replace(/(<([^>]+)>)/gi, "");
    text = text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, (s) => {
      const entityMap = {
        "&nbsp;": " ",
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
  }

  async function onAwardInputHandler() {
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
  }

  async function onProjectInputHandler() {
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

    onProjectGetHandler();
  }

  const onProfileButtonHandler = (e) => {
    const myInput = document.getElementById("input-file");
    myInput.click();
  };

  const onProfileInputHandler = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);

    axios
      .post(SERVER_URL + "/user-service/api/v1/members/profile", formData)
      .then((res) => {
        console.log("프로필 이미지 확인ㅇㅇㅇ");
        console.log(res.data.data);
        setProfileType(res.data.data.profileType);
        setProfileImg(res.data.data.profileString);
      })
      .catch((err) => {
        console.log(err);
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
    let tmpWork = {
      title: workNameInput,
      content: workDetailInput,
      startTerm: workStart,
      endTerm: workEnd,
    };

    if (workNameInput == null) tmpWork.title = title;
    if (workDetailInput == null) tmpWork.content = content;
    if (workStart == null) tmpWork.startTerm = start;
    if (workEnd == null) tmpWork.endTerm = end;

    tmpWorkList = tmpWork;

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
  }

  async function onUpdateAwardHandler(params, date, name, e) {
    console.log("수상 수정");
    let tmpAward = {
      name: awardName,
      date: awardDate,
    };
    if (awardName == null) tmpAward.name = name;
    if (awardDate == null) tmpAward.date = date;

    tmpAwardList = tmpAward;
    console.log(tmpAwardList);

    await axios
      .post(
        SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/award/" + params,
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
  }

  async function onUpdateBlogHandler() {
    console.log("블로그 글 목록 확인");
    const formData = new FormData();

    topRecommendPost.map((post, index) => {
      formData.append("boardId", post.id);
      formData.append("title", post.title);
      formData.append("recommend", post.recommend);
    });

    contentAfter.map((content) => {
      formData.append("content", content);
    });

    dateAfter.map((date) => {
      formData.append("date", date);
    });

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

    // console.log(workStart);
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
    if (template == "TYPE_1") navigate("/portfolio/template/t1/" + id);
    else if (template == "TYPE_2") navigate("/portfolio/template/t2/" + id);
    else if (template == "TYPE_3") navigate("/portfolio/template/t3/" + id);
    else if (template == "TYPE_4") navigate("/portfolio/template/t4/" + id);
  }

  function onCareerDeleteHandler(params, e) {
    axios
      .delete(
        SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/career/" + params
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onAwardDeleteHandler(params, e) {
    axios
      .delete(
        SERVER_URL + "/ptf-service/api/v1/portfolio/" + id + "/award/" + params
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onProjectDeleteHandler(params, e) {
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

  let ptfId = 0;

  useEffect(() => {
    setOpenTemplate(false);
    console.log("포트폴리오 페이지 처음으로 들어옴~~~");

    console.log("id가 찍힐까...?"); // memberId...!
    console.log(id);
    fetchData();

    async function fetchData() {
      let tmpCm;
      await axios
        .get(SERVER_URL + "/user-service/api/v1/members")
        .then((res) => {
          console.log("안녕 가장 처음 찍혀야 하는 친구야");
          console.log(res);
          tmpCm = {
            id: res.data.data.id,
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

      await axios
        .get(SERVER_URL + "/user-service/api/v1/members/info/" + tmpCm.id)
        .then((res) => {
          console.log("안녕 나는 두번째...");
          console.log(res);

          console.log(res.data);

          if (res.data.profileType == null) {
            console.log("프로필 없삼");
            setCheckProfile(false);

            // 나중에 본 프로젝트랑 합칠 때는 tagInfos로 바꾸기!!! 지금은 tags임 (업데이트 안 돼서 ㅠㅠ)
            // let tagInfos = [...res.data.tagInfos];
            let tagInfos = [...res.data.tags];
            setUserTagInfo(tagInfos);
          } else {
            console.log("이미 프로필 이미지 있삼");
            setProfileType(res.data.profileType);
            setProfileImg(res.data.profileString);
            setCheckProfile(true);
            let tagInfos = [...res.data.tags];
            // let tagInfos = [...res.data.tagInfos];
            setUserTagInfo(tagInfos);
          }

          fetchData2();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function fetchData2() {
      let tmpCm = [];

      console.log("memberId 호출");
      console.log(id);

      await axios
        .get(
          SERVER_URL +
            "/ptf-service/api/v1/portfolio/memberPortfolio?memberId=" +
            id
        )
        .then((res) => {
          console.log("서버에서 보내준 값");
          console.log(res);

          if (res.data.data.portfolio != undefined) {
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
            console.log("포트폴리오 정보 조회하기~~~!!!!!");
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
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setCheckCreate(true);
      setLoadingComplete(true);
      setTemplate(tmpCm.template);
    }
    // checkPtfId();
  }, []);

  async function updateTopPost() {
    await axios
      .get(SERVER_URL + "/til-service/api/v1/boards/portfolio/myBoards")
      .then((res) => {
        console.log("추천수 높은 글을 가져올거예요~~~^^");
        console.log(res);
        // 원래는 .data로 접근해야 함!!
        // setTopRecommendPost([...res.data]);
        setTopRecommendPost([...res.data.data]);

        let tmpContentAfter = [];
        let tmpDate = [];

        // if (res.data.message != "아직 작성된 글이 없습니다.") {
        //   res.data.map((item) => {
        //     tmpContentAfter.push(
        //       htmlDetailToText(item.content).substring(0, 300) + "..."
        //     );
        //     tmpDate.push(item.createdDate);
        //   });

        //   let tmpDateAfter = [];
        //   tmpDate.map((item) => {
        //     tmpDateAfter.push(item.substring(0, 10));
        //   });

        //   setContentAfter([...tmpContentAfter]);
        //   setDateAfter([...tmpDateAfter]);
        // } else {
        //   setNoPost(true);
        // }

        if (res.data.data.message != "아직 작성된 글이 없습니다.") {
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
        } else {
          setNoPost(true);
        }
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
                {userInfo.username}님을 위한 포트폴리오예요 😊
              </div>
            </section>
            <div class="mt-4 mx-auto h-0.25 bg-gray-300"></div>
            <div class="flex justify-end text-base font-test">
              <button
                class="px-4 py-2 rounded-xl"
                onClick={() => setOpenTemplate(!openTemplate)}
              >
                {"🖼 템플릿 선택하기"}
              </button>
              <button
                class="pr-5 py-2 rounded-xl"
                onClick={() => onPortfolioCheckHandler()}
              >
                {"✨ 포트폴리오 확인하기"}
              </button>
            </div>
            {openTemplate ? (
              <TemplateModal
                setTemplate={setTemplate}
                template={template}
                setOpenTemplate={setOpenTemplate}
                openTemplate={openTemplate}
                id={id}
              />
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
                        {basicInfo.job == null ? (
                          <input
                            class=" w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder="간단한 직무명을 입력해주세요."
                            onChange={onJobInputHandler}
                          />
                        ) : (
                          <input
                            class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            defaultValue={basicInfo.job}
                            type="text"
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
                        {basicInfo.github == null ? (
                          <input
                            class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            placeholder={"https://github.com/userId"}
                            onChange={onGithubInputHandler}
                          />
                        ) : (
                          <input
                            class="w-full pl-2 py-2 focus:outline-0 text-lg font-ltest min-w-[20rem]"
                            defaultValue={basicInfo.github}
                            type="text"
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
                        {basicInfo.content == null ? (
                          <div class="w-full pl-2 py-2 text-lg font-ltest min-w-[20rem] ">
                            <textarea
                              class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 min-h-[10rem] "
                              placeholder="자기소개를 입력해주세요."
                              onChange={onIntroInputHandler}
                            />
                          </div>
                        ) : (
                          <div class="w-full pl-2 py-2 text-lg font-ltest min-w-[20rem] ">
                            <textarea
                              class="w-full mt-5 focus:outline-0 resize-none bg-inherit pb-3 min-h-[10rem] "
                              defaultValue={basicInfo.content}
                              onChange={onIntroInputHandler}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-end">
                  <button
                    class="ml-full py-3 mt-2 border border-gray-300 px-6 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                    onClick={() => {
                      onUpdateBasicInfoHandler();
                    }}
                  >
                    수정하기
                  </button>
                </div>
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
                        <>
                          <div class="flex">
                            <div class="flex flex-wrap items-center gap-3">
                              {userTagInfo.map((item) => {
                                return (
                                  <div class="text-center border border-gray-300 rounded-lg  py-2 px-4 bg-white focus:outline-0 text-base font-ltest">
                                    {item.name}
                                  </div>
                                );
                              })}
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
                      </td>
                    </tr>
                    <tr>
                      <td class="pl-2  bg-indigo-100 border border-slate-300">
                        경력
                      </td>
                      <td class="border border-slate-300">
                        <div>
                          {careerInfo.map((item) => {
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
                                        defaultValue={item.title}
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
                                        defaultValue={item.content}
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
                                              defaultValue={item.startTerm}
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
                                              defaultValue={item.endTerm}
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
                                              let copyCareer = [...careerInfo];
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
                                              onCareerDeleteHandler(item.id, e);
                                              const findIndex =
                                                careerInfo.findIndex(
                                                  (element) =>
                                                    element.id == item.id
                                                );
                                              let copyCareer = [...careerInfo];
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
                        {awardInfo.map((item) => {
                          return (
                            <div class="xl:flex justify-between w-full">
                              {item.delete ? null : (
                                <>
                                  {item.update ? (
                                    <>
                                      <div class="w-[30%]">
                                        <input
                                          class="text-gray-500 py-2 w-full h-full border border-gray-300 focus:outline-0 text-base font-ltest min-w-[10rem]"
                                          defaultValue={item.date}
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
                                          defaultValue={item.name}
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
                                          const findIndex = awardInfo.findIndex(
                                            (element) => element.id == item.id
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
                                          const findIndex = awardInfo.findIndex(
                                            (element) => element.id == item.id
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
                        {projectInfo.map((item) => {
                          return (
                            <>
                              {item.delete ? null : (
                                <div class="text-base font-test bg-gray-100 rounded-xl border border-gray-300 px-10 pt-8 pb-4">
                                  <input
                                    class=" text-gray-500 w-full border-b border-gray-300 pb-2 font-test text-lg mb-2 bg-inherit  focus:outline-0"
                                    placeholder={item.title}
                                    type="text"
                                    disabled
                                  />

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
                                      <button
                                        class="w-[15%] ml-full mb-2 py-1 border border-gray-300 px-4 bg-inherit text-gray-500 text-base font-test rounded-md min-w-[5rem]"
                                        onClick={(e) => {
                                          onProjectDeleteHandler(item.id, e);
                                          const findIndex =
                                            projectInfo.findIndex(
                                              (element) => element.id == item.id
                                            );
                                          let copyProject = [...projectInfo];
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
                                </div>
                              )}
                            </>
                          );
                        })}
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
                                  {/* <label
                                    for="input-prjimg"
                                    class="w-full flex justify-end"
                                  >
                                    <div class="mt-3 w-1/4 py-1 text-base text-white bg-gray-400 rounded-xl text-center focus:outline-0 flex flex-col justify-center cursor-pointer">
                                      <div>사진 수정</div>
                                    </div>
                                  </label> */}
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

                                    tmpPrjImgList.push(imgTarget);
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
                  {!noPost && topRecommendPost ? (
                    <>
                      <div class="text-xl font-bold">
                        블로그 정보{" "}
                        <a class="text-base text-gray-500">
                          (실제로 등록된 글이 삭제되지는 않습니다.)
                        </a>
                      </div>
                      <div class="flex justify-end">
                        <button
                          class=" text-base text-gray-500"
                          onClick={() => updateTopPost()}
                        >
                          🔄추천수 상위글 갱신하기
                        </button>
                      </div>
                      <>
                        {topRecommendPost.map((item, index) => {
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
                    </>
                  ) : (
                    <>
                      <div class="text-xl font-bold">
                        블로그 정보{" "}
                        <a class="text-base text-gray-500">
                          (실제로 등록된 글이 삭제되지는 않습니다.)
                        </a>
                      </div>
                      <div class="mt-2 font-test">
                        아직 블로그에 등록된 글이 존재하지 않습니다.😅
                      </div>
                    </>
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
