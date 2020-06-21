// import react, react-markdown-editor-lite, and a markdown parser you like
import * as React from 'react'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({html, text}) {
    // props.getContent(html, text)
}
export default (props) => {
    return (
        <MdEditor
            value=""
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={props.getContent}

        />
    )
}