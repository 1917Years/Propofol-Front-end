import { useNavigate, Navigate, useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { SERVER_URL } from "../../utils/SRC";
import axios from "axios";

export function TemplateModal(props) {
  const navigate = useNavigate();

  const setTemplateHandler = (params, e) => {
    console.log("템플릿 타입");
    console.log(params);
    props.setTemplate(params);
  };

  const onTemplateUpdateHandler = (e) => {
    axios
      .post(
        SERVER_URL +
          "/ptf-service/api/v1/portfolio/" +
          props.id +
          "/template?template=" +
          props.template
      )
      .then((res) => {
        console.log("템플릿 변경");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    props.setOpenTemplate(!props.openTemplate);
  };

  return (
    <div class="relative mx-auto p-4 w-full max-w-2xl h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-300">
        <div class="flex p-4 rounded-t border dark:border-gray-300">
          <div class="text-lg font-ltest font-semibold text-gray-900 dark:text-white align-middle">
            {props.checkCreate ? "🖼 템플릿 수정하기" : "🖼 템플릿 선택하기"}
          </div>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => props.setOpenTemplate(!props.openTemplate)}
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="flex justify-center font-test">
            각 템플릿의 대표 색상이에요. 색깔을 클릭하면 샘플 템플릿을 볼 수
            있어요.
          </div>
          <div class="flex gap-4 justify-center">
            <div>
              <button
                class="w-28 h-56 bg-white border border-gray-300"
                onClick={() => navigate("/portfolio/template/samplet1")}
              >
                　
              </button>
              <button
                class={
                  props.template == "TYPE_1"
                    ? "ml-6 mt-4 text-indigo-500 text-lg"
                    : "ml-6 mt-4"
                }
                onClick={(e) => setTemplateHandler("TYPE_1", e)}
              >
                TYPE 1
              </button>
            </div>
            <div>
              <button
                class="w-28 h-56 bg-black"
                onClick={() => navigate("/portfolio/template/samplet2")}
              >
                　
              </button>
              <button
                class={
                  props.template == "TYPE_2"
                    ? "ml-6 mt-4 text-indigo-500 text-lg"
                    : "ml-6 mt-4"
                }
                onClick={(e) => setTemplateHandler("TYPE_2", e)}
              >
                TYPE 2
              </button>
            </div>
            <div>
              <button
                class="w-28 h-56 bg-indigo-300"
                onClick={() => navigate("/portfolio/template/samplet3")}
              >
                　
              </button>
              <button
                class={
                  props.template == "TYPE_3"
                    ? "ml-6 mt-4 text-indigo-500 text-lg"
                    : "ml-6 mt-4"
                }
                onClick={(e) => setTemplateHandler("TYPE_3", e)}
              >
                TYPE 3
              </button>
            </div>
            <div>
              <button
                class="w-28 h-56 bg-bg7"
                onClick={() => navigate("/portfolio/template/samplet4")}
              >
                　
              </button>
              <button
                class={
                  props.template == "TYPE_4"
                    ? "ml-6 mt-4 text-indigo-500 text-lg"
                    : "ml-6 mt-4"
                }
                onClick={(e) => setTemplateHandler("TYPE_4", e)}
              >
                TYPE 4
              </button>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class="font-test text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => onTemplateUpdateHandler()}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
