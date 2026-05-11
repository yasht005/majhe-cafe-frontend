
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingBag,
  Moon,
} from 'lucide-react'

function AdminLayout({ children }) {

  const location = useLocation()

  return (

    <div className="min-h-screen flex bg-[#f6efe6] dark:bg-[#0f0f0f] transition-all duration-500 overflow-hidden">

      {/* SIDEBAR */}

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-72 min-h-screen bg-gradient-to-b from-[#3b2414] to-[#5b3b22] text-white p-8 flex flex-col shadow-2xl border-r border-[#ffffff20]"
      >

        {/* LOGO */}

        <div className="mb-16">

          <h1 className="text-4xl font-extrabold tracking-wide">
            Majhe
            <span className="text-[#d9b38c]">
              {' '}Admin
            </span>
          </h1>

          <p className="text-sm mt-3 text-gray-300 leading-relaxed">
            Luxury Cafe Management Dashboard
          </p>

        </div>

        {/* NAVIGATION */}

        <div className="flex flex-col gap-5">

          <Link
            to="/admin"
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
              location.pathname === '/admin'
                ? 'bg-white text-[#5b3b22] shadow-lg scale-105'
                : 'hover:bg-[#ffffff18]'
            }`}
          >

            <LayoutDashboard size={22} />

            <span className="text-lg font-semibold">
              Manage Menu
            </span>

          </Link>

          <Link
            to="/orders"
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
              location.pathname === '/orders'
                ? 'bg-white text-[#5b3b22] shadow-lg scale-105'
                : 'hover:bg-[#ffffff18]'
            }`}
          >

            <ShoppingBag size={22} />

            <span className="text-lg font-semibold">
              Orders
            </span>

          </Link>

        </div>

        {/* BOTTOM CARD */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-auto bg-[#ffffff14] backdrop-blur-lg p-6 rounded-3xl border border-[#ffffff20]"
        >

          <div className="flex items-center gap-3 mb-3">

            <Moon size={20} />

            <h2 className="font-bold text-lg">
              Luxury Mode
            </h2>

          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            Manage your cafe menu, customer orders, and premium experience.
          </p>

        </motion.div>

      </motion.div>

      {/* MAIN CONTENT */}

      <div className="flex-1 overflow-y-auto p-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 dark:bg-[#1a1a1a] backdrop-blur-lg rounded-[40px] shadow-2xl p-10 min-h-[90vh] border border-[#ffffff30]"
        >

          {children}

        </motion.div>

      </div>

    </div>

  )
}

export default AdminLayout
