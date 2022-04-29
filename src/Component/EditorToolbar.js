import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
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

let FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
    'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu', 'iroBatang',
];
Quill.register(FontAttributor, true);

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
        container: '#toolbar',
    },
}

export const formats = [
    //'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',
]


function EditorToolbar() { //Custom Toolbar
    return (
        <div id="toolbar" class="w-full bg-purple-100 h-16">
            <span className="ql-formats">
                <select className="ql-font" defaultValue="arial">
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                    <option value="iroBatang">이롭게 바탕체</option>
                </select>
                <select className="ql-size" defaultValue="medium">
                    <option value="extra-small">Size 1</option>
                    <option value="small">Size 2</option>
                    <option value="medium">Size 3</option>
                    <option value="large">Size 4</option>
                </select>
                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
            </span>
            <span class="ql-formats">
                <button>
                    asd
                </button>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
                <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" />
                <button className="ql-blockquote" />
                <button className="ql-direction" />
            </span>
            <span className="ql-formats">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
                <button className="font-ltest text-sm ml-10ql-image">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
                    사진
                </button>
                <button className="ql-video" />
            </span>
            <span className="ql-formats">
                <button className="ql-formula" />
                <button className="ql-code-block" />
                <button className="ql-clean" />
            </span>
            <span className="ql-formats">
                <button className="ql-undo">

                </button>
                <button className="ql-redo">

                </button>
            </span>

        </div>);
}

export default EditorToolbar;