export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // ignore
        }
    }

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key)

            return item ? JSON.parse(item) : null
        } catch {
            return null
        }
    }

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch {
            // ignore
        }
    }

    return { setItem, getItem, removeItem }
}
