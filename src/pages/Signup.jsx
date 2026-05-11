import { useState } from 'react'
import axios from 'axios'

function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData
      )

      alert(res.data.message)

    } catch (error) {

      alert(error.response.data.message)

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f8f1e7]">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-[400px]"
      >

        <h1 className="text-4xl font-bold mb-8 text-center text-[#5b3b22]">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-5"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-5"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-5"
        />

        <button className="w-full bg-[#5b3b22] text-white py-4 rounded-xl">
          Signup
        </button>

      </form>

    </div>

  )
}

export default Signup