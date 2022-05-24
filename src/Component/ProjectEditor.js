import { React, useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import { SERVER_URL } from "../utils/SRC";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import { TagModal } from "./Modal";

const modules = {
    toolbar: {
        container: "#toolbar_project",
    },
};

function ProejctToolbar() {
    //Custom Toolbar
    return (
        <div
            id="toolbar_project"
            class="flex w-full bg-white text-gray-500 h-12 z-40 project mb-2"
        >
            <span className="ql-formats mt-1 ml-1">
                <select className="ql-font" defaultValue="iroBatang">
                    <option value="iroBatang" selected>
                        이롭게 바탕체
                    </option>
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
                <button className="ql-blockquote" />
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats mt-1">
                <button id="ql-image" className="ql-image"></button>
            </span>
        </div>
    );
}

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

let Size = Quill.import("attributors/style/size");
Size.whitelist = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "30px",
    "36px",
    "48px",
    "60px",
];
Quill.register(Size, true);

function ProjectEditor(props) {
    return (
        <div>
            <div>
                <ProejctToolbar />
                <ReactQuill
                    defaultValue={props.loadedProject.content}
                    modules={modules}
                    onChange={(value) => { props.setContent(value) }}
                    theme="snow"
                />
            </div>
        </div>
    )
}

export default ProjectEditor;