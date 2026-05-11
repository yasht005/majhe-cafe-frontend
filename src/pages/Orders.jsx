import {

  useEffect,
  useState,

} from 'react'

import axios from 'axios'

import { motion } from 'framer-motion'

import toast from 'react-hot-toast'

import AdminLayout from '../components/AdminLayout'

function Orders() {

  const [orders, setOrders] =
    useState([])

  const [deliveryTimes, setDeliveryTimes] =
    useState({})

  /* FETCH ORDERS */

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/orders'
      )

      setOrders(res.data)

    } catch (error) {

      console.log(error)

      toast.error(
        'Failed to fetch orders'
      )

    }

  }

  /* LOAD */

  useEffect(() => {

    const loadOrders = async () => {

      await fetchOrders()

    }

    loadOrders()

  }, [])

  /* DELIVERY TIME */

  const handleTimeChange = (
    id,
    value
  ) => {

    setDeliveryTimes((prev) => ({

      ...prev,

      [id]: value,

    }))

  }

  /* UPDATE STATUS */

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/orders/${id}`,

        {

          status,

          estimatedDelivery:

            deliveryTimes[id] ||

            '25 mins',

        }

      )

      toast.success(
        'Order updated'
      )

      fetchOrders()

    } catch (error) {

      console.log(error)

      toast.error(
        'Update failed'
      )

    }

  }

  /* STATUS COLORS */

  const getStatusColor = (
    status
  ) => {

    switch (status) {

      case 'Pending':

        return 'bg-yellow-500'

      case 'Preparing':

        return 'bg-blue-500'

      case 'Out for Delivery':

        return 'bg-orange-500'

      case 'Delivered':

        return 'bg-green-500'

      default:

        return 'bg-gray-500'

    }

  }

  return (

    <AdminLayout>

      <div className="space-y-10">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-bold text-[#5b3b22] dark:text-white">

            Customer Orders

          </h1>

          <p className="mt-3 text-lg text-[#7a5a40] dark:text-gray-300">

            Manage restaurant orders

          </p>

        </div>

        {/* ORDERS */}

        <div className="space-y-10">

          {orders.map((order) => (

            <motion.div
              key={order._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white dark:bg-[#1f1f1f] p-8 rounded-3xl shadow-2xl"
            >

              {/* TOP */}

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-[#5b3b22] dark:text-white">

                    Order ID

                  </h2>

                  <p className="text-sm text-gray-500">

                    {order._id}

                  </p>

                </div>

                <span
                  className={`px-5 py-2 rounded-full text-white font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >

                  {order.status}

                </span>

              </div>

              {/* ITEMS */}

              <div className="space-y-5">

                {order.items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-4"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-2xl"
                        />

                        <div>

                          <h3 className="text-xl font-semibold text-[#5b3b22] dark:text-white">

                            {item.name}

                          </h3>

                          <p className="text-gray-500">

                            Quantity:
                            {' '}
                            {item.quantity}

                          </p>

                        </div>

                      </div>

                      <h2 className="text-xl font-bold text-[#5b3b22] dark:text-white">

                        ₹{item.price}

                      </h2>

                    </div>

                  )
                )}

              </div>

              {/* FOOTER */}

              <div className="mt-8 flex justify-between items-center flex-wrap gap-6">

                <div>

                  <p className="text-gray-500">

                    Current Delivery Time

                  </p>

                  <h2 className="text-lg font-bold text-[#5b3b22] dark:text-white">

                    {order.estimatedDelivery}

                  </h2>

                </div>

                <div>

                  <p className="text-gray-500">

                    Total

                  </p>

                  <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

                    ₹{order.totalPrice}

                  </h2>

                </div>

              </div>

              {/* DELIVERY INPUT */}

              <div className="mt-8">

                <input
                  type="text"
                  placeholder="Enter delivery time (e.g. 15 mins)"
                  value={
                    deliveryTimes[
                      order._id
                    ] || ''
                  }
                  onChange={(e) =>
                    handleTimeChange(

                      order._id,

                      e.target.value

                    )
                  }
                  className="w-full p-4 rounded-2xl border outline-none dark:bg-[#2b2b2b] dark:text-white"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4 mt-8 flex-wrap">

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      'Pending'
                    )
                  }
                  className="bg-yellow-500 text-white px-5 py-3 rounded-xl"
                >

                  Pending

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      'Preparing'
                    )
                  }
                  className="bg-blue-500 text-white px-5 py-3 rounded-xl"
                >

                  Preparing

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      'Out for Delivery'
                    )
                  }
                  className="bg-orange-500 text-white px-5 py-3 rounded-xl"
                >

                  Out for Delivery

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      order._id,
                      'Delivered'
                    )
                  }
                  className="bg-green-500 text-white px-5 py-3 rounded-xl"
                >

                  Delivered

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </AdminLayout>

  )
}

export default Orders