import { useContext } from "react"
import UserContext from "./contexts/user"

const CongratsMessage = () => {
  const { token, handleLogout } = useContext(UserContext)
  return (
    <div>
      <p>Congrats log in bruh, your token is {token}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default CongratsMessage
