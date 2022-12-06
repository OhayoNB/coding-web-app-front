import { Codeblock } from 'models/Codeblock'

interface Props {
  codeblock: Codeblock
}

export const CodeblockPreview: React.FC<Props> = ({ codeblock }) => {
  return (
    <section className="codeblock-preview">
      <h2>{codeblock.title}</h2>
    </section>
  )
}
