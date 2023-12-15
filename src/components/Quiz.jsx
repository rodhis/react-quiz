import { useState, useCallback } from "react";

import QUESTIONS from '../questions.js'
import QuestionTimer from "./QuestionTimer.jsx";
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

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5 )

    return (
        <article id="quiz">
            <session id='question'>
                <QuestionTimer
                key={activeQuestionIndex} //esta key serve para destruir e remontar o componente quando muda, o que permite o timer ser resetado.
                timeout={10000} 
                onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer
                        let cssClass = ''

                        if (answerState == 'answered' && isSelected) {
                            cssClass = 'selected'
                        }

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState
                        }
                         return ( 
                            <li key={answer} className="answer">
                           <button onClick={() => handleSelectAnswer(answer)}
                           className={cssClass}
                           >{answer}</button>
                            </li>
                         )
                        }
                    )}
                </ul>
            </session>
        </article>
    )
}