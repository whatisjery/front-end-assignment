import { useLayoutEffect, useRef, useState } from "react"

export function useScrollIndicator<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [showIndicator, setShowIndicator] = useState(false)

    useLayoutEffect(() => {
        const refEl = ref.current

        if (!refEl) return

        const checkPosition = () => {
            const hasOverflow = refEl.scrollHeight > refEl.clientHeight
            const notAtBottom = refEl.scrollTop + refEl.clientHeight < refEl.scrollHeight - 1
            setShowIndicator(hasOverflow && notAtBottom)
        }

        checkPosition()
        refEl.addEventListener("scroll", checkPosition)
        window.addEventListener("resize", checkPosition)

        return () => {
            refEl.removeEventListener("scroll", checkPosition)
            window.removeEventListener("resize", checkPosition)
        }
    }, [])

    return { ref, showIndicator }
}
