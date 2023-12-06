import React from 'react';

function Answer({ option, isSelected, isCorrect, onClick }) {
    return (
        <li
            className={isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}
            onClick={onClick}
        >
            {option}
        </li>
    );
}

export default Answer;
