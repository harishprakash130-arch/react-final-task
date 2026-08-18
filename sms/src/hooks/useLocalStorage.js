import { useState, useEffect } from 'react'

/**
 * Custom hook that behaves like useState but persists the value
 * to localStorage so it survives page reloads.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn('useLocalStorage: failed to read key', key, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn('useLocalStorage: failed to write key', key, err)
    }
  }, [key, value])

  return [value, setValue]
}
