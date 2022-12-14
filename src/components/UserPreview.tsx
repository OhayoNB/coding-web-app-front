import { User } from 'models/User'
import { useNavigate, useParams } from 'react-router-dom'
import { sessionService } from 'services/session.service'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'

interface Props {
  user: User
}

export const UserPreview: React.FC<Props> = ({ user }) => {
  const params = useParams()
  const navigate = useNavigate()

  const generateLink = async (userId: string) => {
    const uuid = uuidv4()
    const session = {
      uuid,
      userId,
      codeblockId: params.codeblockId,
    }
    try {
      await sessionService.save(session)
      if (process.env.NODE_ENV === 'production')
        await navigator.clipboard.writeText(
          `https://coding-web-app.onrender.com/#/codeblock/${uuid}/${params.codeblockId}?student_login=${user.username}`
        )
      else
        await navigator.clipboard.writeText(
          `localhost:3000/#/codeblock/${uuid}/${params.codeblockId}?student_login=${user.username}`
        )
      await Swal.fire(
        'Great!',
        'A link to the user has been copied to clipboard, you are being redirected to the codeblock page',
        'success'
      )
      navigate(`/codeblock/${uuid}/${params.codeblockId}`)
    } catch (err) {
      console.log('Cannot add session:', err)
    }
  }

  return (
    <li onClick={() => generateLink(user._id)} className="user-preview">
      <h2>{user.username}</h2>
    </li>
  )
}
