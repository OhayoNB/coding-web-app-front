import { useEffect, useState } from 'react'
import { userService } from 'services/user.service'
import { UserList } from './UserList'

export const UsersModal = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const users = await userService.getUsers()
        console.log(`users:`, users)
        setUsers(users)
      } catch (err) {
        console.log(err, 'cannot get codeblocks')
      }
    })()
  }, [])

  return (
    <section className="users-modal">
      <h2>Now choose the user you want to guide</h2>
      <UserList users={users} />
    </section>
  )
}
