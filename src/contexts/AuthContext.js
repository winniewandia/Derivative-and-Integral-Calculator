import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { collection, query, getDocs } from "firebase/firestore"

const AuthenticationContext = React.createContext()

export function useAuthentication() {
  return useContext(AuthenticationContext)
}

export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])

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

  const getData = async () => {
    const q = query(collection(db, "calculator"));
    var records = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const record = {
        uid: doc.id,
        derivative: doc.get("derivative"),
        integral: doc.get("integral"),
        polynomial: doc.get("polynomial"),
        variable: doc.get("variable"),

      };
      records.push(record);
    })
    setRecords(records);
  }

  useEffect(() => {
    getData();
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
    updatePassword,
    getData,
    records,
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {!loading && children}
    </AuthenticationContext.Provider>
  )
}
