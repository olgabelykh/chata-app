import { useImperativeHandle, useLayoutEffect, useRef } from "react"
import { useDebounceCallback, useResizeObserver } from "usehooks-ts"
import { Box } from "@mui/material"

import { ScrollableRefType } from "./types"

const styles = {
  container: {
    width: 1,
    height: 1,
    overflow: "auto",
    scrollbarWidth: "thin",
  },
}

type ScrollableProps = {
  children: React.ReactNode
  scrollableRef: React.RefObject<ScrollableRefType | null>
}

const Scrollable = ({ children, scrollableRef }: ScrollableProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    scrollToBottom()
  })

  const scrollToTop = () => {
    if (!containerRef.current) return

    containerRef.current.scrollTop = 0
  }

  const scrollToBottom = () => {
    if (!containerRef.current) return

    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  const onResize = useDebounceCallback(scrollToBottom, 100)

  useResizeObserver<HTMLDivElement>({
    ref: containerRef,
    onResize,
  })

  useImperativeHandle(scrollableRef, () => ({
    scrollToTop,
    scrollToBottom,
  }))

  return (
    <Box ref={containerRef} sx={styles.container}>
      {children}
    </Box>
  )
}

export default Scrollable
