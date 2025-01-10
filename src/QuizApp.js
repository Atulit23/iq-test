import { useState } from "react";
import "./QuizApp.css";
import img1 from "./images/9.png";
import img2 from "./images/10.png";

const questions = [
  {
    id: 1,
    question_number: 1,
    difficulty: "easy",
    score: 15,
    penalty: -5,
    question: "1. What's next? 1, 2, 5, 14, 41, ___ ?",
    options: ["54", "63", "84", "122"],
    correct_answer: "122",
  },
  {
    id: 2,
    question_number: 2,
    difficulty: "easy",
    score: 15,
    penalty: -5,
    question: "2. Which color doesn't fit in?",
    options: ["Violet", "Pink", "Green", "Red"],
    correct_answer: "Pink",
  },
  {
    id: 3,
    question_number: 3,
    difficulty: "medium",
    score: 15,
    question:
      "3. SUNDAY, MONDAY, WEDNESDAY, SATURDAY, WEDNESDAY. Which day comes next?",
    options: ["SUNDAY", "MONDAY", "WEDNESDAY", "SATURDAY"],
    correct_answer: "MONDAY",
  },
  {
    id: 4,
    question_number: 4,
    difficulty: "medium",
    score: 15,
    question: "4. Which of the following is the least similar to the others?",
    options: ["Brass", "Copper", "Iron", "Lead"],
    correct_answer: "Brass",
  },
  {
    id: 5,
    question_number: 5,
    difficulty: "medium",
    score: 15,
    question: "5. What's next? 2, 8, 26, 62, 122, 212, __?",
    options: ["338", "339", "340", "341"],
    correct_answer: "338",
  },
  {
    id: 6,
    question_number: 6,
    difficulty: "medium",
    score: 15,
    question:
      "6. Which of the following completes the best comparison? CAACCAC is to 3113313 as CACAACAC is to:",
    options: ["31313113", "31311313", "31311131", "13133313", "13133131"],
    correct_answer: "31311313",
  },
  {
    id: 7,
    question_number: 7,
    difficulty: "medium",
    score: 15,
    question:
      "7. Which day is three days before the day immediately following the day two days before the day three days after the day immediately before Friday?",
    options: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
    correct_answer: "Wednesday",
  },
  {
    id: 8,
    question_number: 8,
    difficulty: "medium",
    score: 15,
    question:
      "8. You are on a skateboard moving on a flat surface. You jump off the skateboard in a straight line, but the skateboard continues moving forward. What happens to the skateboard after you jump?",
    options: [
      "The skateboard will stop immediately.",
      "The skateboard will continue moving at the same speed and direction.",
      "The skateboard will slow down but continue moving in a straight line.",
      "The skateboard will reverse direction.",
    ],
    correct_answer:
      "The skateboard will continue moving at the same speed and direction.",
  },
  {
    id: 9,
    question_number: 9,
    difficulty: "easy",
    score: 15,
    penalty: -5,
    question: "9. Which is the next?",
    options: ["A", "B", "C", "D", "E", "F"],
    correct_answer: "D",
    image_path: img1,
  },
  {
    id: 10,
    question_number: 10,
    difficulty: "easy",
    score: 15,
    question: "10. Which is the next?",
    options: ["A", "B", "C", "D", "E", "F"],
    correct_answer: "E",
    image_path: img2,
    submit: true,
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const maxIQ = 180;
  const [iq, setIQ] = useState();

  const calculateIQ = () => {
    let score = 0;

    questions?.map((item, index) => {
      if (item.correct_answer === answers[index]) {
        score += item.score;
      } else {
        if (item.penalty) {
          score += item.penalty;
        }
      }
    });
    console.log(score);
    let currIQ = (score / 150) * (maxIQ - 100) + 100;
    return currIQ;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    }
    if (questions[currentQuestion].submit === true) {
      setIQ(calculateIQ());
      setSubmitted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      let answers1 = [...answers]
      answers1[currentQuestion] = null
      setAnswers(answers1)
      setCurrentQuestion((curr) => curr - 1);
    }
  };

  return (
    <div className="quiz-container">
      {submitted === false ? (
        <div className="quiz-wrapper">
          {/* Progress indicator */}
          <div className="progress-card">
            <div className="progress-header">
              <span className="question-counter">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="question-card">
            {questions[currentQuestion].image_path && (
              <img
                src={questions[currentQuestion].image_path}
                alt="Question visual"
                className="question-image"
              />
            )}

            <div className="question-content">
              <h2 className="question-text">
                {questions[currentQuestion].question}
              </h2>

              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAnswers((prev) => {
                        const newAnswers = [...prev];
                        newAnswers[currentQuestion] = option;
                        return newAnswers;
                      });
                    }}
                    className={`option-button ${
                      answers[currentQuestion] === option ? "selected" : ""
                    }`}
                  >
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="navigation-footer">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`nav-button prev ${
                  currentQuestion === 0 ? "disabled" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={answers.filter((item, index) => item !== null).length - 1 !== currentQuestion}
                className={`nav-button next ${
                    answers.filter((item, index) => item !== null).length - 1 !== currentQuestion ? "disabled" : ""
                }`}
              >
                {questions[currentQuestion].submit ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-score">
          <span className="top">Your IQ:</span>
          <span className="bottom">{parseInt(iq)}</span>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
