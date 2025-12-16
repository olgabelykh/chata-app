import { type FormEvent, useState } from "react"
import { useSendMessageMutation } from "../../chatsApiSlice"
import { Button, Snackbar, Stack, TextField } from "@mui/material"
import { v4 as uuid } from "uuid"
import { useSnackbar } from "./useSnackBar"

const SEND_MESSAGE_ERROR = "Ошибка отправки сообщения"
export type MessageFormProps = {
  chatId: string
  userId: string
  userName: string
  onSubmit?: () => void
}

export const MessageForm = ({
  chatId,
  userId,
  userName,
  onSubmit,
}: MessageFormProps) => {
  const [value, setValue] = useState("")
  const [send, { isLoading }] = useSendMessageMutation()
  const { open, message, show, onClose } = useSnackbar()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    send({ content: value.trim(), chatId, userId, userName, id: uuid() })
      .then(result => {
        if (result.error) {
          if ("error" in result.error) {
            show(result.error.error)
            return
          }
          if (
            "message" in result.error &&
            typeof result.error.message === "string"
          ) {
            show(result.error.message)
            return
          }

          show(SEND_MESSAGE_ERROR)
          return
        }
        setValue("")
        onSubmit?.()
      })
      .catch(() => {
        show(SEND_MESSAGE_ERROR)
      })
  }
  const disabled = isLoading || !value.trim() || !!message

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack p={1} flexDirection="row">
          <TextField
            sx={{ flex: 1 }}
            multiline
            maxRows={4}
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          <Button type="submit" disabled={disabled}>
            send
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
        message={message}
      />
    </>
  )
}
