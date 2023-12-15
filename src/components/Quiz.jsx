import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
import Question from "./Question.jsx";
import quizCompleteImg from '../assets/quiz-complete.png'


export default function Quiz() {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length -1
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((previousUserAnswers) => {
            return [...previousUserAnswers, selectedAnswer]
        })

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)

        }, 1500)

    }, [activeQuestionIndex])

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
           questionText={QUESTIONS[activeQuestionIndex].text}
           answers={QUESTIONS[activeQuestionIndex].answers}
           answerState={answerState}
           selectedAnswer={userAnswers[userAnswers.length - 1]}
           onSelectAnswer={handleSelectAnswer}
           onSkipAnswer={handleSkipAnswer}
           />
        </article>
    )
}