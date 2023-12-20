// ExpertSystem.js
import React, { useState, useEffect } from 'react';

const fruitsData = [
  {
    "name": "Яблуко",
    "questions": ["Чи є у фрукта червона шкірка?", "Чи є у фрукта кісточки?", "Чи має фрукт м'яку м'якоть?"],
    "conditional_probabilities": [0.8, 0.7, 0.9],
    "likelihood": 0.5
  },
  {
    "name": "Персик",
    "questions": ["Чи є у фрукта пушиста шкірка?", "Чи є у фрукта кісточки?", "Чи має фрукт ароматну м'якоть?"],
    "conditional_probabilities": [0.2, 0.8, 0.9],
    "likelihood": 0.4
  },
  {
    "name": "Черешня",
    "questions": ["Чи є у фрукта червона шкірка?", "Чи є у фрукта кісточки?", "Чи має фрукт кислу м'якоть?"],
    "conditional_probabilities": [0.9, 0.9, 0.8],
    "likelihood": 0.3
  },
  {
    "name": "Слива",
    "questions": ["Чи є у фрукта синя шкірка?", "Чи є у фрукта кісточки?", "Чи має фрукт солодку м'якоть?"],
    "conditional_probabilities": [0.7, 0.9, 0.8],
    "likelihood": 0.2
  },
  {
    "name": "Абрикос",
    "questions": ["Чи є у фрукта пушиста шкірка?", "Чи є у фрукта кісточки?", "Чи має фрукт ароматну м'якоть?"],
    "conditional_probabilities": [0.3, 0.9, 0.7],
    "likelihood": 0.1
  },
  {
    "name": "Груша",
    "questions": ["Чи є у фрукта зелена шкірка?", "Чи є у фрукта кісточки?", "Чи має фрукт соковиту м'якоть?"],
    "conditional_probabilities": [0.8, 0.8, 0.9],
    "likelihood": 0.2
  }
];

const ExpertSystem = () => {
  const [answers, setAnswers] = useState({});
  const [hypotheses, setHypotheses] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const obtainAnswer = (answersCount) => {
    let selectedAnswerNumber = prompt(`Виберіть відповідь (1-${answersCount}) та натисніть "Enter":`);

    const answerNumberPattern = new RegExp(`^[1-${answersCount}]$`);
    if (!answerNumberPattern.test(selectedAnswerNumber)) {
      alert(`Некоректне введення. Повторіть свій вибір ввівши число від 1 до ${answersCount}.`);
      selectedAnswerNumber = obtainAnswer(answersCount);
    }

    return selectedAnswerNumber;
  };

  const handleAnswerSelection = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  useEffect(() => {
    if (currentQuestion < fruitsData.length) {
      const question = fruitsData[currentQuestion].questions[0];
      const answersCount = 2; // Assuming always 2 options: "Так" and "Ні"
      const selectedAnswerNumber = obtainAnswer(answersCount);
      const selectedAnswer = selectedAnswerNumber === '1' ? 'Так' : 'Ні';
      const totalProbability = fruitsData[currentQuestion].conditional_probabilities[0] +
        fruitsData[currentQuestion].conditional_probabilities[1];

      const updatedHypotheses = {};
      fruitsData.forEach((fruit) => {
        updatedHypotheses[fruit.name] = fruit.likelihood * (
          selectedAnswer === 'Так' ? fruit.conditional_probabilities[0] : fruit.conditional_probabilities[1]
        ) / totalProbability;
      });

      setHypotheses(updatedHypotheses);
    } else {
      alert('Вітаємо! Ваші відповіді оброблені.');
    }
  }, [currentQuestion]);

  return (
    <div>
      {currentQuestion < fruitsData.length && (
        <div>
          <h3>{fruitsData[currentQuestion].questions[0]}</h3>
          <div>
            <button onClick={() => handleAnswerSelection(fruitsData[currentQuestion].name, 'Так')}>Так</button>
            <button onClick={() => handleAnswerSelection(fruitsData[currentQuestion].name, 'Ні')}>Ні</button>
          </div>
        </div>
      )}
      <div>
        <h3>Ймовірності для кожного можливого результату:</h3>
        <ul>
          {Object.entries(hypotheses).map(([fruit, probability]) => (
            <li key={fruit}>{`${fruit} - ${Math.round(probability * 100)}%`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpertSystem;
