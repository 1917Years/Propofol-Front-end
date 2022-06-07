import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../utils/SRC";
import BlogSearchBar from "../../Component/Blog/BlogSearchBar";
import { TagModal } from "../../Component/Modal";
import { Page } from "../../utils/page";
import { BlogWritingList } from "../../Component/Blog/BlogWritingList"
import { htmlDetailToText } from "../../utils/html";

function BlogSearch() {
  const navigate = useNavigate();
  const tagList = ["JAVA", "Spring", "C++", "JavaScript", "C#", "C", "Python", "냠냠", "ㅁㄴㅇ", "울랄라", "언어1", "언어2"];
  const [isTagChecked, setIsTagChecked] = useState([]);
  const [isTagFull, setIsTagFull] = useState(false);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [tmp, setTmp] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSeratchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const option = searchParams.get('option');
  const tag = searchParams.get('tag');
  //
  const [showTagMoadl, setShowTagModal] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);
  //
  const [totalPage, setTotalPage] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [selected, setSelected] = useState(1);
  //
  const [writingTextList, setWritingTextList] = useState([]);
  function pageHandler() {
    navigate("");
  }
  //
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
    }
    else if (isTagChecked[e.target.value] == false) {
      setCheckedTagList(t_c.filter((tagname) => tagname !== e.target.name));
      setIsTagFull(false);
    }
    console.log(checkedTagList);
    setTmp(!tmp);
  };
  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      navigate('/blog/search');
    }
  };

  async function loadSearchResult(page) {
    //
    console.log(tag);
    console.log(searchParams.getAll('tag'));
    let taglist = tag.split(" ").slice(1);
    let tmptaglist = [];
    let tagIdlist = [];
    taglist.map((item) => {
      console.log(item);
      console.log(item.split("_"));
      tmptaglist.push({ name: item.split("_")[1], id: item.split("_")[0] });
      tagIdlist.push(item.split("_")[0]);
    })
    setSelectedTagList([...tmptaglist]);
    const params = new URLSearchParams();
    params.append('keyword', keyword);
    params.append('page', page);
    tagIdlist.map((item) => {
      params.append('tagId', item);
    });
    console.log(tmptaglist);
    console.log(params.get('keyword'));
    console.log(params.get('page'));
    console.log(params.getAll('tagId'));
    //
    if (option == '제목') {
      await axios.get(SERVER_URL + "/til-service/api/v1/boards/search", { params: params })
        .then((res) => {
          console.log(res);
          let pageCount = res.data.data.totalPageCount;
          let totalCount = res.data.data.totalCount;
          let tmpTextList = [];
          let tempSRList = [];
          res.data.data.boards.map((board) => {
            let tempSR;
            let tmpImgType = null;
            if (board.imgtype != null) {
              tmpImgType = board.imageType.toString().split('/')[1];
            }
            tempSR = {
              id: board.id,
              title: board.title,
              detail: board.content,
              date: board.createdDate,
              nickname: board.nickname,
              open: board.open,
              img: board.imageBytes,
              imgtype: tmpImgType,
              like: board.recommend,
              comment: board.commentCount,
              tag: board.tagInfos,
            }
            tempSR.date = tempSR.date.substring(0, 10) + "   " + tempSR.date.substring(11, 16);
            tmpTextList.push(htmlDetailToText(board.content));
            tempSRList.push(tempSR);
          });
          setTotalPage(pageCount);
          setSearchResult([...tempSRList]);
          setWritingTextList([...tmpTextList]);
        })
        .catch((err) => {
          console.log(err.response);
        })
    }
  }

  useEffect(() => {
    console.log(keyword);
    console.log("option : " + option);
    loadSearchResult(1);
  }, []);

  return (
    <div class="bg-white w-full h-screen font-test">
      {showTagMoadl ?
        (
          <TagModal
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
            setSelectedTagList={setSelectedTagList}
          />
        )
        :
        (null)
      }
      <div class="relative w-[60rem] inset-x-1/2 transform -translate-x-1/2 ">
        <div class="mt-10">
          <BlogSearchBar
            setShowTagModal={setShowTagModal}
            selectedTagList={selectedTagList}
            keyword={keyword}
          />
        </div>
        <div class="mt-10 border rounded-lg">
          <BlogWritingList
            writingList={searchResult}
            onWritingClickHandler={(e) => { navigate('/blog/detail/' + e.currentTarget.value) }}
            writingTextList={writingTextList}
          />
        </div>
        <div class="flex justify-center mt-5 gap-2 font-ltest">
          <Page
            startPage={startPage}
            totalPage={totalPage}
            setSelected={setSelected}
            load={pageHandler}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogSearch;
