import 'highlight.js/styles/github.css'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import { Codeblock } from 'models/Codeblock'
import { userService } from 'services/user.service'
import Swal from 'sweetalert2'

export const CodeblockPage = () => {
  const [codeblock, setCodeblock] = useState<Codeblock>()
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    hljs.highlightAll()
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { codeblockId } = params
        let codeblock = await codeblockService.getById(codeblockId)
        setCodeblock(codeblock)
      } catch (err) {
        console.log(err, 'cannot get codeblocks')
      }
    })()
  }, [params])

  useEffect(() => {
    const studentUsername = searchParams.get('student_login')
    if (studentUsername) {
      const loggedInUser = userService.getLoggedInUser()
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
  }, [])

  return (
    <section className="codeblock">
      <h1>Codeblock page</h1>

      {codeblock && (
        <div
          contentEditable="true"
          dangerouslySetInnerHTML={{
            __html: marked(codeblock.code),
          }}
        ></div>
      )}
    </section>
  )
}
