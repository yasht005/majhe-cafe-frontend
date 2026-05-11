import { useState } from 'react'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'

function Login() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/auth/login`,

        {

          email,
          password,

        }

      )

      localStorage.setItem(

        'token',

        res.data.token

      )

      localStorage.setItem(

        'role',

        res.data.role

      )

      localStorage.setItem(

        'name',

        res.data.name

      )

      alert('Login Successful')

      /* ADMIN REDIRECT */

      if (

        res.data.role === 'admin'

      ) {

        navigate('/admin')

      } else {

        navigate('/')

      }

    } catch (error) {

      console.log(error)

      alert('Invalid Credentials')

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-[#f8f1e7] dark:bg-[#121212] px-6">

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-[#1f1f1f] p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >

        <h1 className="text-4xl font-bold text-center text-[#5b3b22] dark:text-white">

          Login

        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl border outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl border outline-none"
        />

        <button
          type="submit"
          className="w-full bg-[#5b3b22] text-white py-4 rounded-xl text-lg hover:opacity-90 transition"
        >

          Login

        </button>

      </form>

    </div>

  )
}

export default Login