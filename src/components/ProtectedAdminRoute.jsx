import { Navigate } from 'react-router-dom'

function ProtectedAdminRoute({

  children,

}) {

  const role =
    localStorage.getItem('role')

  if (role !== 'admin') {

    return <Navigate to="/" />

  }

  return children
}

export default ProtectedAdminRoute