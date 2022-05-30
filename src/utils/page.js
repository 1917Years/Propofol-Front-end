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
        >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
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
    >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
    </button>);
    return result;
}