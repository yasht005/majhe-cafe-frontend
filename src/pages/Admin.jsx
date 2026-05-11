import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

import {

  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from 'recharts'

import AdminLayout from '../components/AdminLayout'

function Admin() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const [image, setImage] =
    useState(null)

  const [preview, setPreview] =
    useState('')

  const [menuItems, setMenuItems] =
    useState([])

  const [orders, setOrders] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const fetchMenu = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/menu'
      )

      setMenuItems(res.data)

    } catch (error) {

      console.log(error)

    }

  }

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/orders'
      )

      setOrders(res.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    const loadData = async () => {

      await fetchMenu()

      await fetchOrders()

    }

    loadData()

  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append('name', name)

      formData.append('price', price)

      if (image) {

        formData.append('image', image)

      }

      if (editingId) {

        await axios.put(

          `http://localhost:5000/api/menu/${editingId}`,

          formData,

          {

            headers: {

              'Content-Type':
                'multipart/form-data',

            },

          }

        )

        alert('Menu Item Updated')

        setEditingId(null)

      } else {

        await axios.post(

          'http://localhost:5000/api/menu',

          formData,

          {

            headers: {

              'Content-Type':
                'multipart/form-data',

            },

          }

        )

        alert('Menu Item Added')

      }

      setName('')

      setPrice('')

      setImage(null)

      setPreview('')

      fetchMenu()

    } catch (error) {

      console.log(error)

    }

  }

  const deleteMenuItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/menu/${id}`
      )

      alert('Menu Item Deleted')

      fetchMenu()

    } catch (error) {

      console.log(error)

    }

  }

  const editMenuItem = (item) => {

    setEditingId(item._id)

    setName(item.name)

    setPrice(item.price)

    setPreview(item.image)

    window.scrollTo({

      top: 0,

      behavior: 'smooth',

    })

  }

  const totalRevenue = orders.reduce(

    (total, order) =>

      total + order.totalPrice,

    0

  )

  const revenueData = orders.map(
    (order, index) => ({

      name: `Order ${index + 1}`,

      revenue: order.totalPrice,

    })
  )

  return (

    <AdminLayout>

      <div className="space-y-10">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-bold text-[#5b3b22] dark:text-white">

            Admin Dashboard

          </h1>

          <p className="mt-3 text-lg text-[#7a5a40] dark:text-gray-300">

            Luxury Cafe Analytics & Management

          </p>

        </div>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-r from-[#5b3b22] to-[#8b5e34] text-white p-8 rounded-3xl shadow-2xl"
          >

            <h2 className="text-xl opacity-80">

              Total Menu Items

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              {menuItems.length}

            </h1>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-r from-[#1f1f1f] to-[#3b3b3b] text-white p-8 rounded-3xl shadow-2xl"
          >

            <h2 className="text-xl opacity-80">

              Total Orders

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              {orders.length}

            </h1>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-r from-[#d4a373] to-[#b08968] text-white p-8 rounded-3xl shadow-2xl"
          >

            <h2 className="text-xl opacity-80">

              Total Revenue

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              ₹{totalRevenue}

            </h1>

          </motion.div>

        </div>

        {/* CHART */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1f1f1f] p-10 rounded-3xl shadow-2xl"
        >

          <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white mb-10">

            Revenue Analytics

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={revenueData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5b3b22"
                  fill="#d4a373"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1f1f1f] p-10 rounded-3xl shadow-xl space-y-6"
        >

          <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

            {editingId
              ? 'Edit Menu Item'
              : 'Add Menu Item'}

          </h2>

          <input
            type="text"
            placeholder="Menu Item Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 rounded-xl border outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full p-4 rounded-xl border outline-none"
          />

          {/* IMAGE UPLOAD */}

          <div className="border-2 border-dashed border-[#5b3b22] rounded-3xl p-8 text-center">

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                setImage(
                  e.target.files[0]
                )

                setPreview(

                  URL.createObjectURL(
                    e.target.files[0]
                  )

                )

              }}
              className="mb-6"
            />

            {preview && (

              <img
                src={preview}
                alt="Preview"
                className="h-60 w-full object-cover rounded-2xl"
              />

            )}

          </div>

          <button
            type="submit"
            className="w-full bg-[#5b3b22] text-white py-4 rounded-xl text-lg hover:opacity-90 transition"
          >

            {editingId
              ? 'Update Menu Item'
              : 'Add Menu Item'}

          </button>

        </form>

        {/* MENU ITEMS */}

        <div className="grid md:grid-cols-3 gap-10">

          {menuItems.map((item) => (

            <motion.div
              whileHover={{ y: -8 }}
              key={item._id}
              className="bg-white dark:bg-[#1f1f1f] p-6 rounded-3xl shadow-xl text-center"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover rounded-2xl mb-6"
              />

              <h2 className="text-2xl font-bold text-[#5b3b22] dark:text-white mb-2">
                {item.name}
              </h2>

              <p className="text-lg mb-6 text-[#7a5a40] dark:text-gray-300">
                ₹{item.price}
              </p>

              <div className="flex justify-center gap-4">

                <button
                  onClick={() =>
                    editMenuItem(item)
                  }
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl"
                >

                  Edit

                </button>

                <button
                  onClick={() =>
                    deleteMenuItem(item._id)
                  }
                  className="bg-red-500 text-white px-6 py-3 rounded-xl"
                >

                  Delete

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </AdminLayout>

  )
}

export default Admin