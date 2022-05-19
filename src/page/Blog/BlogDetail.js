import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import hljs from "highlight.js";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import profileImage from "../../assets/img/profile.jpg";
import 'react-quill/dist/quill.bubble.css';

function BlogDetail() {
    let tmpWrInfo;
    const navigate = useNavigate();
    const id = useParams().id;
    const [compileResultList, setCompileResultList] = useState([]);
    const [codeList, setCodeList] = useState([]);
    const [detailList, setDetailList] = useState([]);
    const [detailAfter, setDetailAfter] = useState("");
    const [tmp, setTmp] = useState(false);
    const [writingInfo, setWritingInfo] = useState({});
    const [commentInput, setCommentInput] = useState("");
    const [addReplyComment, setAddReplyComment] = useState(false);
    const [replyCommentInput, setReplyCommentInput] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [checkFollowing, setCheckFollowing] = useState(false);
    const [checkProfile, setCheckProfile] = useState(false);

    function postCode(index) {
        console.log("버튼이 눌렸다!");
        console.log(index);
        console.log(codeList[index]);
        axios.post(SERVER_URL + "/til-service/api/v1/boards/code/" + id, {
            type: "python",
            code: codeList[index]
        })
            .then((res) => {
                let tmplist = compileResultList;
                tmplist[index] = { mes: res.data.data, err: false };
                setCompileResultList([...tmplist]);
                console.log(res);
                console.log(tmplist[index]);
            })
            .catch((err) => {
                console.log(err.response); // data.data.message : '컴파일 실패'
                if (err.response.data.message == "컴파일 실패") {
                    console.log("ㅎㅇ");
                    let tmplist = compileResultList;
                    tmplist[index] = { mes: err.response.data.data, err: true };
                    setCompileResultList([...tmplist]);
                    console.log(tmplist[index]);
                }
            });

    }

    function loadCode() {
        let tmpcodelist = [];
        let start = 0;
        let startend = 0;
        let end = 0;
        let k = 0;
        let tmpdetaillist = [];
        let division = 0;
        let prev_end = 0;
        let d = 0;
        let tmplist = [];
        tmpdetaillist.push({ detail: tmpWrInfo.detail, index: 0 }); // tmpdetailliet[0] = 원본;
        while (tmpWrInfo.detail.indexOf("<pre", end) != -1) {
            let tmpcode, tmpcode_after, tmpdetail_before;
            start = tmpWrInfo.detail.indexOf("<pre", end);
            startend = tmpWrInfo.detail.indexOf(">", start);
            end = tmpWrInfo.detail.indexOf("</pre>", startend);
            tmpcode = tmpWrInfo.detail.slice(startend + 1, end);
            tmpcode_after = tmpcode.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, s => {
                const entityMap = {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#39;': "'",
                };
                return entityMap[s];
            });
            tmpdetail_before = tmpdetaillist.pop().detail; // 잘라 줄 친구
            let tmpd_left = tmpdetail_before.slice(0, end + 6 - prev_end);
            let tmpd_right = tmpdetail_before.slice(end + 6 - prev_end);
            tmpdetaillist.push({ detail: tmpd_left, index: k });
            tmpdetaillist.push({ detail: tmpd_right, index: k + 1 });
            division = end + 6;
            //tmpWrInfo.detail = [tmpWrInfo.detail.slice(0, end + 6) + "<button class=\"ql-text cursor-pointer\" type=\"button \">컴파일</button>" + tmpWrInfo.detail.slice(end + 6)].join('');
            tmpcodelist.push(tmpcode_after);
            console.log("저는 코드에용");
            console.log(tmpcodelist[k]);
            console.log(tmpWrInfo.detail);
            prev_end = end + 6;
            tmplist.push({ mes: "", err: false });
            k++;
        }
        console.log("지금부터 tmpdetaillist를 출력하겠습니다~~~~~~~~!");
        tmpdetaillist.map((item) => {
            console.log(item);
        })
        setCompileResultList([...tmplist]);
        setCodeList([...tmpcodelist]);
        setDetailList([...tmpdetaillist]);
        setDetailAfter(tmpWrInfo.detail);
    }

    async function loadImage() {
        let tmpimgsrc = [];
        let tmpimgsrctype = [];
        let tmploadbyte = [];
        let start = 0;
        let end = 0;
        let k = 0;

        setDetailAfter(tmpWrInfo.detail);
        while (tmpWrInfo.detail.indexOf("<img src=\"http://", end) != -1) {
            start = tmpWrInfo.detail.indexOf("<img src=\"http://");
            end = tmpWrInfo.detail.indexOf(">", start);
            tmpimgsrc.push(tmpWrInfo.detail.slice(start + 10, end - 1));
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
            tmpWrInfo.detail = tmpWrInfo.detail.replace(tmpimgsrc[i], tmploadbyte[i]);
        }
        setDetailAfter(tmpWrInfo.detail);
        console.log("달라진 디테일은~");
        console.log(detailAfter);
    }

    async function loadWritings() {

        await axios.get(SERVER_URL + "/til-service/api/v1/boards/" + id).
            then(async (res) => {
                let byteList = [], typeList = [];
                const writing = res.data.data;
                console.log("게시글 조회ㅇㅇㅇㅇㅇ");
                console.log(res);
                writing.images.map((imgbyte) => {
                    byteList.push(imgbyte);
                })
                writing.imageTypes.map((imgtype) => {
                    typeList.push(imgtype.toString().split('/')[1]);
                })
                tmpWrInfo =
                {
                    title: writing.title,
                    detail: writing.content,
                    date: writing.createdDate,
                    open: writing.open,
                    img: byteList,
                    imgtype: typeList,
                    like: writing.recommend,
                    nickname: writing.nickname,
                    commentCount: writing.commentCount,
                    profileBytes: writing.profileBytes,
                    profileType: writing.profileType
                }
                tmpWrInfo.date = tmpWrInfo.date.substring(0, 10) + "   " + tmpWrInfo.date.substring(11, 16);
                //주소로 axios 후 변환
                //let detail_after;
                loadCode();
                loadImage();
                //src={"data:image/" + item.imgtype + ";base64," + item.img}
                //detail_after = tmpInfo.detail.replace(baseUrlList[i], imgUrlList[i]);

                //
                if (tmpWrInfo.profileType == null) {
                    console.log("프로필 이미지 x");
                    setCheckProfile(false);
                }
                else {
                    console.log("프로필 이미지 o");
                    setCheckProfile(true);
                }

                setWritingInfo(tmpWrInfo);
                console.log("tmpWrInfo는");
                console.log(tmpWrInfo);
            })
            .catch((err) => {
                console.log(err);
            })

        loadComment();
        await loadFollowing(tmpWrInfo.nickname);
    }

    function loadComment() {
        axios.get(SERVER_URL + "/til-service/api/v1/boards/" + id + "/comments?page=1")
            .then((res) => {
                let tmpCmList = [];
                let tmpCm;
                res.data.data.comments.map((item) => {
                    tmpCm =
                    {
                        content: item.content,
                        groupId: item.groupId,
                        id: item.id,
                        nickname: item.nickname,
                        date: item.createdDate,
                        imgBytes: item.profileBytes,
                        imgType: item.profileType
                    }

                    if (tmpCm.imgType == null) {
                        console.log("프로필 이미지 x");
                        setCheckProfile(false);
                    }
                    else {
                        console.log("프로필 이미지 o");
                        setCheckProfile(true);
                    }
                    tmpCmList.push(tmpCm);
                })
                tmpCm.date = tmpCm.date.substring(0, 10) + "   " + tmpCm.date.substring(11, 16);
                setCommentList([...tmpCmList]);
                console.log(commentList);
                console.log("댓글임");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function loadFollowing(nickname) {

        const t = {
            followingNickname: nickname
        };

        console.log("왜이래/??");
        console.log(JSON.stringify(t));

        axios.post(SERVER_URL + "/user-service/api/v1/members/checkFollowing", JSON.stringify(t), {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.data == true) {
                    setCheckFollowing(true);
                }
                else {
                    setCheckFollowing(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }



    function onCommentSaveHandler() {
        //console.log(commentInput);
        axios.post(SERVER_URL + "/til-service/api/v1/boards/" + id + "/comment", { content: commentInput })
            .then((res) => {
                console.log(res);
                loadComment();
                loadWritings();
            })
            .catch((err) => {
                console.log("안녕하세요? 전 에러에요.");
                console.log(err);
            })
    };

    function onReplyCommentSaveHandler(gid) {
        console.log(replyCommentInput);
        axios.post(SERVER_URL + "/til-service/api/v1/boards/" + id + "/" + gid + "/comment", { content: replyCommentInput })
            .then((res) => {
                console.log(res);
                loadComment();
                loadWritings();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    function onRecommendHandler() {
        axios.post(SERVER_URL + "/til-service/api/v1/boards/" + id + "/" + "recommend")
            .then((res) => {
                console.log(res);
                loadWritings();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    function onFollowingHandler(data) {
        axios.post(SERVER_URL + "/user-service/api/v1/members/following", data)
            .then((res) => {
                console.log("팔로우할랭");
                if (res.data.data == "ok") {
                    setCheckFollowing(true);
                }
                else {
                    setCheckFollowing(false);
                }
                console.log(res);
                loadWritings();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    function onPostDeleteHandler() {
        axios.delete(SERVER_URL + "/til-service/api/v1/boards/" + id)
            .then((res) => {
                console.log("게시글 삭제");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const modules = {
        toolbar: {
            container: []
        },
        syntax: {
            value: (text) => hljs.highlightAuto(text).language,
            highlight: (text) => {
                return (hljs.highlightAuto(text).value);
            }
        },
    };


    useEffect(() => {
        loadWritings();
    }, []);

    return (
        <div class="bg-white w-full h-screen font-test">
            <div class="relative w-[60rem] h-full inset-x-1/2 transform -translate-x-1/2 ">
                <div class="mt-12 border-b rounded-sm w-full border-slate-300 pt-3 pb-4 px-5 mb-10 text-3xl font-sbtest">
                    {writingInfo.title}
                    <div class="flex mb-4 mt-8 gap-4">
                        <img
                            src={checkProfile == false ? profileImage : "data:image/" + writingInfo.profileType + ";base64," + writingInfo.profileBytes}
                            class="w-24 h-14 rounded-full drop-shadow-md"
                        />

                        <div class="w-1/2">
                            <div class="text-xl font-sbtest text-gray-700">{writingInfo.nickname}</div>
                            <div class="text-base font-ltest text-gray-400">{writingInfo.date}</div>
                        </div>
                        <div class="flex w-full gap-2 justify-end">
                            <button
                                class="pt-3 text-base flex border border-lg font-ltest px-5"
                                onClick={() => {
                                    navigate("/blog/writing?No=" + id);
                                }}
                            >수정</button>
                            <button
                                onClick={() => onPostDeleteHandler()}
                                class="pt-3 text-base flex border border-lg font-ltest px-5">삭제</button>
                        </div>
                    </div>
                </div>

                <div class="focus:outline-0 mt-3 rounded-sm w-full py-3 px-5 border-b border-gray-300 mb-5 h-fit">
                    {detailList.slice(0, detailList.length - 1).map((item) => {
                        return (
                            <div class="w-[54rem]">

                                <ReactQuill
                                    value={item.detail}
                                    readOnly={true}
                                    modules={modules}
                                    theme={"bubble"}
                                />
                                <button
                                    class="ml-2"
                                    value={item.index}
                                    onClick={(e) => { postCode(e.target.value) }}
                                >
                                    컴파일하기
                                </button>
                                <div>
                                    <div>컴파일 결과</div>
                                    {compileResultList[item.index].err ?
                                        (
                                            <div class="ml-2 bg-gray-50 text-red-500">
                                                <div>컴파일 에러!</div>
                                                {compileResultList[item.index].mes}
                                            </div>
                                        ) :
                                        (
                                            <div class="ml-2 bg-gray-50 text-green-500">
                                                {compileResultList[item.index].mes}
                                            </div>
                                        )}

                                </div>
                            </div>
                        );
                    })
                    }
                    {detailList.slice(detailList.length - 1).map((item) => {
                        return (
                            <>
                                <ReactQuill
                                    value={item.detail}
                                    readOnly={true}
                                    modules={modules}
                                    theme={"bubble"}
                                />
                            </>
                        );
                    })
                    }
                </div>

                <div class="flex flex-col gap-5 pb-5 border-b border-gray-300">
                    <textarea
                        class="resize-none border border-gray-300 w-full px-5 py-3 min-h-[7rem] focus:outline-0 font-ltest"
                        placeholder="바르고 고운 말을 사용해주세요."
                        onChange={(e) => { setCommentInput(e.target.value) }}
                    />
                    <div class="flex w-full justify-between items-center">
                        <div class="flex gap-[0.4rem] text-2xl text-gray-600 w-full">
                            <div>댓글 </div>
                            <div>{writingInfo.commentCount}개</div>
                        </div>

                        <div class="flex w-full justify-end">
                            <button class="flex gap-2 border border-lg text-lg px-3 py-2 mr-2"
                                onClick={onRecommendHandler}>
                                <div class="border-r border-gray-200 pr-1">💕</div>
                                <div class="text-gray-500 font-ltest pl-1"> {writingInfo.like}</div>

                            </button>
                            <button class=
                                {checkFollowing == true ? "flex gap-2 border border-lg text-lg px-3 py-2 mr-2 text-indigo-400" : "flex gap-2 border border-lg text-lg px-3 py-2 mr-2"}
                                onClick={() => {
                                    console.log("tttt조회");
                                    console.log(writingInfo.like);
                                    console.log(writingInfo.nickname);
                                    const t = {
                                        followingNickname: writingInfo.nickname
                                    };
                                    // console.log(t);
                                    onFollowingHandler(t);
                                }}
                            >
                                <div class="pr-1">{checkFollowing == true ? "✔ Following" : "👀"}</div>

                            </button>

                        </div>
                        <button
                            class="text-center bg-gray-700 text-lg text-white w-[10%] min-w-[7rem] p-2"
                            onClick={() => {
                                onCommentSaveHandler();
                            }}
                        >
                            댓글 작성
                        </button>
                    </div>
                </div>
                <div class="pb-10">
                    {commentList.map((item) => {
                        return (
                            <div class="flex flex-col w-full ">
                                {item.groupId == item.id ? (
                                    <>
                                        <div class="flex items-center gap-4 mt-5">
                                            <img
                                                src={checkProfile == false ? profileImage : "data:image/" + item.imgType + ";base64," + item.imgBytes}
                                                class="w-12 h-12 rounded-full drop-shadow-md"
                                                alt="profile"
                                            />
                                            <div class="flex flex-col justify-between">
                                                <div class="text-xl text-gray-600">{item.nickname}</div>
                                                <div class="text-md text-gray-400 font-ltest">{item.date}</div>
                                            </div>
                                        </div>
                                        <div class="text-gray-600 text-base font-ltest ml-16">
                                            {item.content}
                                        </div>
                                        <div class="flex w-full justify-end items-end pb-5 border-b border-gray-300">
                                            <button
                                                class="border border-gray-200 text-gray-600 px-2 py-1"
                                                onClick={() => { setAddReplyComment(true) }}
                                            >답글 달기</button>
                                        </div>
                                        {addReplyComment ?
                                            (
                                                <>
                                                    <div class="flex flex-col items-center bg-gray-50 border-b border-gray-300 pb-5">
                                                        <textarea
                                                            class="w-4/5 mt-5 resize-none border border-gray-300 px-5 py-3 min-h-[7rem] focus:outline-0 font-ltest"
                                                            placeholder="바르고 고운 말을 사용해주세요."
                                                            onChange={(e) => { setReplyCommentInput(e.target.value) }}
                                                        />
                                                        <div class="w-4/5 flex justify-end text-gray-500 bg-white border-b border-l border-r border-gray-300">
                                                            <button
                                                                class="border-l border-gray-300 px-2 py-1"
                                                                value={item.id}
                                                                onClick={(e) => { onReplyCommentSaveHandler(e.target.value); setAddReplyComment(false) }}
                                                            >
                                                                댓글 작성
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            :
                                            (null)
                                        }
                                    </>
                                ) : (
                                    <>
                                        <div class="flex flex-col items-center bg-gray-50 border-b border-gray-300 pb-10">
                                            <div class="flex w-4/5 items-center gap-4 mt-5">
                                                <div class="w-10 h-10 bg-black rounded-full"></div>
                                                <div class="flex flex-col justify-between">
                                                    <div class="text-xl text-gray-600">{item.nickname}</div>
                                                    <div class="text-md text-gray-400 font-ltest">{item.date}</div>
                                                </div>
                                            </div>
                                            <div class="w-4/5 text-gray-600 text-base font-ltest ml-28">
                                                {item.content}
                                            </div>
                                        </div>
                                    </>
                                )}


                            </div>
                        )
                    })}
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;