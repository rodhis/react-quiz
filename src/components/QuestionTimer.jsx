import { useState, useEffect } from "react"

export default function QuestionTimer({ timeout, onTimeout }) {

    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
       const timer = setTimeout(onTimeout, timeout)

       return () => {
        clearTimeout(timer) //effect cleanup function
       }
    }, [timeout, onTimeout])
    

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(previousRemainingTime => previousRemainingTime - 100)
        }, 100)

        return () => {  //effect cleanup function, so this useEffect won't get executed twice
            clearInterval(interval)
        }
    }, [])

    return (
        <progress 
        id="question-time" 
        max={timeout} 
        value={remainingTime} 
        className="mode" />
    )
}