import { useState } from "react";

import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    const quisIsComplete = activeQuestionIndex === QUESTIONS.length

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((previousUserAnswers) => {
            return [...previousUserAnswers, selectedAnswer]
        })
    }

    if(quisIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="quiz completed" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5 )

    return (
        <article id="quiz">
            <session id='question'>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </session>
        </article>
    )
}