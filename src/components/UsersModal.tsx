import { User } from 'models/User'
import { useEffect, useState } from 'react'
import { userService } from 'services/user.service'
import { UserList } from './UserList'

export const UsersModal = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        let users = await userService.getUsers()
        users = users.filter((user: User) => !user.isMentor)
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
