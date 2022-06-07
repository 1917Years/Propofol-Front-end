export function htmlDetailToText(htmlContent) {
    let text = htmlContent.replace(/(<([^>]+)>)/ig, "");
    text = text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, s => {
        const entityMap = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&nbsp;': " ",
        };
        return entityMap[s];
    });
    console.log(text);
    return text;
}