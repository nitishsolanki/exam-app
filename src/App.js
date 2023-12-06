import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Question';

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

    useEffect(() => {
        fetch('/questions.json') // The path to your JSON file
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error(error));
    }, []);
    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleIncorrectAnswer = () => {
        setIncorrectAnswersCount(incorrectAnswersCount + 1);
        handleNextQuestion();
    };

    const handleFinishExam = () => {
        // You can display the result, for example:
        alert(`Exam completed!\nIncorrect Answers: ${incorrectAnswersCount}`);
    };

    const finishExam = () => {
        setCurrentQuestionIndex(questions.length );
    };
    const handleNextClick = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleRedoTest = () => {
        setCurrentQuestionIndex(0);
        setIncorrectAnswersCount(0);
        setCorrectAnswersCount(0);
    };
    const handleCorrectAnswer = () => {
        setCorrectAnswersCount(correctAnswersCount + 1);
        handleNextQuestion();
    };

    return (
        <div className="App">
            {questions.length > 0 ? (
                currentQuestionIndex < questions.length ? (
                    <Question
                        number={currentQuestionIndex + 1}
                        totalQuestions={questions.length}
                        question={questions[currentQuestionIndex].question}
                        options={questions[currentQuestionIndex].options}
                        correctAnswer={questions[currentQuestionIndex].correctAnswer}
                        onNextClick={handleNextClick}
                        onIncorrectAnswer={handleIncorrectAnswer}
                        onCorrectAnswer={handleCorrectAnswer}
                        finishExam={finishExam}
                    />
                ) : (
                    <div>
                        <h1>Congratulations! You've completed the exam.</h1>
                        <p>Correct Answers: {correctAnswersCount}</p>
                        <p>Incorrect Answers: {incorrectAnswersCount}</p>
                        <p>Total Question: {currentQuestionIndex}</p>
                        <p>Percentage Score: {(((correctAnswersCount) / questions.length) * 100).toFixed(2)}%</p>
                        <button onClick={handleFinishExam}>Finish Exam</button>
                        <button onClick={handleRedoTest}>Redo Test</button>
                    </div>
                )
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
}

export default App;
