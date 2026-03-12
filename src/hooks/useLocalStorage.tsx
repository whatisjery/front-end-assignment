import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) : defaultValue
        } catch {
            return defaultValue
        }
    })

    useEffect(() => {
        const handler = (event: StorageEvent) => {
            if (event.key === key) {
                setValue(event.newValue ? JSON.parse(event.newValue) : defaultValue)
            }
        }

        window.addEventListener("storage", handler)

        return () => window.removeEventListener("storage", handler)
    }, [key, defaultValue])

    const update = useCallback(
        (next: T | ((prev: T) => T)) => {
            setValue((prev) => {
                const resolved = next instanceof Function ? next(prev) : next
                localStorage.setItem(key, JSON.stringify(resolved))
                return resolved
            })
        },
        [key],
    )

    const reset = useCallback(() => {
        localStorage.removeItem(key)
        setValue(defaultValue)
    }, [key, defaultValue])

    return [value, update, reset] as const
}
