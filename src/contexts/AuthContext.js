import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, updateEmail, updatePassword } from "firebase/auth"

const AuthenticationContext = React.createContext()

export function useAuthentication() {
  return useContext(AuthenticationContext)
}

export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmailFunc(email) {
    return updateEmail(user, email)
  }

  function updatePasswordFunc(password) {
    return updatePassword(user, password)
  }

  useEffect(() => {
    const userDetails = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
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
    updateEmailFunc,
    updatePasswordFunc,
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {!loading && children}
    </AuthenticationContext.Provider>
  )
}
