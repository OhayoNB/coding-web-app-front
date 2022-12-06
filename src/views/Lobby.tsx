import { CodeblockList } from 'components/CodeblockList'
import { useEffect, useState } from 'react'
import { codeblockService } from 'services/codeblock.service'

export const Lobby = () => {
  const [codeblocks, setCodeblocks] = useState([])

  useEffect(() => {
    codeblockService.query().then((codeblocks) => setCodeblocks(codeblocks))
  }, [])

  return (
    <section className="lobby">
      <h1>Choose code block to start</h1>
      <CodeblockList codeblocks={codeblocks} />
    </section>
  )
}
