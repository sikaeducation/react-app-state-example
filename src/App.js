import './App.css';
import UserContext from "./contexts/user"
import { useState, useEffect } from "react"

import FormInput from "./FormInput"
import CongratsMessage from "./CongratsMessage"

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [token, setToken] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    setToken(token)
  }, [])

  const handleUsername = event => {
    const newValue = event.target.value

    if (newValue === "" || /\d+/.test(newValue)){
      setErrorMessage("")
      setUsername(newValue)
    } else {
      setErrorMessage("C'mon man, only digits in usernames!")
    }
  }
  const handlePassword = event => setPassword(event.target.value)

  const submitHandler = event => {
    event.preventDefault()
    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    }).then(response => response.json())
    .then(response => {
      localStorage.setItem("token", response.token)
      setToken(response.token)
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken("")
  }

  const isLoggedIn = !!token

  return (
    <div className="App">
      <UserContext.Provider value={{ token, handleLogout }}>
      {
        isLoggedIn
          ? <CongratsMessage />
          : <form onSubmit={submitHandler}>
              <FormInput
                type="text"
                slug="username"
                label="Username"
                placeholder="kylecoberly"
                value={username}
                isRequired={true}
                changeHandler={handleUsername}
              />
              <FormInput
                type="password"
                slug="password"
                label="Password"
                value={password}
                isRequired={true}
                changeHandler={handlePassword}
              />

              <input type="submit" value="Login" />
              {
                errorMessage && <p>{errorMessage}</p>
              }
            </form>
      }
      </UserContext.Provider>
    </div>
  );
}

export default App;
