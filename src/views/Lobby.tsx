import { CodeblockList } from 'components/CodeblockList'
import { UsersModal } from 'components/UsersModal'
import { User } from 'models/User'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import { userService } from 'services/user.service'

export const Lobby = () => {
  const [codeblocks, setCodeblocks] = useState([])
  const [loggedInUser, setLoggedInUser] = useState<User>()

  useEffect(() => {
    ;(async () => {
      try {
        const codeblocks = await codeblockService.query()
        setCodeblocks(codeblocks)
      } catch (err) {
        console.log(err, 'cannot get codeblocks')
      }
    })()
  }, [])

  useEffect(() => {
    const user = userService.getLoggedInUser()
    if (user) setLoggedInUser(user)
  }, [])

  return (
    <section className="lobby">
      {loggedInUser && <h1>Hello, {loggedInUser.username}</h1>}
      <h1>Choose code block to start</h1>
      <CodeblockList codeblocks={codeblocks} />
      <Routes>
        <Route path=":codeblockId" element={<UsersModal />} />
      </Routes>
    </section>
  )
}
