import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import { htmlDetailToText } from "../utils/html";

// 스트릭

let isLeafYear = false;

export function loadStreak(props) { // props -> leafYear, putNumbertoStreak, dateToNumber, setStreak, setWorkingSum
    axios.get(SERVER_URL + "/user-service/api/v1/members/streak")
        .then((res) => {
            let temp, tmpsum = 0;
            isLeafYear = props.leafYear(res.data.data.year);
            temp = props.putNumberToStreak(res.data.data.year, isLeafYear);
            res.data.data.streaks.map((item) => {
                let tmpnum = props.dateToNumber(isLeafYear, item.date);
                temp[tmpnum - 1].working = item.working;
                tmpsum = tmpsum + item.working * 1;
            });
            props.setStreak(temp);
            props.setWorkingSum(tmpsum * 1);
        })
        .catch((err) => {
            console.log(err);
        });
}

// 팔로워

function loadFollowers(page) {
    axios.get(SERVER_URL + "/user-service/api/v1/subscribe/followers",
        { params: { page: page } })
        .then((res) => {
            console.log(res);
            setFollower(res.data.data.data);
            setFollowingCount(res.data.data.totalCount);
        })
        .catch((err) => {
            console.log(err.response);
        })
}


// 글

function loadWritings(props) { // props->currentPage, setCheckNoPost, setMaxPageCount, setWritingList
    axios.get(SERVER_URL + "/til-service/api/v1/boards/myBoards?page=" + props.currentPage)
        .then((res) => {
            console.log("저는 글을 로딩하고 있어요");
            console.log(res);
            let tmpPageCount;
            if (res.data.data.totalCount == 0)
                props.setCheckNoPost(true);
            else
                props.setCheckNoPost(false);
            tmpPageCount = res.data.data.totalPageCount;
            props.setMaxPageCount(tmpPageCount);
            let tmpWrList = [], tmpTextList = [];
            res.data.data.boards.map((writing) => {
                let tmpimgtype = null;
                if (writing.imgtype != null) {
                    tmpimgtype = writing.imageType.toString().split('/')[1];
                }
                let tmpWr;
                tmpWr = {
                    id: writing.id,
                    title: writing.title,
                    detail: writing.content,
                    date: writing.createdDate,
                    open: writing.open,
                    img: writing.imageBytes,
                    imgtype: tmpimgtype,
                    like: writing.recommend,
                    comment: writing.commentCount,
                    tag: writing.tags == null ? [] : writing.tags,
                }
                tmpWr.date = tmpWr.date.substring(0, 10) + "   " + tmpWr.date.substring(11, 16);
                tmpTextList.push(htmlDetailToText(writing.content));
                tmpWrList.push(tmpWr);
                props.setWritingList([...tmpWrList]);
                console.log("tmpWR : ");
                console.log(tmpWr);
            });
            props.setWritingTextList([...tmpTextList]);
        })
        .catch((err) => {
            console.log(err);
        });
}
