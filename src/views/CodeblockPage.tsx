import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import { Codeblock } from 'models/Codeblock'
import { userService } from 'services/user.service'
import Swal from 'sweetalert2'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { socketService } from 'services/socket.service'

export const CodeblockPage = () => {
  const [codeblock, setCodeblock] = useState<Codeblock>()
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const loggedInUser = userService.getLoggedInUser()

  const socketUpdateCodeblock = useCallback((updatedCodeblock: Codeblock) => {
    setCodeblock(updatedCodeblock)
  }, [])

  useEffect(() => {
    if (params.codeblockId)
      socketService.emit('join-codeblock', params.codeblockId)
  }, [params.codeblockId])

  useEffect(() => {
    socketService.on('update-codeblock', socketUpdateCodeblock)
  }, [socketUpdateCodeblock])

  const updateCodeblock = useCallback(
    async (codeblock: Codeblock) => {
      try {
        const updatedCodeblock = await codeblockService.update(codeblock)
        if (updatedCodeblock.code === updatedCodeblock.solution) {
          if (!loggedInUser.isMentor)
            Swal.fire('Well Done!', 'You made this code to work!', 'success')
        }
      } catch (err) {
        console.log('update codeblock failed', err)
      }
    },
    [loggedInUser]
  )

  useEffect(() => {
    ;(async () => {
      try {
        const { codeblockId } = params
        if (codeblockId) {
          let codeblock = await codeblockService.getById(codeblockId)
          setCodeblock(codeblock)
        }
      } catch (err) {
        console.log(err, 'cannot get codeblocks')
      }
    })()
  }, [params])

  useEffect(() => {
    const studentUsername = searchParams.get('student_login')
    if (studentUsername) {
      if (!loggedInUser) {
        Swal.fire(
          'You are not logged in',
          'You need to login to see this page!',
          'error'
        )
        navigate(`/?student_login=${studentUsername}`)
        return
      }

      if (loggedInUser.username !== studentUsername) {
        navigate('/')
        return
      }
    }
  }, [navigate, searchParams, loggedInUser])

  const handleChange = (value: string) => {
    const updatedCodeBlock: any = { ...codeblock, code: value }
    setCodeblock(
      (prevCodeblock) =>
        ({
          ...prevCodeblock,
          code: value,
        } as Codeblock)
    )
    updateCodeblock(updatedCodeBlock)
  }

  return (
    <section className="codeblock">
      <h1>Codeblock page</h1>

      {codeblock && (
        <CodeMirror
          editable={!loggedInUser.isMentor}
          value={codeblock.code}
          height="300px"
          width="700px"
          maxWidth="700px"
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
        />
      )}
    </section>
  )
}
