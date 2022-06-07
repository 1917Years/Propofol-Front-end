export function BlogWritingList(props) { // writingList, navigate 함수 (onWritingClickHandler), writingTextList
    return (
        props.writingList.map((item, index) => {
            if (item.img != null) {
                return (
                    <button
                        className="Writing"
                        class="flex border bg-white h-48 px-10 py-5 gap-5 text-left"
                        value={item.id}
                        onClick={(e) => {
                            props.onWritingClickHandler(e);
                        }}
                    >
                        <div class="w-[45.5rem] h-36 flex flex-col justify-between">
                            <div class="">
                                <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                                    <h>
                                        {
                                            item.nickname != null ? item.nickname : "나"
                                        }
                                    </h>
                                    <h>{item.date}</h>
                                </div>
                                <button class="py-1 text-blue-400 text-lg">
                                    {item.title}
                                </button>
                                <div class="font-ltest">
                                    {
                                        props.writingTextList[index].length > 150 ?
                                            props.writingTextList[index].slice(0, 150) + "..."
                                            :
                                            props.writingTextList[index]
                                    }
                                </div>
                            </div>
                            <div class="flex gap-2">
                                {item.tag.map((item) => {
                                    return (
                                        <div class="bg-indigo-50 text-sm border border-indigo-300 text-indigo-300 rounded-lg px-2 py-1">
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div class="w-grow">
                            <div class=" w-32 h-32 mb-2">
                                <img
                                    src={"data:image/" + item.imgtype + ";base64," + item.img}
                                    class="w-full z-full z-40 min-h-[8rem] max-h-[8rem]"
                                />
                            </div>
                            <div class="w-32 grid grid-cols-2 text-sm ">
                                <div>🧡 {item.like}</div>
                                <div>💬 {item.comment}</div>
                            </div>
                        </div>
                    </button>
                );
            } else {
                return (
                    <button
                        className="Writing"
                        class="border bg-white h-48 px-10 py-5 gap-5 text-left"
                        value={item.id}
                        onClick={(e) => {
                            props.onWritingClickHandler(e);
                        }}
                    >
                        <div class="w-[45.5rem] h-36 flex flex-col justify-between">
                            <div class="">
                                <div class="text-sm flex gap-6 text-gray-400 font-ltest">
                                    <h>
                                        {
                                            item.nickname != null ? item.nickname : "나"
                                        }
                                    </h>
                                    <h>{item.date}</h>
                                </div>
                                <button class="py-1 text-blue-400 text-lg">
                                    {item.title}
                                </button>
                                <div class="font-ltest">
                                    {
                                        props.writingTextList[index].length > 150 ?
                                            props.writingTextList[index].slice(0, 150) + "..."
                                            :
                                            props.writingTextList[index]
                                    }
                                </div>
                            </div>
                            <div class="flex gap-2">
                                {item.tag.map((item) => {
                                    return (
                                        <div class="bg-indigo-50 text-sm border border-indigo-300 text-indigo-300 rounded-lg px-2 py-1">
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-[47rem]"></div>
                            <div class="w-32 grid grid-cols-2 text-sm">
                                <div>🧡 {item.like}</div>
                                <div>💬 {item.comment}</div>
                            </div>
                        </div>
                    </button>
                );
            }
        })
    )
}