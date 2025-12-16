import express from "express"
import { createServer } from "http"
import { WebSocketServer } from "ws"
import { v4 as uuid } from "uuid"
import cors from "cors"

import { MESSAGE_TYPES, port } from "./constants.js"
import { users, chats, messages } from "./db.js"

const app = express()

app.use(express.json())
app.use(cors())

const server = createServer(app)

app.get("/chats/:chatId/messages", (req, res) => {
  const chatId = req.params.chatId
  const chatMessages = messages.filter(m => m.chatId === chatId)
  res.json(chatMessages)
})

app.get("/chats", (_, res) => {
  res.json(chats)
})

app.get("/users", (_, res) => {
  res.json(users)
})

app.get("/users/:id", (req, res) => {
  const userId = req.params.id
  const user = users.find(u => u.id === userId)
  if (user) {
    res.json(user)
  } else {
    res.status(404).send("User not found")
  }
})

const wss = new WebSocketServer({
  server,
})

let skiped = false
const clients = []

wss.on("connection", ws => {
  clients.push(ws)

  if (clients.length == 2 && !skiped) {
    ws.close(1000, "Для тестирования сбоя")
    skiped = true
  }

  ws.on("message", message => {
    try {
      const parsedMessage = JSON.parse(message.toString())
      switch (parsedMessage.type) {
        case MESSAGE_TYPES.new:
          {
            const userName =
              users.find(u => u.id === parsedMessage.payload.userId)?.name ??
              "n/a"
            const newMessage = {
              ...parsedMessage.payload,
              id: uuid(),
              userName: userName,
              views: [],
            }

            messages.push(newMessage)

            clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(
                  JSON.stringify({
                    type: MESSAGE_TYPES.new,
                    payload: newMessage,
                  }),
                )
              }
            })
          }
          break

        default:
          break
      }
    } catch (error) {}
  })

  ws.on("close", () => {
    console.log("Client disconnected", ws.url)
    const index = clients.indexOf(ws)
    clients.splice(index, 1)
  })
})

wss.on("error", error => {
  console.error("WebSocket error:", error)
})

server.listen(port, () => {
  console.log(`REST server listening at http://localhost:${port}`)
})
