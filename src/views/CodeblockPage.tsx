import 'highlight.js/styles/github.css'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import { Codeblock } from 'models/Codeblock'

const markdown = `
  \`\`\`javascript
  const strings = ["10", "10", "10"]; 
  const numbers = strings.map(parseInt);
  console.log(numbers);
`

export const CodeblockPage = () => {
  const [codeblock, setCodeblock] = useState<Codeblock>()
  const params = useParams()

  useEffect(() => {
    hljs.highlightAll()
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { codeblockId } = params
        const codeblock = await codeblockService.getById(codeblockId)
        setCodeblock(codeblock)
      } catch (err) {
        console.log(err, 'cannot get codeblocks')
      }
    })()
  }, [params])

  return (
    <section className="codeblock">
      <h1>Codeblock page</h1>

      {codeblock && (
        <div
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: marked(codeblock.code) }}
        ></div>
      )}
    </section>
  )
}
