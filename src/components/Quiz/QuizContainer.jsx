
import { useState, useRef, useEffect } from "react";
import quizData from "./data/valentine-quiz.json";
import QuestionCard from "./QuestionCard";
import OptionButton from "./OptionButton";
import ResultCard from "./ResultCard";
import "./css/quiz.css";

const QuizContainer = () => {
    const [userAnswers, setUserAnswers] = useState({}); // { 1: 'A', 2: 'B' }
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);

    const questionRefs = useRef([]);
    const resultRef = useRef(null);

    // Initialize refs array
    questionRefs.current = [];
    const addToRefs = (el) => {
        if (el && !questionRefs.current.includes(el)) {
            questionRefs.current.push(el);
        }
    };

    const handleAnswer = (questionId, type, index) => {
        const newAnswers = { ...userAnswers, [questionId]: type };
        setUserAnswers(newAnswers);

        // Smooth scroll to next question
        if (index < quizData.questions.length - 1) {
            setTimeout(() => {
                questionRefs.current[index + 1]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        } else {
            // If it's the last question, we might want to automatically show result 
            // OR show a "See Result" button.
            // Let's verify if all questions are answered effectively.
            if (Object.keys(newAnswers).length === quizData.questions.length) {
                calculateResult(newAnswers);
            }
        }
    };

    const calculateResult = (answers) => {
        const counts = Object.values(answers).reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        let maxCount = 0;
        let resultType = "A";

        Object.entries(counts).forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                resultType = type;
            }
        });

        const finalResult = quizData.results[resultType];
        setResult(finalResult);
        setShowResult(true);

        // smooth scroll to result
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        localStorage.setItem("indigo_valentine_result", JSON.stringify(finalResult));
    };

    const resetQuiz = () => {
        setUserAnswers({});
        setShowResult(false);
        setResult(null);
        localStorage.removeItem("indigo_valentine_result");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="quiz-wrapper">
            <div className="quiz-progress-bar-container">
                <div
                    className="quiz-progress-bar-fill"
                    style={{ width: `${(Object.keys(userAnswers).length / quizData.questions.length) * 100}%` }}
                ></div>
            </div>
            <div className="quiz-content">
                {quizData.questions.map((question, index) => (
                    <div
                        key={question.id}
                        className="quiz-container"
                        ref={addToRefs}
                        style={{ opacity: userAnswers[question.id] ? 0.7 : 1, transition: 'opacity 0.3s' }}
                    >
                        <QuestionCard question={question.text} />
                        <div className="options-grid">
                            {question.options.map((option, optIndex) => (
                                <OptionButton
                                    key={optIndex}
                                    text={option.text}
                                    onClick={() => handleAnswer(question.id, option.type, index)}

                                    disabled={false}
                                    className={userAnswers[question.id] === option.type ? 'selected' : ''}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {showResult && result && (
                    <div ref={resultRef}>
                        <ResultCard result={result} onRetry={resetQuiz} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizContainer;
