import { type FormEvent, useState } from "react"
import { useSendMessageMutation } from "../../chatsApiSlice"
import { Button, Stack, TextField } from "@mui/material"

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    send({ content: value.trim(), chatId, userId, userName })
      .then(() => {
        setValue("")
      })
      .catch(() => {
        console.error("")
      })
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack p={1} flexDirection={"row"}>
        <TextField
          sx={{ flex: 1 }}
          multiline
          maxRows={4}
          value={value}
          onChange={e => {
            setValue(e.target.value)
          }}
        />
        <Button type="submit" disabled={isLoading || !value.trim()}>
          send
        </Button>
      </Stack>
    </form>
  )
}
