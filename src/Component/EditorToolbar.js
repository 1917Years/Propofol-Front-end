import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

/*

export const modules = useMemo(
    () => ({
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                    { align: [] },
                ],
                ["image", "video"],
            ],
        },
    }),
    []
);
*/

const CustomTmpSave = () => {
    return (
        <button class="z-40 w-[5rem] rounded-[18px] bg-none border border-gray-400 text-gray-600 font-sbtest px-5 py-1 flex bg-white items-center gap-2">
            <div class="text-center">임시저장</div>
            <div class="h-3/5 w-1 border-l border-gray-400"></div>
            <div class="text-center text-gray-600 font-ltest">0</div>
        </button>
    );
};

let FontAttributor = Quill.import("attributors/class/font");
FontAttributor.whitelist = [
    "iroBatang",
    "nanumGothic",
    "nanumMyeongjo",
    "maruBuri",
    "nanumPen",
    "nanumSquare",
    "tvn",
];
Quill.register(FontAttributor, true);
/*
let icons = Quill.import("ui/icons");
icons["image"] =
    '<i class="w-24 h-24" aria-hidden="true"> <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" > <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /> </svg></i>';
*/
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px", "36px", "48px", "60px"];
Quill.register(Size, true);

hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python', 'c', 'c++']
});

export const modules = {
    toolbar: {
        /*
            container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                    { align: [] },
                ],
                ["image", "video"],
            ],
            */
        container: "#toolbar",
    },

    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },

};

export const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
];

function EditorToolbar() {
    //Custom Toolbar
    return (
        <div id="toolbar" class="flex w-full min-w-[100rem] bg-gray-50 h-12 fixed z-40 gap-[1px]">
            <span className="ql-formats mt-1 ml-3">
                <select className="ql-font" defaultValue="iroBatang">
                    <option value="iroBatang" selected>이롭게 바탕체</option>
                    <option value="nanumGothic">나눔고딕</option>
                    <option value="nanumMyeongjo">나눔명조</option>
                    <option value="nanumPen">나눔손글씨 펜</option>
                    <option value="nanumSquare">나눔스퀘어</option>
                    <option value="maruBuri">마루 부리</option>
                    <option value="tvn">tvn 즐거운 이야기</option>
                </select>
                <select className="ql-size" defaultValue="18px">
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="22px">22px</option>
                    <option value="24px">24px</option>
                    <option value="26px">26px</option>
                    <option value="28px">28px</option>
                    <option value="30px">30px</option>
                    <option value="36px">36px</option>
                    <option value="48px">48px</option>
                    <option value="60px">60px</option>
                </select>
            </span>
            <span className="ql-formats mt-1">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats mt-1">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats mt-1">
                <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" />
                <button className="ql-blockquote" />
                <button className="ql-direction" />
            </span>
            <span className="ql-formats mt-1">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats mt-1">
                <button className="ql-link" />
                <button
                    id="ql-image"
                    className="ql-image"
                >
                </button>
                <button className="ql-video" />
            </span>
            <span className="ql-formats mt-1">
                <button className="ql-formula" />
                <button className="ql-code-block" />
                <button className="ql-clean" />
            </span>
            <span className="ql-formats mt-1">
                <button className="ql-undo"></button>
                <button className="ql-redo"></button>
            </span>
        </div>
    );
}

export default EditorToolbar;
