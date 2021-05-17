import { useState, useEffect, useRef } from "react"

function useWordGame(){
    const STARTING_TIME = 60

    const [text, setText] = useState("")
    const [seconds, setSeconds] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [word, setWord] = useState(0)
    const [char, setChar] = useState(0)
    const textboxRef = useRef(null)

    //input 改變
    function handleChange(e){
        const {value} = e.target
        setText(value)
    }

    //計算word
    function wordsCount() {
        const wordsArr = text.trim().split(" ")
        if (text !== "") {
            return wordsArr.length
        } else {
            return 0
        }
    }

    //計算character
    function charsCount(){
        const charsArr = text.trim().split("")
        if (text !== "") {
            return charsArr.length
        } else {
            return 0
        }
    }

    //遊戲開始
    function startGame(){
        setSeconds(STARTING_TIME)
        setIsTimeRunning(true)
        setText("")
        textboxRef.current.disabled = false
        textboxRef.current.focus()
    }

    function countingWords(){
        setWord(wordsCount(text))
        setChar(charsCount(text))
    }

    //倒數
    useEffect(() => {
        if (isTimeRunning && seconds > 0) {
            setTimeout(() => {
                setSeconds(prevsec => prevsec - 1)
            }, 1000)
        } else if (seconds === 0) {
            setIsTimeRunning(false)
        }
    },[seconds, isTimeRunning])

    useEffect(countingWords,[text])

    return {seconds, word, char, text, handleChange, isTimeRunning, textboxRef, startGame}
}

export default useWordGame