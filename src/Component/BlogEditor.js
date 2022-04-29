import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import EditorToolbar, { modules, formats } from "./EditorToolbar";

function BlogEditor({ quillRef, htmlContent, setHtmlContent }) {


    return (
        <>
            <EditorToolbar />
            <ReactQuill
                ref={quillRef}
                value={htmlContent}
                onChange={setHtmlContent}
                modules={modules}
                formats={formats}
                theme="snow"
                class="w-[60rem] h-full"
            />
        </>
    );
}

export default BlogEditor;