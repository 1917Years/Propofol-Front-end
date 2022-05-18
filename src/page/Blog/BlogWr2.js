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
    const [searchParams, setSearchParams] = useSearchParams();
    const [writingInfo, setWritingInfo] = useState({});
    const [loadingComplete, setLoadingComplete] = useState(false);
    const { prv } = useLocation();
    const writingNo = searchParams.get('No');

    async function loadWritings() {
        let tmpInfo;
        await axios.get(SERVER_URL + "/til-service/api/v1/boards/" + writingNo).
            then((res) => {
                let byteList = [], typeList = [];
                const writing = res.data.data;
                if (writing.imgbyte != null) {
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
                    nickname: writing.nickname,
                    commentCount: writing.commentCount
                }
                wrInfo = tmpInfo;
                setWritingInfo(tmpInfo);
                console.log("tmpInfo는");
                console.log(tmpInfo);
                console.log(wrInfo);
                setLoadingComplete(true);
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
