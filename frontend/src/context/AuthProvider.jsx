import React from 'react'
import AuthContext from './AuthContext'

function AuthProvider({ children }) {
    const contextData = {
        name: "Veena Ghandi",
        role:"teacher",
        login:true
    }
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;