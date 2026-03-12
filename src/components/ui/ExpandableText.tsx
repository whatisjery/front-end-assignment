import { type ComponentRef, useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

interface ExpandableTextProps {
    text: string
    lines?: number
    className?: string
    buttonSlot: ({
        onClick,
        expanded,
    }: {
        onClick: () => void
        expanded: boolean
    }) => React.ReactNode
}

export function ExpandableText({ text, lines = 3, buttonSlot, className }: ExpandableTextProps) {
    const [expanded, setExpanded] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const textRef = useRef<ComponentRef<"p">>(null)

    useEffect(() => {
        const refElement = textRef.current
        if (!refElement) return

        setIsClamped(refElement.scrollHeight > refElement.clientHeight)
    }, [text])

    return (
        <>
            <p
                ref={textRef}
                className={cn("text-sm leading-relaxed", className)}
                style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: expanded ? "unset" : lines,
                    overflow: expanded ? "visible" : "hidden",
                }}
            >
                {text}
            </p>

            {isClamped &&
                buttonSlot?.({
                    onClick: () => setExpanded(!expanded),
                    expanded,
                })}
        </>
    )
}
