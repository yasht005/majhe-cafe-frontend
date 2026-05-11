import {

  useEffect,
  useState,

} from 'react'

import {

  Link,
  useLocation,

} from 'react-router-dom'

import {

  Menu,
  X,
  Moon,
  Sun,
  ShoppingCart,

} from 'lucide-react'

import {

  motion,
  AnimatePresence,

} from 'framer-motion'

function Navbar() {

  const location =
    useLocation()

  const [mobileMenu, setMobileMenu] =
    useState(false)

  const [cartCount, setCartCount] =
    useState(0)

  const [darkMode, setDarkMode] =
    useState(() => {

      return (
        localStorage.getItem(
          'theme'
        ) === 'dark'
      )

    })

  /* APPLY THEME */

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        'dark'
      )

      localStorage.setItem(
        'theme',
        'dark'
      )

    } else {

      document.documentElement.classList.remove(
        'dark'
      )

      localStorage.setItem(
        'theme',
        'light'
      )

    }

  }, [darkMode])

  /* TOGGLE */

  const toggleTheme = () => {

    setDarkMode(
      !darkMode
    )

  }

  /* REALTIME CART COUNT */

  useEffect(() => {

    const updateCartCount = () => {

      const cart =
        JSON.parse(
          localStorage.getItem(
            'cart'
          )
        ) || []

      const totalItems =
        cart.reduce(

          (total, item) =>

            total +
            item.quantity,

          0

        )

      setCartCount(totalItems)

    }

    /* INITIAL */

    updateCartCount()

    /* REALTIME */

    const interval =
      setInterval(() => {

        updateCartCount()

      }, 500)

    return () =>
      clearInterval(interval)

  }, [])

  /* NAV LINKS */

  const navLinks = [

    {

      name: 'Home',

      path: '/',

    },

    {

      name: 'Menu',

      path: '/menu',

    },

    {

      name: 'My Orders',

      path: '/my-orders',

    },

    {

      name: 'Track Orders',

      path: '/track-orders',

    },

  ]

  return (

    <motion.nav
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-5"
    >

      <div className="max-w-7xl mx-auto bg-white/70 dark:bg-[#1b1b1b]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[30px] px-8 py-5 shadow-2xl">

        <div className="flex justify-between items-center">

          {/* LOGO */}

          <Link to="/">

            <h1 className="text-4xl font-extrabold text-[#5b3b22] dark:text-white">

              Majhe Cafe

            </h1>

          </Link>

          {/* DESKTOP LINKS */}

          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                to={link.path}
                className={`text-lg font-semibold transition ${
                  location.pathname ===
                  link.path

                    ? 'text-[#5b3b22] dark:text-white'

                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >

                {link.name}

              </Link>

            ))}

            {/* CART */}

            <Link
              to="/cart"
              className="relative bg-[#5b3b22] text-white p-3 rounded-full transition hover:scale-110"
            >

              <ShoppingCart size={22} />

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </Link>

            {/* DARK MODE */}

            <button
              onClick={toggleTheme}
              className="bg-[#5b3b22] text-white p-3 rounded-full transition hover:scale-110"
            >

              {darkMode ? (

                <Sun size={22} />

              ) : (

                <Moon size={22} />

              )}

            </button>

          </div>

          {/* MOBILE */}

          <div className="lg:hidden flex items-center gap-4">

            {/* CART */}

            <Link
              to="/cart"
              className="relative bg-[#5b3b22] text-white p-3 rounded-full"
            >

              <ShoppingCart size={20} />

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </Link>

            {/* DARK MODE */}

            <button
              onClick={toggleTheme}
              className="bg-[#5b3b22] text-white p-3 rounded-full"
            >

              {darkMode ? (

                <Sun size={20} />

              ) : (

                <Moon size={20} />

              )}

            </button>

            {/* MENU */}

            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="bg-[#5b3b22] text-white p-3 rounded-full"
            >

              {mobileMenu ? (

                <X size={22} />

              ) : (

                <Menu size={22} />

              )}

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        <AnimatePresence>

          {mobileMenu && (

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="lg:hidden mt-8 flex flex-col gap-6"
            >

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className={`text-lg font-semibold ${
                    location.pathname ===
                    link.path

                      ? 'text-[#5b3b22] dark:text-white'

                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >

                  {link.name}

                </Link>

              ))}

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </motion.nav>

  )
}

export default Navbar