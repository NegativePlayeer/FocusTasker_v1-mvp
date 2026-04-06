import { useState, useEffect } from "react";


export function useTheme(){
    const [isDark, setIsDark] = useState<boolean>(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if(saved === 'dark'){
            document.documentElement.classList.add('dark')
            setIsDark(true)
        }
    }, [])

    const toggle = () => {
        if(isDark) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
        setIsDark(prevState => !prevState)
    }
    return {isDark, toggle}
}