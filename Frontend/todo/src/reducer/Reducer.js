import React, { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  function update_token(tkn) {
    setToken(tkn);
  }

  function update_email(mail) {
    setEmail(mail);
  }

  return (
    <AuthContext.Provider value={{ update_email, email, update_token, token }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
