export function Page(props) { // props --> startPage, totalPage, load__함수, setSelected, selected
    let endPage = (props.startPage + 9 > props.totalPage ? props.totalPage : props.startPage + 9);
    const result = [];
    console.log(props.totalPage);
    console.log(endPage);
    result.push(
        <button
            class="text-gray-500"
            onClick={() => {
                if (props.startPage - 10 >= 1) {
                    props.setStartPage(props.startPage - 10);
                    props.load(props.startPage - 10);
                    props.setSelected(props.startPage - 10);
                }
            }}
        >{"<"}
        </button>
    );
    for (let i = props.startPage; i <= endPage; i++) {
        if (i == props.selected) {
            result.push(
                <button
                    class="pr-2 text-indigo-500"
                    onClick={() => {
                        props.load(i);
                        props.setSelected(i);
                    }}
                >
                    {i}
                </button>
            )
        }
        else {
            result.push(
                <button
                    class="pr-2 text-gray-500"
                    onClick={() => {
                        props.load(i);
                        props.setSelected(i);
                    }}
                >
                    {i}
                </button>
            );
        }
    }
    result.push(<button
        class="text-gray-500"
        onClick={() => {
            if (props.startPage + 10 <= props.totalPage) { //totalPage를 넘어가지 않을 경우에만 작동
                props.setStartPage(props.startPage + 10);
                props.load(props.startPage + 10);
                props.setSelected(props.startPage + 10);
            }
        }}
    >{">"}
    </button>);
    return result;
}