import { WSMessageSchema } from "./schemas"
import { MESSAGE_TYPES } from "./constants"

import type { NewMessage } from "../../entities/chats"

import type {
  OnErrorCallback,
  OnMessageCallback,
  OnStateCallback,
} from "./types"

const WS_URL = "ws://localhost:3030/"

export class WSApi {
  private url: string
  private ws: WebSocket | null = null

  private onConnectingCallbacks: OnStateCallback[] = []
  private onOpenCallbacks: OnStateCallback[] = []
  private onCloseCallbacks: OnStateCallback[] = []
  private onErrorCallbacks: OnErrorCallback[] = []
  private onMessageCallbacks: OnMessageCallback[] = []

  constructor(url: string) {
    this.url = url
  }

  private onErrorListener = () => {
    this.onErrorCallbacks.forEach(cb => {
      cb()
    })
  }

  private onCloseListener = () => {
    this.onCloseCallbacks.forEach(cb => {
      cb()
    })
    this.ws = null
  }

  private onOpenListener = () => {
    this.onOpenCallbacks.forEach(cb => {
      cb()
    })
  }

  private onMessageListener = (event: MessageEvent<string>) => {
    try {
      const parsedMessage = WSMessageSchema.parse(JSON.parse(event.data))

      this.onMessageCallbacks.forEach(cb => {
        cb(parsedMessage.payload, undefined)
      })
    } catch (error) {
      const errorMessage = "Ошибка при получении сообщения"
      console.error(errorMessage, "\n", error)

      this.onMessageCallbacks.forEach(cb => {
        cb(undefined, errorMessage)
      })
    }
  }

  onError = (callback: OnErrorCallback) => {
    if (this.onErrorCallbacks.includes(callback)) {
      return
    }

    this.onErrorCallbacks.push(callback)
  }

  onConnecting = (callback: OnStateCallback) => {
    if (this.onConnectingCallbacks.includes(callback)) {
      return
    }

    this.onConnectingCallbacks.push(callback)
  }

  onOpen = (callback: OnStateCallback) => {
    if (this.onOpenCallbacks.includes(callback)) {
      return
    }

    this.onOpenCallbacks.push(callback)
  }

  onClose = (callback: OnStateCallback) => {
    if (this.onCloseCallbacks.includes(callback)) {
      return
    }

    this.onCloseCallbacks.push(callback)
  }

  onMessage = (callback: OnMessageCallback) => {
    if (this.onMessageCallbacks.includes(callback)) {
      return
    }

    this.onMessageCallbacks.push(callback)
  }

  close = (): boolean => {
    if (
      this.ws == null ||
      this.ws.readyState === WebSocket.CLOSING ||
      this.ws.readyState === WebSocket.CLOSED
    ) {
      return true
    }

    if (this.ws.bufferedAmount !== 0) {
      console.info("Невозможно закрыть веб-сокет. Не все данные еще переданы.")
      return false
    }

    this.ws.close(1000, "Веб сокет больше не нужен")
    return true
  }

  open = (): boolean => {
    if (
      this.ws &&
      (this.ws.readyState == WebSocket.OPEN ||
        this.ws.readyState == WebSocket.CONNECTING)
    ) {
      return true
    }

    try {
      this.ws = new WebSocket(this.url)

      this.onConnectingCallbacks.forEach(cb => {
        cb()
      })

      this.ws.onerror = this.onErrorListener
      this.ws.onclose = this.onCloseListener
      this.ws.onopen = this.onOpenListener
      this.ws.onmessage = this.onMessageListener

      return true
    } catch (error) {
      const errorMessage = "Ошибка при попытке подключения"
      console.error(errorMessage, "\n", error)
      return false
    }
  }

  sendMessage(message: NewMessage): boolean {
    if (this.ws == null || this.ws.readyState !== WebSocket.OPEN) {
      console.info("Невозможно отправить соообщение. Соединение не открыто. .")

      return false
    }

    try {
      const stringifiedMessage = JSON.stringify({
        type: MESSAGE_TYPES.new,
        payload: message,
      })

      this.ws.send(stringifiedMessage)
      return true
    } catch (error) {
      const errorMessage = "Ошибка при отправке сообщения"
      console.error(errorMessage, "\n", error)
      return false
    }
  }
}

export const wsApi = new WSApi(WS_URL)
