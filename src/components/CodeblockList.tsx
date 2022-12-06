import { Codeblock } from 'models/Codeblock'
import { CodeblockPreview } from './CodeblockPreview'

interface Props {
  codeblocks: Codeblock[]
}

export const CodeblockList: React.FC<Props> = ({ codeblocks }) => {
  return (
    <section className="codeblock-list">
      {codeblocks.map((codeblock: Codeblock) => (
        <CodeblockPreview key={codeblock.id} codeblock={codeblock} />
      ))}
    </section>
  )
}
