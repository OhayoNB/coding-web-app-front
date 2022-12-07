import { Codeblock } from 'models/Codeblock'
import { Link } from 'react-router-dom'

interface Props {
  codeblock: Codeblock
}

export const CodeblockPreview: React.FC<Props> = ({ codeblock }) => {
  return (
    <Link to={`${codeblock._id}`}>
      <li className="codeblock-preview">
        <h2>{codeblock.title}</h2>
      </li>
    </Link>
  )
}
