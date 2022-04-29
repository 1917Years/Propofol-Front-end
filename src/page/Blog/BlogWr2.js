import { React, useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogEditor from "../../Component/BlogEditor";

function BlogWr2() {
    const [htmlContent, setHtmlContent] = useState("");
    const quillRef = useRef();
    return (
        <div class="bg-white w-full h-screen font-test">
            <BlogEditor quillRef={quillRef} htmlContent={htmlContent} setHtmlContent={setHtmlContent} />

        </div>
    );
}

export default BlogWr2;
