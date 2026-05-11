import { useEffect, useState } from 'react'

import axios from 'axios'

import { motion } from 'framer-motion'

import { io } from 'socket.io-client'

const socket = io(
  import.meta.env.VITE_API_URL
)

function MyOrders() {

  const [orders, setOrders] =
    useState([])

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders`
      )

      setOrders(res.data.reverse())

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    const loadOrders = async () => {

      await fetchOrders()

    }

    loadOrders()

    /* LIVE STATUS UPDATES */

    socket.on(

      'orderUpdated',

      (updatedOrder) => {

        setOrders((prevOrders) =>

          prevOrders.map((order) =>

            order._id ===
            updatedOrder._id

              ? updatedOrder

              : order

          )

        )

      }

    )

    return () => {

      socket.off('orderUpdated')

    }

  }, [])

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#f8f1e7] to-[#ead7c3] dark:from-[#121212] dark:to-[#1b1b1b] pt-40 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">

          <h1 className="text-6xl font-extrabold text-[#5b3b22] dark:text-white mb-5">

            My Orders

          </h1>

          <p className="text-xl text-[#7a5a40] dark:text-gray-300">

            Track your luxury cafe experience

          </p>

        </div>

        {orders.length === 0 ? (

          <div className="bg-white dark:bg-[#1f1f1f] p-16 rounded-[40px] shadow-2xl text-center">

            <h2 className="text-3xl font-bold dark:text-white">

              No Orders Yet

            </h2>

            <p className="mt-4 text-gray-500">

              Your delicious orders will appear here

            </p>

          </div>

        ) : (

          <div className="space-y-14">

            {orders.map((order) => (

              <motion.div
                key={order._id}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-white/80 dark:bg-[#1f1f1f]/90 backdrop-blur-lg rounded-[40px] shadow-2xl overflow-hidden border border-[#ffffff30]"
              >

                {/* TOP */}

                <div className="bg-gradient-to-r from-[#5b3b22] to-[#8b5e34] p-8 text-white">

                  <div className="flex flex-col md:flex-row justify-between gap-6">

                    <div>

                      <h2 className="text-3xl font-bold">

                        Order #{order._id.slice(-6)}

                      </h2>

                      <p className="mt-3 opacity-80">

                        {new Date(
                          order.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                    {/* STATUS */}

                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      className={`px-8 py-4 rounded-full text-xl font-bold self-start ${
                        order.status ===
                        'Pending'

                          ? 'bg-yellow-500'

                          : order.status ===
                            'Preparing'

                          ? 'bg-blue-500'

                          : 'bg-green-500'
                      }`}
                    >

                      {order.status}

                    </motion.div>

                  </div>

                </div>

                {/* PROGRESS TRACKER */}

                <div className="px-10 pt-10">

                  <div className="flex justify-between items-center relative">

                    <div className="absolute top-5 left-0 w-full h-2 bg-gray-300 rounded-full" />

                    <div
                      className={`absolute top-5 left-0 h-2 rounded-full transition-all duration-700 ${
                        order.status ===
                        'Pending'

                          ? 'w-[15%] bg-yellow-500'

                          : order.status ===
                            'Preparing'

                          ? 'w-[55%] bg-blue-500'

                          : 'w-full bg-green-500'
                      }`}
                    />

                    {/* STEP 1 */}

                    <div className="relative z-10 text-center">

                      <div
                        className={`w-12 h-12 rounded-full mx-auto ${
                          order.status ===
                            'Pending' ||

                          order.status ===
                            'Preparing' ||

                          order.status ===
                            'Completed'

                            ? 'bg-yellow-500'

                            : 'bg-gray-300'
                        }`}
                      />

                      <p className="mt-4 font-semibold dark:text-white">

                        Pending

                      </p>

                    </div>

                    {/* STEP 2 */}

                    <div className="relative z-10 text-center">

                      <div
                        className={`w-12 h-12 rounded-full mx-auto ${
                          order.status ===
                            'Preparing' ||

                          order.status ===
                            'Completed'

                            ? 'bg-blue-500'

                            : 'bg-gray-300'
                        }`}
                      />

                      <p className="mt-4 font-semibold dark:text-white">

                        Preparing

                      </p>

                    </div>

                    {/* STEP 3 */}

                    <div className="relative z-10 text-center">

                      <div
                        className={`w-12 h-12 rounded-full mx-auto ${
                          order.status ===
                          'Completed'

                            ? 'bg-green-500'

                            : 'bg-gray-300'
                        }`}
                      />

                      <p className="mt-4 font-semibold dark:text-white">

                        Completed

                      </p>

                    </div>

                  </div>

                </div>

                {/* ITEMS */}

                <div className="p-10 space-y-6">

                  {order.items.map(
                    (item, index) => (

                      <motion.div
                        whileHover={{
                          scale: 1.01,
                        }}
                        key={index}
                        className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#f8f1e7] dark:bg-[#2b2b2b] p-6 rounded-3xl"
                      >

                        <div className="flex items-center gap-6">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-28 h-28 object-cover rounded-3xl shadow-lg"
                          />

                          <div>

                            <h2 className="text-2xl font-bold text-[#5b3b22] dark:text-white">

                              {item.name}

                            </h2>

                            <p className="mt-2 text-gray-500">

                              Quantity:
                              {' '}
                              {item.quantity}

                            </p>

                          </div>

                        </div>

                        <h2 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

                          ₹{item.price}

                        </h2>

                      </motion.div>

                    )

                  )}

                </div>

                {/* FOOTER */}

                <div className="border-t border-gray-200 dark:border-gray-700 px-10 py-8 flex flex-col md:flex-row justify-between gap-8">

                  {/* DELIVERY */}

                  <div>

                    <p className="text-gray-500">

                      Estimated Delivery

                    </p>

                    <h2 className="text-xl font-bold text-[#5b3b22] dark:text-white">

                      {order.estimatedDelivery}

                    </h2>

                  </div>

                  {/* PAYMENT */}

                  <div>

                    <p className="text-gray-500">

                      Payment Status

                    </p>

                    <h2 className="text-xl font-bold text-green-600">

                      Paid Successfully

                    </h2>

                  </div>

                  {/* TOTAL */}

                  <div className="text-right">

                    <p className="text-gray-500">

                      Total Amount

                    </p>

                    <h1 className="text-4xl font-extrabold text-[#5b3b22] dark:text-white">

                      ₹{order.totalPrice}

                    </h1>

                  </div>

                </div>

                {/* REORDER */}

                <div className="px-10 pb-10">

                  <button
                    onClick={() => {

                      localStorage.setItem(

                        'cart',

                        JSON.stringify(
                          order.items
                        )

                      )

                      alert(
                        'Items added to cart'
                      )

                    }}
                    className="w-full bg-[#5b3b22] text-white py-4 rounded-2xl text-xl hover:opacity-90 transition"
                  >

                    Reorder

                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default MyOrders