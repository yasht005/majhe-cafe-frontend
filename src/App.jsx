
import {

  BrowserRouter,
  Routes,
  Route,
  useLocation,

} from 'react-router-dom'

/* COMPONENTS */

import Navbar from './components/Navbar'

import Footer from './components/Footer'

import ProtectedAdminRoute from './components/ProtectedAdminRoute'

/* PAGES */

import Home from './pages/Home'

import About from './pages/About'

import Menu from './pages/Menu'

import Contact from './pages/Contact'

import Login from './pages/Login'

import Signup from './pages/Signup'

import Cart from './pages/Cart'

import Reservation from './pages/Reservation'

import Admin from './pages/Admin'

import Orders from './pages/Orders'

import MyOrders from './pages/MyOrders'

import TrackOrders from './pages/TrackOrders'

function AppContent() {

  const location =
    useLocation()

  /* HIDE NAVBAR */

  const hideNavbar =

    location.pathname ===
      '/admin' ||

    location.pathname ===
      '/orders'

  /* HIDE FOOTER */

  const hideFooter =

    location.pathname ===
      '/admin' ||

    location.pathname ===
      '/orders'

  return (

    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}

      {!hideNavbar && <Navbar />}

      {/* ROUTES */}

      <div className="flex-1">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/menu"
            element={<Menu />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/reservation"
            element={
              <Reservation />
            }
          />
          <Route
  path="/track-orders"
  element={<TrackOrders />}
/>

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

          {/* ADMIN */}

          <Route
            path="/admin"
            element={

              <ProtectedAdminRoute>

                <Admin />

              </ProtectedAdminRoute>

            }
          />

          <Route
            path="/orders"
            element={

              <ProtectedAdminRoute>

                <Orders />

              </ProtectedAdminRoute>

            }
          />
          

        </Routes>

      </div>

      {/* FOOTER */}

      {!hideFooter && <Footer />}

    </div>

  )
}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  )
}

export default App