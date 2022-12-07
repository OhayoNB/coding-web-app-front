import { User } from 'models/User'

interface Props {
  user: User
}

export const UserPreview: React.FC<Props> = ({ user }) => {
  return (
    <li className="user-preview">
      <h2>{user.username}</h2>
    </li>
  )
}
