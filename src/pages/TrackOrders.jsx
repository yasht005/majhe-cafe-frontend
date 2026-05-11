import {

  useEffect,
  useState,

} from 'react'

import axios from 'axios'

import {

  motion,

} from 'framer-motion'

function TrackOrders() {

  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  const [filterStatus, setFilterStatus] =
    useState('All')

  /* FETCH ORDERS */

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders`
          )

        setOrders(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    /* INITIAL FETCH */

    fetchOrders()

    /* AUTO REFRESH */

    const interval =
      setInterval(() => {

        fetchOrders()

      }, 5000)

    return () =>
      clearInterval(interval)

  }, [])

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

  /* ORDER STEPS */

  const orderSteps = [

    'Pending',

    'Preparing',

    'Out for Delivery',

    'Delivered',

  ]

  /* FILTERED ORDERS */

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =

        order._id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesStatus =

        filterStatus === 'All'

          ? true

          : order.status ===
            filterStatus

      return (
        matchesSearch &&
        matchesStatus
      )

    })

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#f8f1e7] to-[#ead7c3] dark:from-[#121212] dark:to-[#1b1b1b] pt-40 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">

          <h1 className="text-6xl font-extrabold text-[#5b3b22] dark:text-white">

            Track Orders

          </h1>

          <p className="mt-6 text-xl text-gray-500">

            Live realtime delivery updates 🚚

          </p>

        </div>

        {/* SEARCH + FILTER */}

        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <input
            type="text"
            placeholder="Search by Order ID..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full p-5 rounded-3xl bg-white dark:bg-[#1f1f1f] shadow-xl outline-none text-lg dark:text-white"
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="w-full p-5 rounded-3xl bg-white dark:bg-[#1f1f1f] shadow-xl outline-none text-lg dark:text-white"
          >

            <option value="All">

              All Orders

            </option>

            <option value="Pending">

              Pending

            </option>

            <option value="Preparing">

              Preparing

            </option>

            <option value="Out for Delivery">

              Out for Delivery

            </option>

            <option value="Delivered">

              Delivered

            </option>

          </select>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="grid md:grid-cols-2 gap-10">

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="bg-white dark:bg-[#1f1f1f] rounded-[35px] p-10 shadow-2xl animate-pulse"
              >

                <div className="h-8 bg-gray-300 dark:bg-[#2a2a2a] rounded w-1/2 mb-6" />

                <div className="h-4 bg-gray-300 dark:bg-[#2a2a2a] rounded mb-4" />

                <div className="h-4 bg-gray-300 dark:bg-[#2a2a2a] rounded w-2/3 mb-8" />

                <div className="h-12 bg-gray-300 dark:bg-[#2a2a2a] rounded-2xl w-40" />

              </div>

            ))}

          </div>

        ) : filteredOrders.length === 0 ? (

          <div className="bg-white dark:bg-[#1f1f1f] p-16 rounded-[40px] shadow-2xl text-center max-w-2xl mx-auto">

            <div className="text-8xl mb-8">

              🚚

            </div>

            <h2 className="text-5xl font-extrabold text-[#5b3b22] dark:text-white">

              No Orders Found

            </h2>

            <p className="mt-6 text-xl text-gray-500 leading-relaxed">

              Try changing filters or place a new order ☕

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-10">

            {filteredOrders.map((order) => (

              <motion.div
                key={order._id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white dark:bg-[#1f1f1f] rounded-[35px] p-10 shadow-2xl"
              >

                {/* TOP */}

                <div className="flex justify-between items-center">

                  <h1 className="text-3xl font-bold text-[#5b3b22] dark:text-white">

                    Order #

                    {order._id.slice(-6)}

                  </h1>

                  <div
                    className={`${getStatusColor(
                      order.status
                    )} text-white px-5 py-2 rounded-2xl text-sm`}
                  >

                    {order.status}

                  </div>

                </div>

                {/* ITEMS */}

                <div className="mt-8 space-y-4">

                  {order.items.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex justify-between"
                      >

                        <p className="text-lg dark:text-white">

                          {item.name}

                        </p>

                        <p className="text-lg font-semibold dark:text-white">

                          x
                          {
                            item.quantity
                          }

                        </p>

                      </div>

                    )
                  )}

                </div>

                {/* TOTAL */}

                <div className="mt-10 flex justify-between items-center border-t pt-6">

                  <p className="text-2xl font-bold dark:text-white">

                    Total

                  </p>

                  <h1 className="text-4xl font-extrabold text-[#5b3b22] dark:text-white">

                    ₹
                    {
                      order.totalPrice
                    }

                  </h1>

                </div>

                {/* PROGRESS */}

                <div className="mt-10">

                  <div className="flex justify-between items-center relative">

                    <div className="absolute top-5 left-0 w-full h-2 bg-gray-300 dark:bg-[#2a2a2a] rounded-full" />

                    <div
                      className="absolute top-5 left-0 h-2 bg-[#5b3b22] rounded-full transition-all duration-500"
                      style={{

                        width: `${
                          (
                            orderSteps.indexOf(
                              order.status
                            ) /
                            (
                              orderSteps.length -
                              1
                            )
                          ) * 100
                        }%`,

                      }}
                    />

                    {orderSteps.map(
                      (step, index) => {

                        const active =

                          orderSteps.indexOf(
                            order.status
                          ) >= index

                        return (

                          <div
                            key={step}
                            className="relative z-10 flex flex-col items-center"
                          >

                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all ${
                                active

                                  ? 'bg-[#5b3b22]'

                                  : 'bg-gray-300 dark:bg-[#2a2a2a]'
                              }`}
                            >

                              {index + 1}

                            </div>

                            <p className={`mt-3 text-sm text-center font-semibold ${
                              active

                                ? 'text-[#5b3b22] dark:text-white'

                                : 'text-gray-400'
                            }`}>

                              {step}

                            </p>

                          </div>

                        )

                      }
                    )}

                  </div>

                </div>

                {/* ETA */}

                <div className="mt-10 bg-[#f8f1e7] dark:bg-[#2a2a2a] rounded-2xl p-5">

                  <p className="text-lg font-semibold dark:text-white">

                    Estimated Delivery:

                  </p>

                  <p className="mt-2 text-gray-500">

                    {
                      order.estimatedDelivery ||
                      'Arriving Soon'
                    }

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default TrackOrders