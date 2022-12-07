import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from 'services/user.service'
import * as Yup from 'yup'

export const Login = () => {
  const navigate = useNavigate()
  const [wrongCredentialsDiv, setWrongCredentialsDiv] = useState<
    String | undefined
  >()

  useEffect(() => {
    setWrongCredentialsDiv('not-visible')
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().max(20, 'Must be 20 characters or less'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: (values) => {
      ;(async () => {
        try {
          await userService.login(values)
          navigate('/lobby')
        } catch (err) {
          console.log(err, 'cannot login')
          setWrongCredentialsDiv('')
        }
      })()
    },
  })

  const handleFocus = (ev: React.FormEvent) => {
    ev.currentTarget.classList.add('focus')
  }

  return (
    <section className="form-container">
      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <h5>Log in to enter the lobby</h5>
        <div className={`wrong-credentials ${wrongCredentialsDiv}`}>
          Incorrect email address and / or password.
        </div>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Enter username"
        />
        {formik.touched.username && formik.errors.username ? (
          <span className="error">{formik.errors.username}</span>
        ) : (
          <span>&nbsp;</span>
        )}
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="error">{formik.errors.password}</span>
        ) : (
          <span>&nbsp;</span>
        )}
        <button type="submit">Log in</button>
      </form>
    </section>
  )
}
