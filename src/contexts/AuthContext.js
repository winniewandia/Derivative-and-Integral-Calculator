import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthenticationContext = React.createContext()

export function useAuthentication() {
  return useContext(AuthenticationContext)
}

export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return user.updateEmail(email)
  }

  function updatePassword(password) {
    return user.updatePassword(password)
  }

  useEffect(() => {
    const userDetails = auth.onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
    })

    return userDetails
  }, [])

  const value = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {!loading && children}
    </AuthenticationContext.Provider>
  )
}
