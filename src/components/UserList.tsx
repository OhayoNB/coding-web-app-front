import { User } from 'models/User'
import { UserPreview } from './UserPreview'

interface Props {
  users: User[]
}

export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul className="user-list">
      {users.map((user: User) => {
        return <UserPreview key={user._id} user={user} />
      })}
    </ul>
  )
}
