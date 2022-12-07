import 'highlight.js/styles/github.css'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useEffect } from 'react'

const markdown = `
  \`\`\`javascript
  const strings = ["10", "10", "10"]; 
  const numbers = strings.map(parseInt);
  console.log(numbers);
`

export const Codeblock = () => {
  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <section className="codeblock">
      <h1>Codeblock page</h1>

      <div
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      ></div>
    </section>
  )
}
