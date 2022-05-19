import { React, useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import BlogEditor from "../../Component/BlogEditor";

function BlogWr2(props) {
    //const [isModify, setIsModify] = useState(false);
    let isModify = false;
    let wrInfo;
    const [detailAfter, setDetailAfter] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [writingInfo, setWritingInfo] = useState({});
    const [loadingComplete, setLoadingComplete] = useState(false);
    const writingNo = searchParams.get('No');

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
        await setWritingInfo(tmpInfo);
        console.log(tmpInfo);
        //wrInfo = tmpInfo;
        //console.log();
        await setLoadingComplete(true);
        //console.log(detailAfter);
    };

    async function loadWritings() {
        let tmpInfo;
        await axios.get(SERVER_URL + "/til-service/api/v1/boards/" + writingNo).
            then((res) => {
                let byteList = [], typeList = [];
                const writing = res.data.data;
                if (writing.images != null) {
                    writing.images.map((imgbyte) => {
                        byteList.push(imgbyte);
                    })
                    writing.imageTypes.map((imgtype) => {
                        typeList.push(imgtype.toString().split('/')[1]);
                    })
                }
                tmpInfo =
                {
                    title: writing.title,
                    detail: writing.content,
                    date: writing.createdDate,
                    open: writing.open,
                    img: byteList,
                    imgtype: typeList,
                    like: writing.recommend,
                    commentCount: writing.commentCount
                }
                //wrInfo = tmpInfo;

                //setWritingInfo(tmpInfo);

                console.log("^^tmpInfo는");
                console.log(tmpInfo);
                //console.log(wrInfo);
                loadImage(tmpInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        if (writingNo != null) {
            isModify = true;
            console.log("수정중이에요!");
            console.log("글 정보는~");
            if (isModify) {
                console.log("글 불러오는 중...");
                loadWritings();
                console.log("불러온 글 정보는~");
                console.log(wrInfo);
            }
        }
    }, [])
    if (writingNo != null) {
        return (
            <div>
                {loadingComplete ? (
                    <div class="bg-white w-full h-screen font-test" >
                        <BlogEditor
                            isModify={true}
                            loadWritingInfo={writingInfo}
                            boardId={writingNo}
                        />
                    </div>
                ) : (
                    <div>
                        로딩중...
                    </div>
                )}
            </div>
        )
    }
    else {
        return (
            <div class="bg-white w-full h-screen font-test">
                <BlogEditor
                    isModify={false}
                    loadWritingInfo={wrInfo}
                />
            </div>
        );
    }
}

export default BlogWr2;
