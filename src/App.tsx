import "./App.css"

import { Users } from "./features/users/Users/Users"
import { useSelectedUser } from "./features/users/useSelectedUser"
import { Chat } from "./features/chat"

export const App = () => {
  const selectedUser = useSelectedUser()

  return (
    <>
      {!selectedUser && <Users />}
      {selectedUser && (
        <Chat userId={selectedUser.id} userName={selectedUser.name} />
      )}
    </>
  )
}
