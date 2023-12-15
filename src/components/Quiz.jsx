import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
import Question from "./Question.jsx";
import quizCompleteImg from '../assets/quiz-complete.png'


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((previousUserAnswers) => {
            return [...previousUserAnswers, selectedAnswer]
        })

    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quisIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="quiz completed" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    return (
        <article id="quiz">
           <Question
           key={activeQuestionIndex} //esta key serve para destruir e remontar o componente quando muda, o que permite o timer ser resetado.
           index={activeQuestionIndex}
           onSelectAnswer={handleSelectAnswer}
           onSkipAnswer={handleSkipAnswer}
           />
        </article>
    )
}