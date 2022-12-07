import { Codeblock } from 'models/Codeblock'
import { CodeblockPreview } from './CodeblockPreview'

interface Props {
  codeblocks: Codeblock[]
}

export const CodeblockList: React.FC<Props> = ({ codeblocks }) => {
  return (
    <ul className="codeblock-list">
      {codeblocks.map((codeblock: Codeblock) => {
        return <CodeblockPreview key={codeblock._id} codeblock={codeblock} />
      })}
    </ul>
  )
}
