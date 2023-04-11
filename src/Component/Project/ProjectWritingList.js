import { useNavigate } from "react-router-dom";

export function ProjectWritingList(props) {
  // props -> projectList, projectTextList
  const navigate = useNavigate();
  return (
    <div>
      {props.projectList.map((item, index) => {
        if (item.image != null) {
          return (
            <div
              className="Writing"
              class="flex border-b bg-white h-54 px-10 pt-3 gap-5 text-left w-[59.5rem] pb-3"
            >
              <div class="w-[47rem]">
                <div class="text-sm text-gray-400 flex gap-2 items-center font-ltest">
                  {item.status == "ACTIVE" ? (
                    <>
                      <div class="w-fit px-2 bg-green-300 text-black">
                        모집중
                      </div>
                    </>
                  ) : (
                    <div class="px-2 bg-red-300 text-black">모집완료</div>
                  )}
                  <div class="text-sm font-ltest text-gray-400">
                    {item.startDate + " ~ " + item.endDate}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/pm/detail/" + item.id)}
                  class="mt-1 py-1 text-black text-xl"
                >
                  {item.title}
                </button>
                <div class="font-ltest min-h-[45px]">
                  {props.projectTextList[index].length > 128
                    ? props.projectTextList[index].slice(0, 128) + "..."
                    : props.projectTextList[index]}
                </div>
                <div class="text-sm text-gray-500 font-ltest">
                  {item.createdDate.slice(0, 10) +
                    "일 / " +
                    item.createdDate.slice(11, 19)}
                </div>
                <div class="flex gap-2">
                  {item.tagInfos.map((tags) => {
                    return (
                      <div class="px-1 font-ltest text-sm w-fit mt-4 bg-gray-200 rounded-none border">
                        {tags.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class="w-grow self-end">
                <div class="w-32 h-32 mb-2">
                  <img
                    src={"data:image/" + item.imgType + ";base64," + item.image}
                    class="z-40 w-32 h-32"
                  />
                </div>
                <div class="w-32 grid grid-rows-2 text-sm ">
                  <div>
                    {"참여 인원: " + item.recruited + "/" + item.recruit}
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="Writing"
              class="flex border-b bg-white h-54 px-10 pt-3 gap-5 text-left w-[59.5rem] pb-3"
            >
              <div class="w-[47rem]">
                <div class="text-sm text-gray-400 flex items-center gap-2 font-ltest">
                  {item.status == "ACTIVE" ? (
                    <>
                      <div class="w-fit px-2 bg-green-300 text-black">
                        모집중
                      </div>
                    </>
                  ) : (
                    <div class="px-2 bg-red-300 text-black">모집완료</div>
                  )}
                  <div class="text-sm font-ltest text-gray-400">
                    {item.startDate + " ~ " + item.endDate}
                  </div>
                </div>
                <button
                  value={item.id}
                  onClick={props.onWritingClickHandler}
                  class="mt-1 py-1 text-black text-xl"
                >
                  {item.title}
                </button>
                <div class="font-ltest min-h-[45px]">
                  {props.projectTextList[index].length > 128
                    ? props.projectTextList[index].slice(0, 128) + "..."
                    : props.projectTextList[index]}
                </div>
                <div class="text-sm text-gray-500 font-ltest">
                  {item.createdDate.slice(0, 10) +
                    "일 / " +
                    item.createdDate.slice(11, 19)}
                </div>
                <div class="flex gap-2 mt-1">
                  {item.tagInfos.map((tags) => {
                    return (
                      <div class="px-1 font-ltest text-sm w-fit mt-2  rounded-lg border">
                        {tags.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class="w-grow self-end">
                <div class="w-32 grid grid-rows-2 text-sm ">
                  <div>
                    {"참여 인원: " + item.recruited + "/" + item.recruit}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
