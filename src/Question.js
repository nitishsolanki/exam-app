import React, { useState } from 'react';

function Question({ number, totalQuestions, question, options, correctAnswer, onNextClick, onIncorrectAnswer,onCorrectAnswer, finishExam }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSelected, setAnswerSelected] = useState(false); // Track if an answer has been selected
    const [revealCorrectAnswer, setRevealCorrectAnswer] = useState(false); // Track if the correct answer should be revealed
    const isLastQuestion = number === totalQuestions;

    const handleAnswerClick = (option) => {
        if (!answerSelected) {
            setSelectedAnswer(option);
            setAnswerSelected(true); // Set to true after an answer is selected
        }
    };

    const handleNext = () => {
        if (selectedAnswer === correctAnswer) {
            onCorrectAnswer();
        } else {
            onIncorrectAnswer();
        }

        setSelectedAnswer(null);
        setRevealCorrectAnswer(false);
        setAnswerSelected(false); // Reset to false after moving to the next question
        onNextClick();
    };
    const onFinishExam = () => {
        if (selectedAnswer === correctAnswer) {
            onCorrectAnswer();
        } else {
            onIncorrectAnswer();
        }
        finishExam();
    };

    const handleRevealCorrectAnswer = () => {
        setRevealCorrectAnswer(true);
    };

    return (
        <div>
            <h2>Question {number}/{totalQuestions}</h2>
            <p>{question}</p>
            <ul>
                {options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectAnswer = option === correctAnswer;
                    const isIncorrect = isSelected && !isCorrectAnswer;

                    return (
                        <li
                            key={index}
                            className={`answer-option ${
                                isSelected ? (isCorrectAnswer ? 'correct-answer' : 'selected-wrong') : ''
                            } ${isCorrectAnswer && isSelected ? 'correct-answer' : ''} ${isIncorrect ? 'selected-wrong' : ''}`}
                            onClick={() => handleAnswerClick(option)}
                        >
                            {revealCorrectAnswer && isCorrectAnswer && '✅'} {option}
                        </li>
                    );
                })}
            </ul>

            {answerSelected && !revealCorrectAnswer && (
                <button onClick={handleRevealCorrectAnswer}>
                    Reveal Correct Answer
                </button>
            )}
            {selectedAnswer && (
                <button onClick={handleNext} style={{ display: isLastQuestion ? 'none' : 'block' }}>
                    Next
                </button>
            )}
            {
                <button onClick={onFinishExam}>Finish</button>
            }

        </div>
    );
}

export default Question;
