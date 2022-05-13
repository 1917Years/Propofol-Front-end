import { React, useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogEditor from "../../Component/BlogEditor";

function BlogWr2() {
    return (
        <div class="bg-white w-full h-screen font-test">
            <BlogEditor />
        </div>
    );
}

export default BlogWr2;
