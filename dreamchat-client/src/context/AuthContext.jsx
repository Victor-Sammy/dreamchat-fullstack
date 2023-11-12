/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { baseURL } from '../api/root-api'
import axios from 'axios'

//create context
const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'
//provider context
export default function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // set currentUser
  useLayoutEffect(() => {
    const googleAuth = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/auth/login/success`, {
          withCredentials: true,
        })
        setCurrentUser(data)
        console.log(data)
      } catch (error) {
        console.log(error.response?.data)
      }
    }
    googleAuth()
  }, [setCurrentUser])

  //signin with google
  const signinWithGoogle = () => {
    window.open(`${baseURL}/auth/google/callback`, '_self')
  }

  //signout
  const logout = useCallback(() => {
    return Promise.all([setLoading(true), setCurrentUser(null)]).then(() => {
      setLoading(false)
    })
  }, [setCurrentUser])

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      signinWithGoogle,
      logout,
      loading,
    }),
    [currentUser, loading, logout]
  )

  return <AuthContext.Provider value={value} {...props} />
}

export function UserAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
